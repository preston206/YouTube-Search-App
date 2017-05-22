

// TODO: comment, proof, push to branch, new branch for style, add style, push to brach, merge
var state = {
    previous: null,
    next: null,
    results: false
}

var base_url = "https://www.googleapis.com/youtube/v3/search?";

function getData(searchTerm, callback, token) {
    var query = {
        key: 'AIzaSyBZw_Dg7LohwJhi_O7ZOOz--qFthIyVlFM',
        q: searchTerm,
        part: 'snippet',
        maxResults: 3,
        pageToken: token
    }
    console.log(query);
    $.getJSON(base_url, query, callback);
}

function displayData(data) {
    var results = "";
    console.log(data);


    if (data.items) {
        state.next = data.nextPageToken;
        console.log("state.next", state.next);
        state.previous = data.prevPageToken;
        console.log("state.previous", state.previous);
        state.results = true;

        // items is specific to the YT API
        data.items.map(function (video) {
            results += `<div><a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">${video.snippet.title}</a><br />
            <span>Channel: </span><a href="https://www.youtube.com/channel/${video.snippet.channelId}" target="_blank">${video.snippet.channelTitle}</a><br />
            <img src="${video.snippet.thumbnails.medium.url}" /></div><br />`;
        })
    }
    else {
        if (state.results === false) {
            $('.img-container').empty();
        }
        else {
            results += "<p>no results</p>";
        }
    }

    if (state.previous) {
        // $('#prevBtn').show();
        // the show() above was needed when I was troubleshooting the reason the previous button
        // wouldnt show up. It was getting hidden on the first pass through because state.previous was
        // populated yet. Without show() the button would never appear, even though I was removing the class properly
        $('#prevBtn').removeClass('hide');
    }
    // else {
    //     $('#prevBtn').hide();
    // }

    if (state.next) {
        $('#nextBtn').removeClass('hide');
        // $('#prevBtn').removeClass('hide');
    }
    // else {
    //     $('#nextBtn').hide();
    // }



    $('.img-container').html(results);
}

// $(function () {
//     displayData({});
//     $('.img-container').empty();
// })

$('#search').submit(function (event) {
    event.preventDefault();
    var userInput = $('form input').val();
    getData(userInput, displayData);
})

$('#nextBtn').click(function (event) {
    var userInput = $('form input').val();
    getData(userInput, displayData, state.next);
})

$('#prevBtn').click(function (event) {
    var userInput = $('form input').val();
    getData(userInput, displayData, state.previous);
})