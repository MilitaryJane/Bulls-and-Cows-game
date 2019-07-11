(function () {
    window.checkButton = document.querySelector('.check-button');
    window.countStep = 1;
    let questionMask = document.querySelectorAll('.question-mask');

    window.runCheck = function () {
        if (inputValidation(window.answerElems, window.arrayOfRandomNumber)) {
            let answer = getArrayOfAnswer(window.answerElems);
            let bulls = areBulls(answer, window.arrayOfRandomNumber);
            let cows = areCows(answer, window.arrayOfRandomNumber, bulls);


            let versions = document.querySelector('.versions');
            let versions2 = document.querySelector('.versions2');

            let p = document.createElement('p');
            p.classList.add('result');

            let countStepSpan = document.createElement('span');
            countStepSpan.classList.add('count-step-span');
            countStepSpan.textContent = window.countStep + '.';
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

            if (window.countStep < 16) {
                versions.appendChild(p);
            } else if (window.countStep > 15 && window.countStep < 30) {
                versions2.appendChild(p);
            } else {
                alert('Вы сделали слишком много шагов. Начните Сначала!');
            }
            if (bulls == arrayOfRandomNumber.length) {
                for (let i = 0; i < window.questionElems.length; i++) {
                    questionMask[i].classList.add('visually-hidden');
                }
                window.toShowvVictory();
                window.timerUtils.stopTimer();
            }
            window.countStep++;

            window.answerElems.forEach(function (element) {
                element.value = ''
            })
            window.answerElems[0].focus();
        }
    }

    window.checkButton.addEventListener('click', window.runCheck);

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
})();