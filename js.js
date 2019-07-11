'use strict';



window.addEventListener('DOMContentLoaded', window.timerUtils.startTimer);

let questionElems = document.querySelectorAll('.question'); // исп. 3 раза (присвоение значений(2), проверка победы)
questionElems = Array.prototype.slice.call(questionElems);
window.arrayOfRandomNumber = getArrayOfRandomNumber(); //получение текущего массива загаданных цифер должна быть глобальной

window.getQuestionElem = function () {
    questionElems.forEach(function (element, index) {
        element.textContent = arrayOfRandomNumber[index];
    })
};
window.getQuestionElem();


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