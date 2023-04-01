import React, { useState, useEffect } from "react";
import "./loading-bar.scss";
const LoadingBarComponent = ({ songTime, durationTime }) => {
  let percentage = ((songTime / durationTime) * 100).toString() + "%";
  console.log(percentage, songTime);
  console.log(durationTime);
  console.log(songTime);
  return (
    <div className="LoadingBarComponent">
      <div className={"loading-bar"}>
        <div
          className={"loading-component"}
          style={{ width: percentage }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingBarComponent;
