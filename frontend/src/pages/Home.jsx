import { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import NotesCalendar from "../components/NotesCalendar";

function Home() {
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");
  const [title, setTitle] = useState("");

  const createNote = (e) => {
    e.preventDefault();
    const combinedContent =
      "Scales: " +
      content1 +
      "\n" +
      "Etudes: " +
      content2 +
      "\n" +
      "Repertoire: " +
      content3;
    api
      .post("/api/notes/", { content: combinedContent, title })
      .then((res) => {
        if (res.status === 201) {
          setTitle("");
          setContent1("");
          setContent2("");
          setContent3("");
          alert("Note created!");
        } else {
          alert("Failed to make note.");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen items-center bg-base-200 py-12 px-5">
        <div className="card shadow-xl bg-base-100 p-6 w-full max-w-xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Practice Log!
          </h2>
          <form onSubmit={createNote}>
            <div className="form-control">
              <label className="label-text font-medium" htmlFor="title">
                Title:
              </label>
              <br />
              <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control space-y-4 mt-5">
              <h3 className="font-semibold text-lg">Content:</h3>
              <label className="label-text font-medium" htmlFor="content1">
                Scales:
              </label>
              <textarea
                id="content1"
                name="content1"
                required
                value={content1}
                onChange={(e) => setContent1(e.target.value)}
                className="textarea textarea-bordered w-full h-28"
              ></textarea>
              <label className="label-text font-medium" htmlFor="content2">
                Etudes:
              </label>
              <textarea
                id="content2"
                name="content2"
                required
                value={content2}
                onChange={(e) => setContent2(e.target.value)}
                className="textarea textarea-bordered w-full h-28"
              ></textarea>
              <label className="label-text font-medium" htmlFor="content3">
                Repertoire:
              </label>
              <textarea
                id="content3"
                name="content3"
                required
                value={content3}
                onChange={(e) => setContent3(e.target.value)}
                className="textarea textarea-bordered w-full h-28"
              ></textarea>
            </div>
            <input
              className="btn btn-primary w-full my-3"
              type="submit"
              value="Submit"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
