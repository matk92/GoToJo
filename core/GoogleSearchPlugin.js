class GoogleSearchPlugin {
  search = async (search) => {
    return new Promise((resolve, reject) => {
      // AIzaSyCHzRzxCzN42920CeHDKr1oLnTKciqDIpU
      // AIzaSyA3PYeK4r1vnaCPqQ7hC4a9XjGmfqg_4_0
      const encodedSearch = encodeURIComponent(search.trim().toLowerCase());
      fetch(
        "https://www.googleapis.com/customsearch/v1?key=AIzaSyCHzRzxCzN42920CeHDKr1oLnTKciqDIpU&cx=639a89b0e9e4343b0&q=" +
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
        "https://www.googleapis.com/customsearch/v1?key=AIzaSyCHzRzxCzN42920CeHDKr1oLnTKciqDIpU&cx=639a89b0e9e4343b0&q=" +
          encodedSearch +
          "&searchType=image"
      )
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });
}

export default new GoogleSearchPlugin();
