import React, { useState, useEffect } from "react";
import "./loading-bar.scss";
const LoadingBarComponent = ({ songTime, durationTime }) => {
  let percentage = ((durationTime / 100) * songTime).toString() + "%";
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