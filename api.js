

var getTRO = function(base, art, key) {
    let url = `${base}/api?art=${art}&key=${key}`;
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};

var getJSON = async function(el) {
        let base = el.getAttribute('base');
        let art = el.getAttribute('art');
        let key = el.getAttribute('key');
        let data;
        try{
            data = await getTRO(base, art, key);
            data = JSON.parse(data);
        } catch(err){
            data = {'err': "API request failed."}
        }
        return data
};

$(document).on({
            mouseenter: async function() {
                let el = this;
                data = await getJSON(el);
                let pop = document.createElement("div");
                pop.id = 'pop';
                pop.innerHTML = data.text;
                document.body.appendChild(pop);

                let h = $(pop).outerHeight();
                let w = $(pop).outerWidth();

                console.log('popup')

                $(el).mousemove(function(event) {
                    let mid = window.innerHeight / 2;
                    let x = event.pageX - 0.5*w - 10;
                    let y = event.pageY - h - 20;
                    if (event.pageY < mid) { // if on top half of page
                        y = event.pageY + 20;
                    }
                    if (x + w >= window.innerWidth) {
                        x = window.innerWidth - w;
                    }
                    $(pop).css({
                        'left': `${x}px`,
                        'top': `${y}px`,
                        'width': `${w}px`,
                        'height': `${h}px`,
            });
        });
            },
            mouseleave: function() {
                $('#pop').remove();
                $(window).unbind('mousemove');
            },
        }, '.elltwo_popup');

var renderElltwo = function(){
    els = [...document.getElementsByClassName("elltwo")].forEach(async function(el) {
        let data;
        data = await getJSON(el);
        let para = document.createElement("div");
        para.classList.add("elltwoCont");
        if(data.err){
           para.innerHTML = data.err; 
           el.appendChild(para);
        } else{
            para.innerHTML = data.text;
            let a = document.createElement('a');
            a.href = createLink(el);
            a.classList.add("elltwoLink");
            el.appendChild(a).appendChild(para);
        }

    })
}

var createLink = function(el){
    let base = el.getAttribute('base');
    let art = el.getAttribute('art');
    let key = el.getAttribute('key');
    return `${base}/r/${art}#${key}`;
}

var creatElltwoLinks = function(){
    els = [...document.getElementsByClassName("elltwo_popup")].forEach(async function(el) {
            $(el).wrap( `<a class='elltwoInlineLink' href="${createLink(el)}"></div>` );

    })
}