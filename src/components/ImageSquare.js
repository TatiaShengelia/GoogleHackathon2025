export default function ImageSquare({
  imageSrc,
  handleImageSelected,
  className,
}) {
  return (
    <button
      className={`item-square ${className}`}
      onClick={handleImageSelected}
    >
      <img src={imageSrc} alt="images" />
    </button>
  );
}
