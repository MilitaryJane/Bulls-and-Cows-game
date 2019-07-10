//модуль управления модальным окном "Правила игры"
(function () {
    const ESC_KEYCODE = 27;

    let rules = document.querySelector('.rules');
    let modalRules = document.querySelector('.modal-rules');
    let buttonRulesClose = modalRules.querySelector('.button-close');
    let buttonStartRulesModal = modalRules.querySelector('.new-start-button');

    function onPopupEscPress(evt) {
        if (evt.keyCode === ESC_KEYCODE) {
            closeRules(evt);
        }
    };

    function closeRules(evt) {
        evt.preventDefault();
        modalRules.classList.remove('modal-show');
        window.overlayUtils.overlayHide();
        document.removeEventListener('keydown', onPopupEscPress);
    }

    function openRules(evt) {
        evt.preventDefault();
        modalRules.classList.add('modal-show');
        window.overlayUtils.overlayShow();
        buttonStartRulesModal.focus();

        document.addEventListener('keydown', onPopupEscPress);
    }

    rules.addEventListener('click', openRules);
    buttonRulesClose.addEventListener('click', closeRules);
})();