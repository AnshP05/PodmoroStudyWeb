
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

const lightModeThemeSelect = document.getElementById('light-mode-theme-select')
const darkModeThemeSelect = document.getElementById('dark-mode-theme-select')
const darkModeSelect = document.getElementById('darkMode-select')
let isDarkMode = false

const timeDisplay = document.getElementById('time-display')
const shortBreakLabel = document.getElementById('short-break')
const longBreakLabel = document.getElementById('long-break')
const pomodoroLabel = document.getElementById('pomodoro')
const pomodoroLabelEl = document.querySelector('label[for="pomodoro"]');
const shortBreakLabelEl = document.querySelector('label[for="short-break"]');
const longBreakLabelEl = document.querySelector('label[for="long-break"]');

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

const radius = 140;
const circumference = 2 * Math.PI * radius;
const progressRing = document.getElementById('progress-ring')
const progressCircle = document.querySelector('.progress-circle')
const progressCircleBackground = document.querySelector('.progress-background')
progressCircle.style.strokeDasharray = circumference
progressCircle.style.strokeDashoffset = 0

const toggleAlertsBtn = document.getElementById('toggle-alerts')
let alertsOn = true

const playlist = [
    {
        title:'Chill lofi study music',
        artist: 'lofidreams99',
        file: 'assets/music/Chill lofi study music.mp3',
        cover:'assets/images/spotify/placeholder2.jpg'
    }, 
    {
        title:'Flamenco',
        artist: 'vividillustrate',
        file: 'assets/music/Flamenco.mp3',
        cover:'assets/images/spotify/placeholder2.jpg'
    }, 
    {
        title:'Lofi Study Beat 1',
        artist: 'officeMIKADO',
        file: 'assets/music/Lofi Study Beat 1.mp3',
        cover:'assets/images/spotify/placeholder2.jpg'
    },
    {
        title:'Lofi Study Beat 2',
        artist: 'officeMIKADO',
        file: 'assets/music/Lofi Study Beat 2.mp3',
        cover:'assets/images/spotify/placeholder2.jpg'
    },
    {
        title:'Lofi Study Beat 5',
        artist: 'officeMIKADO',
        file: 'assets/music/Lofi Study Beat 5.mp3',
        cover:'assets/images/spotify/placeholder2.jpg'
    },
    {
        title:'Lofi Study Beat 8',
        artist: 'officeMIKADO',
        file: 'assets/music/Lofi Study Beat 8.mp3',
        cover:'assets/images/spotify/placeholder2.jpg'
    },
    {
        title:'Lofi Study Beat 16',
        artist: 'officeMIKADO',
        file: 'assets/music/Lofi Study Beat 16.mp3',
        cover:'assets/images/spotify/placeholder2.jpg'
    },
    {
        title:'Lofi Study Beat 24',
        artist: 'officeMIKADO',
        file: 'assets/music/Lofi Study Beat 24.mp3',
        cover:'assets/images/spotify/placeholder2.jpg'
    }
    
]
const audio = document.getElementById('audio-player')
const progressBar = document.getElementById('custom-progress-bar')
const progressContainer = document.getElementById('custom-progress-container')
const coverImg = document.querySelector(".cover-art")
const songTitle = document.getElementById("track-title")
const songArtist = document.getElementById("track-artist")
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
let currentTrack = 0
let playPauseBtn = document.getElementById('play')
let isPlaying = false
let recentlySaved = false
let curPomodoroTimer = 25
let curShortBreakTimer = 5
let curLongBreakTimer = 15
let curTheme = 'Ocean-Sunrise'
let lastSavedPomodoro = curPomodoroTimer
let lastSavedShortBreak = curShortBreakTimer
let lastSavedLongBreak = curLongBreakTimer
let lastSavedTheme = lightModeThemeSelect.value
let lastSavedLightTheme = lightModeThemeSelect.value
let lastSavedDarkTheme = darkModeThemeSelect.value
let lastSavedIsDarkMode = isDarkMode
loadTrack(currentTrack)

settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('hidden')
    recentlySaved = false


    lastSavedPomodoro = curPomodoroTimer
    lastSavedShortBreak = curShortBreakTimer
    lastSavedLongBreak = curLongBreakTimer
    lastSavedDarkTheme = darkModeThemeSelect.value
    lastSavedLightTheme = lightModeThemeSelect.value
    lastSavedIsDarkMode = isDarkMode

    pomodoroInput.value = curPomodoroTimer
    shortBreakInput.value = curShortBreakTimer
    longBreakInput.value = curLongBreakTimer
    lightModeThemeSelect.value = curTheme || lastSavedLightTheme
    darkModeThemeSelect.value = lastSavedDarkTheme
})

