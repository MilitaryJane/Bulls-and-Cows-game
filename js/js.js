'use strict';

window.addEventListener('DOMContentLoaded', window.timerUtils.startTimer);


let questionElems = document.querySelectorAll('.question'); // исп. 3 раза (присвоение значений(2), проверка победы)
window.arrayOfRandomNumber = getArrayOfRandomNumber(); //получение текущего массива загаданных цифер должна быть глобальной


window.getQuestionElem = function () {
    for (let i = 0; i < questionElems.length; i++) {
        questionElems[i].textContent = arrayOfRandomNumber[i];
    }
};
window.getQuestionElem();





let countStep = 1;
let checkButton = document.querySelector('.check-button');
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
    if (inputValidation(window.answerElems, arrayOfRandomNumber)) {

        let answer = getArrayOfAnswer(window.answerElems);
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


        if (countStep < 16) {
            versions.appendChild(p);
            // } 
            // else if (countStep > 15 && countStep < 30) {
            //     versions2.appendChild(p);
        } else {
            alert('Вы сделали слишком много шагов. Начните Сначала!');
        }
        if (bulls == arrayOfRandomNumber.length) {
            for (let i = 0; i < questionElems.length; i++) {
                questionMask[i].classList.add('visually-hidden');
            }
            toShowvVictory();
            window.timerUtils.stopTimer();
        }
        countStep++;


        window.answerElems.forEach(function (element) {
            element.value = ''
        })
        window.answerElems[0].focus();
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