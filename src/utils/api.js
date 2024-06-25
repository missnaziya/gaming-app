// api.js
import axios from "axios";

const fetchDataWithPost = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error("Error in API request:", error.message);
        throw error;
    }
};

export default fetchDataWithPost;