function revertSettings() {
    pomodoroInput.value = lastSavedPomodoro
    shortBreakInput.value = lastSavedShortBreak
    longBreakInput.value = lastSavedLongBreak
    lightModeThemeSelect.value = lastSavedLightTheme
    darkModeThemeSelect.value = lastSavedDarkTheme

    if(isDarkMode !== lastSavedIsDarkMode) {
        isDarkMode = lastSavedIsDarkMode
        if(isDarkMode) {
            setDarkMode()
            darkModeSelect.classList.remove('fa-toggle-off')
            darkModeSelect.classList.add('fa-toggle-on')
        } else {
            unsetDarkMode()
            darkModeSelect.classList.add('fa-toggle-off')
            darkModeSelect.classList.remove('fa-toggle-on')
        }
    }

    const img = isDarkMode ? lastSavedDarkTheme : lastSavedLightTheme
    document.body.style.backgroundImage = `url('assets/images/background/${img}.jpg')`

    curPomodoroTimer = lastSavedPomodoro;
    curShortBreakTimer = lastSavedShortBreak;
    curLongBreakTimer = lastSavedLongBreak;
    curTheme = lastSavedTheme
}

closeBtn.addEventListener('click', () => {
    settingsPanel.classList.add('hidden')
    recentlySaved = false
    if (!recentlySaved) {revertSettings()}
})

settingsX.addEventListener('click', () => {
    settingsPanel.classList.add('hidden')
    recentlySaved = false
    if (!recentlySaved) {revertSettings()}

})
saveBtn.addEventListener('click', () => {

    curPomodoroTimer = parseInt(pomodoroInput.value)
    curShortBreakTimer = parseInt(shortBreakInput.value)
    curLongBreakTimer = parseInt(longBreakInput.value)
    curTheme = isDarkMode ? darkModeThemeSelect.value : lightModeThemeSelect.value
    lastSavedPomodoro = curPomodoroTimer
    lastSavedShortBreak = curShortBreakTimer
    lastSavedLongBreak = curLongBreakTimer
    lastSavedDarkTheme = darkModeThemeSelect.value
    lastSavedLightTheme = lightModeThemeSelect.value
    lastSavedIsDarkMode = isDarkMode
    recentlySaved = true

    if(timerInterval){
        clearInterval(timerInterval)
        timerInterval = null
        isPaused = false
        endTime = 0
        remainingTime = 0
        startBtn.innerHTML = 'Start'
    }

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

    const img = curTheme
    document.body.style.backgroundImage = `url('assets/images/background/${img}.jpg')`

})

themeTab.addEventListener('click', () =>{
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'))
    document.querySelectorAll('.settings-section').forEach(sec => sec.classList.remove('active'))
    themeTab.classList.add('active')
    themeSettings.classList.add('active')
})
alertTab.addEventListener('click', () =>{
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'))
    document.querySelectorAll('.settings-section').forEach(sec => sec.classList.remove('active'))
    alertTab.classList.add('active')
    alertSettings.classList.add('active')
})
timerTab.addEventListener('click', () =>{
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'))
    document.querySelectorAll('.settings-section').forEach(sec => sec.classList.remove('active'))
    timerTab.classList.add('active')
    timerSettings.classList.add('active')
})

lightModeThemeSelect.addEventListener('change', (e) => {
    if(isDarkMode) return
    const selectedTheme = e.target.value
    const imgPath = `assets/images/background/${selectedTheme}.jpg`

    document.body.style.backgroundImage = `url('${imgPath}')`
})

darkModeThemeSelect.addEventListener('change', (e) => {
    if(!isDarkMode) return
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


function setActiveLabel(mode) {
    pomodoroLabel.classList.remove('active-mode')
    shortBreakLabel.classList.remove('active-mode')
    longBreakLabel.classList.remove('active-mode')

    if (curDuration === 'pomodoro') pomodoroLabel.classList.add('active-mode');
    if (curDuration === 'short-break') shortBreakLabel.classList.add('active-mode');
    if (curDuration === 'long-break') longBreakLabel.classList.add('active-mode');
} 

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
    setActiveLabel(mode)
}



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
    timerInterval = startTimer(endTime, durationMinutes);
    
})

function startTimer(endTime, durationMinutes){
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

            const totalTime = endTime - (endTime - durationMinutes * 60 * 1000)
            updateProgressRing(distance, totalTime)
    
    }, 1000)
}

resetAllBtn.addEventListener('click', () => {
    resetSettings()
})

function resetSettings() {

    if(timerInterval){
        clearInterval(timerInterval)
        timerInterval = null
        isPaused = false
        endTime = 0
        remainingTime = 0
        startBtn.innerHTML = 'Start'
    }


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

    lightModeThemeSelect.value = 'Ocean-Sunrise';
    document.body.style.backgroundImage = `url('assets/images/background/Ocean-Sunrise.jpg')`
    
}

resetBtn.addEventListener('click', () => {
    resetBtn.classList.add('rotate-once')

    resetBtn.addEventListener('animationend', () => {
        resetBtn.classList.remove('rotate-once');
    }, { once: true });
    if(timerInterval){
        clearInterval(timerInterval)
        timerInterval = null
        isPaused = false
        endTime = 0
        remainingTime = 0
        startBtn.innerHTML = 'Start'
    }
    resetTimer()
})

