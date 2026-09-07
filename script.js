let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let booksContainer = document.getElementById("booksContainer");
let themeButton = document.getElementById("themeButton");

let books = [];

searchButton.addEventListener("click", searchBooks);


async function searchBooks() {

    let searchText = searchInput.value;

    let response = await fetch(
        "https://api.bigbookapi.com/search-books?api-key=71d07aea82724b6eb8a7dd386b1158f6&query=" + searchText
    );

    let data = await response.json();

    books = data.books;

    console.log(books);

    booksContainer.innerHTML = "";

    for (let i = 0; i < books.length; i++) {

        let book = books[i][0];

        booksContainer.innerHTML += `
            <div class="book-card">

                <img src="${book.image}" alt="${book.title}">

                <h3>${book.title}</h3>

                <p>${book.subtitle || ""}</p>

                <p>Author: ${book.authors[0].name}</p>

                <button onclick="addToLibrary(${book.id})">Add to My Library</button>

            </div>
        `;
    }
}

function addToLibrary(bookId) {

    let book = null;

    for (let i = 0; i < books.length; i++) {

        if (books[i][0].id == bookId) {
            book = books[i][0];
        }

    }

    let libraryTable = document.getElementById("libraryTable");

    libraryTable.innerHTML += `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.authors[0].name}</td>
            <td>Available</td>
            <td>
             <button onclick="removeFromLibrary(this)">Remove</button>
            </td>
        </tr>
    `;
}

function removeFromLibrary(button) {

    button.parentElement.parentElement.remove();

}


themeButton.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

});