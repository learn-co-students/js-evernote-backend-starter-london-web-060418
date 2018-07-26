
document.addEventListener('DOMContentLoaded', init)

let ul = document.querySelector('#sidebar-list')
let content = document.querySelector('#content')

function init () {
  Adapter.getNotes()
  ul.addEventListener('click', displayNote)
  document.getElementById('create').addEventListener('click', createNewNoteForm)
}

function displayNote(e) {
  if (e.target.className === 'note-list-element'){
    document.querySelector('article').innerHTML = ""
    Adapter.getNote(e.target.id)
  }
}

function putNoteOnMain(data) {
  content.innerHTML = ""
  form = document.createElement('form')
  let titleLabel = document.createElement('label')
  titleLabel.innerText = "Title"
  let bodyLabel = document.createElement('label')
  bodyLabel.innerText = "Note"
  let title = document.createElement('input')
  title.value = data.title
  title.className = 'note-title'
  title.id = 'note-title'
  let body = document.createElement('textarea')
  body.value = data.body
  body.className = 'note-body'
  body.id = 'note-body'
  form.append(titleLabel,title,bodyLabel, body, addEditButton(data.id), addDeleteButton(data.id))
  content.append(form)
}

function addEditButton(id) {

  let editBtn = document.createElement('button')
  editBtn.innerText = 'Edit'
  editBtn.addEventListener('click', function(e){
    noteTitle = document.getElementById('note-title').value
    noteBody = document.getElementById('note-body').value
    bodyObject = {title:noteTitle, body:noteBody}
    e.preventDefault()

    Adapter.editNote(id, bodyObject)
  })
  return editBtn
}

function addDeleteButton(id) {
  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.addEventListener('click', function(e){
    Adapter.deleteNote(id)
  })
  return deleteBtn
}

function renderNotes(data) {
  ul.innerHTML = ""
  for (let note of data) {
    renderNote(note)
  }
}

function renderNote(note) {
  li = document.createElement('li')
  li.className = 'list-item'
  div = document.createElement('div')
  div.innerHTML = note.title
  div.className = 'note-list-element'
  div.id = note.id
  li.append(div)
  ul.append(li)
  return note
}

function createNewNoteForm(e) {
    let content = document.querySelector('#content')
    content.innerHTML = ""
    form = document.createElement('form')
    form.innerHTML = `<label>Title</label>
                      <input class="note-title" id="note-title">
                      <label>Note</label>
                      <textarea class="note-body" id="note-body">`
    form.append(addCreateButton())
    content.append(form)
}

function addCreateButton() {
  let createBtn = document.createElement('button')
  createBtn.innerText = 'Create'
  createBtn.addEventListener('click', postNewNote)
  return createBtn
}

function postNewNote(e){
  noteTitle = document.getElementById('note-title').value
  noteBody = document.getElementById('note-body').value
  bodyObject = {title:noteTitle, body:noteBody, user:1}
  e.preventDefault()
  Adapter.createNote(bodyObject)
}
