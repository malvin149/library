import { Book } from "./book.js"

export const Library = (function () {
	const myLibrary = []

	function addBook(title, author, pages, read) {
		const book = new Book(title, author, pages, read)
		myLibrary.push(book)
	}
	function removeBook(id) {
		const idx = myLibrary.findIndex((book) => book.id === id)
		if (idx === -1) return "Book not found"
		myLibrary.splice(idx, 1)
	}
	function toggleRead(id) {
		const foundBook = myLibrary.find((book) => book.id === id)
		foundBook.toggleRead()
	}
	function getAllBooks() {
		return myLibrary
	}

	return { addBook, removeBook, getAllBooks, toggleRead }
})()
