// цвета заметок
const NOTE_COLORS = { // цвета заметок
	YELLOW: "yellow",
	GREEN: "green",
	BLUE: "blue",
	PINK: "pink",
	VIOLET: "violet",
}

// цвет по умолчанию для новых заметок
const DEFAULT_COLOR = NOTE_COLORS.YELLOW;

// текстовые константы
const TEXT_CONSTANTS = {
	TITLE_INPUT: "Напишите название новой заметки...",
	TEXT_AREA: "Напишите текст новой заметки...",
	ADD_BUTTON: "Добавить",
	LOGO_TEXT: "NOTES",
	CALCULATOR: "Всего заметок: ",
};

// иконки
const ICONS = {
	DELETE_BUTTON: "❌",
	FAVORITE_BUTTON: "🌞",
	UNFAVORITE_BUTTON: "⛅",
	LOGO: "📝"
}



// model

const model = {
	notes: [],
	addNote(note) {
		this.notes.unshift(note)
	},
	delete(noteId) {
		this.notes = this.notes.filter((note) => noteId !== note.id)
	},
	toggleFavorite(noteId) {
		const note = this.notes.find(note => noteId === note.id);
		if (note) {
			note.isFavorite = !note.isFavorite;
		}
	},
	editNote(noteId, newData) {
		const note = this.notes.find(note => noteId === note.id);
		if (note) {
			note.title = newData.title;
			note.text = newData.text;
			note.color = newData.color;
		}
	},
	filterFavorite() {
		return this.notes.filter((note) => note.isFavorite)
	}
}

// view

const view = {

	/*================================================================*/

	renderForm() {
		const container = document.getElementById('form-container');
		const form = document.createElement('div');
		form.classList.add('form');

		const titleInput = this.createTitleInput();
		const textarea = this.createTextarea();
		const colorPicker = this.createColorPicker();
		const addButton = this.createAddButton();

		form.append(titleInput, textarea, colorPicker, addButton);
		container.append(form);
	},

	createTitleInput() {
		const titleInput = document.createElement('input');
		titleInput.type = "text";
		titleInput.classList.add('textInput')
		titleInput.placeholder = TEXT_CONSTANTS.TITLE_INPUT;
		return titleInput;
	},

	createTextarea() {
		const textArea = document.createElement('textarea');
		textArea.classList.add('textArea')
		textArea.placeholder = TEXT_CONSTANTS.TEXT_AREA;
		return textArea
	},

	createColorPicker() {
		const colorPicker = document.createElement('div');
		container.classList.add('color-picker');
		Object.values(NOTE_COLORS).forEach(color => {
			const circle = document.createElement('button');
			circle.classList.add('color-circle');
			circle.style.backgroundColor = color;
			colorPicker.append(circle);
		});

		return colorPicker;
	},

	createAddButton() {
		const addButton = document.createElement('button');
		addButton.classList.add('add-button')
		addButton.textContent = TEXT_CONSTANTS.ADD_BUTTON
		return addButton
	},

	/*================================================================*/

	renderNotes(notes) {
		const container = document.getElementById('notes-container');
		container.replaceChildren();

		notes.forEach(note => {
			const card = this.createNoteCard(note);
			container.append(card);
		});
	},

	createNoteCard(note) {
		const card = document.createElement('div');
		card.classList.add('note-card');
		card.style.backgroundColor = note.color;

		const title = document.createElement('h3');
		title.textContent = note.title;
		title.classList.add('note-title');

		const text = document.createElement('p');
		text.textContent = note.text;
		text.classList.add('note-text');

		// Контейнер для кнопок на заметке
		const buttons = document.createElement('div');
		buttons.classList.add('note-buttons');

		//__кнопка избранного
		const favoriteBtn = document.createElement('button');
		favoriteBtn.textContent = note.isFavorite ? ICONS.FAVORITE_BUTTON : ICONS.UNFAVORITE_BUTTON;
		favoriteBtn.classList.add('favorite-btn');

		// __кнопка удаления
		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = ICONS.DELETE_BUTTON;
		deleteBtn.classList.add('delete-btn');

		buttons.append(favoriteBtn, deleteBtn);
		card.append(title, text, buttons);

		return card;
	},

	showAlert(message) {

	},

	updateCalculation(count) {

	},

	cleanForm() {

	}
}