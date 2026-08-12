function createBook(title, author, pages, read) {
	const id = crypto.randomUUID()

	return {
		id,
		title,
		author,
		pages,
		read,

		info: function () {
			return `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`
		},
		toggleRead: function () {
			read = !read
		},
	}
}

const Library = (function () {
	const myLibrary = []

	function addBook(title, author, pages, read) {
		const book = createBook(title, author, pages, read)
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

function addBookToLibrary(title, author, pages, read) {
	const book = new Book(title, author, pages, read)
	myLibrary.push(book)
}

function toggleReadStatus(bookId) {
	const foundBook = myLibrary.find((book) => book.id === bookId)
	foundBook.toggleRead()
	displayBooks()
}

function removeBook(bookId) {
	const index = myLibrary.findIndex((book) => book.id === bookId)
	myLibrary.splice(index, 1)
	displayBooks()
}

// displayBooks is the single source of DOM truth: It clears the
// container and rebuilds every card from myLibrary on each call,
// so the display never drifts out of sync with the underlying data.
const container = document.querySelector(".library")
function displayBooks() {
	container.replaceChildren()

	myLibrary.forEach((book) => {
		const card = document.createElement("div")
		const title = document.createElement("h2")
		const toggleBtn = document.createElement("button")
		const removeBtn = document.createElement("button")
		const infoContainer = document.createElement("div")

		card.dataset.id = book.id
		toggleBtn.dataset.id = book.id
		removeBtn.dataset.id = book.id

		toggleBtn.classList.add("btn", "toggle-btn")
		removeBtn.classList.add("btn", "remove-btn")

		title.textContent = `${book.title}`
		toggleBtn.textContent = `${book.read ? "Mark as Unread" : "Mark as Read"}`
		removeBtn.textContent = `Delete`

		const fields = [
			{ label: "Author", value: book.author },
			{ label: "Pages", value: book.pages },
		]

		fields.forEach((field) => {
			const rowDiv = document.createElement("div")
			const labelSpan = document.createElement("span")
			const valueSpan = document.createElement("span")

			labelSpan.textContent = `${field.label}:`
			valueSpan.textContent = `${field.value}`

			rowDiv.classList.add("info-row")

			rowDiv.appendChild(labelSpan)
			rowDiv.appendChild(valueSpan)
			infoContainer.appendChild(rowDiv)
		})

		// Status gets its own dot + colored class, built separately from
		// the generic field loop, since it needs conditional styling
		// the other rows don't.
		const statusRow = document.createElement("div")
		const statusLabel = document.createElement("span")
		const statusValueWrapper = document.createElement("span")
		const statusDot = document.createElement("span")
		const statusText = document.createElement("span")

		statusRow.classList.add("info-row")
		statusValueWrapper.classList.add("status-wrapper")
		statusDot.classList.add(
			"status-dot",
			book.read ? "status-read" : "status-unread",
		)

		statusLabel.textContent = "Status: "
		statusText.textContent = book.read ? "Read" : "Not read yet"

		statusValueWrapper.appendChild(statusDot)
		statusValueWrapper.appendChild(statusText)
		statusRow.appendChild(statusLabel)
		statusRow.appendChild(statusValueWrapper)
		infoContainer.appendChild(statusRow)

		card.appendChild(title)
		card.appendChild(infoContainer)
		card.appendChild(toggleBtn)
		card.appendChild(removeBtn)
		container.appendChild(card)
	})
}

// One listener on the container instead of one per button - cards
// get rebuilt on every render, so per-button listeners would need
// to be reattached every time, Delegation avoids that entirely.
container.addEventListener("click", (e) => {
	if (e.target.matches(".toggle-btn")) {
		toggleReadStatus(e.target.dataset.id)
	}
	if (e.target.matches(".remove-btn")) {
		removeBook(e.target.dataset.id)
	}
})

const showFormBtn = document.querySelector("#show-form-btn")
const dialog = document.querySelector("#dialog-content")
const closeFormBtn = document.querySelector("#close-form-btn")
const form = document.querySelector("#add-book-form")
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")
const readCheckbox = document.querySelector("#read")

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
	addBookToLibrary(
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

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, true)
addBookToLibrary("Sapiens", "Yuval Noah Harari", 443, false)
addBookToLibrary("Atomic Habits", "James Clear", 320, false)

displayBooks()
