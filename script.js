const settingsBtn = document.getElementById("settings")
const settingsPanel = document.querySelector('.settings-panel')
const closeBtn = document.querySelector('.close-btn')
const settingsX = document.getElementById('x-btn')
const startBtn = document.getElementById('start')
const resetBtn = document.getElementById('reset')

const themeSettings = document.querySelector('.theme-settings-content')
const alertSettings = document.querySelector('.alert-settings-content')
const timerSettings = document.querySelector('.timer-settings-content')

const timerTab = document.getElementById('timer-tab')
const themeTab = document.getElementById('theme-tab')
const alertTab = document.getElementById('alerts-tab')

const themeSelect = document.querySelector('#theme-select')

const timeDisplay = document.getElementById('time-display')
const shortBreakLabel = document.getElementById('short-break')
const longBreakLabel = document.getElementById('long-break')
const pomodoroLabel = document.getElementById('pomodoro')

const pomodoroInput = document.getElementById('pomodoro-duration')
const shortBreakInput = document.getElementById('short-break-duration')
const longBreakInput = document.getElementById('long-break-duration')

const saveBtn = document.querySelector('.save-btn')
let curDuration = 'pomodoro'

let timerInterval = null
let isPaused = false
let remainingTime = 0
let endTime = 0

const resetAllBtn = document.querySelector('.reset-btn')


settingsBtn.addEventListener('click', () => {
	settingsPanel.classList.toggle('hidden')
})
closeBtn.addEventListener('click', () => {
    settingsPanel.classList.add('hidden')

})
settingsX.addEventListener('click', () => {
    settingsPanel.classList.add('hidden')
})

themeTab.addEventListener('click', () =>{
    alertSettings.classList.add('hidden')
    themeSettings.classList.remove('hidden')
    timerSettings.classList.add('hidden')

    themeTab.classList.add('active')
    timerTab.classList.remove('active')
    alertTab.classList.remove('active')
})
alertTab.addEventListener('click', () =>{
    alertSettings.classList.remove('hidden')
    themeSettings.classList.add('hidden')
    timerSettings.classList.add('hidden')

    themeTab.classList.remove('active')
    timerTab.classList.remove('active')
    alertTab.classList.add('active')
})
timerTab.addEventListener('click', () =>{
    alertSettings.classList.add('hidden')
    themeSettings.classList.add('hidden')
    timerSettings.classList.remove('hidden')

    themeTab.classList.remove('active')
    timerTab.classList.add('active')
    alertTab.classList.remove('active')
})

themeSelect.addEventListener('change', (e) => {
    const selectedTheme = e.target.value
    const imgPath = `assets/images/background/${selectedTheme}.jpg`

    document.body.style.backgroundImage = `url('${imgPath}')`
})

shortBreakLabel.addEventListener('click', () => {
    switchMode('short-break', shortBreakInput, 5)
})
longBreakLabel.addEventListener('click', () => {
    switchMode('long-break', longBreakInput, 15)
})
pomodoroLabel.addEventListener('click', () => {
    switchMode('pomodoro', pomodoroInput, 25)
})

function switchMode(mode, input, defaultVal) {
    if(timerInterval && !isPaused) {
        const confirmSwitch = confirm("Switching modes will reset the current timer. Continue?")
        if(!confirmSwitch) return
        clearInterval(timerInterval)
        timerInterval = null
        isPaused = false
        remainingTime = 0
        endTime = 0
        startBtn.innerHTML = 'Start'
    }

    curDuration = mode
    const value = parseInt(input.value)
    const duration = isNaN(value) ? defaultVal : value
    timeDisplay.innerHTML = `${String(duration).padStart(2, '0')}:00`
    if(isNaN(value)) input.value = defaultVal
}

saveBtn.addEventListener('click', () => {
    settingsPanel.classList.add('hidden')

    let value;
    if(curDuration === 'pomodoro') {
        value = parseInt(pomodoroInput.value)
        timeDisplay.innerHTML = isNaN(value) ? '25:00': `${value}:00`
    } else if(curDuration === 'short-break') {
        value = parseInt(shortBreakInput.value)
        timeDisplay.innerHTML = isNaN(value) ? '5:00': `${value}:00`
    } else {
        value = parseInt(longBreakInput.value)
        timeDisplay.innerHTML = isNaN(value) ? '10:00': `${value}:00`
    }

})


startBtn.addEventListener('click', () => {

    startBtn.disabled = true;
    setTimeout(() => startBtn.disabled = false, 500);

    if (timerInterval && !isPaused) {
        clearInterval(timerInterval);
        remainingTime = endTime - new Date().getTime();
        isPaused = true;
        startBtn.textContent = 'Resume';
        return;
    }

    // RESUME
    if (isPaused) {
        endTime = new Date().getTime() + remainingTime;
        startBtn.textContent = 'Pause';
        timerInterval = startTimer(endTime);
        isPaused = false;
        return;
    }

    let durationMinutes;
    if (curDuration === 'pomodoro') {
        durationMinutes = Math.max(1, parseInt(pomodoroInput.value) || 25);
    } else if (curDuration === 'short-break') {
        durationMinutes = Math.max(1, parseInt(shortBreakInput.value) || 5);
    } else if (curDuration === 'long-break') {
        durationMinutes = Math.max(1, parseInt(longBreakInput.value) || 15);
    }

    endTime = new Date().getTime() + durationMinutes * 60 * 1000;
    startBtn.textContent = 'Pause';
    timerInterval = startTimer(endTime);
    
})

function startTimer(endTime){
    if (timerInterval) clearInterval(timerInterval);

    return setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(timerInterval)
                timeDisplay.innerHTML = '00:00'
                console.log('timer over')
                timerInterval = null
                isPaused = false
                startBtn.innerHTML = 'Start'
                return
            }
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const formattedMinutes = String(minutes).padStart(2,'0')
            const formattedSeconds = String(seconds).padStart(2,'0')

            timeDisplay.innerHTML = `${formattedMinutes}:${formattedSeconds}`
    
    }, 1000)
}

resetAllBtn.addEventListener('click', () => {
    resetSettings()
})

function resetSettings() {
    pomodoroInput.value = 25
    shortBreakInput.value = 5
    longBreakInput.value = 15
    if(curDuration === 'pomodoro') {
        timeDisplay.innerHTML = String(pomodoroInput.value).padStart(2, '0') + ':00';
    } else if(curDuration === 'short-break') {
        timeDisplay.innerHTML = String(shortBreakInput.value).padStart(2, '0') + ':00';

    } else {
        timeDisplay.innerHTML = String(longBreakInput.value).padStart(2, '0') + ':00';

    }

    themeSelect.value = 'Ocean-Sunrise';
    document.body.style.backgroundImage = `url('assets/images/background/Ocean-Sunrise.jpg')`
    
}

resetBtn.addEventListener('click', () => {
    
})