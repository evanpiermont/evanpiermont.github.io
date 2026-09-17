// Data lives in separate files (loaded before this one):
//   - coauthors-data.js -- the `coauthors` name-to-URL lookup
//   - papers-data.js    -- the `papers` list
// Edit those files to add, remove, or update entries.

var absElements = []
var bibElements = []
var kws = new Set()
var activeFilter = new Set()

var now = new Date().getFullYear()


function createBib(paper){
   let stop = ['a', 'the', 'an']
   let author = paper['authors']
   author.push('Piermont, Evan');
   author = author.sort().join(' and ')
   title = paper['title']
   let fw = title.split(' ')[0].toLowerCase()
   if(stop.includes(fw)){
      fw = title.split(' ')[1].toLowerCase()
   }
   let year = paper['year'] || now
   let type = paper['journal'] ? `article` : `unpublished`

   let key = `piermont${year}${fw},\n`
   title=`\ttitle={${title}},\n`
   author=`\tauthor={${author}},\n`
   year=`\tyear={${year}},\n`
   let vol = paper['volume'] ? `\tvolume={${paper['volume']}},\n` : ""
   let num = paper['number'] ? `\tnumber={${paper['number']}},\n` : ""
   let pages = paper['pages'] ? `\tpages={${paper['pages']}},\n` : ""
   let journal = paper['journal'] ? `\tjournal={${paper['journal']}},\n` : ""
   let url = paper['url'] ? `\turl={${paper['url']}},\n` : ""
   let bib =
`@${type}{${key}${title}${author}${year}${journal}${vol}${num}${url}}`
   
   return bib
}

function createAuthorButton(name){
      let site = coauthors[name]
      if (site) {
      let button = document.createElement('button');
          button.textContent = name;
          button.classList.add('author_btn');
          button.onclick = function(event) {
          event.preventDefault();  
          event.stopPropagation();
          window.open(site, '_blank');
            };
            return button;
         } else {
            let span = document.createElement('span');
            span.textContent = name;
            return span;
         }
};



function createPaperElements(paper) {
  let paperLink = document.createElement('a');
  let paperDiv = document.createElement('div');
  paperLink.classList.add('paper_link');
  paperDiv.classList.add('paper');
  paperLink.appendChild(paperDiv);
  paperLink.href = paper['url'];
  paperLink.target = "_blank";


   let type
   if (paper['journal']){
    type = pub
   } else if (paper['rr']){
    type = rr
    paper['kw'].push('R\&R')
   } else {
    type = wp
    paper['kw'].push('mimeo')
   }

   let authors = paper['authors'];
   let authorContainer = document.createElement('span');

   if (authors.length === 0) {
      // No authors
   } else {
      let authorPieces = authors.map(createAuthorButton);

      if (authorPieces.length === 1) {
         authorContainer.append(' with ', authorPieces[0]);
      } else if (authorPieces.length > 1) {
         authorContainer.append(' with ');
         for (let i = 0; i < authorPieces.length; i++) {
            if (i > 0 && i === authorPieces.length - 1) {
               authorContainer.append(' and ');
            } else if (i > 0) {
               authorContainer.append(', ');
            }
            authorContainer.append(authorPieces[i]);
         }
      }
   }

   let title = document.createElement('div');
   title.classList.add('paper_title');
   title.innerHTML = `<b>${paper['title']}</b>`;
   title.append(authorContainer);

  if(paper['journal'] || paper['rr'] ){
      let journal = document.createElement('span');
      journal.classList.add('paper_journal');
      let j = paper['journal'] ? paper['journal'] : paper['rr']['j']
      j = '<em>' + j + '</em>';
      let rr = paper['rr'] ? `<span class=rr>${paper['rr']['s']} \& Resubmit</span> at ` : ""
      let vol = paper['volume'] ? `, Vol. ${paper['volume']}` : ""
      let num = paper['number'] ? `, Number ${paper['number']}` : ""
      let pages = paper['pages'] ? `, pp. ${paper['pages']}` : ""
      journal.innerHTML = `<br>${rr}${j}${vol}${num}${pages}`;
      title.appendChild(journal);
  }

  let year = paper['year'] ? `, ${paper['year']}.` : `.`
  title.insertAdjacentHTML('beforeend', year);
  paperDiv.appendChild(title);

  paper['kw'].forEach(kw => kws.add(kw))

  let keywords = ""
  paper['kw'].forEach(function(kw) {
    paperLink.classList.add(`kw-${kw}`);
    keywords += `#${kw} `
  });

  let buttons = document.createElement('div');
  buttons.classList.add('paper_buts');
  paperDiv.appendChild(buttons);

  let abs_t = document.createElement('span');
  abs_t.classList.add('paper_abs_text');
  abs_t.textContent = paper['abs'];
  paperDiv.appendChild(abs_t);

 let abs_b = document.createElement('span');
  abs_b.classList.add('abs_button');
  abs_b.innerHTML = `<svg class="icon filled-icon" viewBox="0 0 24 30">
  <use href="#absi" />
</svg> abstract`

if(paper['supp']){

let supp_b = document.createElement('a');
  supp_b.classList.add('supp_button');
  supp_b.href = paper['supp'];
  supp_b.innerHTML = `
<svg class="icon filled-icon" viewBox="-42.98 -42.98 400.55 400.55">
  <use href="#suppi" />
</svg> supp. material`

buttons.prepend(supp_b);
}

if(paper['slides']){

let slides_b = document.createElement('a');
  slides_b.classList.add('slides_button');
  slides_b.href = paper['slides'];
  slides_b.innerHTML = `
<svg class="icon filled-icon" viewBox="0 0 24 30">
  <use href="#slidesi" />
</svg> slides`

buttons.prepend(slides_b);
}


let bib_b = document.createElement('span');
  bib_b.classList.add('bib_button');
  bib_b.innerHTML = `
<svg class="icon filled-icon" viewBox="0 0 100 100">
  <use href="#bibi" />
</svg> cite`;
 bib_b.setAttribute('data-bibtex', createBib(paper))

  buttons.prepend(bib_b);
  buttons.prepend(abs_b);

  absElements.push(abs_b)
  bibElements.push(bib_b)


 if(keywords){
    let k = document.createElement('span');
    k.classList.add('paper_kw');
    k.innerHTML = keywords;
    paperDiv.appendChild(k);
 }

  

  return {div: paperLink, loc:type};
}

