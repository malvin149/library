import { Library } from "./library.js"

export const container = document.querySelector('.library')

// displayBooks is the single source of DOM truth: It clears the
// container and rebuilds every card from myLibrary on each call,
// so the display never drifts out of sync with the underlying data.
export function displayBooks() {
	container.replaceChildren()

	Library.getAllBooks().forEach((book) => {
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
