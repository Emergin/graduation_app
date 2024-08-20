import React, { useState, useEffect } from "react";
import Gallery from "./components/Gallery";
import Message from "./components/Message";
import ChessBoard from "./components/ChessBoard"; // Import the ChessBoard component

function App() {
  const [currentScreen, setCurrentScreen] = useState("initial");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen("message");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const goToGallery = () => {
    setCurrentScreen("gallery");
  };

  const goToChessGame = () => {
    setCurrentScreen("game");
  };

  return (
    <div>
      {currentScreen === "initial" && (
        <main style={mainStyle}>
          <div style={congratsStyle}>
            <h1 style={h1Style}>Congratulations!</h1>
            <p style={pStyle}>This is a special message for you.</p>
          </div>
        </main>
      )}
      {currentScreen === "message" && <Message goToGallery={goToGallery} />}
      {currentScreen === "gallery" && <Gallery goToChessGame={goToChessGame} />}
      {currentScreen === "game" && <ChessBoard />}{" "}
      {/* Render ChessBoard component */}
    </div>
  );
}

const mainStyle = {
  textAlign: "center",
  padding: "1em",
  maxWidth: "240px",
  margin: "0 auto",
};

const congratsStyle = {
  textAlign: "center",
  marginTop: "20vh",
  padding: "20px",
  backgroundColor: "#f0f0f0",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const h1Style = {
  color: "#333",
  fontSize: "2.5rem",
  marginBottom: "10px",
};

const pStyle = {
  color: "#555",
  fontSize: "1.2rem",
};

export default App;
