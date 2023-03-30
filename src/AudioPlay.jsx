import React, { useState, useEffect } from "react";
import buttonStyling from "./style-btn.scss";
import { secondsToMinutes } from "./utilities.js";
import "./styles.css";

var a;
const AudioPlay = () => {
  const [buttonName, setButtonName] = useState("Play");
  const [audio, setAudio] = useState();
  const [durationTime, setDurationTime] = useState("");
  const [songTime, setSongTime] = useState("0:00");
  const [error, setError] = useState("");

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
    if (a !== undefined) {
      setDurationTime(secondsToMinutes(a.duration));
      setInterval(() => setSongTime(secondsToMinutes(a.currentTime)), 1000);
      if (buttonName === "Play") {
        a.play();
        setButtonName("Pause");
      } else {
        a.pause();
        setButtonName("Play");
      }
      setError("");
    } else {
      setError("File not found!");
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
      <h5 style={{ color: "red" }}>{error}</h5>
    </div>
  );
};

export default AudioPlay;
