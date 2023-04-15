import containerStyling from "./song-styling.scss";
import { removeDuplicates, removeExtension } from "./utilities.js";
const WrapperContainer = ({ songArray, setAudio, setSongTitle }) => {
  let newSongArray = removeDuplicates(songArray);

  return (
    <div className="WrapperContainer" style={{ containerStyling }}>
      {newSongArray.map((item, i) => (
        <div
          onClick={(e) => {
            setAudio(
              URL.createObjectURL(
                newSongArray.find(
                  (element) =>
                    removeExtension(element.name) === e.target.innerText
                ).source
              )
            );
            setSongTitle(removeExtension(e.target.innerText));
          }}
          key={i}
        >
          {removeExtension(item.name)}
        </div>
      ))}
    </div>
  );
};

export default WrapperContainer;
