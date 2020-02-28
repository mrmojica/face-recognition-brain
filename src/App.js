import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkeForm";
import Rank from "./components/Rank/Rank";
import "tachyons";
import Particles from "react-particles-js";

const INITIAL_USER_INFO = {
  id: "",
  name: "",
  email: "",
  password: "",
  entries: 0,
  joined: ""
};

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
        blur: 2
      }
    }
  }
};

const App = () => {
  const [imageUrl, setImageUrl] = React.useState("");
  const [boxList, setBoxList] = React.useState([]);
  const [route, setRoute] = React.useState("signin");
  const [user, setUser] = React.useState(INITIAL_USER_INFO);

  const handleSignOut = () => {
    setImageUrl("");
    setBoxList([]);
    setRoute("signin");
    setUser(INITIAL_USER_INFO);
  };

  const calculateFaceLocations = data => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const facesLocated = data.outputs[0].data.regions;

    return facesLocated.map(faceData => {
      // ClarifaiFace value that gives location of face example:
      // {top_row: 0.5038523, left_col: 0.6625626, bottom_row: 0.5276079, right_col: 0.6763894}
      const clarifaiFace = faceData.region_info.bounding_box;

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };
    });
  };

  const onPictureSubmit = () =>
    fetch("https://mysterious-sands-57067.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: imageUrl })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          // Need to update the users entries count for each picture submitted.
          fetch("https://mysterious-sands-57067.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.id })
          })
            .then(response => response.json())
            .then(count => setUser({ ...user, entries: count }))
            .catch(err => console.log(err));
        }

        setBoxList(calculateFaceLocations(response));
      })
      .catch(err => console.log(err));

  const content = route => {
    if (route === "home") {
      return (
        <>
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            setImageUrl={setImageUrl}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition boxList={boxList} imageUrl={imageUrl} />
        </>
      );
    } else if (route === "signin") {
      return <SignIn setRoute={setRoute} setUser={setUser} />;
    } else {
      return <Register setRoute={setRoute} setUser={setUser} />;
    }
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation
        setRoute={setRoute}
        route={route}
        handleSignOut={handleSignOut}
      />
      {content(route)}
    </div>
  );
};

export default App;
