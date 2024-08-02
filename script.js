// window.console.log('testing');
const imageContainer=document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let imageLoaded=0;
let totoalImages=0;
let photosArray=[];

// Unsplash API
const count =30;
const apiKey='KUMHNgJkScHMnA9u3cZ40tqEed5eQJv826R9fyrfczM';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check if all images were loaded

function imagesLoaded(){
    // console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totoalImages){
        ready = true;
        console.log('ready =', ready);
    }
}

// helper fnction to set attribtes on DOM elements
function setAttribute(elements,attribtes){
    for(const key in attribtes){
        elements.setAttribute(key,attribtes[key]);
    }
}

// Create Elements For Links and Photos add to DOM
function displayPhotos(){
    totoalImages = photosArray.length;
    console.log('totoal images', totoalImages);
    // run function for each object in photoarray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttribute(item, {
            href: photo.links.html, target:'_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttribute(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // event lister check when each is finished loading
        img.addEventListener('load',imagesLoaded);
        // Put <img> inside <a> then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        // console.log(photosArray);
        // const data = await response.json();
        // console.log(data);

    }catch(error){

    }
}
// check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready =false;
        getPhotos();
        // console.log('load more');
    }
})

// on load
getPhotos();