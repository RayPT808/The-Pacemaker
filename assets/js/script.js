// Function to validate input
function isValidInput(input) {
    // Define the regex patterns for each input
    const distancePattern = /^\d+(\.\d+)?$/; // Numbers with optional decimal
    const pacePattern = /^\d{2}:\d{2}$/; // MM:SS format
    const timePattern = /^\d{2}:\d{2}:\d{2}$/; // HH:MM:SS format

    // Check if the input matches the corresponding pattern
    return {
        distance: distancePattern.test(input.distance),
        pace: pacePattern.test(input.pace),
        time: timePattern.test(input.time)
    };
}

// Event listener for the calculate button
document.getElementById('calculate').addEventListener('click', function () {
    // Get the input values
    const distanceInput = document.getElementById('distance').value;
    const paceInput = document.getElementById('pace').value;
    const timeInput = document.getElementById('time').value;

    // Validate the input
    const inputIsValid = isValidInput({ distance: distanceInput, pace: paceInput, time: timeInput });

    // If any input is invalid, display an error message and return
    if (!inputIsValid.distance || !inputIsValid.pace || !inputIsValid.time) {
        alert('Please enter valid values for Distance (numbers only), Pace (MM:SS), and Time (HH:MM:SS).');
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