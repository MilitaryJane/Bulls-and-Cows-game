(function () {
    const ESC_KEYCODE = 27;
    let victory = document.querySelector('.modal-victory');
    let questNumber = document.querySelector('.quest-number');
    let playTime = victory.querySelector('.play-time');
    let playMoovs = victory.querySelector('.play-moovs');
    let buttonStartVictoryModal = victory.querySelector('.new-start-button');
    let buttonVictoryClose = victory.querySelector('.button-close');






    window.toShowvVictory = function () {
        openVictory();
        questNumber.textContent = arrayOfRandomNumber.join(' ');
        playTime.textContent = window.timerUtils.timeTranslater();
        playMoovs.textContent = window.countStep;

        victory.classList.add('modal-show');
        window.overlayUtils.overlayShow();



        window.checkButton.removeEventListener('click', window.runCheck);
    }

    function onPopupEscPress(evt) {
        if (evt.keyCode === ESC_KEYCODE) {
            closeVictory(evt);
        }
    };

    function closeVictory(evt) {
        evt.preventDefault();
        victory.classList.remove('modal-show');
        window.overlayUtils.overlayHide();
        document.removeEventListener('keydown', onPopupEscPress);
    }

    function openVictory() {
        victory.classList.add('modal-show');
        window.overlayUtils.overlayShow();
        buttonStartVictoryModal.focus();

        document.addEventListener('keydown', onPopupEscPress);
    }


    buttonVictoryClose.addEventListener('click', closeVictory);

})();