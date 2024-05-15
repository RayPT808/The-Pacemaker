'use strict';

// Function to validate input
function isValidInput(input) {
    // Define the regex patterns for each input

    var distancePattern = /^\d+(\.\d+)?$/; // Numbers with optional decimal
    var pacePattern = /^([0-5]?[0-9]):([0-5]?[0-9])$/; // MM:SS format, 00-59 for both minutes and seconds
    var timePattern = /^([0-9]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/; // HH:MM:SS format, 00-59 for minutes and seconds

    // Check if the input matches the corresponding pattern and is not negative
    var isValid = {
        distance: input.distance === '' || (distancePattern.test(input.distance) && parseFloat(input.distance) >= 0),
        pace: input.pace === '' || pacePattern.test(input.pace),
        time: input.time === '' || timePattern.test(input.time)
    };

    // Additional checks for non-numeric and negative values
    if (input.distance !== '' && (!distancePattern.test(input.distance) || parseFloat(input.distance) < 0)) {
        isValid.distance = false;
    }

    if (input.pace !== '' && !pacePattern.test(input.pace)) {
        isValid.pace = false;
    }

    if (input.time !== '' && !timePattern.test(input.time)) {
        isValid.time = false;
    }

    return isValid;
}

// Event listener for the calculate button
document.getElementById('calculate').addEventListener('click', function () {
    // Get the input values
    var distanceInput = document.getElementById('distance').value;
    var paceInput = document.getElementById('pace').value;
    var timeInput = document.getElementById('time').value;

    // Validate the input
    var inputIsValid = isValidInput({ distance: distanceInput, pace: paceInput, time: timeInput });

    // Count the number of valid and non-empty inputs
    var validInputsCount = 0;
    var inputFields = ['distance', 'pace', 'time'];
    inputFields.forEach(function (field) {
        if (inputIsValid[field] && document.getElementById(field).value !== '') {
            validInputsCount++;
        }
    });

    // Construct an error message based on invalid inputs
    var errorMessage = '';
    inputFields.forEach(function (field) {
        if (!inputIsValid[field] && document.getElementById(field).value !== '') {
            errorMessage += 'Invalid ' + field.charAt(0).toUpperCase() + field.slice(1) + '. ';
        }
    });

    // If less than two inputs are valid and non-empty, display an error message and return
    if (validInputsCount < 2) {
        alert('Hold on! ' + errorMessage.trim() + 'Let us find the correct values first before you run away.');
        return;
    }

});


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
            seconds: Math.round(paceInSeconds % 60)
        };
    }

    return {
        distance: calculatedDistance,
        pace: calculatedPace,
        time: calculatedTime
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
    const time = timeInput.length === 3 ? parseInt(timeInput[0]) * 3600 + parseInt(timeInput[1]) * 60 + parseInt(timeInput[2]) : null;

    const values = calculateValues(distance, pace, time);
    const calculatedTime = values.time ? convertTime(values.time) : null;

    // Display of the results

    document.getElementById('resultDistance').textContent = values.distance ? `${values.distance.toFixed(2)} kilometers` : 'Enter Pace and Time to calculate Distance';
    document.getElementById('resultPace').textContent = values.pace ? `${values.pace.minutes}:${values.pace.seconds.toString().padStart(2, '0')} per kilometer` : 'Enter Distance and Time to calculate Pace';
    document.getElementById('resultTime').textContent = calculatedTime ? `${calculatedTime.hours.toString().padStart(2, '0')}h ${calculatedTime.minutes.toString().padStart(2, '0')}m ${calculatedTime.seconds.toString().padStart(2, '0')}s` : 'Enter Distance and Pace to calculate Time';
});

// Event listener for the reset button

document.getElementById('reset').addEventListener('click', function () {
    document.getElementById('distance').value = '';
    document.getElementById('pace').value = '';
    document.getElementById('time').value = '';
    document.getElementById('resultDistance').textContent = 'Distance will be shown here';
    document.getElementById('resultPace').textContent = 'Pace will be shown here';
    document.getElementById('resultTime').textContent = 'Time will be shown here';
});