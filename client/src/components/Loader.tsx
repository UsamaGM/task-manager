
interface PropTypes {
  fullscreen?: boolean;
  size?: "small" | "medium" | "large";
}

function Loader({ fullscreen = false, size = "medium" }: PropTypes) {
  let loaderSize;
  switch (size) {
    case "small":
      loaderSize = "h-8 w-8";
      break;
    case "medium":
      loaderSize = "h-12 w-12";
      break;
    case "large":
      loaderSize = "h-16 w-16";
      break;
    default:
      loaderSize = "h-12 w-12";
  }

  const loader = (
    <div className="flex justify-center items-center w-full h-full">
      <div className={`loader ${loaderSize}`} />
    </div>
  );

  return fullscreen ? (
    <div className="w-screen h-screen">{loader}</div>
  ) : (
    loader
  );
}

export default Loader;

