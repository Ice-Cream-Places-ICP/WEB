import { ColorRing, Oval, TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex-row full-width flex-center">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />

      {/* <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /> */}
      {/* <Oval
        height={50}
        width={50}
        color="#2d2e2d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#2d2e2d"
        strokeWidth={6}
        strokeWidthSecondary={8}
      /> */}
    </div>
  );
};

export default Loading;
