// Модуль управления игровыми кнопками
(function () {
    window.answerElems = document.querySelectorAll('.answer');
    window.answerElems = Array.prototype.slice.call(window.answerElems);
    let plusButtonElems = document.querySelectorAll('.button-plus');
    let minusButtonElems = document.querySelectorAll('.button-minus');
    let keyboard = document.querySelectorAll('.keyboard');
    keyboard = Array.prototype.slice.call(keyboard);
    let self = document.activeElement;

    window.answerElems.forEach(function (element) {
        element.addEventListener('click', function (evt) {
            evt.preventDefault();
            element.value = '';
        });
        element.addEventListener('focus', function (evt) {
            evt.preventDefault();
            this.addEventListener('keypress', function (evt) {
                evt.preventDefault();
                if (evt.keyCode >= 48 && evt.keyCode <= 57 || evt.keyCode >= 96 && evt.keyCode <= 105) {
                    this.value = String.fromCharCode(evt.keyCode);

                }
            });
            self = evt.target;
        });
    })

    keyboard.forEach(function (element) {
        element.addEventListener('click', function (evt) {
            evt.preventDefault();
            self.value = this.getAttribute('data-type');
            (function transferFocus() {
                let currentIndex = window.answerElems.indexOf(self);
                if (currentIndex + 1 < arrayOfRandomNumber.length) {
                    window.answerElems[currentIndex + 1].focus();
                } else {
                    checkButton.focus();
                }
            })();
        });
    })

    for (let j = 0; j < window.answerElems.length; j++) {
        plusButtonElems[j].addEventListener('click', function (event) {
            event.preventDefault();
            if (+window.answerElems[j].value < 9) {
                window.answerElems[j].value = +window.answerElems[j].value + 1;
            } else {
                window.answerElems[j].value = 0;
            }
        });
        minusButtonElems[j].addEventListener('click', function (event) {
            event.preventDefault();
            if (+window.answerElems[j].value > 0) {
                window.answerElems[j].value = +window.answerElems[j].value - 1;
            } else {
                window.answerElems[j].value = 9;
            }
        });
    }
})();