
// Model

const model = {

	notes: [],

	addNote(note) {
		this.notes.unshift(note)
	},

	delete(noteId) {
		this.notes = this.notes.filter((note) => noteId !== note.id)
	},

	toggleFavorite(noteId) {
		const note = this.notes.find(note => noteId === note.id)
		if (note) {
			note.isFavorite = !note.isFavorite
		}
	},

	editNote(noteId, newData) {
		const note = this.notes.find(note => noteId === note.id)
		if (note) {
			note.title = newData.title
			note.text = newData.text
			note.color = newData.color
		}
	},

	filterFavorite() {
		return this.notes.filter((note) => note.isFavorite)
	}
}

// View

const view = {

	// отрисовка

	renderHeader() {
		const header = document.getElementById('header-container')

		const logo = document.createElement('div')
		logo.classList.add('logo');
		logo.textContent = ICONS.LOGO

		const counter = document.createElement('div')
		counter.classList.add('notes-counter')

		header.append(logo, counter)
	},

	renderForm() {
		const container = document.getElementById('form-container')
		const form = document.createElement('div')
		form.classList.add('form')

		const titleInput = this.renderTitleInput()
		const textarea = this.renderTextarea()
		const colorPicker = this.renderColorPicker()
		const addButton = this.renderAddButton()

		form.append(titleInput, textarea, colorPicker, addButton)
		container.append(form)
	},


	renderTitleInput() {
		const titleInput = document.createElement('input')
		titleInput.type = "text"
		titleInput.classList.add('titleInput')
		titleInput.placeholder = TEXT_CONSTANTS.TITLE_INPUT
		return titleInput
	},

	renderTextarea() {
		const textArea = document.createElement('textarea')
		textArea.classList.add('textArea')
		textArea.placeholder = TEXT_CONSTANTS.TEXT_AREA
		return textArea
	},

	renderColorPicker() {
		const colorPicker = document.createElement('div')
		colorPicker.classList.add('color-picker')
		Object.values(NOTE_COLORS).forEach(color => {
			const circle = document.createElement('button')
			circle.classList.add('color-circle')
			circle.style.backgroundColor = color
			colorPicker.append(circle)
		})

		return colorPicker
	},

	renderAddButton() {
		const addButton = document.createElement('button')
		addButton.classList.add('add-button')
		addButton.textContent = TEXT_CONSTANTS.ADD_BUTTON
		return addButton
	},

	renderNotes(notes) {
		const container = document.getElementById('notes-container')
		container.replaceChildren()

		notes.forEach(note => {
			const card = this.renderNoteCard(note)
			container.append(card)
		})
	},

	renderNoteCard(note) {
		const card = document.createElement('div')
		card.classList.add('note-card')
		card.style.backgroundColor = note.color

		const title = document.createElement('h3')
		title.textContent = note.title
		title.classList.add('note-title')

		const text = document.createElement('p')
		text.textContent = note.text
		text.classList.add('note-text')

		// Контейнер для кнопок на заметке
		const buttons = document.createElement('div')
		buttons.classList.add('note-buttons')

		//__кнопка избранного
		const favoriteBtn = document.createElement('button')
		favoriteBtn.textContent = note.isFavorite ? ICONS.FAVORITE_BUTTON : ICONS.UNFAVORITE_BUTTON
		favoriteBtn.classList.add('favorite-btn')

		// __кнопка удаления
		const deleteBtn = document.createElement('button')
		deleteBtn.textContent = ICONS.DELETE_BUTTON
		deleteBtn.classList.add('delete-btn')

		buttons.append(favoriteBtn, deleteBtn)
		card.append(title, text, buttons)

		return card
	},

	showAlert(message) {
		const alert = document.createElement('div');
		alert.classList.add('alert');
		alert.textContent = message;
		document.body.append(alert);
		setTimeout(() => alert.remove(), 3000);
	},

	updateCalculation(count) {
		const counter = document.querySelector('.notes-counter');
		counter.textContent = TEXT_CONSTANTS.CALCULATOR + count;
	},

	cleanForm() {
		const titleInput = document.querySelector('.titleInput')
		titleInput.value = ''
		const textArea = document.querySelector('.textArea')
		textArea.value = ''
	}
}

// Controller

const controller = {

	init() {
		view.renderHeader();
		view.renderForm();
		this.events();
		this.render();
	},

	render() {
		view.renderNotes(model.notes);
		view.updateCalculation(model.notes.length);
	},

	events() {
		const addButton = document.querySelector('.add-button');
		addButton.addEventListener('click', () => {
			const titleInput = document.querySelector('.titleInput');
			const textArea = document.querySelector('.textArea');

			const newNote = {
				id: Date.now(),
				title: titleInput.value,
				text: textArea.value,
				color: 'yellow', // пока хардкод
				isFavorite: false
			};

			model.addNote(newNote);
			this.render();
			view.cleanForm();
			view.showAlert('Заметка добавлена!');
		});
	}

}
