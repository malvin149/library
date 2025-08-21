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

        booksContainer.appendChild(bookCard);
    })

}

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, true);
addBookToLibrary('The Lord of the rings', 'J.R.R Tolkien', 1178, false);
addBookToLibrary('The The Great Gatsby', 'F. Scott Fitzgerald', 180, true);

displayBooks();