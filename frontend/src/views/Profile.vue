<template>
    <div class="profile_container">
        <header-forum></header-forum>
        <div class="profile">
            <div class="profile_picture">
                <img :src="user.profile_picture" alt="Photo de profil">
                <form @submit.prevent="changeProfilePicture">
                    <input type="file" @change="onFileSelected" id="file" accept="images/*" >
                    <input type="submit" value="Changer la photo de profil">
                </form>
            </div>
            <div class="user_infos">
                <h1>{{user.name}}</h1>
                <p>{{user.email}}</p>
            </div>
        </div>
        <footer></footer>
    </div>
</template>

<script>
import HeaderForum from "../components/HeaderForum.vue";
import UserMethods from "../services/user.methods";

export default {
    components: {
        HeaderForum
    },
    data(){
        return {
            connect : JSON.parse(localStorage.getItem("user")),
            user : "",
            picture: ""
        }
    },
    methods: {
        onFileSelected(event){
            this.picture = event.target.files[0];
            console.log(this.picture);
        },
        async getUser(){
            if (!this.connect) {
                this.$router.push("/");
            } else {
            let loggedUser = await UserMethods.getUser(this.connect.user_id, this.connect.token)
            this.user = loggedUser.data.user[0];
            }
        },
        async changeProfilePicture(){
            try {
                let fd = new FormData();
                fd.append("profile_picture", this.picture);
                let modifyPic = await UserMethods.updateProfilePicture(this.connect.user_id, this.connect.token, fd)
                console.log(modifyPic);
                if(modifyPic.status === 200){
                    await this.getUser();
                }

            } catch (error) {
                throw error;
            }
        }
    },
    async mounted(){
        await this.getUser();
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

.profile_container {
  font-family: Lato, sans-serif;
  max-width: 1300px;
  margin: 0 auto;
  background: #ffd7d7;
  z-index: 0;
}

.profile {
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.profile_picture {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user_infos {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

footer {
  height: 200px;
}

img {
    max-width: 400px;
    max-height: 400px;
}

label {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border-radius: 10px;    
    background: #EFEFEF;
}

@media screen and (max-width: 800px) {
    .profile {
        flex-direction: column-reverse;
        height: 100%;
    }

    .profile_picture {
        width: 50%;
    }

    .user_infos {
        width: 50%;
    }
}

</style>