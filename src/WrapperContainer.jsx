import React, { useState, useEffect } from "react";
import containerStyling from "./song-styling.scss";
import { removeDuplicates } from "./utilities.js";
const WrapperContainer = ({ songArray }) => {
  let pp = removeDuplicates(songArray);

  return (
    <div className="WrapperContainer" style={{ containerStyling }}>
      {pp.map((item, i) => (
        <div
          onClick={(e) =>
            pp.find((element) => element.name === e.target.innerText)
          }
          key={i}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default WrapperContainer;
