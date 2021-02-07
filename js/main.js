import images from "./gallery-items.js"

const galleryRef = document.querySelector('.gallery');
const lightBoxRef = document.querySelector('.lightbox');
const bigImageRef = document.querySelector('.lightbox__image');

let index;
let imgIndex;


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

galleryRef.addEventListener('click', event => {
    event.preventDefault();
    if(!event.target.classList.contains('gallery__image')) return;
    lightBoxRef.classList.add('is-open');
    const imgLink = event.target.dataset.source;
    const imgAlt = event.target.alt;
    bigImageRef.setAttribute('src', imgLink);
    bigImageRef.setAttribute('alt', imgAlt);
    imgIndex = event.target.dataset.index;
})

lightBoxRef.addEventListener('click', event => {
    if(!event.target.classList.contains('lightbox__button') && !event.target.classList.contains('lightbox__overlay')) return;
    lightBoxRef.classList.remove('is-open'); //вынести в функци
    bigImageRef.setAttribute('src', '');
})

window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
    lightBoxRef.classList.remove('is-open');
    bigImageRef.setAttribute('src', '');
    }
    // if (KeyboardEvent.key='')
})

window.addEventListener('keydown', event => {

    if ( event.key === 'ArrowLeft' && imgIndex > 0) {
        imgIndex -= 1;
        bigImageRef.setAttribute('src', images[imgIndex].original)
    } else if (event.key === 'ArrowRight' && imgIndex < images.length-1) {
        imgIndex += 1;
        bigImageRef.setAttribute('src', images[imgIndex].original)
    } 
   
})



// lightBoxRef.classList.contains('is-open') &&