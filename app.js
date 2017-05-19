var token = "CAUQAA";
var q = "dogs";
$.ajax(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBZw_Dg7LohwJhi_O7ZOOz--qFthIyVlFM&part=snippet&${q}&pageToken=${token}`, {
    success: function (data) {
        console.log(data);
        var items = data.items.map(function (video) {
            console.log(video);
            return `<a href="">${video.snippet.channelTitle}</a>`
        })
        $('.display-answer').html(items);
    }
})




$('#search').submit(function(event) {
    event.preventDefault();
    
})