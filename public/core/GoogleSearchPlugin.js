class GoogleSearchPlugin {
  search = async (search) => {
    return new Promise((resolve, reject) => {
      const encodedSearch = encodeURIComponent(search.trim().toLowerCase());
      fetch(
        "https://www.googleapis.com/customsearch/v1?key=&cx=639a89b0e9e4343b0&q=" +
          encodedSearch
      )
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });
  };

  searchImages = (search) =>
    new Promise((resolve, reject) => {
      const encodedSearch = encodeURIComponent(search.trim().toLowerCase());
      fetch(
        "https://www.googleapis.com/customsearch/v1?key=&cx=639a89b0e9e4343b0&q=" +
          encodedSearch +
          "&searchType=image"
      )
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });
}

export default new GoogleSearchPlugin();
