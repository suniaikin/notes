export const model = {
	notes: [],

	deleteNote(id) {
		this.notes = this.notes.filter(note => note.id !== id);
	},
};