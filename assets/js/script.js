// Function to calculate the missing value (distance, pace, or time)

function calculateValues(distance, pace, time) {
    let calculatedDistance = null;
    let calculatedPace = null;
    let calculatedTime = null;
    
    if (distance && pace && !time) {
    const paceInSeconds = pace.minutes * 60 + pace.seconds;
    calculatedTime = distance * paceInSeconds;
    } else if (time && pace && !distance) {
    const paceInSeconds = pace.minutes * 60 + pace.seconds;
    calculatedDistance = time / paceInSeconds;
    } else if (distance && time && !pace) {
    const paceInSeconds = time / distance;
    calculatedPace = {
    minutes: Math.floor(paceInSeconds / 60),
    seconds: Math.round(paceInSeconds % 60),
    };
    }
    
    return {
    distance: calculatedDistance,
    pace: calculatedPace,
    time: calculatedTime,
    };
    }

    // Function to help convert time to hours, minutes, and seconds

function convertTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);
    return { hours, minutes, seconds };
    }

// Event listener for the calculate button

document.getElementById('calculate').addEventListener('click', function () {
const distance = parseFloat(document.getElementById('distance').value) || null;
const paceInput = document.getElementById('pace').value.split(':');
const timeInput = document.getElementById('time').value.split(':');

const pace = paceInput.length === 2 ? { minutes: parseInt(paceInput[0]), seconds: parseInt(paceInput[1]) } : null;
const time = timeInput.length === 3 ? (parseInt(timeInput[0]) * 3600) + (parseInt(timeInput[1]) * 60) + parseInt(timeInput[2]) : null;

const values = calculateValues(distance, pace, time);
const calculatedTime = values.time ? convertTime(values.time) : null;
