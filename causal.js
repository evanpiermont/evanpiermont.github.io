var svgNS = "http://www.w3.org/2000/svg";
var [w,h]=[120,120]
var size = 15

///values

var color_map = {1:"#FA7070",2:"#7AA2E3",3:"#A1C398"}
var shape_map = {1:createTriangle,2:createSquare,3:createCircle}
var arrange_map = {
    1:[[w/2,w/2]], 
    2:[[w/3,w/2],[2*w/3,w/2]],
    3:[[w/2,w/3],[w/3,2*w/3],[2*w/3,2*w/3]],
    4:[[w/3,w/3],[2*w/3,w/3],[w/3,2*w/3],[2*w/3,2*w/3]],
    }

// rules


rules = {
    absorbA:
        {
            rule: function(a,b){
                    return a;
                },
            name: `Absorb 1`,
            desc: `The output is Input 1.`,
            n: [2,1],
        },
    max:
        {
            rule: function(a,b){
                    const result = {};
                    for (const key in a) {
                        result[key] = Math.max(a[key], b[key]);
                    }
                    return result;
                },
            name: `Max Rule`,
            desc: `For each attribute, the output takes the input with the "higher" value. For colors, green is higher than blue is higher than red. For shape, the number of sides indicates the value (circles have infinite sides). For number of sybols the number is the value.`,
            n: [2,1],
        },
    oddout:
        {
            rule: function(a,b){
                    const result = {};
                    for (const key in a) {
                        if(a[key] == b[key]){
                            result[key] = a[key]
                        }else{
                            result[key] = 6 - a[key] - b[key]
                        };
                    }
                    return result;
                },
            name: `Match or Distinct`,
            desc: `For each attribute, if the two inputs agree, the output will as well. If the two inputs disagree, the output will be distict from both.`,
            n: [2,1],
        },
        majority:
        {
            rule: function(a,b,c){
                    const result = {};
                    for (const key in a) {
                        if(b[key] == c[key]){
                            result[key] = c[key]
                        }else{
                            result[key] = a[key]
                        };
                    }
                    return result;
                },
            name: `Majority or 1`,
            desc: `For each attribute, if there is a majority, it is returned at the output. If the all inputs disagree, the output will Input 1.`,
            n: [3,1],
        },
    }

attributes = {
    color: {1:"red",2:"blue",3:"green"},
    arrange: {1:"1",2:"2",3:"3"},
    shape: {1:"triangle",2:"square",3:"circle"},
}

function applyRule(input, ruleName){
    rule = rules[ruleName]['rule']
    out = rule(...Object.values(input))
    return out
}

var input = {
    'input 1': 
        {color: 1,
         shape: 2,
         arrange: 3}, 
    'input 2': 
        {color: 2,
         shape: 1,
         arrange: 3},
    'input 3': 
        {color: 2,
         shape: 3,
         arrange: 1},
}

var output = {
    'output 1': {}
    };

var current_rule = 'oddout';

// create svgs

function createCircle(x,y,size,color){
    const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", size);
        circle.setAttribute("fill", color);

        return circle
};

function createSquare(x,y,size,color){
    const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", x-size);
        rect.setAttribute("y", y-size);
        rect.setAttribute("width", 2*size);
        rect.setAttribute("height", 2*size);
        rect.setAttribute("fill", color);

        return rect
};

function createTriangle(x,y,size, color) {

    // Calculate the coordinates of the triangle vertices
    const height = (Math.sqrt(3)) * size;
    const x1 = x;
    const y1 = y - height / 2;
    const x2 = x - size;
    const y2 = y + height / 2;
    const x3 = x + size;
    const y3 = y + height / 2;

    const triangle = document.createElementNS(svgNS, "polygon");
    triangle.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    triangle.setAttribute("fill", color);
    triangle.setAttribute("stroke", "none");

    return triangle;
}

