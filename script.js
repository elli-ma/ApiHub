const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', searchRepositories);
searchInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    searchRepositories();
  }
});

function searchRepositories() {
  const query = searchInput.value.trim();

  if (query.length === 0) {
    alert('Введите текст для поиска');
    return;
  }

  fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10`)
    .then(response => response.json())
    .then(data => {
      if (data.items.length === 0) {
        searchResults.innerHTML = 'Ничего не найдено';
        return;
      }

      const results = data.items.map(item => {
        return `
          <div>
            <a href="${item.html_url}" target="_blank">${item.name}</a>
            <p>${item.description}</p>
            <p>Language: ${item.language}</p>
            <p>Stars: ${item.stargazers_count}</p>
          </div>
        `;
      });

      searchResults.innerHTML = results.join('');
    })
    .catch(error => console.error(error));
}