import React from "react";

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    //hour: "2-digit",
    //minute: "2-digit",
  });

  return (
    <div className="card bg-secondary shadow-xl mx-3 my-2">
      <div class="card-body">
        <div class="badge badge-outline bg-primary text-primary-content">
          <p className="note-date">{formattedDate}</p>
        </div>
        <h1 className="card-title text-secondary-content">{note.title}</h1>
        <p
          className="text-secondary-content"
          dangerouslySetInnerHTML={{
            __html: note.content.replace(/\n/g, "<br>"),
          }}
        ></p>

        <button className="btn btn-accent" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Note;
