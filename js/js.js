'use strict';

window.addEventListener('DOMContentLoaded', window.timerUtils.startTimer);


let questionElems = document.querySelectorAll('.question'); // исп. 3 раза (присвоение значений(2), проверка победы)
let arrayOfRandomNumber = getArrayOfRandomNumber(); //получение текущего массива загаданных цифер


getQuestionElem();

function getQuestionElem() {
    for (let i = 0; i < questionElems.length; i++) {
        questionElems[i].textContent = arrayOfRandomNumber[i];
    }
}




let countStep = 1;
let answerElems = document.querySelectorAll('.answer');
answerElems = Array.prototype.slice.call(answerElems);
let checkButton = document.querySelector('.check-button');
let plusButtonElems = document.querySelectorAll('.button-plus');
let minusButtonElems = document.querySelectorAll('.button-minus');
let keyboard = document.querySelectorAll('.keyboard');
let self = document.activeElement;



for (let j = 0; j < answerElems.length; j++) {
    answerElems[j].addEventListener('click', function (evt) {
        evt.preventDefault();
        answerElems[j].value = '';
    });

    answerElems[j].addEventListener('focus', function (evt) {
        evt.preventDefault();
        this.addEventListener('keypress', function (evt) {
            evt.preventDefault();
            if (evt.keyCode >= 48 && evt.keyCode <= 57 || evt.keyCode >= 96 && evt.keyCode <= 105) {
                this.value = String.fromCharCode(evt.keyCode);

            }


        });
        self = evt.target;
    });

}


for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        self.value = this.getAttribute('data-type');
        transferFocus();
    });
}

function transferFocus() {
    let currentIndex = answerElems.indexOf(self);
    if (currentIndex + 1 < arrayOfRandomNumber.length) {
        answerElems[currentIndex + 1].focus();
    } else {
        checkButton.focus();
    }
}

for (let j = 0; j < answerElems.length; j++) {
    plusButtonElems[j].addEventListener('click', function (event) {
        event.preventDefault();
        if (+answerElems[j].value < 9) {
            answerElems[j].value = +answerElems[j].value + 1;
        } else {
            answerElems[j].value = 0;
        }
    });
    minusButtonElems[j].addEventListener('click', function (event) {
        event.preventDefault();
        if (+answerElems[j].value > 0) {
            answerElems[j].value = +answerElems[j].value - 1;
        } else {
            answerElems[j].value = 9;
        }
    });
}




function getKeyboardNumber(evt) {
    evt.preventDefault();
    for (let i = 0; i < answerElems.length; i++) {
        if (answerElems[i].value == '') {
            answerElems[i].value = this.getAttribute('data-type');
            if (i + 1 < answerElems.length) {
                answerElems[i + 1].focus();
                break
            } else {
                checkButton.focus();
            }

        }
    }
}


checkButton.addEventListener('click', runCheck);

let victory = document.querySelector('.modal-victory');
let questNumber = document.querySelector('.quest-number');
let playTime = victory.querySelector('.play-time');
let playMoovs = victory.querySelector('.play-moovs');
let buttonStartVictoryModal = victory.querySelector('.new-start-button');
let buttonVictoryClose = victory.querySelector('.button-close');
buttonVictoryClose.addEventListener('click', function (event) {
    event.preventDefault();
    victory.classList.remove('modal-show');
    window.overlayUtils.overlayHide();
});

window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
        if (victory.classList.contains('modal-show')) {
            event.preventDefault();
            victory.classList.remove('modal-show');
            window.overlayUtils.overlayHide();
        }
    }
});


let questionMask = document.querySelectorAll('.question-mask');

function runCheck() {
    if (inputValidation(answerElems, arrayOfRandomNumber)) {

        let answer = getArrayOfAnswer(answerElems);
        let bulls = areBulls(answer, arrayOfRandomNumber);
        let cows = areCows(answer, arrayOfRandomNumber, bulls);


        let versions = document.querySelector('.versions');
        let versions2 = document.querySelector('.versions2');
        let p = document.createElement('p');
        p.classList.add('result');
        let countStepSpan = document.createElement('span');
        countStepSpan.classList.add('count-step-span');
        countStepSpan.textContent = countStep + '.';
        p.appendChild(countStepSpan);
        let answerVersoinSpan = document.createElement('span');
        answerVersoinSpan.classList.add('answer-version-span');
        answerVersoinSpan.textContent = answer.join(' ');
        p.appendChild(answerVersoinSpan);
        let bullsSpan = document.createElement('span');
        bullsSpan.classList.add('bulls-span');
        bullsSpan.textContent = 'быков: ' + bulls;
        p.appendChild(bullsSpan);
        let cowsSpan = document.createElement('span');
        cowsSpan.classList.add('cows-span');
        cowsSpan.textContent = ', коров: ' + cows;
        p.appendChild(cowsSpan);

        if (countStep < 16 || countStep > 30) {
            versions.appendChild(p);
        } else {
            versions2.appendChild(p);
        }
        if (bulls == arrayOfRandomNumber.length) {
            for (let i = 0; i < questionElems.length; i++) {
                questionMask[i].classList.add('visually-hidden');
            }
            toShowvVictory();
            window.timerUtils.stopTimer();
        }
        countStep++;

        for (let i = 0; i < answerElems.length; i++) {
            answerElems[i].value = '';
        }
        answerElems[0].focus();
    }
}

function areBulls(userArray, arrayOfRandomNumber) {
    let countBulls = 0;
    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i] == arrayOfRandomNumber[i]) {
            countBulls++;
        }
    }

    return countBulls;
}

function areCows(userArray, arrayOfRandomNumber, bulls) {
    let countCows = 0;
    for (let i = 0; i < userArray.length; i++) {
        for (let j = 0; j < arrayOfRandomNumber.length; j++) {
            if (arrayOfRandomNumber[j] == userArray[i]) {
                countCows++;
            }
        }
    }
    countCows -= bulls;
    return countCows;
}

function toShowvVictory() {
    questNumber.textContent = arrayOfRandomNumber.join(' ');
    playTime.textContent = window.timerUtils.timeTranslater();
    playMoovs.textContent = countStep;
    victory.classList.add('modal-show');
    window.overlayUtils.overlayShow();
    buttonStartVictoryModal.focus();
    checkButton.removeEventListener('click', runCheck);

}

//модуль проверки валидности вводимых данных
function inputValidation(array, array2) {
    for (let i = 0; i < array2.length; i++) {
        if (isNaN(+array[i].value)) {
            alert('Ошибка! В одну или несколько ячеек введено не число!');
            return false;
        }
        if (array[i].value == '' || array[i].value == ' ') {
            alert('Ошибка! Заполнены не все ячейки!');
            return false;
        }
    }
    for (let j = 0; j < array2.length - 1; j++) {
        for (let k = j + 1; k < array2.length; k++) {
            if (array[j].value == array[k].value) {
                alert('Ошибка! В некоторые ячейки введены одинаковые числа!');
                return false;
            }
        }
    }
    return true;
}




function getArrayOfAnswer(array) {
    let userArray = [];
    for (let i = 0; i < arrayOfRandomNumber.length; i++) {
        userArray.push(array[i].value);
    }
    return userArray;
}



function getArrayOfRandomNumber(number) {
    number = number || 4;
    let array = [];

    next:
        while (array.length < number) {
            let randomNumber = Math.floor(Math.random() * 10);
            let i = 0;
            while (i <= array.length - 1) {
                if (randomNumber == array[i]) {
                    continue next;
                }
                i++;
            }
            array.push(randomNumber);
        }
    console.log(array);
    return array;
}