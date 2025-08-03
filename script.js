const settingsBtn = document.getElementById("settings")
const settingsPanel = document.querySelector('.settings-panel')
const closeBtn = document.querySelector('.close-btn')
const settingsX = document.getElementById('x-btn')

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
    timeDisplay.innerHTML = '5:00'
})
longBreakLabel.addEventListener('click', () => {
    timeDisplay.innerHTML = '10:00'
})
pomodoroLabel.addEventListener('click', () => {
    timeDisplay.innerHTML = '25:00'
})