function resetTimer() {
    updateProgressRing(1,1)
    if(curDuration === 'pomodoro') {
        timeDisplay.innerHTML = String(pomodoroInput.value).padStart(2, '0') + ':00'
    } else if(curDuration === 'short-break') {
        timeDisplay.innerHTML = String(shortBreakInput.value).padStart(2, '0') + ':00'

    } else {
        timeDisplay.innerHTML = String(longBreakInput.value).padStart(2, '0') + ':00'
    }
}

audio.addEventListener('timeupdate', () => {
    if(!audio.duration) return
    const percent = (audio.currentTime / audio.duration) * 100
    progressBar.style.width = `${percent}%`
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    document.getElementById('current-time').textContent = formatTime(audio.currentTime);
    document.getElementById('duration').textContent = formatTime(audio.duration);
})

function updateProgressRing(timeLeft, totalTime) {
    if (totalTime === 0) {
        progressCircle.style.strokeDashoffset = 0;
        return;
    }
    const percent = timeLeft / totalTime
    const offset = circumference * (1-percent)
    progressCircle.style.strokeDashoffset = offset
}

progressContainer.addEventListener('click', (e) =>{
    const rect = progressContainer.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x / rect.width
    audio.currentTime = percent * audio.duration
    audio.play()
})

function loadTrack(index) {
    const track = playlist[index]
    audio.src = track.file
    coverImg.src = track.cover
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
}


audio.addEventListener('play', () => {
    playPauseBtn.classList.remove('fa-play');
    playPauseBtn.classList.add('fa-pause');
    isPlaying = true;
});

audio.addEventListener('pause', () => {
    playPauseBtn.classList.remove('fa-pause');
    playPauseBtn.classList.add('fa-play');
    isPlaying = false;
});

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

prevBtn.addEventListener('click', () => {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length
        loadTrack(currentTrack)
        audio.play()
})

nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlist.length
    loadTrack(currentTrack)
    audio.play()
})

toggleAlertsBtn.addEventListener('click', () => {
    if(alertsOn){
        toggleAlertsBtn.classList.remove('fa-toggle-on')
        toggleAlertsBtn.classList.add('fa-toggle-off')
        alertsOn = false
    } else {
        toggleAlertsBtn.classList.add('fa-toggle-on')
        toggleAlertsBtn.classList.remove('fa-toggle-off')
        alertsOn = true
    }

    toggleAlertsBtn.classList.add('animate')
    setTimeout(() => toggleAlertsBtn.classList.remove('animate'), 200)
        
})

darkModeSelect.addEventListener('click', () => {
    isDarkMode = !isDarkMode
    if(isDarkMode){
        darkModeSelect.classList.remove('fa-toggle-off')
        darkModeSelect.classList.add('fa-toggle-on')
        setDarkMode()
    } else {
        darkModeSelect.classList.add('fa-toggle-off')
        darkModeSelect.classList.remove('fa-toggle-on')
        unsetDarkMode()
    }
    darkModeSelect.classList.add('animate')
    setTimeout(() => darkModeSelect.classList.remove('animate'), 200)
})



function setDarkMode() {
    startBtn.classList.add('dark-mode')
    saveBtn.classList.add('dark-mode')
    resetBtn.classList.add('dark-mode')
    closeBtn.classList.add('dark-mode')
    progressCircle.classList.add('dark-mode')
    progressCircleBackground.classList.add('dark-mode')
    pomodoroLabelEl.classList.add('dark-mode')
    shortBreakLabelEl.classList.add('dark-mode')
    longBreakLabelEl.classList.add('dark-mode')
    timeDisplay.classList.add('dark-mode')
    settingsPanel.classList.add('dark-mode')
    const img = darkModeThemeSelect.value
    document.body.style.backgroundImage = `url('assets/images/background/${img}.jpg')` 
}

function unsetDarkMode() {
    startBtn.classList.remove('dark-mode')
    saveBtn.classList.remove('dark-mode')
    resetBtn.classList.remove('dark-mode')
    closeBtn.classList.remove('dark-mode')
    progressCircle.classList.remove('dark-mode')
    progressCircleBackground.classList.remove('dark-mode')
    pomodoroLabelEl.classList.remove('dark-mode')
    shortBreakLabelEl.classList.remove('dark-mode')
    longBreakLabelEl.classList.remove('dark-mode')
    timeDisplay.classList.remove('dark-mode')
    settingsPanel.classList.remove('dark-mode')
    const img = lightModeThemeSelect.value
    document.body.style.backgroundImage = `url('assets/images/background/${img}.jpg')`
}

const expandBtn = document.getElementById('expand');

expandBtn.addEventListener('click', () => {
    // Use the documentElement for full page, or a specific container if you want
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { // Safari
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE11
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE11
            document.msExitFullscreen();
        }
    }
});