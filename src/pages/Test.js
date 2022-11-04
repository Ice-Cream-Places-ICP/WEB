import { useEffect, useRef } from "react";

const Test = () => {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` wskazuje na zamontowany element kontrolki formularza
    inputEl.current.focus();
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
  };

  return (
    <>
      <input
        ref={inputEl}
        type="text"
        onChange={(event) => {
          handleInputChange(event);
        }}
      />
      <button
        onClick={() => {
          console.log(inputEl.current.value);
        }}
      >
        Ustaw skupienie na kontrolce formularza
      </button>
    </>
  );

  return "Test";
};

export default Test;
