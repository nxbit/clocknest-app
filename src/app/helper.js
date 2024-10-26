// Function to format duration from seconds to HH:MM:SS format
export const formatDuration = (seconds) => {
    const totalSeconds = parseFloat(Number(seconds).toFixed(1));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = (totalSeconds % 60).toFixed(1);

    if (hours > 0) {
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${remainingSeconds}s`;
    } else {
        return `${remainingSeconds}s`;
    }
};

// Function to format the time as a string
export const formatTime = (date) => {
    const hours = date.getHours() % 12 || 12; // Convert 24-hour time to 12-hour time
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero to minutes
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Add leading zero to seconds
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    return `${hours}:${minutes}:${seconds} ${ampm}`; // Return formatted time string
};