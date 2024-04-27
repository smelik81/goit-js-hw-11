
export function searchPhoto(searchImages) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '43587882-3fd012595c4df59010c013d1f';

  const params = new URLSearchParams({
    key: API_KEY,
    q: searchImages,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

    return fetch(`${BASE_URL}?${params}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(response.status);
            }
            return response.json();
  });
}