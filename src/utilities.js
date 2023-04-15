export const secondsToMinutes = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const hours = Math.floor(time / 3600);
  time = time - hours * 3600;
  const finalTime = padTime(minutes, "0", 2) + ":" + padTime(seconds, "0", 2);
  return finalTime;
};

export const minutesToSeconds = (timeStr) => {
  const [minutes, seconds] = timeStr.split(":").map(Number);
  return minutes * 60 + seconds;
};

function padTime(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export const removeDuplicates = (arr) => {
  return arr.filter(
    (ele, ind) => ind === arr.findIndex((elem) => elem.name === ele.name)
  );
};

export const removeExtension = (file) => {
  return file.replace(/\.[^/.]+$/, "");
};