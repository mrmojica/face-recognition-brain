import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
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
  // sample image: https://samples.clarifai.com/metro-north.jpg
  const [inputValue, setInputValue] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

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

    setImageUrl(inputValue);

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, inputValue, { language: "en" })
      .then(
        function(response) {
          // do something with response
          console.log(response);
          // get bounding_box
          console.log(
            response.outputs[0].data.regions[0].region_info.bounding_box
          );
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
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
};

export default App;
