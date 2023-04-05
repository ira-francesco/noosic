import React, { useState, useEffect } from "react";
import buttonStyling from "./style-btn.scss";
import {
  secondsToMinutes,
  minutesToSeconds,
  removeExtension
} from "./utilities.js";
import "./loading-bar.scss";
import LoadingBarComponent from "./LoadingBarComponent";
import SongWrapper from "./SongWrapper";
import WrapperContainer from "./WrapperContainer";

var a;

const AudioPlay = () => {
  const [buttonName, setButtonName] = useState("▶");
  const [audio, setAudio] = useState();
  const [durationTime, setDurationTime] = useState("");
  const [songTime, setSongTime] = useState("");
  const [error, setError] = useState("");
  const [songArray, setSongArray] = useState([]);
  const [songTitle, setSongTitle] = useState("");

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
      setSongArray((songArray) => [
        ...songArray,
        { name: e.target.files[0].name, source: e.target.files[0] }
      ]);
      setAudio(URL.createObjectURL(e.target.files[0]));
      setSongTitle(removeExtension(e.target.files[0].name));
    }
  };

  return (
    <div>
      <h1>{songTitle}</h1>
      <button onClick={handleClick}>{buttonName}</button>
      <input
        type="file"
        style={{ color: "#ffffff00" }}
        onChange={addFile}
        accept={".pcm, .wav, .aiff, .mp3, .acc, .ogg, .wma, .flac, .alac"}
      />
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
      <WrapperContainer
        setAudio={setAudio}
        songArray={songArray}
        durationTime={durationTime}
        setSongTitle={setSongTitle}
      />
    </div>
  );
};

export default AudioPlay;
