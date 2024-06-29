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

let mylibrary = [];

// class
class Book {
    constructor(Name, author, pages, read) {
        this.Name = Name;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(read);
    }


    changeRead() {
        this.read = this.read === false ? true : false;
    }
}

// functions
const addBookToLibrary = function (book) {
    mylibrary.push(book);
};
const displayFormOverlay = function () {
    formado.classList.remove('hidden');
    overlay.classList.remove('hidden');
};
const removeformOverlay = function () {
    formado.classList.add('hidden');
    overlay.classList.add('hidden');
};
const removeFormOverlayWindow = function () {
    return function (e) {
        if (e.key === 'Escape') {
            removeformOverlay();
        }
    };
};
const submitForm = function () {
    return function (e) {
        e.preventDefault();
        const title = formTitle.value;
        const author = formAuthor.value;
        const nPages = formNpages.value;
        const entry = new Book(title, author, nPages, formCheck.checked);
        addBookToLibrary(entry);
        newCard();

        formTitle.value = formAuthor.value = formNpages.value = '';
        removeformOverlay();
        textDiv.classList.add('text__div__transform');
        listDiv.classList.add('list__div__transform');
    };
};

const toggleReadStatus = function (el, btn) {
    return function () {
        el.changeRead();
        btn.textContent = el.read === true ? 'Read ✔️' : 'Unread ❌';
    };
};
const deleteBookCard = function (i) {
    return function (e) {
        const clicked = e.target.closest('.ul__list');
        const toDelete = clicked.querySelector(`.list__item--${i + 1}`);
        toDelete.remove();
        mylibrary.pop();
        if (mylibrary.length === 0)
            textDiv.classList.remove('text__div__transform');
    };
};

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

// submit form
formado.addEventListener('submit', submitForm());

// display form and modal
btnNewBook.addEventListener('click', displayFormOverlay);

// remove form and modal
overlay.addEventListener('click', removeformOverlay);
closeIcon.addEventListener('click', removeformOverlay);

window.addEventListener('keydown', removeFormOverlayWindow());