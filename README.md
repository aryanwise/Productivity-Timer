# Productivity Timer

A simple web-based productivity timer app designed to help users manage tasks with a countdown timer. Built with HTML, CSS, and JavaScript, it features a dark greyish minimalist aesthetic.

## Features

- **Countdown Timer**: Set a custom time (default 50 minutes) via a modal, starts/stops with a toggle button, and resets to default or previous user-entered time.
  - **Blinking Effect**: Starts flashing (white to dark grey) continuously from 10 seconds remaining until `00:00`.
  - **Intense Blink**: At `00:00`, flashes intensely (white to brighter grey) for 5 seconds, resembling a "bomb about to explode."
  - **Alarm Sound**: Plays a soothing alarm tone for 5 seconds when the timer reaches `00:00`, then resets.
- **Task List**: Add tasks, automatically struck through when the timer finishes, and toggle strikethrough by clicking the task text.
- **Modal Controls**: Open with timer click, set time with "Enter" or "Set" button, close with "Escape" or click outside.
- **Clear Tasks**: Button to remove all tasks.

## How to Use

1. Open `index.html` in a browser.
2. Add a task in the input field and press "Enter" or "Start" to begin the timer.
3. Click the timer to set a custom duration (HH:MM:SS format).
4. Click "Stop" to pause, "Reset" for default (50:00), or "Clear" to remove tasks.
5. Click tasks to toggle completion status.
6. At 10 seconds, the timer blinks; at `00:00`, it blinks intensely and plays an alarm for 5 seconds before resetting.

## Files

- `index.html`: Main structure.
- `static/css/style.css`: Styling with greyish dark theme.
- `static/js/script.js`: Functionality and logic.
- `static/alarm.mp3`: Soothing alarm sound played at `00:00`.

## Note

This app is **not fully responsive yet** and is optimized only for screens **larger than 800px x 372px**. It is not designed for mobile devices or smaller screens at this time.

## Installation

1. Clone or download this repository.
2. Open `index.html` in a browser to run locally.

## Future Improvements

- Add responsiveness for mobile devices.
- Enhance task management features (e.g., edit, delete individual tasks).
