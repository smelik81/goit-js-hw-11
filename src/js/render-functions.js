export function createMarkup(arr) {
    return arr.reduce(
        (html, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
           return (html += `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="gallery-block">
                <p class="gallery-block__description"><span>likes</span>${likes}</p>
                <p class="gallery-block__description"><span>views</span>${views}</p>
                <p class="gallery-block__description"><span>comments</span> ${comments}</p>
                <p class="gallery-block__description"><span>downloads</span>${downloads}</p>
            </div>
        </li>
        `);
        }, "");
};
