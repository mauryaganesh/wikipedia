let searchInputElement = document.getElementById('searchInput');
let searchResultsElement = document.getElementById('searchResults');
let spinnerElement = document.getElementById('spinner');

function createAndAppendResult(result) {
  // Creating Result Container
  let resultItemElement = document.createElement('div');
  resultItemElement.classList.add('result-item');
  searchResultsElement.appendChild(resultItemElement);

  // Creating Title
  let { link, title, description } = result;
  let titleElement = document.createElement('a');
  titleElement.href = link;
  titleElement.target = '_blank';
  titleElement.textContent = title;
  titleElement.classList.add('result-title');
  resultItemElement.appendChild(titleElement);

  // Creating Break Element
  let titleBreakEl = document.createElement('br');
  resultItemElement.appendChild(titleBreakEl);

  // Creating URL Element
  let urlElement = document.createElement('a');
  urlElement.classList.add('result-url');
  urlElement.href = link;
  urlElement.target = '_blank';
  urlElement.textContent = link;
  resultItemElement.appendChild(urlElement);

  // Creating Break Element
  let lineBreakElement = document.createElement('br');
  resultItemElement.appendChild(lineBreakElement);

  // Creating Desctiption Element
  let descriptionElement = document.createElement('p');
  descriptionElement.classList.add('link-description');
  descriptionElement.textContent = description;
  resultItemElement.appendChild(descriptionElement);
}

function displayResults(searchResults) {
  spinnerElement.classList.toggle('d-none'); // Toggling Spinner
  /* let result = searchResults[0]; // For single search result */
  for (let result of searchResults) {
    createAndAppendResult(result);
  }
}

function searchWikipedia(event) {
  if (event.key === 'Enter') {
    spinnerElement.classList.toggle('d-none'); // Toggling Spinner
    searchResultsElement.textContent = ''; // Clearing prevoius serachs
    let searchInput = searchInputElement.value;
    // console.log(searchInputValue);
    let url = 'https://apis.ccbp.in/wiki-search?search=' + searchInput;

    let options = {
      method: 'GET',
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let { search_results } = jsonData;
        displayResults(search_results);
      });
  }
}

searchInputElement.addEventListener('keydown', searchWikipedia);
