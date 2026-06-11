let elems = ['a', 'b', 'c'];
let pairs = new Set();

function upSet(x) {
  const s = new Set();
  for (const p of pairs) {
    const [a, b] = p.split(',');
    if (a === x) s.add(b);
  }
  return s;
}

function downSet(x) {
  const s = new Set();
  for (const p of pairs) {
    const [a, b] = p.split(',');
    if (b === x) s.add(a);
  }
  return s;
}

function isSubset(s1, s2) {
  for (const v of s1) if (!s2.has(v)) return false;
  return true;
}

function computeLeniency() {
  const up = {}, down = {};
  for (const x of elems) {
    up[x] = upSet(x);
    down[x] = downSet(x);
  }
  const result = new Set();
  for (const a of elems) {
    for (const b of elems) {
      let ok = true;
      for (const c of down[a]) {
        if (!isSubset(up[b], up[c])) { ok = false; break; }
      }
      if (ok) result.add(a + ',' + b);
    }
  }
  return result;
}

function canonicalRepresentation() {
  const up = {}, down = {};
  for (const x of elems) { up[x] = upSet(x); down[x] = downSet(x); }

  const v = {}, f = {};
  for (const a of elems) {
    v[a] = down[a]; // m(a)
    f[a] = new Set();
    for (const z of elems) {
      if (!isSubset(up[a], up[z])) f[a].add(z);
    }
  }
  return { v, f };
}

function renderStateSpace() {
  const table = document.getElementById('statespace');
  table.innerHTML = '';

  const { v, f } = canonicalRepresentation();

  const headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));
  for (const w of elems) {
    const th = document.createElement('th');
    th.textContent = 'w_' + w;
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  for (const a of elems) {
    const row = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = a;
    row.appendChild(th);

    for (const w of elems) {
      const td = document.createElement('td');
      const inV = v[a].has(w);
      const inF = f[a].has(w);
      if (inV && inF) {
        td.classList.add('cell-vf');
        td.textContent = 'v,f';
      } else if (inV) {
        td.classList.add('cell-v');
        td.textContent = 'v';
      } else if (inF) {
        td.classList.add('cell-f');
        td.textContent = 'f';
      } else {
        td.classList.add('cell-n');
      }
      row.appendChild(td);
    }
    table.appendChild(row);
  }
}

function render() {
  const left = document.getElementById('left');
  const right = document.getElementById('right');
  left.innerHTML = '';
  right.innerHTML = '';

  const lenient = computeLeniency();

  for (const tbl of [left, right]) {
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th'));
    for (const e of elems) {
      const th = document.createElement('th');
      th.textContent = e;
      headerRow.appendChild(th);
    }
    tbl.appendChild(headerRow);
  }

  for (const r of elems) {
    const lrow = document.createElement('tr');
    const rrow = document.createElement('tr');

    const lh = document.createElement('th');
    lh.textContent = r;
    lrow.appendChild(lh);

    const rh = document.createElement('th');
    rh.textContent = r;
    rrow.appendChild(rh);

    for (const c of elems) {
      const key = r + ',' + c;

      const td = document.createElement('td');
      if (pairs.has(key)) {
        td.classList.add('active');
        td.textContent = '\u21D2';
      }
      td.onclick = () => {
        if (pairs.has(key)) pairs.delete(key);
        else pairs.add(key);
        render();
      };
      lrow.appendChild(td);

      const td2 = document.createElement('td');
      td2.classList.add('right-cell');
      if (lenient.has(key)) {
        td2.classList.add('active');
        td2.textContent = '\u2192';
      }
      rrow.appendChild(td2);
    }

    left.appendChild(lrow);
    right.appendChild(rrow);
  }

  renderStateSpace();
}

function applyElements() {
  const input = document.getElementById('elements').value;
  const newElems = input.split(',').map(s => s.trim()).filter(s => s.length > 0);
  if (newElems.length === 0) return;

  // remove pairs referencing elements that no longer exist
  const newSet = new Set(newElems);
  pairs = new Set([...pairs].filter(p => {
    const [a, b] = p.split(',');
    return newSet.has(a) && newSet.has(b);
  }));

  elems = newElems;
  render();
}

document.getElementById('apply').addEventListener('click', applyElements);

render();
