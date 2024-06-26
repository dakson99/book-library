'use strict';

const list = document.querySelector('.ul__list');
const btnDiv = document.querySelector('.card__buttons');
const btnNewBook = document.querySelector('.button__new__book');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formNpages = document.querySelector('#nPages');
const formCheck = document.querySelector('#checkRead');

const form = document.querySelector('form');
const btnForm = document.querySelector('.btn__form');

let mylibrary = [];

function Book(Name, author, pages, read) {
    this.Name = Name;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
}

Book.prototype.changeRead = function () {
    this.read = this.read === false ? true : false;
};

function addBooktoLibrary(book) {
    mylibrary.push(book);
}

// display objects
const newCard = function () {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    mylibrary.forEach((el, i) => {
        // li element
        const newItem = document.createElement('li');
        newItem.classList.add('list__item__style');
        newItem.classList.add(`list__item--${i + 1}`);

        // Book Name
        const newBookName = document.createElement('p');
        newBookName.classList.add('card__book__name');
        newBookName.textContent = el.Name;

        // Book Author
        const newAuthor = document.createElement('p');
        newAuthor.classList.add('card__book__author');
        newAuthor.textContent = el.author;
        newItem.appendChild(newAuthor);

        // Book Pages
        const newPages = document.createElement('p');
        newPages.classList.add('card__page__number');
        newPages.textContent = el.pages;
        newItem.appendChild(newPages);

        // Read Boolean
        const newRead = document.createElement('button');
        newRead.classList.add('btn');
        newRead.classList.add('card__boolean');
        newRead.textContent = el.read === true ? 'Read ✔️' : 'Unread ❌';

        // Button Delete
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn');
        btnDelete.classList.add('button__delete');
        btnDelete.textContent = 'Delete Book';

        // const divButtons
        const divButtons = document.createElement('div');
        divButtons.classList.add('card__buttons');

        // append
        newItem.appendChild(newBookName);
        newItem.appendChild(newAuthor);
        newItem.appendChild(newPages);
        divButtons.appendChild(newRead);
        divButtons.appendChild(btnDelete);
        newItem.appendChild(divButtons);

        list.appendChild(newItem);

        // delete item
        btnDelete.addEventListener('click', function (e) {
            const clicked = e.target.closest('.ul__list');
            const toDelete = clicked.querySelector(`.list__item--${i + 1}`);

            toDelete.remove();
            mylibrary.pop();
        });

        // change read status
        newRead.addEventListener('click', function (e) {
            el.changeRead();
            newRead.textContent = el.read === true ? 'Read ✔️' : 'Unread ❌';
        });
    });
};

const formado = document.querySelector('.formado');

const btnSubmit = document.querySelector('#submit');
formado.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = formTitle.value;
    const author = formAuthor.value;
    const nPages = formNpages.value;

    const entry = new Book(title, author, nPages, formCheck.checked);
    addBooktoLibrary(entry);
    newCard();

    formTitle.value = formAuthor.value = formNpages.value = '';
});