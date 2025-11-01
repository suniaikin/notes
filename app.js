// цвета заметок
const NOTE_COLORS = {
	YELLOW: "#fbd205ff",
	GREEN: "#59be00ff",
	CYAN: "#0c00f5ff",
	PINK: "#fe0000ff",
	VIOLET: "#bb00ffff",
}

// цвет по умолчанию
const DEFAULT_COLOR = NOTE_COLORS.YELLOW;

// текстовые константы
const TEXT_CONSTANTS = {
	TITLE_INPUT: "Напишите название новой заметки...",
	TEXT_AREA: "Напишите описание новой заметки...",
	ADD_BUTTON: "Добавить заметку",
	SAVE_CHANGE: "Сохранить",
	LOGO_TEXT: "NOTES",
	TOTAL_NOTES: "Всего заметок: ",
	FAVORITE_NOTES: "Заметки в избранном: ",
	NO_NOTES: "У вас нет еще ни одной заметки\nЗаполните поля выше и создайте свою первую заметку!",
	NO_FAVORITE: "Нет избранных заметок",
	TITLE_LABEL: "Название заметки",
	TEXT_LABEL: "Описание новой заметки",
	COLOR_LABEL: "Выберите цвет заметки",
	ALERT_ADDED: "Заметка добавлена!",
	ALERT_DELETED: "Заметка удалена!",
	ALERT_UPDATED: "Заметка обновлена!",
	TITLE_MAX_LENGTH_ERROR: "Максимальная длина заголовка - 50 символов",
	TEXT_MAX_LENGTH_ERROR: "Максимальная длина описания - 500 символов",
	TITLE_EMPTY_ERROR: "Название не может быть пустым",
	TEXT_EMPTY_ERROR: "Описание не может быть пустым",
	FILTER_LABEL: "Показать только избранные заметки"

};

// иконки
const ICONS = {
	DELETE_BUTTON: "🗑",
	FAVORITE_BUTTON: "❤️",
	UNFAVORITE_BUTTON: "🤍",
	LOGO: "./images/logo.svg"
}

// максимальная длина полей
const MAX_TITLE_LENGTH = 50;
const MAX_TEXT_LENGTH = 500;

// настройки анимации алерта
const ALERT = {
	BURNING_TIME: 1500,
	DISPLAY_TIME: 2000
};

// ********** MODEL **************

const model = {
	notes: [],
	editingNoteId: null,

	loadFromStorage() {
		const saved = localStorage.getItem('notes')
		if (saved) {
			this.notes = JSON.parse(saved)
		}
	},

	saveToStorage() {
		localStorage.setItem('notes', JSON.stringify(this.notes))
	},

	addNote(note) {
		this.notes.unshift(note)
		this.saveToStorage()
	},

	delete(noteId) {
		this.notes = this.notes.filter((note) => noteId !== note.id)
		this.saveToStorage()
	},

	toggleFavorite(noteId) {
		const note = this.notes.find(note => noteId === note.id)
		if (note) {
			note.isFavorite = !note.isFavorite
		}
		this.saveToStorage()
	},

	editNote(noteId, newData) {
		const note = this.notes.find(note => noteId === note.id)
		if (note) {
			note.title = newData.title
			note.text = newData.text
			note.color = newData.color
		}
		this.saveToStorage()
	},

	filterFavorite() {
		return this.notes.filter((note) => note.isFavorite)
	},

	getNoteById(noteId) {
		return this.notes.find(note => note.id === noteId)
	},

	getFavoriteCount() {
		return this.notes.filter((note) => note.isFavorite).length
	},

}

// ********** VIEW **************

