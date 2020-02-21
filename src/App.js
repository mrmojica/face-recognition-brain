import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkeForm";
import Rank from "./components/Rank/Rank";
import "tachyons";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const CLARAFAI_API_KEY = process.env.REACT_APP_CLARIFAI_API_KEY;

const app = new Clarifai.App({
  apiKey: CLARAFAI_API_KEY
});

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
};

const App = () => {
  const [inputValue, setInputValue] = React.useState("");

  const onInputChange = event => {
    console.log("value", event.target.value);
    setInputValue(event.target.value);
  };

  const onButtonSubmit = () => {
    if (!CLARAFAI_API_KEY) {
      throw new Error("You must set environment variable for clarafai apiKey");
    }

    console.log("submitted");
    console.log(CLARAFAI_API_KEY);

    app.models
      .predict(
        Clarifai.GENERAL_MODEL,
        "https://samples.clarifai.com/metro-north.jpg",
        { language: "en" }
      )
      .then(
        function(response) {
          // do something with response
          console.log(response);
        },
        function(err) {
          // there was an error
        }
      );
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      {/* <FaceRecognition /> */}
    </div>
  );
};

export default App;
