import axios from "axios";

interface Video {
    title: String;
    description: String;
    thumbnail: String;
    owner: String;
    link: String;
}

function filterVideos(res:any): Video[] {
    const result:any[] = [];
    res.map((video:any) =>{
        const videoCategory = video.id.kind.split("#")[1];
        const broadcasted = (video.snippet.liveBroadcastContent === "live");
        if(videoCategory === "video" && !(broadcasted)) {
            const videoReturned = {
                title: video.snippet.title,
                description: video.snippet.description,
                thumbnail: video.snippet.thumbnails.medium.url,
                owner: video.snippet.channelTitle,
                link: `https://youtu.be/${video.id.videoId}`
            }
            result.push(videoReturned);
        }
    })
    return result;
}

export default async function (search: String): Promise<Video[]> {
    const API_KEY = "AIzaSyCb5SxRZeyq9giv4Jm0b5iYa0enJzuEock";
    const API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${search}&key=${API_KEY}`;
    const req = await axios.get(API);
    const res = await req.data;
    const filteredVideos:Video[] = filterVideos(res.items);
    return filteredVideos;
}
