<template>
  <div class="container">
    <form @submit.prevent="signUp">
      <label>Pseudo</label>
      <input type="text" v-model="name" placeholder="Entrez votre nom" />
      <span v-if="errorName"
        >Votre pseudo doit comporter 3 caractères au minimum</span
      >
      <label>Email</label>
      <input type="text" v-model="email" placeholder="Entrez votre email" />
      <span v-if="errorEmail">Entrez un email valide</span>
      <span v-if="existingEmail">Utilisateur déjà existant !</span>
      <label>Mot de passe</label>
      <input
        type="password"
        v-model="password"
        placeholder="Entre le mot de passe de votre choix"
      />
      <span v-if="errorPassword"
        >Le mot de passe contient au moins 8 caractères, une majuscule
        et un caractère spécial</span
      >
      <input
        type="file"
        name="avatar"
        @change="onFileSelected"
        id="avatar"
        accept="image/jpg, image/jpeg, image/png"
      />
      <input
        type="submit"
        name="submit"
        value="Inscription"
      />
      <!-- <button @click.prevent="signUp">Inscription</button> -->
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      picture: "",
      errorName: false,
      errorEmail: false,
      errorPassword: false,
      existingEmail: false      
    };
  },
  methods: {
    async signUp() {
        
        if(this.checkForm()){
            try {
                let fd = new FormData();
                fd.append("name", this.name);
                fd.append("email", this.email);
                fd.append("password", this.password);
                if(this.picture !== ""){
                    fd.append("profile_picture", this.picture, this.picture.name);
                } else {
                    fd.append("profile_picture", this.picture)
                }

                let results = await axios.post("http://localhost:3000/api/auth/signup", fd, {"headers" : "multipart/form-data"});

                if(results.status == 201){
                    let login = await axios.post("http://localhost:3000/api/auth/login", {
                        email : this.email,
                        password : this.password
                    })
                    if(login.status == 200){
                        localStorage.setItem("user", JSON.stringify(login.data.user))
                        this.$router.push({ name: "Forum"})            
                    }
                }
            } catch (error) {
                if(error.response.status == 403){
                    this.existingEmail = true;
                } 
                console.error(error);
            }

        }

    },
    checkForm(){
      let validEmail = new RegExp(
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      let validName = new RegExp(
        /^[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*){3,}$/
      );
      let validPassword = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}$/
      );
      validEmail.test(this.email)
        ? (this.errorEmail = false)
        : (this.errorEmail = true) && (this.existingEmail = false);
      validName.test(this.name)
        ? (this.errorName = false)
        : (this.errorName = true);
      validPassword.test(this.password)
        ? (this.errorPassword = false)
        : (this.errorPassword = true);
      console.log(validPassword.test(this.password));
      return (
        validEmail.test(this.email) &&
        validName.test(this.name) &&
        validPassword.test(this.password)
      )
    },
    onFileSelected(event){
        this.picture = event.target.files[0];
        console.log(this.picture);
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

label {
  margin: 10px;
}

input {
  border-radius: 10px;
  border: none;
  width: 250px;
  height: 3.5vh;
  margin-bottom: 10px;
}

input:focus {
  outline: none;
}

input:last-of-type {
  margin: 15px;
}

input:last-of-type:hover {
  cursor: pointer;
  transition: 0.5s;
  transform: scale(1.2);
}

span {
    text-align: center;
    color: red;
}
</style>
