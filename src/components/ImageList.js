import ImageSquare from "./ImageSquare";

import { imageData } from "./ImageData";

export default function ImageList({ name, setAvatar, avatarObj }) {
  const { title, total, link } = imageData[name];
  const avatarImage = avatarObj[name];
  const imageSquare = [];
  for (let i = 1; i <= total; i++) {
    const imageUrl = `${link}/${i}.png`;
    imageSquare.push(
      <ImageSquare
        key={`${name}${i}`}
        imageSrc={imageUrl}
        // handleImageSelected={() => {
        //   setAvatar((avatar) => {
        //     avatar[name] = imageUrl;
        //     return { ...avatar };
        //   });
        // }}
        handleImageSelected={() => {
          avatarObj[name] = imageUrl;
          setAvatar({ ...avatarObj });
        }}
        className={avatarImage === imageUrl ? "selected" : ""}
      />
    );
  }
  return (
    <div>
      <div className="avata-list-section">
        <h2>{title.toUpperCase()}</h2>
        <div className="list-container">{imageSquare}</div>
      </div>
    </div>
  );
}
