import { useState, useEffect } from "react";
import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";
import "../styles/CalendarStyle.css";
import Note from "../components/Note";

function NotesCalendar({ notes, onDateSelect, deleteNote }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getNotesForDate = (date) => {
    return notes.filter((note) => {
      const noteDate = new Date(note.created_at); // Assume `note.date` is ISO format
      return (
        noteDate.getFullYear() === date.getFullYear() &&
        noteDate.getMonth() === date.getMonth() &&
        noteDate.getDate() === date.getDate()
      );
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date, getNotesForDate(date));
    }
  };

  const notesForSelectedDate = getNotesForDate(selectedDate);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-screen m-5">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-center mb-3">Calendar</h2>
          <div className="w-full flex justify-center items-center">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={({ date, view }) => {
                if (view === "month" && getNotesForDate(date).length > 0) {
                  return <div className="dot top-right"></div>;
                }
                return null;
              }}
            />
          </div>
        </div>

        <div className="mt-6 w-full m-5">
          <h3 className="text-xl font-semibold mb-3 text-center">
            Notes for {selectedDate.toDateString()}
          </h3>
          <div className="md:h-72 overflow-y-auto rounded-lg">
            {notesForSelectedDate.length > 0 ? (
              <div className="bg-secondary-content py-1">
                {notesForSelectedDate.map((note) => (
                  <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
              </div>
            ) : (
              <p className="text-center">No entries for this date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesCalendar;
