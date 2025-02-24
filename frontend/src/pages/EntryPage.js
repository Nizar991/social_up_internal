import React from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/EntryPage.css";

const EntryPage = () => {
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in:", result.user);
      navigate("/homepage"); // Redirect to Homepage after signup or login
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="entry-container-bg">
      <div className="company-name">
        <span className="company-name-line">SOCIAL UP</span>
        <span className="company-name-line">INTERNAL</span>
        <span className="company-name-line">TEAM</span>
      </div>
      <div className="united-we-stand">
        <span className="united-subline-1">UNITED,</span>
        <span className="united-subline-2">WE STAND</span>
        <span className="efficient-together">Let’s make it efficient together</span>
      </div>
      <div className="buttons-container">
        <button className="signup-btn" onClick={handleGoogleAuth}>Login Here</button>
      </div>
    </div>
  );
};

export default EntryPage;
