import Popup from './Popup.js';

class BurgerMenu extends Popup {
  constructor() {
    super();

    this.burgerButton = document.querySelector('.icon-menu');
    this._isClosing = false;
  }

  /**
   * Initialize the menu functionality.
   */
  init() {
    if (this.burgerButton) {
      document.addEventListener('click', ({ target }) => {
        const isBurgerClick = !!target.closest('.icon-menu');
        const isMenuLinkClick = !!target.closest('.menu__link');

        if (isBurgerClick) {
          if (this.html.classList.contains('menu-open')) {
            this.menuClose();
          } else {
            this.menuOpen();
          }
        }

        // Закрываем меню при клике на пункт (мобилка)
        if (isMenuLinkClick && this.html.classList.contains('menu-open')) {
          this.menuClose();
        }
      });
    }
  }

  /**
   * Open the menu.
   */
  menuOpen() {
    this._isClosing = false;
    this.html.classList.remove('menu-closing');
    this.toggleBodyLock(true);
    this.html.classList.add('menu-open');
  }

  /**
   * Close the menu.
   */
  menuClose() {
    if (this._isClosing) return;
    this._isClosing = true;

    // 1) Моментально прячем список, чтобы не было "доезда" пунктов при закрытии
    this.html.classList.add('menu-closing');

    // 2) Запускаем закрытие контейнера (transform) в следующий кадр
    requestAnimationFrame(() => {
      this.html.classList.remove('menu-open');
    });

    // 3) Сразу разблокируем скролл (можно оставить так же как раньше)
    this.toggleBodyLock(false);

    // 4) Снимаем флаг закрытия после завершения transition
    window.setTimeout(() => {
      this.html.classList.remove('menu-closing');
      this._isClosing = false;
    }, 350);
  }
}

export default BurgerMenu;
