let timeLeft = 50 * 60; // Default 50 minutes
let timerId = null;
let previousTime = 50 * 60; // Track user's last set time, default to 50:00
let lastUpdateTime = null; // For background counting
let isAlarmPlaying = false; // Track alarm state
const timerDisplay = document.getElementById('timer');
const toggleBtn = document.getElementById('toggle-btn');
const resetBtn = document.getElementById('reset-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearTasksBtn = document.getElementById('clear-tasks-btn');
const modal = document.getElementById('time-modal');
const timeInput = document.getElementById('time-input');
const alarmSound = document.getElementById('alarm-sound');

toggleBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
clearTasksBtn.addEventListener('click', clearTasks);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && taskInput.value.trim()) {
        addTask(taskInput.value.trim());
        taskInput.value = '';
        if (!timerId) {
            startTimer();
            toggleBtn.textContent = 'Stop';
        }
        e.preventDefault();
    }
});

timeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setTime();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function startTimer() {
    if (!timerId) {
        lastUpdateTime = Date.now(); // Initial start time
        timerId = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - lastUpdateTime) / 1000); // Seconds elapsed
            if (elapsed > 0) {
                timeLeft = Math.max(timeLeft - elapsed, 0); // Adjust timeLeft
                lastUpdateTime = now; // Update last time
            }

            updateDisplay();

            if (timeLeft <= 10 && !timerDisplay.classList.contains('blink') && !timerDisplay.classList.contains('blink-intense')) {
                timerDisplay.classList.add('blink'); // Start regular blink
            }

            if (timeLeft <= 0 && !isAlarmPlaying) {
                clearInterval(timerId);
                timerId = null;
                toggleBtn.textContent = 'Start';
                completeTasks();
                timerDisplay.classList.remove('blink');
                timerDisplay.classList.add('blink-intense');
                isAlarmPlaying = true;
                alarmSound.play().catch(error => console.error('Alarm play failed:', error));
                setTimeout(() => {
                    alarmSound.pause();
                    alarmSound.currentTime = 0;
                    timeLeft = previousTime; // Reset to user-entered time
                    timerDisplay.classList.remove('blink-intense');
                    isAlarmPlaying = false;
                    updateDisplay();
                }, 5000); // 5 seconds
            }
        }, 100); // Check every 100ms for smoother updates
    }
}

function pauseTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        timerDisplay.classList.remove('blink');
        timerDisplay.classList.remove('blink-intense');
    }
}

function toggleTimer() {
    if (taskInput.value.trim() && !timerId) {
        addTask(taskInput.value.trim());
        taskInput.value = '';
        startTimer();
        toggleBtn.textContent = 'Stop';
    } else if (timerId) {
        pauseTimer();
        toggleBtn.textContent = 'Start';
    } else {
        startTimer();
        toggleBtn.textContent = 'Stop';
    }
}

function resetTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    timeLeft = 50 * 60;
    previousTime = 50 * 60;
    updateDisplay();
    toggleBtn.textContent = 'Start';
    timerDisplay.classList.remove('blink');
    timerDisplay.classList.remove('blink-intense');
    alarmSound.pause();
    alarmSound.currentTime = 0;
    isAlarmPlaying = false;
    lastUpdateTime = null;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showTimeModal() {
    timeInput.value = '00:00:00';
    modal.style.display = 'flex';
}

function setTime() {
    const [hours, minutes, seconds] = timeInput.value.split(':').map(Number);
    timeLeft = (hours * 3600) + (minutes * 60) + seconds;
    previousTime = timeLeft;
    updateDisplay();
    modal.style.display = 'none';
    if (timerId) {
        lastUpdateTime = Date.now(); // Reset lastUpdateTime if running
    } else {
        lastUpdateTime = null; // Reset if not running
    }
}

function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    li.onclick = () => {
        li.classList.toggle('completed');
    };
    taskList.appendChild(li);
}

function completeTasks() {
    const tasks = taskList.getElementsByTagName('li');
    for (let task of tasks) {
        if (!task.classList.contains('completed')) {
            task.classList.add('completed');
        }
    }
}

function clearTasks() {
    taskList.innerHTML = '';
}

// Initialize display
updateDisplay();