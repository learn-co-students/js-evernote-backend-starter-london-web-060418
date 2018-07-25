// const BASE_URL = "http://localhost:3000"
// const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`



document.addEventListener('DOMContentLoaded', init)

let ul = document.querySelector('#sidebar-list')
let content = document.querySelector('#content')
function init () {
  Adapter.getNotes()
  displayNoteListener()
  createListener()
}

function displayNoteListener() {
  console.log('listening')
  ul.addEventListener('click', function(e){
    if (e.target.className === 'something'){
      let targetId = e.target.id
      document.querySelector('article').innerHTML = ""
      Adapter.getNote(targetId)
    }
  })
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
  for (let note of data) {
    renderNote(note)
  }
}

function renderNote(note) {
  li = document.createElement('li')
  li.className = 'list-item'
  // li.id = note.id
  div = document.createElement('div')
  div.innerHTML = note.title
  div.className = 'something'
  div.id = note.id
  li.append(div)
  ul.append(li)
  return note
}

function createListener() {
  document.getElementById('create').addEventListener('click', function(){
    let content = document.querySelector('#content')
    content.innerHTML = ""
    form = document.createElement('form')
    let titleLabel = document.createElement('label')
    titleLabel.innerText = "Title"
    let bodyLabel = document.createElement('label')
    bodyLabel.innerText = "Note"
    let title = document.createElement('input')
    title.className = 'note-title'
    title.id = 'note-title'
    let body = document.createElement('textarea')
    body.className = 'note-body'
    body.id = 'note-body'
    form.append(titleLabel,title,bodyLabel, body, addCreateButton())
    content.append(form)
  })
}

function addCreateButton() {

  let createBtn = document.createElement('button')
  createBtn.innerText = 'Create'
  createBtn.addEventListener('click', function(e){
    noteTitle = document.getElementById('note-title').value
    noteBody = document.getElementById('note-body').value
    bodyObject = {title:noteTitle, body:noteBody, user:1}
    e.preventDefault()
    Adapter.createNote(bodyObject)
  })
  return createBtn
}


// function init(){
//   getTrainers()
//   detectReleaseClick()
// }//end of init
//
// function getTrainers() {
//   fetch(TRAINERS_URL)
//   .then(res => res.json())
//   .then(json => TrainerCardRender(json))
// }
//
// function createTrainerContainer (item) {
//   trainerDiv = document.createElement('div')
//   trainerDiv.id = item.id
//   trainerDiv.className = "card"
//   trainerDiv.innerHTML = `<p> ${item.name}  </p>`
//   return trainerDiv
// }
//
// function createAddButton(trainer_id) {
//   submitButton = document.createElement('button')
//   submitButton.innerText = 'Add Pokemon!!!!!'
//   submitButton.addEventListener('click', () => {
//     createPokemon(trainer_id)
//     window.location.reload()
//   })
//   return submitButton
// }
//
//
// function createPokemon(trainer_id) {
//   console.log(trainer_id)
//   fetch(POKEMONS_URL, {
//   method:"post",
//   body: JSON.stringify({
//       trainer_id: trainer_id
//     }),
//   headers: {
//     'Content-Type': 'application/json'
//   }
//   })
//   .then(res => res.json())
//   .then(json => {console.log(json)})
//   .catch(err => console.error(err))
// }
//
// function createPokemonsList(trainer) {
//   ulElement = document.createElement('ul')
//
//   for (let i = 0; i < trainer.pokemons.length; i++) {
//     iThPokemon = trainer.pokemons[i]
//     catchPokemon(iThPokemon)
//     ulElement.append(pokemonInfo,buttonX)
//   }
//   return ulElement
// }
//
// function catchPokemon(iThPokemon){
//   pokemonInfo = document.createElement('li')
//   pokemonInfo.innerHTML = `${iThPokemon.nickname} (${iThPokemon.species})`
//   buttonX = document.createElement('button')
//   buttonX.id = iThPokemon.id
//   buttonX.innerText = "Release"
// }
//
// function detectReleaseClick (){
//   let main = document.querySelector('main')
//   console.log(main);
//
//   main.addEventListener('click', function(e){
//     console.log(e.target)
//     if(e.target.innerText === 'Release') {
//       let pokemonId = e.target.id
//       deletePokemon(pokemonId)
//       window.location.reload()
//     }
//   })
// }
//
//
// function deletePokemon(id){
//     console.log(POKEMONS_URL + `/${id}`)
//     fetch(POKEMONS_URL + `/${id}` , {
//     method:"delete",
//     })
//     .then(res => res.json())
//     .then(res => {
//       console.log('Deleted:', res.message)
//       return res
//     })
//     .catch(err => console.error(err))
// }
//
//
// function TrainerCardRender(data){
//   for (let i = 0; i < data.length; i++) {
//     trainerDiv = createTrainerContainer(data[i])
//     trainerDiv.append(createAddButton(data[i].id),createPokemonsList(data[i]))
//     main = document.querySelector('main')
//     main.appendChild(trainerDiv)
//     console.log("rendered cards")
//   }//end of trainerCardRender
// }
