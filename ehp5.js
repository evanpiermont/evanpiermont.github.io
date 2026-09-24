// Data lives in separate files (loaded before this one):
//   - coauthors-data.js -- the `coauthors` name-to-URL lookup
//   - papers-data.js    -- the `papers` list
// Edit those files to add, remove, or update entries.

var absElements = []
var bibElements = []
var leanElements = []
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

if(paper['lean']){

let lean_b = document.createElement('span');
  lean_b.classList.add('lean_button');
  lean_b.innerHTML = `
<svg class="icon filled-icon" viewBox="0 0 24 24">
  <use href="#leani" />
</svg> lean proof`

let lean_menu = document.createElement('div');
  lean_menu.classList.add('lean_menu');

let lean_raw = document.createElement('a');
  lean_raw.classList.add('lean_menu_item');
  lean_raw.href = paper['lean'];
  lean_raw.target = "_blank";
  lean_raw.textContent = "raw files";

let lean_live = document.createElement('a');
  lean_live.classList.add('lean_menu_item');
  lean_live.href = `https://live.lean-lang.org/#url=${encodeURIComponent(paper['lean'])}`;
  lean_live.target = "_blank";
  lean_live.textContent = "interactive prover";

lean_menu.append(lean_raw, lean_live);
lean_b.appendChild(lean_menu);

leanElements.push({btn: lean_b, menu: lean_menu});

buttons.appendChild(lean_b);
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
    queueActiveSectionUpdate();
}

function appendPapersToDOM() {
  var pub = document.getElementById('pub');
  var wp = document.getElementById('wp');
  var rr = document.getElementById('rr');


  papers.forEach(function (paper) {
    var out = createPaperElements(paper);
    out['loc'].appendChild(out['div']);
  });

  kws.forEach(function (kw) {
    createFilterButton(kw)
  });

}

// Scroll-spy for the "R&Rs / Publications / Working Papers" sticky title:
// highlights whichever section the reader has scrolled down into. The
// activation line sits below the sticky title's own bottom edge, padded by
// SECTION_VISIBLE_FRACTION of the remaining viewport height -- so a section
// is roughly 80% "into" view before it's marked active, rather than
// flipping the instant its very top pixel clears the title. The last
// section (in reading order) whose top has been scrolled past that line is
// the "current" one. Before any scrolling (or on any other page), nothing
// has been passed yet, so it falls back to the first entry (R&Rs), which
// is the desired initial state.
var sectionOrder = ['rr', 'pub', 'wp'];
var sectionUpdateQueued = false;
var SECTION_VISIBLE_FRACTION = 0.8;

function getStickyTitleBottom() {
  var stickyTitle = document.querySelector('#research .sticky_title');
  return stickyTitle ? stickyTitle.getBoundingClientRect().bottom : null;
}

function updateActiveSection() {
  sectionUpdateQueued = false;
  var stickyBottom = getStickyTitleBottom();
  if (stickyBottom === null) { return; }

  var contentHeight = window.innerHeight - stickyBottom;
  var line = stickyBottom + (1 - SECTION_VISIBLE_FRACTION) * contentHeight;
  var current = sectionOrder[0];

  sectionOrder.forEach(function (id) {
    var section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= line) {
      current = id;
    }
  });

  sectionOrder.forEach(function (id) {
    var label = document.getElementById(id + '_hl');
    if (label) { label.classList.toggle('active', id === current); }
  });
}

function queueActiveSectionUpdate() {
  if (!sectionUpdateQueued) {
    sectionUpdateQueued = true;
    window.requestAnimationFrame(updateActiveSection);
  }
}

// Clicking a section label jumps straight to that section, aligning its
// top with the sticky title's current bottom edge -- the same place it
// would land if you'd scrolled there by hand.
function scrollToSection(id) {
  var section = document.getElementById(id);
  var stickyBottom = getStickyTitleBottom();
  if (!section || stickyBottom === null) { return; }
  var targetY = window.scrollY + section.getBoundingClientRect().top - stickyBottom;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
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

  window.addEventListener('scroll', queueActiveSectionUpdate, { passive: true });
  window.addEventListener('resize', queueActiveSectionUpdate);
  updateActiveSection();

  sectionOrder.forEach(function (id) {
    var label = document.getElementById(id + '_hl');
    if (label) {
      label.addEventListener('click', function () {
        scrollToSection(id);
      });
    }
  });

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

  leanElements.forEach(function (lean) {
      lean.btn.addEventListener('click', function (e) {
        if (e.target.closest('.lean_menu')) { return; }
        e.preventDefault();
        e.stopPropagation();
        leanElements.forEach(function (other) {
          if (other.menu !== lean.menu) { other.menu.classList.remove('open'); }
        });
        lean.menu.classList.toggle('open');
      });

      lean.menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          lean.menu.classList.remove('open');
        });
      });
   });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.lean_button')) {
      var wasOpen = leanElements.some(function (lean) {
        return lean.menu.classList.contains('open');
      });
      if (wasOpen) {
        leanElements.forEach(function (lean) {
          lean.menu.classList.remove('open');
        });
        // This click is just dismissing the menu -- don't also let it
        // activate whatever link (e.g. the paper's own url) it landed on.
        e.preventDefault();
      }
    }
  });

};