function createFilterButton(str) {
    const filterButtons = document.getElementById("filter_buttons");
    const span = document.createElement("span");
    span.classList.add('filter_button');
    span.id = `filter_${str}`;
    span.textContent = `${str}`;

    span.addEventListener("click", () => {
        if (span.classList.contains('active_filter')) {
        span.classList.remove('active_filter');
        activeFilter.delete(str)
        } else {
        span.classList.add('active_filter');
        activeFilter.add(str);
    }
    // Apply the filter
    applyFilter();
});

    filterButtons.appendChild(span);
}

function applyFilter() {

    const paperLinks = document.querySelectorAll(".paper_link");
    paperLinks.forEach(element => {
            element.style.display = "";
    })

    if(activeFilter.size > 0){
        paperLinks.forEach(element => {
            const matches = Array.from(activeFilter).every(kw => element.classList.contains(`kw-${kw}`));

            if (matches) {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
        });
    }
    document.getElementById("nav_research").click();
}

function appendPapersToDOM() {
  var pub = document.getElementById('pub'); 
  var wp = document.getElementById('wp'); 
  var rr = document.getElementById('wp'); 


  papers.forEach(function (paper) {
    var out = createPaperElements(paper);
    out['loc'].appendChild(out['div']);
  });

  kws.forEach(function (kw) {
    createFilterButton(kw)
  });

}


function copyto(data){
   let textarea = document.createElement('textarea');
   textarea.value = data;
   document.body.appendChild(textarea);
   textarea.select();
   document.execCommand('copy');
   document.body.removeChild(textarea);
}

function flashMessage(msg) {
    var flashMessage = document.getElementById('flash-message');
    flashMessage.textContent = msg;
    flashMessage.style.display = 'block';
    setTimeout(function () {
      flashMessage.style.display = 'none';
    }, 1500);
  }



function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const photos = document.querySelectorAll('#bse-photos img');

  photos.forEach(function (photo) {
    photo.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightboxCaption.textContent = this.alt || '';
      lightboxCaption.style.display = this.alt ? 'block' : 'none';
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', function () {
    lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });
}

init = function() {
  appendPapersToDOM();
  initLightbox();

  let but = createAuthorButton('Payró, Fernando')
  document.getElementById('fer').append(but)

  absElements.forEach(function(absElement) {
    absElement.addEventListener('click', function(e) {
      let textElement = this.parentNode.parentNode.querySelector('.paper_abs_text')
      textElement.style.display = (textElement.style.display === 'none' || textElement.style.display === '') ? 'block' : 'none';
      e.preventDefault()
    });
  });

  bibElements.forEach(function (bibButton) {
      bibButton.addEventListener('click', function (e) {
        var bibtexData = this.getAttribute('data-bibtex');
        copyto(bibtexData)
        flashMessage(`Copied: \n\n ${bibtexData}`)
        e.preventDefault()
     });
   });

};




