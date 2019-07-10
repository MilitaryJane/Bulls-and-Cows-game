//Модуль отображает и скрывает оверлей
(function () {
    let overlay = document.querySelector('.modal-overlay');

    window.overlayUtils = {
        overlayShow: function () {
            overlay.classList.add('overlay-show');
        },
        overlayHide: function () {
            overlay.classList.remove('overlay-show');
        }
    }
})();