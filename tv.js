
window.addEventListener('load', function () {
    var query = document.getElementById('query')
    var container = document.getElementById('container')
    var display = document.getElementById('display')
    var tvTitle = document.getElementById('tvTitle')
    var tvOverview = document.getElementById('tvOverview')
    var results = document.getElementById('results')
    var seasonDetails = document.getElementById('seasonDetails')
    var api_key = '1f76b7b57ee681a9c514a2b5877b8efe'
    var vid = document.getElementById('vid')
    var poster = document.getElementById('poster')
    var footer = document.getElementById('footer')
    // btn.addEventListener('click', initiate)

    query.onkeyup = function (e) {
        if (e.key === 'Enter') {
            console.log("Enter Pressed")
            initiate()
        }
    }

    function initiate() {
        let xhr = new XMLHttpRequest()
        let url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${query.value}`
        query.value = ""
        seasonDetails.innerHTML = ""
        vid.setAttribute('class', 'hideVid')
        xhr.open('GET', url)
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText)
                console.log(data)
                if (data.results.length == 0) {
                    alert("No Search Results Found!!!")
                }
                else {
                    results.setAttribute('class', 'showImg')
                    var tv_id = data.results[0].id
                    let img = `https://image.tmdb.org/t/p/original${data.results[0].poster_path}`
                    poster.setAttribute('src', img)
                    poster.setAttribute('class', 'showImg')
                    // poster.style.display = 'block;'
                    let bgImg = `https://image.tmdb.org/t/p/original${data.results[0].backdrop_path}`
                    display.style.cssText = `background-image:url(${bgImg});background-size:cover`
                    getDetails(tv_id)
                }
            }
        }
        xhr.send()
    }


    function getDetails(tv_id) {
        var nSeasons = 0
        var seasonNo = 0
        let xhr = new XMLHttpRequest()
        let url = `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${api_key}&language=en-US`
        xhr.open('GET', url)
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText)
                console.log('season data', data)
                tvTitle.textContent = data.name
                tvOverview.textContent = data.overview
                results.appendChild(tvTitle)
                results.appendChild(tvOverview)
                nSeasons = data.number_of_seasons
                // loopSeasons(numSeasons, data.seasons, tv_id);
                for (let i = 1; i <= nSeasons; i++) {
                    console.log("looping " + i)
                    seasonNo = data.seasons[i].season_number
                    let numEpisodes = data.seasons[i].episode_count
                    getSeasonDetails(seasonNo, tv_id, numEpisodes, i)
                }
                getVideos(tv_id)
            }
        }
        xhr.send()
    }

    // function displaySeasonDetails(seasonData) {
    //     //This will display the data of the season
    //     //Also, it will recieve the data of one season only

    // }

    // async function loopSeasons(numSeasons, seasons, tvId) {
    //     for (let i = 1; i <= numSeasons; i++) {
    //         console.log('calling through loop ' + i);
    //         await getSeasonDetails(seasons[i].season_number, tvId, i);
    //     }
    // }

    // async function getSeasonDetailsNew(seasonNumber, tvId, i) {
    //     console.log('sending request for ' + i);
    //     let url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${api_key}&language=en-US`
    //     let response = await fetch(url);
    //     console.log('season details' + i, response);

    // }

    function getSeasonDetails(seasonNo, tv_id, numEpisodes, i) {
        let xhr = new XMLHttpRequest()
        let url = `https://api.themoviedb.org/3/tv/${tv_id}/season/${seasonNo}?api_key=${api_key}&language=en-US`
        xhr.open('GET', url)
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText)
                console.log(data)
                console.log('Season details')
                let accordion = document.createElement('div')
                accordion.setAttribute('class', 'panel-group')
                accordion.setAttribute('id', 'accordion')
                let panelDefault = document.createElement('div')
                panelDefault.setAttribute('class', 'panel panel-default')
                let panelHeading = document.createElement('div')
                panelHeading.setAttribute('class', 'panel-heading')
                let panelTitle = document.createElement('h4')
                panelTitle.setAttribute('class', 'panel-title')
                let anchor = document.createElement('a')
                anchor.setAttribute('data-toggle', 'collapse')
                anchor.setAttribute('data-parent', '#accordion')
                anchor.setAttribute('href', `#collapse${i}`)
                anchor.textContent = `Season ${seasonNo}:`
                panelTitle.appendChild(anchor)
                panelHeading.appendChild(panelTitle)
                let collapseSe = document.createElement('div')
                collapseSe.setAttribute('id', `collapse${i}`)
                collapseSe.setAttribute('class', 'panel-collapse collapse in')
                let panelBody = document.createElement('div')
                panelBody.setAttribute('class', 'panel-body')
                let seasonOverview = data.episodes[0].overview
                panelBody.innerHTML = `<p>${seasonOverview}</p><p>Number of Episodes : ${numEpisodes}</p>`
                panelDefault.appendChild(panelHeading)
                collapseSe.appendChild(panelBody)
                panelDefault.appendChild(collapseSe)

                accordion.appendChild(panelDefault)
                seasonDetails.appendChild(accordion)

                // let seasonNum = document.createElement('button')
                // seasonNum.setAttribute('class', 'seasonCollapse')
                // seasonNum.innerHTML =
                //     let epDetails = document.createElement('div')
                // epDetails.className = 'seasonContent'
                // epDetails.innerHTML = ``
                // seasonDetails.appendChild(seasonNum)
                // seasonDetails.appendChild(epDetails)


                // summary.insertAdjacentHTML('afterend', `<p>${data.episodes[i].overview}</p>`)
            }
        }
        xhr.send()
    }

    // function getSeasonImages(SeasonNo, tv_id) {
    //     let xhr = new XMLHttpRequest()
    //     let url = `https://api.themoviedb.org/3/tv/${tv_id}/season/${SeasonNo}/images?api_key=${api_key}&language=en-US`
    //     xhr.open('GET', url)
    //     xhr.onreadystatechange = function () {
    //         if (xhr.status == 200 && xhr.readyState == 4) {
    //             var data = JSON.parse(xhr.responseText)
    //             console.log(data)
    //             // let vidKey = data.
    //             // display.innerHTML = `<iframe src=${}`
    //         }
    //     }
    //     xhr.send()
    // }

    function getVideos(tv_id) {
        let xhr = new XMLHttpRequest()
        let url = `https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=${api_key}&language=en-US`
        xhr.open('GET', url)
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText)
                let n = data.results.length - 1
                console.log(data)
                let vidKey = ` https://www.youtube.com/embed/${data.results[0].key}?autoplay=1&showinfo=0&controls=0`
                vid.setAttribute('class', 'showVid')
                vid.setAttribute('src', vidKey)
                footer.style.display = 'block'
            }
        }
        xhr.send()
    }
})
