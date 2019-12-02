var ip = document.getElementById("search")
var btn = document.getElementById("btn")
var movie_name = document.getElementById("movie_name")
var summary = document.getElementById("summary")
var image = document.getElementById("img")
var budget = document.getElementById("budget")
var genre = document.getElementById("genre")
var review_auth = document.getElementById("review_auth")
var review_content = document.getElementById("review_content")
var video = document.getElementById("video")
var footer = document.getElementById('footer')
ip.onkeyup = function (e) {
	if (e.key === "Enter") {
		console.log("Enter pressed")
		initiate()
	}
}

function initiate() {
	var movie_id
	let xhr = new XMLHttpRequest()
	let url1 =
		"https://api.themoviedb.org/3/search/movie?api_key=abdca3eea1b7fb0c1f10423e2fc33135&query=" +
		ip.value
	xhr.open("GET", url1)
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			var data = JSON.parse(xhr.responseText)
			if (data.results.length == 0) {
				alert("No Search Results Found!!!")
			}
			else {
				console.log(data)
				movie_id = data.results[0].id
				movie_name.textContent = data.results[0].original_title
				summary.textContent = data.results[0].overview
				ip.value = ""
				genre.innerHTML = ""
				image.setAttribute('class', 'showImg')
				image.setAttribute(
					"src",
					"https://image.tmdb.org/t/p/original" + data.results[0].poster_path
				)
				let backImg = `https://image.tmdb.org/t/p/original${data.results[0].backdrop_path}`
				container.style.cssText = `background-image:url(${backImg});`
				getdetails(movie_id)
				// getreviews(movie_id)
				getvideo(movie_id)
				// getsimilar(movie_id)
			}
		}
	}
	xhr.send()
}

function getdetails(movie_id) {
	console.log(movie_id)
	let xhr2 = new XMLHttpRequest()
	let url2 = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=abdca3eea1b7fb0c1f10423e2fc33135`
	xhr2.open("GET", url2)
	xhr2.onreadystatechange = function () {
		if (xhr2.status == 200 && xhr2.readyState == 4) {
			var data2 = JSON.parse(xhr2.responseText)
			console.log(data2)
			if (data2.budget != 0) {
				budget.innerHTML = `Budget : ${data2.budget}`
			}
			for (let i = 0; i < data2.genres.length; i++) {
				var li = document.createElement("li")
				li.textContent = data2.genres[i].name
				genre.appendChild(li)
			}
		}
	}
	xhr2.send()
}

// function getreviews(movie_id) {
// 	console.log(movie_id)
// 	let xhr3 = new XMLHttpRequest()
// 	let url3 = `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=abdca3eea1b7fb0c1f10423e2fc33135`
// 	xhr3.open("GET", url3)
// 	xhr3.onreadystatechange = function () {
// 		if (xhr3.status == 200 && xhr3.readyState == 4) {
// 			var data3 = JSON.parse(xhr3.responseText)
// 			console.log(data3)
// 			if (data3.results.length != 0) {
// 				review_auth.textContent = data3.results[0].author
// 				review_content.textContent = data3.results[0].content
// 			}
// 		}
// 	}
// 	xhr3.send()
// }

function getvideo(movie_id) {
	console.log(movie_id)
	let xhr4 = new XMLHttpRequest()
	let url4 = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=abdca3eea1b7fb0c1f10423e2fc33135`
	xhr4.open("GET", url4)
	xhr4.onreadystatechange = function () {
		if (xhr4.status == 200 && xhr4.readyState == 4) {
			var data4 = JSON.parse(xhr4.responseText)
			console.log(data4)
			video.setAttribute(
				"src",
				"https://www.youtube.com/embed/" + data4.results[0].key + "?autoplay=1&controls=0"
			)
		}
	}
	footer.style.display = 'block'

	xhr4.send()
}

// function getsimilar(movie_id) {
// 	console.log(movie_id)
// 	let xhr5 = new XMLHttpRequest()
// 	let url5 = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=abdca3eea1b7fb0c1f10423e2fc33135`
// 	xhr5.open("GET", url5)
// 	xhr5.onreadystatechange = function () {
// 		if (xhr5.status == 200 && xhr5.readyState == 4) {
// 			var data5 = JSON.parse(xhr5.responseText)
// 			console.log(data5)
// 			review_auth.textContent = data5.results[0].author
// 			review_content.textContent = data5.results[0].content
// 		}
// 	}
// 	xhr5.send()
// }
