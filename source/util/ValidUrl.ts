
// This Function Checks If The Given URL is a Valid Youtube URL
export default function (url: String):Boolean {
    const suffix = url.slice(0,17);
    if(suffix === "https://youtu.be/") return true
    return false
}
