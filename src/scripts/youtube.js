import axios from "axios";
const KEY = "AIzaSyAPvZNTWn9sh9XkZiwpHJc1EhrnMV0pltI";

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})