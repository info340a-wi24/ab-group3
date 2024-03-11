import { signOut } from "firebase/auth";
import { auth } from "../../index";
import { Navigate } from "react-router-dom";

export const Private = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex-container general-layout">
        <header>
          <h2>Private page</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </header>
        <main>
        </main>
    </div>
  );
};



