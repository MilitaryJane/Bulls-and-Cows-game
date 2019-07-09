'use strict';

let rules = document.querySelector('.rules');
let modalRules = document.querySelector('.modal-rules');
let overlay = document.querySelector('.modal-overlay');
let buttonRulesClose = modalRules.querySelector('.button-close');
let buttonStart = document.querySelectorAll('.new-start-button');



rules.addEventListener('click', function (event) {
    event.preventDefault();
    modalRules.classList.add('modal-rules-show');
    overlay.classList.add('overlay-show');
    buttonStart[1].focus();
});

buttonRulesClose.addEventListener('click', function (event) {
    event.preventDefault();
    modalRules.classList.remove('modal-rules-show');
    overlay.classList.remove('overlay-show');
});

window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
        if (modalRules.classList.contains('modal-rules-show')) {
            event.preventDefault();
            modalRules.classList.remove('modal-rules-show');
            overlay.classList.remove('overlay-show');
        }
    }
});





let questionElems = document.querySelectorAll('.question');
let radios = document.querySelectorAll('.complexity');
let complexity2 = document.querySelectorAll('.complexity2');
let complexity3 = document.querySelectorAll('.complexity3');


let arrayOfRandomNumber = getArrayOfRandomNumber(getChecked().value);


function getChecked() {
    let checked;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            checked = radios[i];
        }
    }
    return checked;
}

let modalWarning = document.querySelector('.modal-warning');

let currentCheckedElem = getChecked();


for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', openWarningModal)
}


function openWarningModal() {
    modalWarning.classList.add('modal-warning-show');
    overlay.classList.add('overlay-show');
}


let buttonOk = modalWarning.querySelector('.button-ok');
let buttonCancel = modalWarning.querySelector('.button-cancel');
buttonOk.addEventListener('click', IsConfirmChange);
buttonCancel.addEventListener('click', IsConfirmChange);

function IsConfirmChange(evt) {
    evt.preventDefault();
    (function closeWarningModal() {
        modalWarning.classList.remove('modal-warning-show');
        overlay.classList.remove('overlay-show');

    })();

    if (this.value == "true") {
        currentCheckedElem = getChecked();
        createElement();
        arrayOfRandomNumber = getArrayOfRandomNumber(getChecked().value);
        getQuestionElem();
        answerElems[0].focus();
        (function () {
            for (let i = 0; i < questionMask.length; i++) {
                if (questionMask[i].classList.contains('visually-hidden')) {
                    questionMask[i].classList.remove('visually-hidden');
                }
            }
            checkButton.addEventListener('click', runCheck);
        })();

    } else {
        currentCheckedElem.checked = true;
    };
}




function createElement() {
    let resultsElems = document.querySelectorAll('.result');
    for (let i = 0; i < resultsElems.length; i++) {
        resultsElems[i].textContent = '';
    }
    for (let i = 0; i < complexity2.length; i++) {
        complexity2[i].classList.add('complexity2');
        complexity3[i].classList.add('complexity3');
        countStep = 1;


        if (getChecked().value == 5) {
            complexity2[i].classList.remove('complexity2');


        } else if (getChecked().value == 6) {
            complexity2[i].classList.remove('complexity2');
            complexity3[i].classList.remove('complexity3');
        }
    }
}





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
let buttonVictoryClose = victory.querySelector('.button-close');
buttonVictoryClose.addEventListener('click', function (event) {
    event.preventDefault();
    victory.classList.remove('modal-victory-show');
    overlay.classList.remove('overlay-show');
});

window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
        if (victory.classList.contains('modal-victory-show')) {
            event.preventDefault();
            victory.classList.remove('modal-victory-show');
            overlay.classList.remove('overlay-show');
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
            stopTaimer();
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

function toShowvVictory() {
    questNumber.textContent = arrayOfRandomNumber.join(' ');
    playMoovs.textContent = countStep;
    victory.classList.add('modal-victory-show');
    overlay.classList.add('overlay-show');
    buttonStart[0].focus();
    checkButton.removeEventListener('click', runCheck);

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

function isNumeric(num) {
    return isNaN(parseFloat(num)) && isFinite(n);
}



function getArrayOfAnswer(array) {
    let userArray = [];
    for (let i = 0; i < arrayOfRandomNumber.length; i++) {
        userArray.push(array[i].value);
    }
    return userArray;
}



function getArrayOfRandomNumber(number) {
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





window.addEventListener('load', startTimer);

let id;
let time = 0;

function startTimer() {
    id = setInterval(function () {
        time++;
    }, 1000);
}

function stopTaimer() {
    clearInterval(id);
    timeTranslater();
}

function timeTranslater() {
    let hour = 0;
    let minute = 0;
    let second = 0;
    hour = Math.floor(time / 3600);
    minute = Math.floor(time % 3600 / 60);
    second = (time % 3600) % 60;
    playTime.textContent = addZero(hour) + ":" + addZero(minute) + ":" + addZero(second);

}

function addZero(num) {
    if (num <= 9) {
        num = '0' + num;
    }
    return num;
}