import React, { useState, useEffect } from "react";
import { secondsToMinutes } from "./utilities.js";

var a;
const AudioPlay = () => {
  const [buttonName, setButtonName] = useState("Play");
  const [audio, setAudio] = useState();
  const [durationTime, setDurationTime] = useState("");
  const [songTime, setSongTime] = useState("0:00");

  useEffect(() => {
    if (a) {
      a.pause();
      a = null;
      setButtonName("Play");
    }
    if (audio) {
      a = new Audio(audio);
      a.onended = () => {
        setButtonName("Play");
      };
    }
  }, [audio]);

  const handleClick = () => {
    setDurationTime(secondsToMinutes(a.duration));
    setInterval(() => setSongTime(secondsToMinutes(a.currentTime)), 1000);
    if (buttonName === "Play") {
      a.play();
      setButtonName("Pause");
    } else {
      a.pause();
      setButtonName("Play");
    }
  };

  const addFile = (e) => {
    if (e.target.files[0]) {
      setAudio(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{buttonName}</button>
      <input type="file" onChange={addFile} />
      <p>
        {songTime} {durationTime}
      </p>
    </div>
  );
};

export default AudioPlay;
