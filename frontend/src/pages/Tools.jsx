import Navbar from "../components/Navbar";
import Metronome from "../components/Metronome";
import Tuner from "../components/Tuner";

function Tools() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col min-h-screen items-center bg-base-200 py-6 px-4">
        <div className="card shadow-xl bg-base-100 p-6 w-full max-w-xl">
          <h1 className="text-2xl">Practice Tools</h1>
          <Metronome />
          <Tuner />
        </div>
      </div>
    </div>
  );
}

export default Tools;