const view = {

	renderHeader() {
		const header = document.getElementById('header-container')

		const logo = document.createElement('img')
		logo.classList.add('logo');
		logo.src = ICONS.LOGO
		logo.alt = 'logo'

		const countersWrapper = document.createElement('div')
		countersWrapper.classList.add('counters-wrapper')

		const totalCounter = document.createElement('div')
		totalCounter.classList.add('notes-counter', 'total-counter')

		const favoriteCounter = document.createElement('div')
		favoriteCounter.classList.add('notes-counter', 'favorite-counter')

		countersWrapper.append(totalCounter, favoriteCounter)
		header.append(logo, countersWrapper)
	},

	renderForm() {
		const container = document.getElementById('form-container')
		const form = document.createElement('div')
		form.classList.add('form')

		// заголовок с надписью
		const titleField = document.createElement('div')
		titleField.classList.add('form-title-field')

		const titleLabel = document.createElement('label')
		titleLabel.classList.add('form-label')
		titleLabel.textContent = TEXT_CONSTANTS.TITLE_LABEL

		const titleInput = this.renderTitleInput()

		const errorMessage = document.createElement('div')
		errorMessage.classList.add('error-message')
		errorMessage.style.display = 'none'
		errorMessage.id = 'title-error'

		titleField.append(titleLabel, titleInput, errorMessage)

		// текстовое поле
		const textField = document.createElement('div')
		textField.classList.add('form-text-field')

		const textLabel = document.createElement('label')
		textLabel.classList.add('form-label')
		textLabel.textContent = TEXT_CONSTANTS.TEXT_LABEL

		const textarea = this.renderTextarea()

		const textErrorMessage = document.createElement('div')
		textErrorMessage.classList.add('error-message')
		textErrorMessage.style.display = 'none'
		textErrorMessage.id = 'text-error'

		textField.append(textLabel, textarea, textErrorMessage)

		const fieldsWrapper = document.createElement('div')
		fieldsWrapper.classList.add('fields-wrapper')
		fieldsWrapper.append(titleField, textField)

		// выбор цвета и кнопка добавления
		const bottomSection = document.createElement('div')
		bottomSection.classList.add('form-bottom')

		const colorWrapper = document.createElement('div')
		colorWrapper.classList.add('color-picker-wrapper')

		const colorLabel = document.createElement('span')
		colorLabel.classList.add('color-picker-label')
		colorLabel.textContent = TEXT_CONSTANTS.COLOR_LABEL

		const colorPicker = this.renderColorPicker()

		colorWrapper.append(colorLabel, colorPicker)

		const addButton = this.renderAddButton()

		bottomSection.append(colorWrapper, addButton)

		form.append(fieldsWrapper, bottomSection)
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
		const xxx = Object.values(NOTE_COLORS)
		Object.values(NOTE_COLORS).forEach((color, index) => {
			// создание кружка цвета
			const circle = document.createElement('button')
			circle.classList.add('color-circle')
			circle.style.backgroundColor = color
			circle.dataset.color = color
			// выделение первого цвета по умолчанию
			if (index === 0) {
				circle.classList.add('selected')
			}

			colorPicker.append(circle)
		})

		return colorPicker
	},

	renderAddButton() {
		const addButton = document.createElement('button')
		addButton.classList.add('add-button')
		addButton.textContent = TEXT_CONSTANTS.ADD_BUTTON
		return addButton;
	},

	renderFilter() {
		const container = document.getElementById('notes-container')
		const filterWrapper = document.createElement('div')
		filterWrapper.classList.add('filter-wrapper');

		const checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.id = 'favorite-filter'
		checkbox.classList.add('favorite-checkbox');

		const label = document.createElement('label')
		label.htmlFor = 'favorite-filter'
		label.textContent = TEXT_CONSTANTS.FILTER_LABEL;

		filterWrapper.append(checkbox, label)
		container.before(filterWrapper);
	},

	showEmptyState(message) {
		const container = document.getElementById('notes-container');
		container.replaceChildren();

		const emptyMessage = document.createElement('div');
		emptyMessage.classList.add('empty-state');
		emptyMessage.textContent = message;

		container.append(emptyMessage);
	},

	renderNotes(notes) {
		const container = document.getElementById('notes-container')
		container.replaceChildren()
		notes.forEach(note => {
			const card = this.renderNoteCard(note)
			container.append(card)
		});
	},

	renderNoteCard(note) {
		const card = document.createElement('div')
		card.classList.add('note-card')
		card.dataset.noteId = note.id
		card.style.setProperty('--card-color', note.color)
		card.dataset.noteColor = note.color
		card.style.borderColor = note.color

		const title = document.createElement('h3')
		title.textContent = note.title
		title.classList.add('note-title');

		const text = document.createElement('p')
		text.textContent = note.text
		text.classList.add('note-text');

		// контейнер для кнопок на заметке
		const buttons = document.createElement('div')
		buttons.classList.add('note-buttons');

		// кнопка избранного
		const favoriteBtn = document.createElement('div')
		favoriteBtn.textContent = note.isFavorite ? ICONS.FAVORITE_BUTTON : ICONS.UNFAVORITE_BUTTON
		favoriteBtn.classList.add('favorite-btn');

		// Кнопка удаления
		const deleteBtn = document.createElement('div')
		deleteBtn.textContent = ICONS.DELETE_BUTTON
		deleteBtn.classList.add('delete-btn')

		const titleBtnWrapper = document.createElement('div')
		titleBtnWrapper.classList.add('btn-wrapper')

		buttons.append(favoriteBtn, deleteBtn)
		titleBtnWrapper.append(title, buttons)

		card.append(titleBtnWrapper, text)

		return card;
	},

	showAlert(message) {
		let alertContainer = document.querySelector('.alert-container');
		if (!alertContainer) {
			alertContainer = document.createElement('div');
			alertContainer.classList.add('alert-container');
			document.body.append(alertContainer);
		}

		const alert = document.createElement('div');
		alert.classList.add('alert', 'alert--neon');
		alert.textContent = message;
		alertContainer.append(alert);

		// анимация исчезновения
		setTimeout(() => {
			alert.classList.add('burning');
			setTimeout(() => alert.remove(), ALERT.BURNING_TIME);
		}, ALERT.DISPLAY_TIME);
	},


	updateCounters(totalCount, favoriteCount) {
		const totalCounter = document.querySelector('.total-counter')
		const favoriteCounter = document.querySelector('.favorite-counter')

		if (totalCounter) {
			totalCounter.textContent = TEXT_CONSTANTS.TOTAL_NOTES + totalCount;
		}

		if (favoriteCounter) {
			favoriteCounter.textContent = TEXT_CONSTANTS.FAVORITE_NOTES + favoriteCount;
		}
	},

	cleanForm() {
		const titleInput = document.querySelector('.titleInput')
		titleInput.value = ''
		const textArea = document.querySelector('.textArea')
		textArea.value = '';

		// cброс выбора цвета на первый
		const circles = document.querySelectorAll('.color-circle')
		circles.forEach((circle, index) => {
			if (index === 0) {
				circle.classList.add('selected')
			} else {
				circle.classList.remove('selected')
			}
		})

		// cброс сообщений об ошибках
		const titleError = document.getElementById('title-error')
		if (titleError) {
			titleError.style.display = 'none'
		}

		const textError = document.getElementById('text-error')
		if (textError) {
			textError.style.display = 'none'
		}
		// cброс текста на кнопке 
		const addButton = document.querySelector('.add-button')
		addButton.textContent = TEXT_CONSTANTS.ADD_BUTTON
	},


	showTitleError(show) {
		const errorMsg = document.getElementById('title-error')
		if (show) {
			errorMsg.textContent = TEXT_CONSTANTS.TITLE_MAX_LENGTH_ERROR
			errorMsg.style.display = 'flex'
		} else {
			errorMsg.style.display = 'none'
		}
	},

	showTextError(show) {
		const errorMsg = document.getElementById('text-error')
		if (show) {
			errorMsg.textContent = TEXT_CONSTANTS.TEXT_MAX_LENGTH_ERROR
			errorMsg.style.display = 'flex'
		} else {
			errorMsg.style.display = 'none'
		}
	},

	fillFormForEdit(note) {
		const titleInput = document.querySelector('.titleInput')
		const textArea = document.querySelector('.textArea')
		const addButton = document.querySelector('.add-button')

		titleInput.value = note.title
		textArea.value = note.text
		addButton.textContent = TEXT_CONSTANTS.SAVE_CHANGE
		addButton.classList.add('save-mode')


		// выделение цвета заметки
		const circles = document.querySelectorAll('.color-circle')
		circles.forEach(circle => {
			if (circle.dataset.color === note.color) {
				circle.classList.add('selected')
			} else {
				circle.classList.remove('selected')
			}
		})

		// скролл к форме
		document.querySelector('.form').scrollIntoView({ behavior: 'smooth', block: 'center' })
	}
}

