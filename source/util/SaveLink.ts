// Importing Required Packages And Dependencies
import Link from "../models/Link";

// This Function Handles The Saving of The Given Data Inside The Database
export default async function (link:String, url:String) {
    const SavedLink = new Link({
        url: url,
        download_link: link
    })
    try {
        await SavedLink.save();
    } catch(err) {
        console.log(err)
    }
    return 
}

