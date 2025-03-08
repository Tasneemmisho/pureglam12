// AIzaSyBmnY1W0-4XwRyw2V-BOGkS0ADgKt7Ac8o
// AAAAAAAAAAAAAAAAAAAAAPwBzAEAAAAAbMBTmNXj%2FqVnaVqEAAyuTXHIK6o%3DICmNv9BVDLvwDfIyarPd12YXSwSL7WCVwNdlapMGHYuPKutAmq
const youtubeAPIkey= "AIzaSyBmnY1W0-4XwRyw2V-BOGkS0ADgKt7Ac8o";
let allvideos= [];
async function fetchyoutubetrends(){
    const query = "makeup looks";
    const url= `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=6&key=AIzaSyBmnY1W0-4XwRyw2V-BOGkS0ADgKt7Ac8o`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log("youtube api response: ", data);
        if (!data.items || !Array.isArray(data.items)) {
            throw new Error("api didn't return expected results");
        }
    displayyoutubevideos(data.items);
    } catch (error) {
        console.error("Error fetching YouTube trends:", error);
    }
    allvideos = data.items.filter(video => video.id.videoId && !video.snippet.title.toLowerCase().includes("shorts") && !video.snippet.description.toLowerCase().includes("shorts"));
}

function displayyoutubevideos(videos) {
    console.log("video recevied");
    if (!Array.isArray(videos)|| videos.length === 0){
        console.error("no valid video");
        document.getElementById("youtube-trends").innerHTML= "<p>No videos found</p>";
        return;
    }
    let container = document.getElementById("youtube-trends");
    container.innerHTML= "";
    videos.forEach(video => {
        if (!video.id || !video.id.videoId) return;
        let videocard = document.createElement("div");
        videocard.classList.add("trend-card");
        videocard.innerHTML = `<iframe width="300" height="180" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
        <h4>${video.snippet.title}</h4>`;
        container.appendChild(videocard);
    });
}
fetchyoutubetrends();

