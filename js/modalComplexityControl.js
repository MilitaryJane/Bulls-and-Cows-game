//управление сложностью
(function () {
    let radios = document.querySelectorAll('.complexity');
    radios = Array.prototype.slice.call(radios);

    radios.forEach(function (element) {
        element.addEventListener('change', openWarningModal);
    })

    function getChecked() {
        let checked;
        radios.forEach(function (element) {
            if (element.checked) {
                checked = element;
            }
        })
        return checked;
    }

    let modalWarning = document.querySelector('.modal-warning');

    function openWarningModal() {
        modalWarning.classList.add('modal-show');
        window.overlayUtils.overlayShow();
    }

    let currentCheckedElem = getChecked();
    let buttonOk = modalWarning.querySelector('.button-ok');
    let buttonCancel = modalWarning.querySelector('.button-cancel');

    buttonOk.addEventListener('click', IsConfirmChange);
    buttonCancel.addEventListener('click', IsConfirmChange);

    function IsConfirmChange(evt) {
        evt.preventDefault();

        (function closeWarningModal() {
            modalWarning.classList.remove('modal-show');
            window.overlayUtils.overlayHide();

        })();

        if (this.value == "true") {
            currentCheckedElem = getChecked();
            createElement();
            window.arrayOfRandomNumber = getArrayOfRandomNumber(getChecked().value);
            window.getQuestionElem();
            answerElems[0].focus();

            //функция перезапуска игры
            (function () {
                for (let i = 0; i < questionMask.length; i++) {
                    if (questionMask[i].classList.contains('visually-hidden')) {
                        questionMask[i].classList.remove('visually-hidden');
                    }
                }
                checkButton.addEventListener('click', runCheck);
                window.timerUtils.startTimer();

            })();
        }
        currentCheckedElem.checked = true;
    }

    let complexityFun = document.querySelectorAll('.complexity2');
    let complexityProfi = document.querySelectorAll('.complexity3');

    function createElement() {
        let resultsElems = document.querySelectorAll('.result');
        for (let i = 0; i < resultsElems.length; i++) {
            resultsElems[i].textContent = '';
        }
        for (let i = 0; i < complexityFun.length; i++) {
            complexityFun[i].classList.add('complexity2');
            complexityProfi[i].classList.add('complexity3');
            countStep = 1;

            if (getChecked().value == 5) {
                complexityFun[i].classList.remove('complexity2');

            } else if (getChecked().value == 6) {
                complexityFun[i].classList.remove('complexity2');
                complexityProfi[i].classList.remove('complexity3');
            }
        }
    }
})();