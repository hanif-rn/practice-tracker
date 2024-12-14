import React from "react";
import MetronomeDown from "../wav/Metronome2.wav";

const Metronome = () => {
  const [BPM, setBPM] = React.useState(127);
  const [active, setActive] = React.useState(false);
  const [interval, setInterval] = React.useState(0);

  const metronomeDown = new Audio(MetronomeDown);

  const onClick = () => {
    setActive(!active);
    setInterval(0);
  };

  React.useEffect(() => {
    let timer = null;

    if (active) {
      timer = setTimeout(() => {
        setInterval((interval + 1) % 2);
        metronomeDown.play();
      }, (60 / BPM) * 1000);

      return () => clearInterval(timer);
    }
  }, [interval, active, BPM]);

  return (
    <div>
      <div
        className={`card  shadow-xl mx-auto my-4 w-full max-w-xl ${
          interval === 0 ? "bg-secondary" : "bg-primary"
        }`}
      >
        <div className="card-body flex flex-col items-center">
          <h1 className="card-title text-2xl font-bold">Metronome</h1>
          <div className="flex items-center gap-10 my-4">
            <button
              className={`btn ${
                active ? "btn-success" : "btn-error"
              } px-6 py-2`}
              onClick={onClick}
            >
              {active ? "STOP " : "START"}
            </button>
            <div className="text-center">
              <h2 className="text-lg font-medium">BPM</h2>
              <p className="text-3xl font-extrabold">{BPM}</p>
            </div>
          </div>
          <input
            type="range"
            min={40}
            max="220"
            value={BPM}
            onChange={(e) => setBPM(Number(e.target.value))}
            className="range"
          />
        </div>
      </div>
    </div>
  );
};

export default Metronome;