// ********** CONTROLLER **************

const controller = {

	pickedColor: DEFAULT_COLOR,

	init() {
		model.loadFromStorage()
		view.renderHeader()
		view.renderForm()
		view.renderFilter()
		this.events()
		this.render()
	},

	render() {
		const filterCheckbox = document.querySelector('.favorite-checkbox');
		const totalCount = model.notes.length;
		const favoriteCount = model.getFavoriteCount();

		// обновление счётчиков
		view.updateCounters(totalCount, favoriteCount);

		// фильтр включен
		if (filterCheckbox && filterCheckbox.checked) {
			const favoriteNotes = model.filterFavorite();
			if (favoriteNotes.length === 0) {
				view.showEmptyState(TEXT_CONSTANTS.NO_FAVORITE);
			} else {
				view.renderNotes(favoriteNotes);
			}
		} else {
			// фильтр выключен
			if (model.notes.length === 0) {
				view.showEmptyState(TEXT_CONSTANTS.NO_NOTES);
			} else {
				view.renderNotes(model.notes);
			}
		}
	},

	validateTitle(title) {
		// проверка на пустоту
		if (title.trim() === '') {
			view.showTitleError(true)
			const errorMsg = document.getElementById('title-error')
			errorMsg.textContent = TEXT_CONSTANTS.TITLE_EMPTY_ERROR
			return false
		}

		// проверка на превышение длины
		if (title.length > MAX_TITLE_LENGTH) {
			view.showTitleError(true)
			return false
		}

		view.showTitleError(false)
		return true
	},

	validateText(text) {
		// проверка на пустоту
		if (text.trim() === '') {
			view.showTextError(true)
			const errorMsg = document.getElementById('text-error')
			errorMsg.textContent = TEXT_CONSTANTS.TEXT_EMPTY_ERROR
			return false
		}

		// проверка на превышение длины
		if (text.length > MAX_TEXT_LENGTH) {
			view.showTextError(true)
			return false
		}

		view.showTextError(false)
		return true
	},

	events() {
		const addButton = document.querySelector('.add-button')
		const notesContainer = document.getElementById('notes-container')
		const titleInput = document.querySelector('.titleInput')
		const textArea = document.querySelector('.textArea')

		// проверка заголовка на вводе
		titleInput.addEventListener('input', (event) => {
			this.validateTitle(event.target.value)
		})

		// проверка текста на вводе
		textArea.addEventListener('input', (event) => {
			this.validateText(event.target.value)
		})

		// добавление или сохранение заметки
		addButton.addEventListener('click', () => {
			// валидация полей
			const isTitleValid = this.validateTitle(titleInput.value)
			const isTextValid = this.validateText(textArea.value)

			if (!isTitleValid || !isTextValid) {
				return;
			}

			// проверка на режим редактирования

			if (model.editingNoteId) {

				// обновляем существующую заметку

				model.editNote(model.editingNoteId, {
					title: titleInput.value,
					text: textArea.value,
					color: this.pickedColor
				})
				model.editingNoteId = null
				view.showAlert(TEXT_CONSTANTS.ALERT_UPDATED)
				const addButton = document.querySelector('.add-button')
				addButton.classList.remove('save-mode')


			} else {
				// добавляем новую заметку
				const newNote = {
					id: Date.now(),
					title: titleInput.value,
					text: textArea.value,
					color: this.pickedColor,
					isFavorite: false
				};
				model.addNote(newNote)
				view.showAlert(TEXT_CONSTANTS.ALERT_ADDED)
			}

			this.render()
			view.cleanForm()
		})

		// слушатель кликов по заметкам
		notesContainer.addEventListener('click', (event) => {
			const card = event.target.closest('.note-card')
			if (!card) return

			const noteId = Number(card.dataset.noteId)

			// если клик на конпку удаления
			if (event.target.closest('.delete-btn')) {
				event.stopPropagation()
				model.delete(noteId)
				this.render()
				view.showAlert(TEXT_CONSTANTS.ALERT_DELETED)

				// сброс режима редактирования если заметка удалена
				if (model.editingNoteId === noteId) {
					model.editingNoteId = null
					view.cleanForm()
				}
				return
			}

			// если клик на кнопку избранного
			if (event.target.closest('.favorite-btn')) {
				event.stopPropagation()
				model.toggleFavorite(noteId)
				this.render()
				return
			}

			// если не удаление и не избранное -запуск редактирования заметки
			const note = model.getNoteById(noteId)
			if (note) {
				model.editingNoteId = noteId
				view.fillFormForEdit(note)
				this.pickedColor = note.color
			}
		})

		// выбор цвета заметки
		const colorPicker = document.querySelector('.color-picker')
		colorPicker.addEventListener('click', (event) => {
			const circle = event.target.closest('.color-circle')
			if (circle) {
				// убрать выделение со всех кружков
				document.querySelectorAll('.color-circle').forEach(color => {
					color.classList.remove('selected')
				})

				// выделить выбранный кружок
				circle.classList.add('selected')

				// сохранить выбранный цвет
				this.pickedColor = circle.dataset.color
			}
		})

		// фильтр избранного
		const filterCheckbox = document.querySelector('.favorite-checkbox');
		filterCheckbox.addEventListener('change', () => {
			this.render();
		});
	}
}



controller.init();