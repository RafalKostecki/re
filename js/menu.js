const menuModule = {
    _hamburger: document.querySelector('.hamburger'),
    _menuNav: document.querySelector('#menuNav'),

    run: function() {
        this._hamburger.addEventListener('click', () => menuModule.click())
    },
    click: function() {
        this._menuNav.classList.toggle('menu-visible');
        this._hamburger.classList.toggle('hamburger-active');
    }
}
menuModule.run();