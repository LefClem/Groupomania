<template>
  <div class="post">
    <div class="bloc-modal" v-if="suppress">
      <div class="overlay" @click="toggleModaleDelete"></div>
      <div class="delete" v-if="suppress">
        <h2>Êtes-vous sur de vouloir supprimer ce post ?</h2>
        <div class="delete_buttons">
          <button
            @click="
              $emit('delete', { id: post.id, close: toggleModaleDelete() })
            "
          >
            Oui
          </button>
          <button @click="toggleModaleDelete">Non</button>
        </div>
      </div>
      <p></p>
    </div>

    <div class="bloc-modal" v-if="update">
      <div class="overlay" @click="toggleModaleUpdate"></div>
      <div class="update">
        <h2>Modifier mon post</h2>
        <form
          @submit.prevent="
            $emit('modify', {
              text: text,
              picture: picture,
              id: post.id,
              close: toggleModaleUpdate(),
              reset: clear(),
            })
          "
        >
          <input type="text" placeholder="Entrez votre texte" v-model="text" />
          <div class="update_buttons">
            <input
              type="file"
              @change="onFileSelected"
              id="file"
              accept="images/*"
            />
            <label for="file">Poster une photo</label>
            <input type="submit" value="Poster !" />
          </div>
        </form>
      </div>
    </div>

    <div class="user">
      <div class="profile_pic">
        <img v-if="post.profile_picture" :src="post.profile_picture" alt="" />
        <img
          v-else
          src="@/assets/images/istockphoto-1223671392-170667a.jpeg"
          alt=""
        />
      </div>
      <div class="name">
        <h4>{{ post.name }}</h4>
        <span>Publié le {{ formatDate(post.updated_at) }}</span>
      </div>
    </div>
    <div class="content">
      <p v-if="post.text">{{ post.text }}</p>
      <img v-if="post.image_url" :src="post.image_url" alt="" />
    </div>
    <div class="buttons">
      <div
        v-if="post.user_id === user.user_id || user.admin == 1"
        class="user_btn"
      >
        <button @click="toggleModaleUpdate">Modifier</button>
        <button @click="toggleModaleDelete">Supprimer</button>
      </div>
      <button
        class="like_btn"
        @click="likePost"
        :class="[like ? 'liked' : 'unlike']"
      >
        <font-icon icon="fa-solid fa-heart" style="font-size: 20px" /><span v-if="likeCount > 0"
          class="like_count"
          >{{ likeCount }}</span
        >
      </button>
    </div>
  </div>
</template>

<script>
import PostMethods from "../../services/post.methods";

export default {
  data() {
    return {
      update: false,
      suppress: false,
      text: this.post.text,
      picture: "",
      like: false,
      likes: [],
      likeCount: 0,
    };
  },
  props: ["post", "posts", "user", "getPost"],
  methods: {
    toggleModaleDelete: function () {
      this.suppress = !this.suppress;
    },
    toggleModaleUpdate: function () {
      this.update = !this.update;
    },
    onFileSelected(event) {
      this.picture = event.target.files[0];
      console.log(this.picture);
    },
    clear() {
      this.text = this.post.text;
      this.picture = "";
    },
    async getLikes(){
      let likes = await PostMethods.getAllLikes(this.post.id, this.user.token);
      likes.data.find((id) => {
        if(id.userId === this.user.user_id){
          this.like = true;
        }
      })
      this.likeCount = likes.data.length;
    },
    async likePost() {

      this.getLikes();
      // this.like = !this.like;
      let like = await PostMethods.likePost(
        this.post.id,
        this.user.token,
        this.user.user_id
      );
      if (like.data.like.message == "Like !") {
        this.likeCount++;
        this.like = true;
        this.getLikes();
      } else {
        this.likeCount--;
        this.like = false;
        this.getLikes();
      }
    },
    formatDate(date) {
      var datePart = date.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1],
        day = datePart[2],
        hour = datePart[3],
        minutes = datePart[4];
      return day + "/" + month + "/" + year + " à " + hour + "h" + minutes;
    },
  },
  async mounted() {
    await this.getLikes()
    this.clear();
  },
};
</script>

<style scoped>
.liked {
  color: #fd2d01;
}

.unlike {
  color: black;
}

.like_count {
  position: absolute;
  top: 4px;
  right: 17px;
}

.post {
  width: 600px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 5px -3px;
  position: relative;
}

.user {
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 15px 10px;
  gap: 10px;
}

.name {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content img {
  display: flex;
  margin: 0 auto;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.user_btn {
  display: flex;
  justify-content: space-between;
}

h4 {
  margin: 5px 0;
}

span {
  font-size: 0.9rem;
}

p {
  margin: 15px 30px;
}

button {
  margin-right: 10px;
  position: relative;
  padding: 10px;
  border: none;
  border-radius: 10px;
  width: 80px;
  background: #fff;
}

.profile_pic img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 10px;
  object-fit: cover;
}

img {
  max-width: 90%;
}

.bloc-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.delete {
  width: 500px;
  height: 150px;
  border-radius: 20px;
  background-color: #fff;
  z-index: 5;
}

.delete_buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  gap: 5px;
}

.update {
  width: 700px;
  min-height: 260px;
  border-radius: 20px;
  background-color: #fff;
  z-index: 5;
  box-shadow: 0 0 5px -3px;
}

.update_buttons {
  display: flex;
  flex-direction: row;
  width: 90%;
  gap: 5px;
}

input[type="text"] {
  width: 90%;
  height: 120px;
  border: 1px solid darkgray;
  border-radius: 10px;
  outline: none;
}

input[type="file"] {
  display: none;
}

label {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-radius: 10px;
  background: #efefef;
}

input[type="submit"] {
  width: 50%;
  margin-top: 10px;
  border: none;
  padding: 10px;
  border-radius: 10px;
}

input[type="submit"]:hover,
label:hover,
button:hover {
  cursor: pointer;
  transition: 0.5s;
  transform: scale(0.9);
}
</style>
