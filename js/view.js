import { NOTE_COLORS, DEFAULT_COLOR, TEXT_CONSTANTS, ICONS } from './constants.js';
import { model } from './model.js';

export const view = {
	headerContainer: document.getElementById("header-container"),
	formContainer: document.getElementById("form-container"),
	notesСontainer: document.getElementById("notes-container"),
	selectedColor: DEFAULT_COLOR,

	createHeader() {
		const appHeader = document.createElement("div");
		appHeader.classList.add("appHeader");

		const logo = document.createElement("div");
		logo.classList.add("appHeader-logo");
		logo.textContent = ICONS.LOGO;

		const title = document.createElement("h1");
		title.classList.add("appHeader-title");
		title.textContent = TEXT_CONSTANTS.LOGO_TEXT;

		const notesCount = document.createElement("div");
		notesCount.classList.add("appHeader-notesCount");
		notesCount.textContent = `${TEXT_CONSTANTS.CALCULATOR} ${model.notes.length}`;
		appHeader.append(logo, title, notesCount);
		return appHeader;
	},

	updateCounter() {
		const counter = document.querySelector(".appHeader-notesCount");
		counter.textContent = `${TEXT_CONSTANTS.CALCULATOR} ${model.notes.length}`
	},

	renderHeader() {
		const headerRender = this.createHeader();
		this.headerContainer.append(headerRender);
	},

	createForm(onAddNote) {  // ПРИНИМАЕМ CALLBACK
		const noteForm = document.createElement("div");
		noteForm.classList.add("noteForm");

		const titleInput = document.createElement("input");
		titleInput.type = "text";
		titleInput.placeholder = TEXT_CONSTANTS.TITLE_INPUT;
		titleInput.classList.add("noteForm-title");

		const textInput = document.createElement("textarea");
		textInput.placeholder = TEXT_CONSTANTS.TEXT_INPUT;
		textInput.classList.add("noteForm-text");

		noteForm.append(titleInput, textInput);

		Object.values(NOTE_COLORS).forEach(color => {
			const button = document.createElement("button");
			button.classList.add("note-color");
			button.classList.add(`note-color--${color}`);
			noteForm.append(button);

			button.addEventListener("click", () => {
				this.selectedColor = color;
				button.classList.add(`note-color-selected`);
				noteForm.querySelectorAll(".note-color").forEach(btn => {
					if (btn !== button) {
						btn.classList.remove("note-color-selected");
					}
				});
			})
		})

		const addButton = document.createElement("button");
		addButton.textContent = TEXT_CONSTANTS.ADD_BUTTON;
		addButton.classList.add("noteForm-addButton");
		noteForm.append(addButton);

		addButton.addEventListener("click", () => {
			const newNote = {
				id: Date.now(),
				title: titleInput.value,
				text: textInput.value,
				color: this.selectedColor,
				isFavorite: false
			};
			titleInput.value = "";
			textInput.value = "";
			onAddNote(newNote);  // ВЫЗЫВАЕМ CALLBACK
		});

		return noteForm;
	},

	renderForm(onAddNote) {  // ПРИНИМАЕМ CALLBACK
		const formRender = this.createForm(onAddNote);
		this.formContainer.append(formRender);
	},

	createNoteElement(note) {
		const noteElement = document.createElement("div")
		noteElement.classList.add("noteElement")
		noteElement.classList.add(`note-color--${note.color}`)
		noteElement.setAttribute("data-id", note.id)

		const titleElement = document.createElement("h3")
		titleElement.classList.add("noteElement-title");
		titleElement.textContent = note.title;

		const textElement = document.createElement("p")
		textElement.textContent = note.text;

		const controlsElement = document.createElement("div")
		controlsElement.classList.add("noteElement-controls");

		const deleteButton = document.createElement("button")
		deleteButton.classList.add("noteElement-delete");
		deleteButton.textContent = ICONS.DELETE_BUTTON;

		const favoriteButton = document.createElement("button")
		favoriteButton.classList.add("noteElement-favorite");
		favoriteButton.textContent = note.isFavorite ? ICONS.FAVORITE_BUTTON : ICONS.UNFAVORITE_BUTTON;

		noteElement.append(titleElement, controlsElement, textElement);
		controlsElement.append(favoriteButton, deleteButton);

		return noteElement;
	},

	renderNotes(notes) {
		this.notesСontainer.innerHTML = "";
		const fragment = document.createDocumentFragment();
		notes.forEach((note) => {
			const noteElement = this.createNoteElement(note);
			fragment.append(noteElement);
		})
		this.notesСontainer.append(fragment);
	},

	removeNoteElement(id) {
		const element = document.querySelector(`[data-id="${id}"]`);
		if (element !== null) {
			element.remove()
		}
	}
};


