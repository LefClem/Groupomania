import axios from "axios";

class PostMethods {
    async getAllPosts(token){
        let res = await axios.get("http://localhost:3000/api/post/post", { headers : {Authorization : "Bearer " + token }});
        return res;
    }

    async createPost(token, data){
        let res = await axios.post("http://localhost:3000/api/post/post", data, { headers : {Authorization : "Bearer " + token }});
        return res;
    }
    
    async modifyPost(id, token, data){
        let res = await axios.put(`http://localhost:3000/api/post/post/${id}`, data, { headers : {Authorization : "Bearer " + token }});
        return res;
    }
    
    async deletePost(id, token){
        let res = await axios.delete(`http://localhost:3000/api/post/post/${id}`, { headers : { Authorization : 'Bearer ' + token }});
        return res;
    }

    async getAllLikes(id, token){
        let res = await  axios.get(`http://localhost:3000/api/post/post/${id}/like`, { headers : {Authorization : "Bearer " + token }});
        return res;
    }
 
    async likePost(id, token, userId){
        let res = await axios.post(`http://localhost:3000/api/post/post/${id}/like`, userId, { headers : {Authorization : "Bearer " + token }});
        return res;
    }
}

export default new PostMethods()