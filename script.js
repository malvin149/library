const myLibrary = [];

function Book (title, author, pages, read) {
    if (!new.target) {
        throw new Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.id = crypto.randomUUID();

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`
    }
}


function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
    console.log(`Added a new book: ${newBook.title}`);
}


function displayBooks() {
    const booksContainer = document.getElementById('books-container');

    if (!booksContainer) {
        console.error('The element with ID "books-container" was not found.')
    }

    // Container & Card Content
    booksContainer.innerHTML = '';
    
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const title = document.createElement('h3');
        title.textContent = book.title;
        bookCard.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        bookCard.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(pages);

        const readStatus = document.createElement('p');
        readStatus.classList.add('read-status');
        readStatus.textContent = book.read ? 'Status: Read' : 'Status: Not Read Yet';
        bookCard.appendChild(readStatus);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.setAttribute('data-id', book.id);
        bookCard.appendChild(removeBtn);

        booksContainer.appendChild(bookCard);
    })

}

function removeBookFromLibrary(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);

    if (bookIndex > -1) {
        myLibrary.splice(bookIndex, 1);
    }

    displayBooks();
}


document.addEventListener('DOMContentLoaded', () => {

    const booksContainer = document.getElementById('books-container');

    booksContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const bookId = event.target.getAttribute('data-id');
            removeBookFromLibrary(bookId);
        }
    })

    // Manual addition of some books
    addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, true);
    addBookToLibrary('The Lord of the rings', 'J.R.R Tolkien', 1178, false);
    addBookToLibrary('The The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
    
    // Initial books displayed on page load
    displayBooks();
    
    // FORM & DIALOG LOGIC
    const  newBookBtn = document.getElementById('new-book-btn');
    const newBookDialog = document.getElementById('new-book-dialog');
    const bookForm = document.getElementById('book-form');
    const closeBtn = document.getElementById('close-btn');
    
    console.log('Book Form ELement:', bookForm);
    
    
    // Show the dialog when 'Add New Book' btn is clicked
    newBookBtn.addEventListener('click', () => {
        newBookDialog.showModal();
    });
    
    // Close the dialog when the close btn is clicked
    closeBtn.addEventListener('click', () => {
        newBookDialog.close();
    })
    
    
    // Form Submission
    bookForm.addEventListener('submit', (event) => {
        // prevent the default form submission behavior
        event.preventDefault();
    
        // get values from the form inputs
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;
    
        // Add the new book to the library
        addBookToLibrary(title, author, pages, read);
    
        // Update the display to show the new book
        displayBooks();
    
        // Reset the form fields and close the dialog
        bookForm.reset();
        newBookDialog.close();
    
    });
})
