import React, { useState, useEffect } from "react";
import buttonStyling from "./style-btn.scss";
import {
  secondsToMinutes,
  minutesToSeconds,
  removeExtension
} from "./utilities.js";
import "./loading-bar.scss";
import LoadingBarComponent from "./LoadingBarComponent";
import WrapperContainer from "./WrapperContainer";
import ImageHolder from "./ImageHolder";
import playButton from "../src/image-folder/play.png";
import pauseButton from "../src/image-folder/pause.png";
import uploadButton from "../src/image-folder/pause.png";
import "../src/label-styling.scss";

var a;

const AudioPlay = () => {
  const [buttonName, setButtonName] = useState(playButton);
  const [audio, setAudio] = useState();
  const [durationTime, setDurationTime] = useState("");
  const [songTime, setSongTime] = useState("");
  const [error, setError] = useState("");
  const [songArray, setSongArray] = useState([]);
  const [songTitle, setSongTitle] = useState("");

  useEffect(() => {
    document.body.style.fontFamily = "sans-serif";
    document.body.style.padding = "20px";
    document.body.style.margin = "20px";
    if (a) {
      a.pause();
      a = null;
      setButtonName(playButton);
    }
    if (audio) {
      a = new Audio(audio);
      a.onended = () => {
        setButtonName(pauseButton);
      };
    }
  }, [audio]);

  const handleClick = () => {
    if (a !== undefined) {
      setDurationTime(secondsToMinutes(Math.round(a.duration)));
      setInterval(
        () => setSongTime(secondsToMinutes(Math.round(a.currentTime))),
        1000
      );
      if (buttonName === playButton) {
        a.play();
        setButtonName(pauseButton);
      } else {
        a.pause();
        setButtonName(playButton);
      }
      setError("");
    } else {
      setError("File not found!");
    }
  };

  async function addFile(e) {
    let FILE = e.target.files[0];
    if (FILE) {
      setSongArray((songArray) => [
        ...songArray,
        {
          name: FILE.name,
          source: FILE
        }
      ]);
      setAudio(URL.createObjectURL(FILE));
      setSongTitle(e.target.files[0].name);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1>{songTitle}</h1>
      <input
        type="file"
        style={{ color: "#ffffff00" }}
        onChange={addFile}
        accept={".pcm, .wav, .aiff, .mp3, .acc, .ogg, .wma, .flac, .alac"}
        hidden
        id="upload-file"
      />

      <ImageHolder />
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

      <img
        src={buttonName}
        onClick={handleClick}
        style={{
          width: "30px",
          height: "30px"
        }}
        alt={"play-btn"}
      />
      <h5 style={{ color: "red" }}>{error}</h5>
      <WrapperContainer
        setAudio={setAudio}
        songArray={songArray}
        setSongTitle={setSongTitle}
      />
      <label htmlFor="upload-file">
        <img src={uploadButton} alt={"upload-file"} />
      </label>
    </div>
  );
};

export default AudioPlay;
