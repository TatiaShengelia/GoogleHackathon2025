export default function DisplayAvatar({ avatar, handleRandomize }) {
  const {
    color,
    clothes,
    face,
    hair,
  } = avatar;

  return (
    <div className="avatar-gr">
      <div className="app-avatar-gr">
        <img src={color} alt="" style={{ zIndex: 0 }} />
        <img src={clothes} alt="" style={{ zIndex: 1 }} />
        <img src={face} alt="" style={{ zIndex: 5 }} />
        <img src={hair} alt="" style={{ zIndex: 6 }} />
      </div>
      <div className="randomize">
        <button onClick={handleRandomize}>Randomize</button>
      </div>
    </div>
  );
}
