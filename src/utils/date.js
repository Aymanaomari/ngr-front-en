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
