const versions = [
  {path: "master", text: "Upcoming version", selected: false },
  {path: "", text: "v0.6 Latest", selected: false },
  {path: "v0.5", text: "v0.5", selected: true },
  {path: "v0.4", text: "v0.4", selected: false },
  {path: "v0.3", text: "v0.3", selected: false },
  {path: "v0.2", text: "v0.2", selected: false },
];

  
// Material theme

function addMaterialMenu(elt, versions) {
  const current = versions.find(function (value) {
      return value.selected
  })

  const rootLi = document.createElement('li');
  rootLi.classList.add('md-nav__item');
  rootLi.classList.add('md-nav__item--version');
  rootLi.classList.add('md-nav__item--nested');

  const input = document.createElement('input');
  input.classList.add('md-toggle');
  input.classList.add('md-nav__toggle');
  input.setAttribute('data-md-toggle', 'nav-10000000');
  input.id = "nav-10000000";
  input.type = 'checkbox';

  rootLi.appendChild(input);

  const lbl01 = document.createElement('label')
  lbl01.classList.add('md-nav__link');
  lbl01.setAttribute('for', 'nav-10000000');
  lbl01.textContent = current.text + " ";

  rootLi.appendChild(lbl01);

  const nav = document.createElement('nav')
  nav.classList.add('md-nav');
  nav.setAttribute('data-md-component','collapsible');
  nav.setAttribute('data-md-level','1');

  rootLi.appendChild(nav);

  const lbl02 = document.createElement('label')
  lbl02.classList.add('md-nav__title');
  lbl02.setAttribute('for', 'nav-10000000');
  lbl02.textContent = current.text + " ";

  nav.appendChild(lbl02);

  const ul = document.createElement('ul')
  ul.classList.add('md-nav__list');
  ul.setAttribute('data-md-scrollfix','');

  nav.appendChild(ul);

  for (let i = 0; i < versions.length; i++) {
    const li = document.createElement('li');
    li.classList.add('md-nav__item');

    ul.appendChild(li);

    const a = document.createElement('a');
    a.classList.add('md-nav__link');
    if (versions[i].selected) {
      a.classList.add('md-nav__link--active');
    }
    a.href = window.location.protocol + "//" + window.location.host + "/";
    if (window.location.host.includes(".github.io")) {
      a.href = a.href + window.location.pathname.split("/")[1] + "/";
    }
    if (versions[i].path) {
      a.href = a.href + versions[i].path + "/"
    }
    a.title = versions[i].text;
    a.text = versions[i].text;

    li.appendChild(a);
  }

  elt.appendChild(rootLi);
}

// United theme

function addMenu(elt, versions){
  const li = document.createElement('li');
  li.classList.add('md-nav__item');
  li.style.cssText = 'padding-top: 1em;';

  const select = document.createElement('select');
  select.classList.add('md-nav__link');
  select.style.cssText = 'background: white;border: none;color: #00BCD4;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;overflow: hidden;padding: 0.1em;'
  select.setAttribute('onchange', 'location = this.options[this.selectedIndex].value;');

  for (let i = 0; i < versions.length; i++) {
    let opt = document.createElement('option');
    opt.value = window.location.protocol + "//" + window.location.host + "/";
    if (versions[i].path) {
        opt.value = opt.value + versions[i].path + "/"
    }
    opt.text = versions[i].text;
    opt.selected = versions[i].selected;
    select.appendChild(opt);
  }

  li.appendChild(select);
  elt.appendChild(li);
}


const unitedSelector = 'div.navbar.navbar-default.navbar-fixed-top div.container div.navbar-collapse.collapse ul.nav.navbar-nav.navbar-right';
const materialSelector = 'div.md-container main.md-main div.md-main__inner.md-grid div.md-sidebar.md-sidebar--primary div.md-sidebar__scrollwrap div.md-sidebar__inner nav.md-nav.md-nav--primary ul.md-nav__list';

let elt = document.querySelector(materialSelector);
if (elt) {
    addMaterialMenu(elt, versions);
} else {
    const elt = document.querySelector(unitedSelector);
    addMenu(elt, versions);
}