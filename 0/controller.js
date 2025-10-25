import { model } from './model.js';
import { view } from './view.js';

export const controller = {
	//инициализация
	init() {
		view.renderHeader();
		view.renderForm((note) => this.handleAddNote(note));  // ПЕРЕДАЕМ CALLBACK
		view.renderNotes(model.notes);
		this.setupEventListeners();
	},

	setupEventListeners() {
		view.notesСontainer.addEventListener("click", (event) => {
			const clickedElement = event.target;
			const noteElement = clickedElement.closest('.noteElement');
			if (!noteElement) return;
			if (clickedElement.closest('.noteElement-delete')) {
				const noteId = Number(noteElement.dataset.id);
				this.handleDeleteNote(noteId);
			}
			if (clickedElement.closest('.noteElement-favorite')) {
				const noteId = Number(noteElement.dataset.id);
				this.handleFavoriteNote(noteId);
			}
		});
	},

	handleAddNote(newNote) {
		model.notes.push(newNote);
		view.renderNotes(model.notes);
		view.updateCounter();
	},

	handleDeleteNote(id) {
		model.deleteNote(id);
		view.removeNoteElement(id);
		view.updateCounter();
	},

	handleFavoriteNote(id) {
		const note = model.notes.find(note => note.id === id);
		if (note) {
			note.isFavorite = !note.isFavorite;
			view.renderNotes(model.notes);
		}
	},
};