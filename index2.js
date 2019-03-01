document.addEventListener("DOMContentLoaded",()=>{
//VARIABLES=====================================================================
  const booksURL = "http://localhost:3000/books"
  const usersURL = "http://localhost:3000/users"
  const list = document.querySelector("#list")
  const showPanel = document.querySelector("#show-panel")

  let allBooks = []
  let allUsers = []

//CALLS=========================================================================
  fetchBooks()
  fetchUsers()

//EVENT LISTENERS===============================================================
  list.addEventListener("click",(e)=> {
    if(e.target.tagName === "LI"){
      let book = allBooks.find(book => book.id == e.target.dataset.id)
      let users = book.users.map(user => user.username)
      let usersString = users.join(", ")
      renderBookToShowPanel(book,usersString)
    }
  })

  showPanel.addEventListener("click",(e)=>{
    if(e.target.tagName === "BUTTON"){
      //patch fetch to http://localhost:3000/books/:id with updated array of users
      let bookToPatch = allBooks.find(book => book.id == e.target.dataset.id)
      let me = allUsers.find(user => user.id === 1)
      let bookUsersArray = []
      bookToPatch.users.forEach(user=> bookUsersArray.push(user))
      bookUsersArray.push(me)
      let usersNamesArray = bookUsersArray.map(user => user.username)
      let usersString = usersNamesArray.join(", ")

      // console.log(bookToPatch.users)
      // console.log(me)
      // let bookUsers = bookToPatch.users.push(me)
      // let updatedUsers = bookUsers.push(me)
      // console.log(updatedUsers)
      // debugger
      fetchPatch(bookToPatch,bookUsersArray,usersString)
    }
  })

//FUNCTIONS=====================================================================
  function fetchBooks(){
    fetch(booksURL)
    .then(res => res.json())
    .then(parsedJSON => {
      allBooks = parsedJSON
      renderAllBooksToList(parsedJSON)
    })
  }

  function fetchUsers(){
    fetch(usersURL)
    .then(res => res.json())
    .then(parsedJSON => {
      allUsers = parsedJSON
    })
  }

  function fetchPatch(book,bookUsersArray,usersString){
    fetch(`http://localhost:3000/books/${book.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        users: bookUsersArray
      })
    })
    .then(res => res.json())
    .then(parsedJSON => {
      renderBookToShowPanel(parsedJSON,usersString)
    })
  }


  function renderBookToList(book){
    list.innerHTML += `<li data-id=${book.id}>${book.title}</li>`
  }

  function renderAllBooksToList(books){
    books.forEach(renderBookToList)
  }

  function renderBookToShowPanel(book,usersString){
    showPanel.innerHTML = `
      <h2>${book.title}</h2>
      <img src=${book.img_url}>
      <p>${book.description}</p>
      <h4>${usersString}</h4>
      <button data-id=${book.id}>Read Book</button>
    `
  }

})
