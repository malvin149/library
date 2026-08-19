import { Library } from "./library.js"
import { displayBooks, container } from "./display.js"

const showFormBtn = document.querySelector("#show-form-btn")
const dialog = document.querySelector("#dialog-content")
const closeFormBtn = document.querySelector("#close-form-btn")
const form = document.querySelector("#add-book-form")
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")
const readCheckbox = document.querySelector("#read")

// One listener on the container instead of one per button - cards
// get rebuilt on every render, so per-button listeners would need
// to be reattached every time, Delegation avoids that entirely.
container.addEventListener("click", (e) => {
	if (e.target.matches(".toggle-btn")) {
		Library.toggleRead(e.target.dataset.id)
		displayBooks()
	}
	if (e.target.matches(".remove-btn")) {
		Library.removeBook(e.target.dataset.id)
		displayBooks()
	}
})

showFormBtn.addEventListener("click", () => {
	dialog.showModal()
})

closeFormBtn.addEventListener("click", () => {
	dialog.close()
})

dialog.addEventListener("click", (e) => {
	if (e.target === dialog) {
		dialog.close()
	}
})

form.addEventListener("submit", () => {
	Library.addBook(
		titleInput.value,
		authorInput.value,
		Number(pagesInput.value),
		readCheckbox.checked,
	)

	titleInput.value = ""
	authorInput.value = ""
	pagesInput.value = ""
	readCheckbox.checked = false

	displayBooks()
})

Library.addBook("The Hobbit", "J.R.R Tolkien", 295, true)
Library.addBook("Sapiens", "Yuval Noah Harari", 443, false)
Library.addBook("Atomic Habits", "James Clear", 320, false)

displayBooks()
