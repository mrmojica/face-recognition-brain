import React from "react";
import Logo from "../Logo/Logo";

const Navigation = ({ setRoute, route, handleSignOut }) =>
  route === "home" ? (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <Logo />
      <p
        onClick={() => handleSignOut()}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign Out
      </p>
    </nav>
  ) : (
    <>
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => setRoute("signin")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => setRoute("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    </>
  );

export default Navigation;
