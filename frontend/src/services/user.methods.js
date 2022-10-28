import axios from "axios";

class UserMethods {
    async getUser(userId, token){
        let res = await axios.get(`http://localhost:3000/api/auth/user/${userId}`, { headers : {Authorization : "Bearer " + token}})
        return res;
    }

    async updateProfilePicture(userId, token, file){
        let res = await axios.put(`http://localhost:3000/api/auth/user/${userId}`, file, { headers : {Authorization : "Bearer " + token}})
        return res;
    }
}

export default new UserMethods()