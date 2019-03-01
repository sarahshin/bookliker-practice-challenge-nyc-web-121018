document.addEventListener("DOMContentLoaded", function() {
  //VARIABLES===================================================================
  const booksURL = "http://localhost:3000/books"
  const usersURL = "http://localhost:3000/users"
  const bookList = document.querySelector("#list")
  const showPanel = document.querySelector("#show-panel")
  let allBooks = []

  //CALLS=======================================================================
  fetchBooks(booksURL)
  fetchUsers(usersURL)

  //EVENT LISTENERS=============================================================
  bookList.addEventListener("click",(e)=> {
    let book = allBooks.find(book=> book.id == e.target.dataset.id)
    let bookUsers = book.users.map(user => user.username)
    let bookUsersString = bookUsers.join(", ")
    renderOnShowPanel(book,bookUsersString)
  })

  showPanel.addEventListener("click",(e) => {
    if(e.target.tagName === "BUTTON"){
      let book = allBooks.find(book=> book.id == e.target.dataset.id)
      console.log(book)

      // likeBook()
    }
  })


  //FUNCTIONS===================================================================

  function fetchBooks(url){
    fetch(url)
    .then(response => response.json())
    .then(parsedJSON => {
      renderAllBooks(parsedJSON)
      allBooks = parsedJSON
    })
  }

  function renderBook(book){
    bookList.innerHTML += `
      <li data-id=${book.id}>${book.title}</li>`
  }

  function renderAllBooks(books){
    books.forEach(renderBook)
  }

  function fetchUsers(url){
    fetch(url)
    .then(response => response.json())
    .then(console.log)
  }

  function renderOnShowPanel(book,usersString){
    showPanel.innerHTML = `
      <h3>${book.title}</h3>
      <img src=${book.img_url}>
      <p>${book.description}</p>
      <h4>${usersString}</h4>
      <button data-id=${book.id}>Read Book</button>`
  }

  function likeBook(){

  }

});
