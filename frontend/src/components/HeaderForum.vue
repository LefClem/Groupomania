<template>
    <nav>
        <img src="@/assets/Logos/icon-left-font-monochrome-black.svg" alt="Logo Groupomania">
        <ul>
            <li><router-link to="/forum">Forum</router-link></li>
            <li><router-link to="/profile">Mon compte</router-link></li>
            <li @click="disconnect">Déconnexion</li>
        </ul>
        <ul class="mobile_view">
            <li><router-link to="/forum"><font-icon icon="fa-solid fa-house" /></router-link></li>
            <li><router-link to="/profile"><font-icon icon="fa-solid fa-user" /></router-link></li>
            <li @click="disconnect"><font-icon icon="fa-solid fa-power-off" /></li>
        </ul>
    </nav>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        disconnect(){
            localStorage.clear();
            this.$router.push({ name: "Home"})
        }
    }
}
</script>

<style scoped>
    nav {
        /* position: fixed; */
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    img {
        width: 300px;
        height: 10vh;
    }

    ul {
        display: flex;
        justify-content: space-between;
        list-style: none;
    }

    li {
        margin: 10px 30px;
        font-size: 1.2rem;
    }

    li:hover {
        transform: scale(0.95);
        transition: .5s;
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: black;
    }

    .mobile_view {
        display: none;
    }

    @media screen and (max-width: 800px) {
        nav {
            display: flex;
            flex-direction: column;
        }

        img {
            margin: 20px auto;
        }

        ul {
            display: none;
        }

        .mobile_view {
            display: flex;
            justify-content: space-around;
            width: 100%;
            padding-left: 0;        
        }
    }
</style>