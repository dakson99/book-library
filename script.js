'use strict';

// selectors
const textDiv = document.querySelector('.text__div');
const listDiv = document.querySelector('.list__div');
const list = document.querySelector('.ul__list');
const btnDiv = document.querySelector('.card__buttons');
const btnNewBook = document.querySelector('.button__new__book');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formNpages = document.querySelector('#nPages');
const formCheck = document.querySelector('#checkRead');

const formado = document.querySelector('.formado');
const btnSubmit = document.querySelector('#submit');
const btnForm = document.querySelector('.btn__form');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('.close__icon');

const title = formTitle.value;
const author = formAuthor.value;
const nPages = formNpages.value;

class BookClass {
    myLibrary;

    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.nPages = pages;
        this.read = Boolean(read);

        this.myLibrary = [];
    }

    changeRead() {
        this.read = this.read === false ? true : false;
    }

    addBookToLibrary() {
        this.myLibrary.push(this.name, this.author, this.nPages, this.read);
        this.newCard();

        formTitle.value = formAuthor.value = formNpages.value = '';

        this.removeformOverlay();
        textDiv.classList.add('text__div__transform');
        listDiv.classList.add('list__div__transform');
    }

    displayFormOverlay() {
        formado.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }

    removeformOverlay() {
        formado.classList.add('hidden');
        overlay.classList.add('hidden');
    }

    removeFormOverlayWindow() {
        return function (e) {
            if (e.key === 'Escape') {
                this.removeformOverlay();
            }
        };
    }

    toggleReadStatus(el, btn) {
        return function () {
            el.changeRead();
            btn.textContent = el.read === true ? 'Read ✔️' : 'Unread ❌';
        };
    }

    deleteBookCard(i) {
        return function (e) {
            const clicked = e.target.closest('.ul__list');
            const toDelete = clicked.querySelector(`.list__item--${i + 1}`);

            toDelete.remove();
            mylibrary.pop();
            if (mylibrary.length === 0)
                textDiv.classList.remove('text__div__transform');
        };
    }

    newCard = function () {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        mylibrary.forEach((el, i) => {
            // li element
            const newItem = document.createElement('li');
            newItem.classList.add('list__item__style');
            newItem.classList.add(`list__item--${i + 1}`);

            newItem.innerHTML = `<p class="card__book__name">${el.Name}
        </p ><p class="card__book__author">- ${el.author}
        </p><p class="card__page__number">${el.pages} pages</p>`;

            // const divButtons
            const divButtons = document.createElement('div');
            divButtons.classList.add('card__buttons');

            // button read status
            const newRead = document.createElement('button');
            newRead.classList.add('btn');
            newRead.classList.add('card__boolean');
            newRead.textContent = el.read === true ? 'Read ✔️' : 'Unread ❌';

            // button delete
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn');
            btnDelete.classList.add('button__delete');
            btnDelete.textContent = 'Delete Book';

            // append buttons to div
            divButtons.appendChild(newRead);
            divButtons.appendChild(btnDelete);

            // append div to li
            newItem.appendChild(divButtons);

            // append li to ul
            list.appendChild(newItem);

            // delete item
            btnDelete.addEventListener('click', deleteBookCard(i));

            // change read status
            newRead.addEventListener('click', toggleReadStatus(el, newRead));
        });
    };
}

const newBookClass = new BookClass(title, author, nPages, formCheck.checked);

// submit form
formado.addEventListener('submit', function (e) {
    e.preventDefault();
    newBookClass.addBookToLibrary();
});


// display form and modal
btnNewBook.addEventListener('click', newBookClass.displayFormOverlay);

// remove form and modal
overlay.addEventListener('click', newBookClass.removeformOverlay);
closeIcon.addEventListener('click', newBookClass.removeformOverlay);

window.addEventListener('keydown', newBookClass.removeFormOverlayWindow());