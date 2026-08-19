export class Book {
	id = crypto.randomUUID()
	constructor(title, author, pages, read) {
		this.title = title
		this.author = author
		this.pages = pages
		this.read = read
	}
	info() {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`
	}
	toggleRead() {
		this.read = !this.read
	}
}