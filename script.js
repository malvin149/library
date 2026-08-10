const myLibrary = []

function Book(title, author, pages, read) {
	if (!new.target) {
		throw new Error("You must use the 'new' operator to call the constructor")
	}

	this.id = crypto.randomUUID()
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
}

// Shared behavior lives on the prototype, not the constructor,
// so every Book instance uses one shared function instead of 
// each instance getting its own duplicate copy in memory.
Book.prototype.info = function () {
	return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`
}

Book.prototype.toggleRead = function () {
	this.read = !this.read
}

function addBookToLibrary(title, author, pages, read) {
	const book = new Book(title, author, pages, read)
	myLibrary.push(book)
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

		toggleBtn.classList.add("toggle-btn")
		removeBtn.classList.add("remove-btn")

		title.textContent = `${book.title}`
		toggleBtn.textContent = `${book.read ? "Not read yet" : "Read"}`
		removeBtn.textContent = `Delete`

		const fields = [
			{ label: "Author:", value: book.author },
			{ label: "Pages:", value: book.pages },
		]

		fields.forEach((field) => {
			const rowDiv = document.createElement("div")
			const labelSpan = document.createElement("span")
			const valueSpan = document.createElement("span")

			labelSpan.textContent = `${field.label}:`
			valueSpan.textContent = `${field.value}`

			rowDiv.appendChild(labelSpan)
			rowDiv.appendChild(valueSpan)
			infoContainer.appendChild(rowDiv)
		})

		const statusRow = document.createElement("div")
		const statusLabel = document.createElement("span")
		const statusValueWrapper = document.createElement("span")
		const statusDot = document.createElement("span")
		const statusText = document.createElement("span")

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
