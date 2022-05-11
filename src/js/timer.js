$(document).ready(function () {
    let milliSeconds = 0;
    let seconds = 0;
    let minutes = 0;
    let timerID = 0;
    let lapIndex = 0;
    let isRun = false;

    function checkMilliSeconds() {
        if (milliSeconds === 10) {
            milliSeconds = 0;
            seconds++;
        }
    }

    function checkSeconds() {
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
    }

    function checkMinutes() {
        if (minutes === 60) {
            alert('Time Up!');
            window.location.reload();
        }
    }

    function updateTimer() {
        $('.timerHeader').text(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliSeconds.toString().padStart(2, '0')}`);
    }

    function lapTimer() {
        lapIndex++;
        let lap = `
        <div class="lap" id="lap${lapIndex}">
            <p id="lapTime">
                ${lapIndex}. ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliSeconds.toString().padStart(2, '0')}
            </p>
            <div class="deleteLap" id="lapCleaner${lapIndex}">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
        `;
        $('.timerLaps').append(lap);
        deleteLap(`#lap${lapIndex}`, `#lapCleaner${lapIndex}`);
    }

    function deleteLap(lapElement, lapCleanerId) {
        $(lapCleanerId).on('click', function () {
            $(lapElement).fadeOut(300, function () {
                $(lapElement).remove();
            })
        })
    }

    function startTimer() {
        if (!isRun) {
            let timer = setInterval(() => {
                milliSeconds++;
                checkMilliSeconds();
                checkSeconds();
                checkMinutes();
                updateTimer();
            }, 100);
            timerID = timer;
            isRun = true;
        }
    }

    function stopTimer() {
        clearInterval(timerID);
        isRun = false;
    }

    function resetTimer() {
        milliSeconds = 0;
        seconds = 0;
        minutes = 0;
        lapIndex = 0;
        isRun = false;
        clearInterval(timerID);
        updateTimer();
        $('.timerLaps').html('');
    }

    $('#startTimer').on('click', startTimer);
    $('#stopTimer').on('click', stopTimer);
    $('#resetTimer').on('click', resetTimer);
    $('#lapTimer').on('click', lapTimer);
});