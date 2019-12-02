var ip = document.getElementById('ip')
var btn = document.getElementById('btn')
var parentDiv = document.getElementById('results')
var footer = document.getElementById('footer')
// var book_name = document.getElementById('book_name')
// var image = document.getElementById('img')
// var author = document.getElementById('author')
// var summary = document.getElementById('summary')
// var user_rating = document.getElementById('rating')
// var price = document.getElementById('price')
// var size_in_bytes = document.getElementById('size_b')
// var genre = document.getElementById('genre')

ip.onkeyup = function (e) {
  if (e.key === 'Enter') {
    console.log("Enter Pressed")
    initiate()
  }
}

function initiate() {
  var xhr = new XMLHttpRequest()
  var url = "https://itunes.apple.com/search?country=us&term=" + ip.value + "&media=ebook&entity=ebook"
  xhr.open('GET', url)
  ip.value = ""
  parentDiv.innerHTML = ""
  xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText)
      console.log(data)
      if (data.results.length == 0) {
        alert("No such eBooks Found")
      }
      else {
        for (let i = 0; i < 5 && i < data.results.length; i++) {
          let image = document.createElement('img')
          let book_name = document.createElement('h1')
          let author = document.createElement('h2')
          let summary = document.createElement('h3')
          let user_rating = document.createElement('h4')
          let price = document.createElement('h5')
          let size_in_bytes = document.createElement('h6')
          let buy = document.createElement('a')
          buy.textContent = 'Buy Now'
          let genre = document.createElement('ul')
          genre.textContent = 'Genre : '
          var childDiv = document.createElement('div')
          childDiv.className = 'books'
          book_name.textContent = data.results[i].trackName
          image.style.cssText = 'width:150px;height:200px;'
          image.setAttribute('src', data.results[i].artworkUrl100)
          author.textContent = 'Author : ' + data.results[i].artistName
          summary.innerHTML = '<h3>Summary : </h3>' + data.results[i].description
          user_rating.textContent = 'User rating : ' + data.results[i].averageUserRating
          price.textContent = `Price : ${data.results[i].formattedPrice}`
          let mb = data.results[i].fileSizeBytes / 1000000
          size_in_bytes.textContent = 'Size : ' + mb.toFixed(2) + " Mb"
          buy.setAttribute('href', data.results[0].trackViewUrl)
          buy.target = '_blank'
          // release_date.textContent = data.results[0].releaseDate
          for (let j = 0; j < data.results[i].genres.length && j < 5; j++) {
            let genreList = document.createElement('li')
            genreList.textContent = data.results[i].genres[j]
            genre.appendChild(genreList)
          }
          childDiv.appendChild(book_name)
          childDiv.appendChild(image)
          childDiv.appendChild(author)
          childDiv.appendChild(price)
          childDiv.appendChild(buy)

          childDiv.appendChild(summary)
          childDiv.appendChild(genre)
          childDiv.appendChild(user_rating)
          childDiv.appendChild(size_in_bytes)

          parentDiv.appendChild(childDiv)
        }
      }

    }
    footer.setAttribute('class', 'show')
  }
  xhr.send()
}