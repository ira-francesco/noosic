import srcDefaultImage from "../src/image-folder/song_cover.png";

const ImageHolder = ({ srcImage }) => {
  return (
    <div
      className="ImageHolder"
      style={{
        backgroundImage: `url(${srcDefaultImage})`,
        backgroundColor: "#ccc",
        margin: "20px",
        width: "400px",
        height: "400px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    ></div>
  );
};

export default ImageHolder;