function createCard(d) {

    arrange = arrange_map[d['arrange']]
    shape = shape_map[d['shape']]
    color = color_map[d['color']]

    const svg = document.createElementNS(svgNS, "svg");
    
    // Set SVG attributes
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    
    // Create rectangle
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", "10"); // Adjust as needed
    rect.setAttribute("y", "10"); // Adjust as needed
    rect.setAttribute("width", w-20);
    rect.setAttribute("height", h-20);
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2");
    svg.appendChild(rect);
    
    // Create shapes
    
    for (const a of arrange) {
        [x,y] = a
        svg.appendChild(shape(x,y,size,color));
    }
    
    return svg;
}

function displayInput(cardObj){
    const inputDiv = document.getElementById("input");
    for (name in cardObj){

        const card = document.createElement("div");
        card.classList.add('card');
        card.setAttribute("id", name);
    
        const cardtitle = document.createElement("div");
        cardtitle.classList.add('cardtitle');
        cardtitle.textContent = name;
        card.appendChild(cardtitle);

        vec = cardObj[name];
        card.appendChild(createCard(vec));

        const wrap = document.createElement("div");
        wrap.classList.add('cardWrap');
        wrap.appendChild(card)

        if (!name.startsWith('out')){
            wrap.classList.add('inputCard')
            const sel = document.createElement("div");
                sel.classList.add('selectWrap');
                wrap.appendChild(sel);
                for (const key in attributes) {
                    createSelect(attributes[key],key, updateInput, sel, cardObj[name][key],name)
                    }
        }else{
            wrap.classList.add('outputCard')
        }
        
        inputDiv.appendChild(wrap)
    }
}

function displayRule(rule){
    let name = document.getElementById('ruleName');
    let desc = document.getElementById('ruleDesc');
    
    name.innerHTML = `Rule: <span id=ruleNameInner>
                        ${rules[rule]['name']}
                        </span>`;
    desc.innerHTML = `Decription: <span id=ruleDescInner>
                        ${rules[rule]['desc']}
                        </span>`;

    const cards = document.getElementsByClassName("inputCard");
    for (let i = 0; i < cards.length; i++) {
            cards[i].style.display = "block"
        if (i >= rules[rule]['n'][0]) {
            cards[i].style.display = "none";
        }
    }
}

// create dropdown

function createSelect(options, name, callback, target, defualt=null, update=null) {
    ///options, name, callback -- self evident
    ///target, where to appemd
    /// update, what to update, passsed to callback

    var sel = document.createElement("div");
    sel.classList.add('select');
    
    var select = document.createElement("select");
    select.name = name;

    // Add options to select element
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            var option = document.createElement("option");
            option.value = key;
            option.text = options[key];
            select.appendChild(option);
            select.addEventListener("change", function() {
                d = {}
                d[name] = this.value
                callback(d,update)
            });
        }
    }

    // Append select element to target
    sel.appendChild(select);
    target.appendChild(sel);

    if(defualt){
        select.value = defualt;
    }
}

updateInput = function(d,name=null){
    if(name){
        input[name] = Object.assign({}, input[name], d);
        updateSvg(name,createCard(input[name]));
    }
    output['output 1'] = applyRule(input,current_rule);
    updateSvg('output 1',createCard(output['output 1']));
}

updateSvg = function(name,svg){
    let card = document.getElementById(name);
    card.removeChild(card.querySelector("svg"));
    card.appendChild(svg);
}

updateRule = function(d){
    current_rule = d['Rules']
    displayRule(current_rule)
    updateInput({});
}

document.addEventListener('DOMContentLoaded', function () {
    output['output 1'] = applyRule(input,current_rule)
    displayInput(input)
    displayInput(output)
    displayRule(current_rule)

    let rlz = Object.fromEntries(Object.keys(rules).map( x => [x, rules[x]['name']]));
    let d = document.getElementById("ruleSelect");
    createSelect(rlz,'Rules', updateRule, d, current_rule)

});


