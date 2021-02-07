import images from "./gallery-items.js"

const galleryRef = document.querySelector('.gallery');
const lightBoxRef = document.querySelector('.lightbox');
const bigImageRef = document.querySelector('.lightbox__image');

let index;
let imgIndex;


// разметка

images.map(image => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');
    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery__link');
    galleryLink.setAttribute('href', image.original)
    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery__image');
    galleryImage.setAttribute('src', image.preview);
    galleryImage.setAttribute('data-source', image.original);
    galleryImage.setAttribute('alt', image.description);
    index = images.indexOf(image)
    galleryImage.setAttribute('data-index', index);


    galleryLink.append(galleryImage);
    galleryItem.append(galleryLink);
    galleryRef.append(galleryItem);
})

// клики

const openModal = event => {
    lightBoxRef.classList.add('is-open');
    bigImageRef.src = event.target.dataset.source;
    bigImageRef.alt = event.target.alt;
    imgIndex = Number(event.target.dataset.index);
}

const closeModal = () => {
    lightBoxRef.classList.remove('is-open');
    bigImageRef.src = '';
    bigImageRef.alt = '';
}

galleryRef.addEventListener('click', event => {
    event.preventDefault();
    if(!event.target.classList.contains('gallery__image')) return;
    openModal(event);
})

lightBoxRef.addEventListener('click', event => {
    if(!event.target.classList.contains('lightbox__button') && !event.target.classList.contains('lightbox__overlay')) return;
    closeModal();
})


// нажатие клавиш

const escapeBtn = event => {
    if (event.code === 'Escape') {
        closeModal();
    }
}

const pgUp = event => {
    if (event.code === 'ArrowRight' && imgIndex < images.length-1) {
        imgIndex += 1;
    } 
}

const pgDn = event => {
    if (event.code === 'ArrowLeft' && imgIndex > 0) {
        imgIndex -= 1;
    }
}

const changeImage = () => {
    bigImageRef.src = images[imgIndex].original;
    bigImageRef.alt = images[imgIndex].description;
}

window.addEventListener('keydown', event => {
    escapeBtn(event);
    pgUp(event);
    pgDn(event);
    changeImage();
 })
