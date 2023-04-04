export const secondsToMinutes = (seconds) => {
  let minutes = seconds / 60;
  return `${Math.round(minutes)}:${pad(Math.round(seconds % 60), 2)}`;
};

export const minutesToSeconds = (value) => {
  let arr = value.split(":");
  return isNaN(value) ? Number(arr[0]) * 60 + Number(arr[1]) : 0;
};

const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
};

export const removeDuplicates = (arr) => {
  return arr.filter(
    (ele, ind) => ind === arr.findIndex((elem) => elem.name === ele.name)
  );
};
