import React from "react";

function Message({ goToGallery }) {
  const speakMessage = () => {
    const message =
      "Congratulations on your graduation, my dear friend! Your hard work, passion, and determination have led you to this incredible achievement. I'm so proud of you and excited for all the amazing things ahead!";
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main style={mainStyle}>
      <div style={messageContainerStyle}>
        <img
          src="https://floramoments.sg/cdn/shop/articles/Graduation-Flowers.jpg?v=1606457679"
          alt="Graduation flowers"
          style={imageStyle}
        />
        <h1 style={h1Style}>
          Congratulations on your graduation, my dear friend! Your hard work,
          passion, and determination have led you to this incredible
          achievement. I'm so proud of you and excited for all the amazing
          things ahead!
        </h1>
        <div style={buttonContainerStyle}>
          <button onClick={speakMessage} style={actionButtonStyle}>
            Hear Message
          </button>
          <button onClick={goToGallery} style={actionButtonStyle}>  
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}

const mainStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
};

const messageContainerStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "80%",
};

const imageStyle = {
  maxWidth: "100%",
  height: "auto",
  marginBottom: "20px",
  borderRadius: "5px",
};

const h1Style = {
  color: "#333",
  fontSize: "2rem",
  marginBottom: "20px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const actionButtonStyle = {
  padding: "10px 20px",
  fontSize: "1rem",
  color: "white",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

actionButtonStyle[":hover"] = {
  backgroundColor: "#0056b3",
};

export default Message;
