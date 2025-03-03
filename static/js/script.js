let timeLeft = 50 * 60; // Default 50 minutes
let timerId = null;
let previousTime = 50 * 60; // Track user's last set time, default to 50:00
const timerDisplay = document.getElementById('timer');
const toggleBtn = document.getElementById('toggle-btn');
const resetBtn = document.getElementById('reset-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearTasksBtn = document.getElementById('clear-tasks-btn');
const modal = document.getElementById('time-modal');
const timeInput = document.getElementById('time-input');

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

// Modal event listeners
timeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setTime(); // Set time on Enter
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none'; // Close modal on Escape
    }
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'; // Close modal on click outside
    }
});

function startTimer() {
    timerId = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            toggleBtn.textContent = 'Start';
            completeTasks();
            timeLeft = previousTime;
            updateDisplay();
            return;
        }
        timeLeft--;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
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
    pauseTimer();
    timeLeft = 50 * 60;
    previousTime = 50 * 60;
    updateDisplay();
    toggleBtn.textContent = 'Start';
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
}

function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    li.onclick = () => {
        li.classList.toggle('completed'); // Toggle strikethrough on click
    };
    taskList.appendChild(li);
}

function completeTasks() {
    const tasks = taskList.getElementsByTagName('li');
    for (let task of tasks) {
        if (!task.classList.contains('completed')) {
            task.classList.add('completed'); // Strikethrough when timer ends
        }
    }
}

function clearTasks() {
    taskList.innerHTML = '';
}

// Initialize display
updateDisplay();