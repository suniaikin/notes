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



const view = {

	renderInputForm() {
		const container = document.getElementById('app');
		const form = document.createElement('div');
		form.className = 'form';

		form.append(this.createTitleInput());
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
		const container = document.createElement('div');
		container.className = 'color-picker';

		Object.values(NOTE_COLORS).forEach(color => {
			const container = document.createElement('div');
			container.className = 'color-picker';
			Object.values(NOTE_COLORS).forEach(color => {
				const circle = document.createElement('button');
				circle.className = 'color-circle';
				circle.style.backgroundColor = color;
				container.append(circle);
			});

			container.append(circle);

			return container;
		},

			renderAddedNotes(notes) {

		},

			showAlert(message) {

		},

			updateCalculation(count) {

		},

			cleanForm() {

		}
}