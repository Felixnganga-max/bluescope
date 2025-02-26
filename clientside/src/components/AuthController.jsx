import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import VerifyEmailForm from "./VerifyEmailForm";

// Modal types
const MODAL_TYPES = {
  NONE: "none",
  LOGIN: "login",
  SIGNUP: "signup",
  VERIFY: "verify",
};

const AuthController = () => {
  const [activeModal, setActiveModal] = useState(MODAL_TYPES.NONE);
  const [email, setEmail] = useState("");

  // Open login modal when hash changes to #login
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#login") {
        setActiveModal(MODAL_TYPES.LOGIN);
      }
    };

    // Check on initial load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const closeAllModals = () => {
    setActiveModal(MODAL_TYPES.NONE);
    // Remove the hash from the URL
    if (window.location.hash) {
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  const handleSignupSuccess = (userEmail) => {
    setEmail(userEmail);
    setActiveModal(MODAL_TYPES.VERIFY);
  };

  const handleVerificationSuccess = () => {
    setActiveModal(MODAL_TYPES.LOGIN);
  };

  const handleLoginSuccess = (userData) => {
    // You can handle post-login logic here
    console.log("User logged in:", userData);

    // Example: Redirect to dashboard
    // window.location.href = '/dashboard';
  };

  return (
    <>
      {activeModal === MODAL_TYPES.LOGIN && (
        <LoginForm
          onClose={closeAllModals}
          onSignupClick={() => setActiveModal(MODAL_TYPES.SIGNUP)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {activeModal === MODAL_TYPES.SIGNUP && (
        <SignupForm onClose={closeAllModals} onSuccess={handleSignupSuccess} />
      )}

      {activeModal === MODAL_TYPES.VERIFY && (
        <VerifyEmailForm
          email={email}
          onClose={closeAllModals}
          onSuccess={handleVerificationSuccess}
        />
      )}
    </>
  );
};

export default AuthController;
