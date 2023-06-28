export const formatTimestamp = (timestamp) => {
  const dateObj = new Date(timestamp);
  const timezoneOffset = dateObj.getTimezoneOffset();
  const adjustedTimestamp = timestamp + timezoneOffset * 60 * 1000;
  const adjustedDateObj = new Date(adjustedTimestamp);

  const formattedDate = `${
    adjustedDateObj.getMonth() + 1
  }.${adjustedDateObj.getDate()}.${adjustedDateObj.getFullYear()}`;

  const formattedTime = adjustedDateObj
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .replace(/(AM|PM)/i, "");

  return {
    date: formattedDate,
    time: formattedTime,
  };
};
