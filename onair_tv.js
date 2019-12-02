var carInner = document.getElementById('containerCarousel')
var xhr = new XMLHttpRequest()
var url = "https://api.themoviedb.org/3/tv/on_the_air?api_key=abdca3eea1b7fb0c1f10423e2fc33135"
xhr.open('GET', url)
xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        var data = JSON.parse(xhr.responseText)
        console.log(data)
        var parentDiv = document.getElementById('details')

        var len = data.results.length
        for (let i = 0; i < len; i++) {
            let title = document.createElement('h1')
            let overview = document.createElement('h3')
            let language = document.createElement('p')
            let img = document.createElement('img')
            var carItem = document.createElement('div')
            let rating = document.createElement('h4')
            carItem.setAttribute('class', 'carousel-item')
            var div = document.createElement('div')
            div.setAttribute('class', 'detailsDiv')
            title.textContent = data.results[i].original_name
            overview.textContent = data.results[i].overview
            language.innerHTML = `Language : <span>${data.results[i].original_language}</span>`
            rating.innerHTML = `Rating : ${data.results[i].vote_average}`
            div.appendChild(title)
            div.appendChild(overview)
            div.appendChild(language)
            div.appendChild(rating)
            img.setAttribute('src', 'https://image.tmdb.org/t/p/original' + data.results[i].backdrop_path)
            img.setAttribute('class', 'bgImage')
            carItem.appendChild(img)
            carInner.appendChild(carItem)
            carItem.appendChild(div)
            carInner.childNodes[1].setAttribute('class', 'carousel-item active')
        }
    }
}
xhr.send()