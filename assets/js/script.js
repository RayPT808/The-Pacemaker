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