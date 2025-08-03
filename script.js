const settingsBtn = document.getElementById("settings")
const settingsPanel = document.querySelector('.settings-panel')
const closeBtn = document.querySelector('.close-btn')
const settingsX = document.getElementById('x-btn')
const startBtn = document.getElementById('start')

const themeSettings = document.querySelector('.theme-settings-content')
const alertSettings = document.querySelector('.alert-settings-content')
const timerSettings = document.querySelector('.timer-settings-content')

const timerTab = document.getElementById('timer-tab')
const themeTab = document.getElementById('theme-tab')
const alertTab = document.getElementById('alerts-tab')

const themeSelect = document.querySelector('.theme-dropdown')

const timeDisplay = document.getElementById('time-display')
const shortBreakLabel = document.getElementById('short-break')
const longBreakLabel = document.getElementById('long-break')
const pomodoroLabel = document.getElementById('pomodoro')

const pomodoroInput = document.getElementById('pomodoro-duration')
const shortBreakInput = document.getElementById('short-break-duration')
const longBreakInput = document.getElementById('long-break-duration')

const saveBtn = document.querySelector('.save-btn')
let curDuration = 'pomodoro'

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
    const value = parseInt(shortBreakInput.value)
    timeDisplay.innerHTML = isNaN(value) ? '5:00': `${value}:00`
    curDuration = 'short-break'
})
longBreakLabel.addEventListener('click', () => {
    const value = parseInt(longBreakInput.value)
    timeDisplay.innerHTML = isNaN(value) ? '15:00': `${value}:00`
    curDuration = 'long-break'
})
pomodoroLabel.addEventListener('click', () => {
    const value = parseInt(pomodoroInput.value)
    timeDisplay.innerHTML = isNaN(value) ? '25:00': `${value}:00`
    curDuration = 'pomodoro'
})

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
    let durationMinutes;
    if (curDuration === 'pomodoro') {
        durationMinutes = parseInt(pomodoroInput.value) || 25;
    } else if (curDuration === 'short-break') {
        durationMinutes = parseInt(shortBreakInput.value) || 5;
    } else if (curDuration === 'long-break') {
        durationMinutes = parseInt(longBreakInput.value) || 10;
    }

    const endTime = new Date(new Date().getTime() + durationMinutes * 60 * 1000)

    timeDisplay.innerHTML = `${String(durationMinutes).padStart(2, '0')}:00`

    const x = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(x)
                timeDisplay.innerHTML = '00:00'
                console.log('timer over')
                return
            }
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const formattedMinutes = String(minutes).padStart(2,'0')
            const formattedSeconds = String(seconds).padStart(2,'0')

            timeDisplay.innerHTML = `${formattedMinutes}:${formattedSeconds}`
    
    }, 1000)
})
