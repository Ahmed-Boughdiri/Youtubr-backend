// Importing Required Packages And Dependencies
import axios from "axios";

// The Video Interface
interface Video {
    title: String;
    description: String;
    thumbnail: String;
    owner: String;
    link: String;
}

// Process The Data To Give Back Just The Needed Data For The API
function filterVideos(res:any): Video[] {
    const result:any[] = [];
    res.map((video:any) =>{
        const videoCategory = video.id.kind.split("#")[1];
        const broadcasted = (video.snippet.liveBroadcastContent === "live");
        // Making Sure That The Item is Actually a Video and it's Not Currently Broadcasted
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

// Give Back The Needed Data After Traitement
export default async function (search: String): Promise<Video[]> {
    const API_KEY = process.env.API_KEY || "";
    const API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${search}&key=${API_KEY}`;
    try {
        const req = await axios.get(API);
        const res = await req.data;
        const filteredVideos:Video[] = filterVideos(res.items);
        return filteredVideos;
    } catch(err) {
        console.log(err.toString())
        return [];
    }
}
