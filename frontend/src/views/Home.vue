<template>
  <div class="container">
    <div class="banniere">
      <img src="@/assets/images/mener-reunion-equipe-efficace.jpeg" alt="Image d'une réunion d'entreprise" class="bannierePic">
    </div>
    <div class="infos">
      <img src="@/assets/Logos/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" class="logo">
      <h2>Bienvenue sur le réseau social d'entreprise Groupomania !</h2>
      <div class="choice">
        <h2 @click="loginChoice" class="switch">Connexion</h2>
        <h2 @click="signupChoice" class="switch">Inscription</h2>
      </div>
      <login v-if="mode == 'login'"></login>
      <signup v-if="mode == 'signup'"></signup>
    </div>
  </div>
</template>

<script>
import Login from "../components/auth/Login.vue";
import Signup from "../components/auth/Signup.vue"

export default {
  data(){
    return {
      mode : "login"
    }
  }
  ,components: {
    Login,
    Signup
  },
  methods: {
    loginChoice(){
      this.mode = "login";
    },
    signupChoice(){
      this.mode = "signup";
    }
  }
};
</script>

<style>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFD7D7;
}

h2, h3, label, input {
  text-align: center;
}

h2 {
  font-size: 1.4rem;
  margin: 15px auto;
}

.logo {
  width: 300px;
  margin: 100px auto 40px auto;
}

.banniere {
  height: 100%;
}

.bannierePic {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center;
}

.infos {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100vh;
}

.choice {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.switch {
  font-size: 1.2rem;
}

.switch:hover {
  cursor: pointer;
  opacity: .5;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
