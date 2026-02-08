import React, { useEffect } from 'react'

export default function Notes({ onSelectNote }) {
  const [notes, setNotes] = React.useState([])
  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`http://localhost:4999/api/delete-note/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        }
      })
      if (res.ok) {
        setNotes(notes.filter(note => note._id !== id));
        const data = await res.json();
        alert(data.message);
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        await fetch('http://localhost:4999/api/get-notes', {
          method: "GET",
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
          }
        })
          .then(res => res.json())
          .then(data => {
            setNotes(data.notes)
          })
      } catch (err) {
        console.log(err)
      }
    }
    fetchNotes()
  }, [])
  return (
    <div className='bg-indigo-700 p-4 m-4'>
      <h1 className='text-white text-xl md:text-3xl'>Your notes:</h1>
      <div className="flex flex-col gap-4 mt-2">
        {
          notes && notes.length > 0 ? notes.map(note => (
            <div
              key={note._id}
              className='bg-indigo-500 p-4 rounded flex justify-between items-center cursor-pointer border-b-2 relative'
              onClick={() => onSelectNote(note)}>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-slate-800/50 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl cursor-pointer" onClick={(e) => { e.stopPropagation(); deleteHandler(note._id) }}>×</div>
              <h1 className='text-white text-xl md:text-3xl'>{note.title}</h1>
              <p className='text-indigo-200'>{new Date(note.createdAt).toLocaleDateString()}</p>
            </div>
          )) : <h1 className='text-white text-xl md:text-3xl'>You have no notes yet. Create your first note! 😊</h1>
        }

      </div>
    </div>
  )
}
