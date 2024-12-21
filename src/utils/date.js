export const transformDate = (inputDate) => {
  // Parse the input date
  const parsedDate = new Date(inputDate);

  // Check if the date is valid
  if (isNaN(parsedDate)) {
    throw new Error("Invalid date format. Use 'DD MMM, YYYY' format.");
  }

  // Extract year, month, and day
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(parsedDate.getDate()).padStart(2, "0");

  // Return formatted date as "YYYY-MM-DD"
  return `${year}-${month}-${day}`;
};

export const calculateTimeDifference = (sentTime) => {
  // Get the current time and convert both to milliseconds
  const currentTime = new Date();
  const sentDate = new Date(sentTime);
  const timeDifference = currentTime - sentDate; // Time difference in milliseconds

  // Convert milliseconds to minutes
  const minutes = Math.floor(timeDifference / 60000);

  // If the time difference is less than 1 hour (60 minutes)
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  // Convert milliseconds to hours
  const hours = Math.floor(timeDifference / 3600000);

  // If the time difference is less than 24 hours
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  }

  // Convert milliseconds to days
  const days = Math.floor(timeDifference / 86400000);

  // Return the result in days
  return `${days} day${days !== 1 ? "s" : ""}`;
};
