var carInner = document.getElementById('containerCarousel')
var xhr = new XMLHttpRequest()
var url = "https://api.themoviedb.org/3/movie/top_rated?api_key=abdca3eea1b7fb0c1f10423e2fc33135"
xhr.open('GET', url)
xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        var data = JSON.parse(xhr.responseText)
        console.log(data)
        var parentDiv = document.getElementById('details')

        var len = data.results.length
        for (let i = 0; i < len / 2; i++) {
            let title = document.createElement('h1')
            let overview = document.createElement('h3')
            let language = document.createElement('p')
            let img = document.createElement('img')
            var carItem = document.createElement('div')
            carItem.setAttribute('class', 'carousel-item')
            var div = document.createElement('div')
            div.setAttribute('class', 'detailsDiv')
            title.textContent = data.results[i].original_title
            overview.textContent = data.results[i].overview
            language.innerHTML = `Language : <span>${data.results[i].original_language}</span>`

            div.appendChild(title)
            div.appendChild(overview)
            div.appendChild(language)
            // date.textContent = data.results[i].release_date
            img.setAttribute('src', 'https://image.tmdb.org/t/p/original' + data.results[i].backdrop_path)
            img.setAttribute('class', 'bgImage')
            carItem.appendChild(img)
            carInner.appendChild(carItem)
            carItem.appendChild(div)
            // childDiv.appendChild(title)
            // childDiv.appendChild(overview)
            // childDiv.appendChild(date)
            // childDiv.appendChild(language)
            // childDiv.appendChild(img)
            // parentDiv.appendChild(childDiv)
            carInner.childNodes[1].setAttribute('class', 'carousel-item active')
        }
    }
}
xhr.send()