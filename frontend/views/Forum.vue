<template>
  <div class="forum_container">
    <header-forum></header-forum>
    <div class="feed">
      <div class="post_maker">
        <create-modale
          :create="create"
          :alert="alert"
          :toggleModaleCreate="toggleModaleCreate"
          @newPost="createPost"
        ></create-modale>
        <input
          type="text"
          class="poster"
          @focus="toggleModaleCreate"
          placeholder="Poster vos pensées !"
        />
      </div>
      <div v-for="(post, index) in posts" :key="index">
        <post
          :post="post"
          :posts="posts"
          :user="user"
          :getPost="getPost"
          @delete="deletePost"
          @modify="modifyPost"
          :key="myPost"
        />
      </div>
      <span v-if="posts.length === 0">Personne n'a posté ces derniers temps !</span>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import PostMethods from "../services/post.methods";
import HeaderForum from "../components/HeaderForum.vue";
import Post from "../components/post/Post.vue";
import CreateModale from "../components/Modales/CreateModale.vue";

export default {
  data() {
    return {
      posts: [],
      user: JSON.parse(localStorage.getItem("user")),
      create: false,
      alert: false,
      myPost: 0,
    };
  },
  components: {
    HeaderForum,
    Post,
    CreateModale,
  },
  methods: {
    forceReRender() {
      this.myPost += 1;
    },
    async deletePost({ id, close }) {
      try {
        let deletePost = await PostMethods.deletePost(id, this.user.token);
        console.log(deletePost);
        if (deletePost.status == 200) {
          close;
          await this.getPost();
        }
      } catch (error) {
        throw error;
      }
    },
    toggleModaleCreate: function () {
      this.create = !this.create;
    },
    async createPost({ text, picture, reset }) {
      try {
        if (text.length > 255) {
          this.alert = true;
        } else {
          let fd = new FormData();
          fd.append("text", text);
          fd.append("image_url", picture);
          let res = await PostMethods.createPost(this.user.token, fd);
          let newPost = res.data.results[0];
          console.log(newPost);
          console.log(this.posts);
          if (res.status == 201) {
            reset;
            this.toggleModaleCreate();

            this.getPost();
          }
        }
      } catch (error) {
        throw error;
      }
    },
    async modifyPost({ text, picture, id, close, reset }) {
      try {
        if (text.length > 255) {
          alert("Post trop long !");
        } else {
          let fd = new FormData();
          fd.append("text", text);
          fd.append("image_url", picture);
          let modify = await PostMethods.modifyPost(id, this.user.token, fd);
          console.log(modify);
          if (modify.status == 201) {
            reset;
            close;
            await this.getPost();
          }
        }
      } catch (error) {
        throw error;
      }
    },
    async getPost() {
      if (!this.user) {
        this.$router.push("/");
      } else {
        let post = await PostMethods.getAllPosts(this.user.token);
        this.posts = post.data.posts;
        this.forceReRender();
        return post.data.posts;
      }
    },
  },
  async mounted() {
    await this.getPost();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");

.forum_container {
  font-family: Lato, sans-serif;
  max-width: 1300px;
  height: 100%;
  margin: 0 auto;
  background: #ffd7d7;
  z-index: 0;
}

.feed {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 30px auto;
  width: 600px;
  gap: 20px;
}

.post_maker {
  width: 600px;
  height: 50px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 5px -3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.poster {
  width: 85%;
  height: 60%;
}

span {
  text-align: center;
  margin: 100px auto;
}

footer {
  height: 200px;
}

@media screen and (max-width: 650px) {
  
  .feed {
    width: 100%;
    margin: 30px auto;
  }
  .post_maker {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
