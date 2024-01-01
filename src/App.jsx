import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  //Defining the state variables:
  const [len, setLen] = useState(6);
  const [numExist, setNumExist] = useState(false);
  const [symExist, setSymExist] = useState(false);
  const [password, setPassword] = useState("");

  // We need to use a reference value to connect the button and the input text box
  const passRef = useRef(null);

  // Defining a function that generates a random password
  const generatePassword = useCallback(
    function () {
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let passKey = "";
      if (numExist) str += "0123456789";
      if (symExist) str += "~`!@#$%^&*()_+{}|:<>,./?;";

      for (let ind = 1; ind <= len; ind++) {
        const val = Math.floor(Math.random() * str.length);
        passKey += str[val];
      }

      setPassword(passKey);
    },
    [len, numExist, symExist, setPassword]
  );

  // Next we need to write a function for copying it to clipboard
  const copyStuffToClipboard = useCallback(
    function () {
      passRef.current?.select();
      // passRef.current?.setSelectionRange(0, 100);
      window.navigator.clipboard.writeText(password);
    },
    [password]
  );

  // We need to run it always so we add an addEventListener tyoe of stuff-> we call it useEffect
  useEffect(() => {
    generatePassword();
  }, [len, numExist, symExist, setPassword]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Random Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button
          className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800"
          onClick={() => {
            copyStuffToClipboard();
          }}
        >
          Copy Password
        </button>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="range"
          min={6}
          max={100}
          value={len}
          className="cursor-pointer"
          onChange={(current) => {
            setLen(current.target.value);
          }}
        />
        <label>Len: {len}</label>
        <input
          type="checkbox"
          id="numInput"
          defaultChecked={numExist}
          onClick={() => {
            setNumExist((prev) => {
              return !prev;
            });
          }}
        />
        <label htmlFor="numInput">Number</label>
        <input
          type="checkbox"
          id="symInput"
          defaultChecked={symExist}
          onClick={() => {
            setSymExist((prev) => {
              return !prev;
            });
          }}
        />
        <label htmlFor="symInput">Symbol</label>
      </div>
    </div>
  );
}

export default App;
