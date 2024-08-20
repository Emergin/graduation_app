import React from "react";

// Dynamically import all images and videos from the images folder inside src
const importAll = (r) => r.keys().map(r);
const mediaFiles = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg|mp4|webm|ogv)$/)
);

function Gallery({ goToChessGame }) {
  return (
    <main style={mainStyle}>
      <h1 style={h1Style}>Photo Gallery</h1>
      <div style={galleryStyle}>
        {mediaFiles.map((media, index) => {
          const isVideo =
            media.endsWith(".mp4") ||
            media.endsWith(".webm") ||
            media.endsWith(".ogv");
          return (
            <div key={index} style={imageContainerStyle}>
              {isVideo ? (
                <video controls style={mediaStyle}>
                  <source
                    src={media}
                    type={`video/${media.split(".").pop()}`}
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={media} alt={`Gallery ${index}`} style={mediaStyle} />
              )}
            </div>
          );
        })}
      </div>
      <button onClick={goToChessGame} style={mazeButtonStyle}>
        Play Game
      </button>
    </main>
  );
}

const mainStyle = {
  padding: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const h1Style = {
  textAlign: "center",
  color: "#333",
  marginBottom: "20px",
};

const galleryStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
};

const imageContainerStyle = {
  overflow: "hidden",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const mediaStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease",
};

mediaStyle[":hover"] = {
  transform: "scale(1.05)",
};

const mazeButtonStyle = {
  display: "inline-block",
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
  transition: "background-color 0.3s",
  border: "none",
  cursor: "pointer",
};

mazeButtonStyle[":hover"] = {
  backgroundColor: "#218838",
};

export default Gallery;
