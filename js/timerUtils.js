//модуль таймера
(function () {
    let id;
    time = 0;

    function addZero(num) {
        if (num <= 9) {
            num = '0' + num;
        }
        return num;
    }

    window.timerUtils = {
        startTimer: function () {
            id = setInterval(function () {
                time++;
            }, 1000);
            return time;
        },
        stopTimer: function () {
            clearInterval(id);
        },
        timeTranslater: function () {
            let hour = Math.floor(time / 3600);
            let minute = Math.floor(time % 3600 / 60);
            let second = (time % 3600) % 60;
            time = 0;
            return addZero(hour) + ":" + addZero(minute) + ":" + addZero(second);
        }
    }

})();