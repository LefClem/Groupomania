<template>
  <div class="bloc-modal" v-if="create">
    <div class="overlay" @click="toggleModaleCreate"></div>
    <div class="create">
        <h2>Partagez vos pensées avec vos collègues !</h2>
        <form @submit.prevent="$emit('newPost', {text: this.text, picture: this.picture, reset: clear()})">
        <input type="text" placeholder="Entrez votre texte" v-model="text" autofocus>
        <span v-if="alert">Veuillez entrer un texte d'une longueur comprise entre 1 et 255 caractères</span>
            <div class="poster_buttons">
            <input type="file" @change="onFileSelected" id="file" accept="images/*" >
            <label for="file">Poster une photo</label>
            <input type="submit" value="Poster !">
            </div>
        </form>
    </div>
  </div>
</template>

<script>

export default {
    data(){
        return {
            text : '',
            picture : '',
        }
    },
    props: ["create","toggleModaleCreate", "alert"],
    methods : {
        clear(){
            this.text = ''
            this.picture = ''
        },
        onFileSelected(event){
            this.picture = event.target.files[0];
            console.log(this.picture);
        }
    }
}
</script>

<style scoped>
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
        background: rgba(0, 0, 0, .5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .create {
        width: 700px;
        min-height: 260px;
        border-radius: 20px;
        background-color: #fff;
        z-index: 5;
        box-shadow: 0 0 5px -3px;
    }

    h2 {
        text-align: center;
    }

    input[type = text]{
        width: 90%;
        height: 120px;
        border: 1px solid darkgray;
        border-radius: 10px;
        outline: none;
    }

    .poster_buttons {
        display: flex;
        flex-direction: row;
        width: 90%;
        gap: 5px;
    }

    input[type = file]{
        display: none;
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

    input[type = submit]{
        width: 50%;
        margin-top: 10px;
        border: none;
        padding: 10px;
        border-radius: 10px;
    }

    input[type = submit]:hover,
    label:hover {
        cursor: pointer;
        transition: 0.5s;
        transform: scale(0.90);
    }

    span {
        color: #fd2d01;
    }
</style>