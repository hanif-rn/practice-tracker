import { useState } from "react";

const Tuner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [oscillator, setOscillator] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [frequency, setFrequency] = useState(440); // Default to A440

  const startTuning = (freq) => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const osc = context.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, context.currentTime); // Use the passed frequency
    osc.connect(context.destination);
    osc.start();
    setOscillator(osc);
    setAudioContext(context);
  };

  const stopTuning = () => {
    if (oscillator) {
      oscillator.stop();
      audioContext.close(); // Optionally close the context
      setOscillator(null);
      setAudioContext(null);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopTuning();
    } else {
      startTuning(frequency); // Pass the current frequency to start tuning
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFrequency = () => {
    const newFrequency = frequency === 440 ? 415 : 440; // Toggle between A440 and A415
    setFrequency(newFrequency);

    if (isPlaying) {
      stopTuning(); // Stop the current oscillator
      startTuning(newFrequency); // Start the new oscillator with the updated frequency
    }
  };

  return (
    <div>
      <div className="card shadow-xl mx-auto my-4 w-full max-w-xl bg-primary">
        <div className="card-body flex flex-col items-center">
          <h1 className="card-title text-2xl font-bold">Tune to A</h1>
          <div className="flex items-center gap-10 my-4">
            <button
              onClick={toggleSound}
              className={`btn py-2 px-4 rounded ${
                isPlaying ? "btn-success" : "btn-error"
              }`}
            >
              {isPlaying ? "Stop" : "Play"}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <p>Modern</p>
            <input type="checkbox" class="toggle" onChange={toggleFrequency} />
            <p>Baroque</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tuner;
