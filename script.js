document.addEventListener("DOMContentLoaded", function() {
    const API = "7021b6b5520944c4b0d0cd2c063008c1";
    let url = "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=";
    let input = document.querySelector(".text");
    let btn = document.querySelector(".search-btn");

    if (btn) {
        btn.addEventListener("click", () => {
            let query = input.value;
            console.log(query);
            fetchnews(query);
            // console.log("btn was clicked");
        });
    } else {
        console.error("Search button not found.");
    }

    window.addEventListener("load", () => {
        fetchnews("India");
    });

    function reload() {
        window.location.reload();
    }

    async function fetchnews(load) {
        try {
            let res = await axios.get(`${url}${load}&apikey=${API}`);
            console.log(res);
            console.log(res.data.articles);
            let articles = res.data.articles;
            console.log(articles);
            bind(articles);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    function bind(articles) {
        let maincard = document.querySelector(".main_card");
        let template = document.querySelector("#template");
        maincard.innerHTML = "";
        for (let article of articles) {
            if (!article.urlToImage) continue; // Use continue instead of return
            const clone = template.content.cloneNode(true);
            cardclone(clone, article);
            maincard.append(clone);
        }
    }

    function cardclone(clone, article) {
        let img = clone.querySelector("#pic");
        let h3 = clone.querySelector("#news-title");
        let p = clone.querySelector(".news-deck");
        let h5 = clone.querySelector("#source");

        if (img) img.setAttribute("src", article.urlToImage);
        if (h3) h3.innerHTML = article.title;
        if (p) p.innerHTML = article.description;

        const time = new Date(article.publishedAt).toLocaleString("en-us", { timeZone: "Asia/Jakarta" });
        if (h5) h5.innerHTML = `${article.source.name}, ${time}`;

        if (clone.firstElementChild) {
            clone.firstElementChild.addEventListener("click", (event) => {
                try {
                    window.open(article.url, "_blank");
                } catch (error) {
                    console.error("Error adding event listener:", error);
                }
            });
        } else {
            console.warn("First child element of clone is null or undefined.");
        }
    }

    function onNavitem(id) {
        fetchnews(id);
    }
});
