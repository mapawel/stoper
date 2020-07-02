const btns = document.querySelectorAll('.buttons button');
const stopwatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.time-list');
const info = document.querySelector('.info');
const modal = document.querySelector('.modal-shadow');
const closeModalBtn = document.querySelector('.close');
let timer;
let minutes
let seconds
let millis
let measerement = 0
let timesArr = []
let timeStart
let timeChec
let paused = false;
let timeRun = 0
let prevTimeCheck;
let nr = 1;

const dozens = (figure) => figure > 9 ? '' + figure : '0' + figure;
const thousands = (figure) => {
    if (figure > 99) return '' + figure;
    else if (figure > 9) return '0' + figure;
    else return '00' + figure;
}

class Time {
    constructor(m, s, ms, nr) {
        this.minutes = m;
        this.seconds = s;
        this.millis = ms;
        this.nr = nr;
    }
}

const start = () => {
    btns[0].removeEventListener('click', addEvents)

    timeStart = new Date().getTime()

    timer = setInterval(() => {
        timeCheck = new Date().getTime()
        paused ? (timeRun = (timeCheck - timeStart + prevTimeCheck)) : timeRun = timeCheck - timeStart
        let tempTime = moment.duration(timeRun);
        minutes = tempTime.minutes();
        seconds = tempTime.seconds();
        millis = tempTime.milliseconds();
        stopwatch.innerText = `${dozens(minutes)}:${dozens(seconds)}:${thousands(millis)}`;
    }, 1);
}

const pause = () => {
    btns[0].addEventListener('click', addEvents)
    clearInterval(timer)
    paused = true;
    prevTimeCheck = timeRun

}

const archiveTime = () => {
    const liInner = `
    <p>Pomiar nr ${timesArr.length}</p>
    <span>${timesArr[timesArr.length-1].minutes}:${timesArr[timesArr.length-1].seconds}:${timesArr[timesArr.length-1].millis}</span>
    `
    const li = document.createElement('li');
    timeList.appendChild(li);
    li.innerHTML = liInner;
}

const stop = () => {
    if (stopwatch.innerText != '00:00:000') {
        btns[0].addEventListener('click', addEvents)
        paused = false;
        timesArr.push(new Time(dozens(minutes), dozens(seconds), thousands(millis), nr));
        clearInterval(timer)
        time.style.visibility = 'visible';
        time.innerText = `${timesArr[timesArr.length -1].minutes}:${timesArr[timesArr.length -1].seconds}:${timesArr[timesArr.length -1].millis}`;
        archiveTime();
        stopwatch.innerText = `00:00:000`
        nr++;
    }
}

const reset = () => {
    btns[0].addEventListener('click', addEvents)
    paused = false;
    clearInterval(timer)
    time.style.visibility = 'hidden';
    stopwatch.innerText = `00:00:000`;
    timesArr = [];
    timeList.innerHTML = ''
}

const history = () => {
    timeList.classList.toggle('show')
}

const showModal = () => {
    modal.style.display = 'block';
    modal.classList.add('modal-animation');
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
}


function addEvents() {
    eval(this.getAttribute('class'))();
}

btns.forEach(btn => btn.addEventListener('click', addEvents));
info.addEventListener('click', showModal)