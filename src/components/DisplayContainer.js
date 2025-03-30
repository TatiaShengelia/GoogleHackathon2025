import DisplayAvatar from "./DisplayAvatar";
import ImageList from "./ImageList";
import { useEffect, useState } from "react";
import { imageData } from "./ImageData";
import "./DisplayContainer.css"

// const initialAvatar = {
//   body: `${imageData.body.link}/1.png`,
//   clothes1: `${imageData.clothes1.link}/1.png`,
//   clothes2: `${imageData.clothes2.link}/1.png`,
//   clothes3: `${imageData.clothes3.link}/1.png`,
//   eyebrows: `${imageData.eyebrows.link}/1.png`,
//   eyes: `${imageData.eyes.link}/1.png`,
//   facialHair: `${imageData.facialHair.link}/1.png`,
//   hair: `${imageData.hair.link}/1.png`,
//   mouths: `${imageData.mouths.link}/1.png`,
//   noses: `${imageData.noses.link}/1.png`,
// };

export default function DisplayContainer() {
  const [avatar, setAvatar] = useState({});

  function handleRandomize() {
    Object.keys(imageData).forEach((name) => {
      const randomValue = Math.floor(Math.random() * imageData[name].total + 1);
      const newLinkAvatar = `${imageData[name].link}/${randomValue}.png`;
      setAvatar((avatar) => {
        avatar[name] = newLinkAvatar;
        return { ...avatar };
      });
    });
  }

  useEffect(() => {
    handleRandomize();
  }, []);

  return (
    <div className="app-display-container">
      <DisplayAvatar avatar={avatar} handleRandomize={handleRandomize} />
      <div>
        {/* <ImageList name="body" setAvatar={setAvatar} avatarObj={avatar} />
        <ImageList name="clothes1" setAvatar={setAvatar} avatarObj={avatar} />
        <ImageList name="clothes2" setAvatar={setAvatar} avatarObj={avatar} />
        <ImageList name="clothes3" setAvatar={setAvatar} avatarObj={avatar} />
        <ImageList name="eyebrows" setAvatar={setAvatar} avatarObj={avatar} />
        <ImageList name="eyes" setAvatar={setAvatar} avatarObj={avatar} />
        <ImageList name="facialHair" setAvatar={setAvatar} avatarObj={avatar} />
        <ImageList name="hair" setAvatar={setAvatar} avatarObj={avatar} />
        <ImageList name="mouths" setAvatar={setAvatar} avatarObj={avatar} />
        <ImageList name="noses" setAvatar={setAvatar} avatarObj={avatar} /> */}
        {Object.keys(imageData).map((name, i) => (
          <ImageList
            key={`${name}${i}`}
            name={name}
            setAvatar={setAvatar}
            avatarObj={avatar}
          />
        ))}
      </div>
    </div>
  );
}