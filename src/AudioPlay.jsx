import React, { useState, useEffect } from "react";
import buttonStyling from "./style-btn.scss";
import { secondsToMinutes, minutesToSeconds } from "./utilities.js";
import "./loading-bar.scss";
import LoadingBarComponent from "./LoadingBarComponent";

var a;

const AudioPlay = () => {
  const [buttonName, setButtonName] = useState("▶");
  const [audio, setAudio] = useState();
  const [durationTime, setDurationTime] = useState("");
  const [songTime, setSongTime] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (a) {
      a.pause();
      a = null;
      setButtonName("▶");
    }
    if (audio) {
      a = new Audio(audio);
      a.onended = () => {
        setButtonName("⏸");
      };
    }
  }, [audio]);

  const handleClick = () => {
    if (a !== undefined) {
      setDurationTime(secondsToMinutes(a.duration));
      setInterval(() => setSongTime(secondsToMinutes(a.currentTime)), 1000);
      if (buttonName === "▶") {
        a.play();
        setButtonName("⏸");
      } else {
        a.pause();
        setButtonName("▶");
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px"
        }}
      >
        <p>{songTime}</p>
        <LoadingBarComponent
          songTime={minutesToSeconds(songTime)}
          durationTime={minutesToSeconds(durationTime)}
        />
        <p>{durationTime}</p>
      </div>
      <h5 style={{ color: "red" }}>{error}</h5>
    </div>
  );
};

export default AudioPlay;
