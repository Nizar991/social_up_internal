import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};

export default GoogleLogin;
