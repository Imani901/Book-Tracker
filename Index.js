document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("book-form");
    const bookList = document.getElementById("book-list");
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const rateInput = document.getElementById("rating");
    const commentInput = document.getElementById("comment");
    console.log(commentInput)
    const submitButton = bookForm.querySelector("button[type='submit']");
    let books = [];

    function renderBooks() {
        bookList.innerHTML = "";
        books.forEach((book, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.rating ? book.rating + ' ★' : 'Not rated'}</td>
                <td>${book.comment || 'No comments'}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                    <button class="rate" data-index="${index}">Rate</button>
                </td>
            `;
            bookList.appendChild(tr);
        });
    }

    bookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = titleInput.value; 
        const author = authorInput.value; 
        const rating = rateInput.value;
        const comment = commentInput.value;

        const newBook = { title, author, rating: null, comment: null };
        books.push(newBook);
        renderBooks();
        bookForm.reset();
    });

    bookList.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (e.target.classList.contains("delete")) {
            deleteBook(index);
        } else if (e.target.classList.contains("edit")) {
            editBook(index);
        } else if (e.target.classList.contains("rate")) {
            rateBook(index);
        }
    });

    const deleteBook = (index) => {
        books.splice(index, 1);
        renderBooks();
    };

    const editBook = (index) => {
        const newTitle = prompt("Enter new title:", books[index].title);
        const newAuthor = prompt("Enter new author:", books[index].author);
        const newRating = prompt ("Enter new rating:", books[index].rating);
        const newcomment = prompt (" Add a new comment:", books[index].comment);
        if (newTitle && newAuthor && newRating && newcomment) {
            books[index] = { ...books[index], title: newTitle, author: newAuthor, rating:newRating, comment:newcomment };
            renderBooks();
        }
    };

    

    titleInput.addEventListener("input", checkInputFields);
    authorInput.addEventListener("input", checkInputFields);

    function checkInputFields() {
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        
        submitButton.disabled = !(title && author);
    }
});