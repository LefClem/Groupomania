<template>
  <div class="container">
    <form @submit.prevent="login">
      <label>Email</label>
      <input type="email" v-model="email" placeholder="Entrez votre email" />
      <span v-if="errorEmail">Utilisateur introuvable !</span>
      <label>Mot de passe</label>
      <input type="password" v-model="password" placeholder="Entrez votre mot de passe" />
      <span v-if="errorPassword">Mot de passe erroné !</span>
      <input type="submit" value="Connexion">
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
        email: "",
        password: "",
        errorEmail: false,
        errorPassword: false
    };
  },
  methods: {
    async login() {
      try {
        const result = await axios.post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password
        })
  
        if(result.status == 200){
          localStorage.setItem("user", JSON.stringify(result.data.user))
          this.$router.push({ name: "Forum"})
        }
      } catch (error) {
        if(error.response.status == 404){
          this.errorEmail = true;
        } else if(error.response.status == 401){
          this.errorEmail = false;
          this.errorPassword = true;
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

label {
  margin: 10px;
}

input {
  border-radius: 10px;
  border: none;
  width: 250px;
  height: 30px;
  margin-bottom: 10px;
}

input:focus {
  outline: none;
}

input:last-of-type{
  margin-top: 15px;
}

input:last-of-type:hover {
  cursor: pointer;
  transition: 0.5s;
  transform: scale(1.2);
}

button {
  margin: 5px;
  padding: 15px;
  border: none;
  border-radius: 15px;
}

button:hover {
  cursor: pointer;
  transition: .5s;
  transform: scale(1.2);
}

span {
  text-align: center;
  color: red;
}
</style>
