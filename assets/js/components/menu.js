let menu = document.getElementById('nav__menu');
function openCloseMenu() {
    document.getElementById('btn--menu').addEventListener('click', () => {
        menu.style.left === '-100%' ? menu.style.left = '0px' : menu.style.left = '-100%'
    })
    document.getElementById('btn--close').addEventListener('click', () => {
        menu.style.left = '-100%'
    })
}

let toggle = document.getElementById('toggle')
let label_toggle = document.getElementById('label_toggle')
toggle.addEventListener('click', (event) => {
    let cheked = event.target.cheked;
    document.body.classList.toggle('body-dark');

})
export {openCloseMenu}