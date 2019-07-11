'use strict';
(function () {

    window.addEventListener('DOMContentLoaded', window.timerUtils.startTimer);

    window.getArrayOfRandomNumber = function (number) {
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
    window.arrayOfRandomNumber = window.getArrayOfRandomNumber();

    window.questionElems = document.querySelectorAll('.question');
    window.questionElems = Array.prototype.slice.call(window.questionElems);


    window.getQuestionElem = function () {
        window.questionElems.forEach(function (element, index) {
            element.textContent = arrayOfRandomNumber[index];
        })
    };
    window.getQuestionElem();





})();