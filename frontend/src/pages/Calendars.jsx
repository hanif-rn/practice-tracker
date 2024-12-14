import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import Navbar from "../components/Navbar";
import NotesCalendar from "../components/NotesCalendar";

function Calendars() {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        const reversedData = data.slice().reverse();
        setNotes(reversedData);
        console.log(reversedData);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const handleDateSelect = (date, notesForDate) => {
    setSelectedDate(date);
    setSelectedNotes(notesForDate);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen items-center bg-base-200 py-12 px-5">
        <div className="mt-6 w-full max-w-4xl">
          <NotesCalendar
            notes={notes}
            onDateSelect={handleDateSelect}
            getNotes={getNotes}
            deleteNote={deleteNote}
          />
          {/* 
          <h3 className="text-2xl font-bold text-center mb-3">All Notes</h3>

          {notes.map((note) => (
            <Note note={note} onDelete={deleteNote} key={note.id} />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Calendars;
