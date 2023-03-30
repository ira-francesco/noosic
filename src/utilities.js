export const secondsToMinutes = (seconds) => {
    let minutes = seconds / 60;
    return `${Math.round(minutes)}:${pad(Math.round(seconds % 60), 2)}`;
  };
  
  const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  };
  