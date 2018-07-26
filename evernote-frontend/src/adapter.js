class Adapter {
  static getNotes() {
    fetch('http://localhost:3000/api/v1/notes')
    .then(res => res.json())
    .then(json => renderNotes(json))
  }

  static getNote(id) {
    fetch(`http://localhost:3000/api/v1/notes/${id}`)
    .then(res => res.json())
    .then(json => putNoteOnMain(json))
  }

  static  editNote(id, body) {
    fetch(`http://localhost:3000/api/v1/notes/${id}`,{
      method: 'PATCH',
      body: JSON.stringify(body),
      headers:{'Content-type':'application/json'}
    })
    .then(res => res.json())
    .then(Adapter.getNotes())
  }

  static deleteNote(id) {
    fetch(`http://localhost:3000/api/v1/notes/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(json => console.log(json))
  }

  static  createNote(body) {
    fetch(`http://localhost:3000/api/v1/notes/`,{
      method: 'POST',
      body: JSON.stringify(body),
      headers:{'Content-type':'application/json'}
    })
    .then(res => res.json())
    .then(json => renderNote(json))
    .then(note => putNoteOnMain(note))
  }
}
