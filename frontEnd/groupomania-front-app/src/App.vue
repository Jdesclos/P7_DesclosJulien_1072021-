<template>
  <div id="app">
    <NavBar />
    <router-view/>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" v-if="show">
      <div class="texte_intro  col-md-4">
        <h2 cla>Partagez, réagissez, communiquer</h2>
        <p>Participez à l'expérience Groupo-chat</p>
        <a class="btn btn-primary col-md-4 align-self-center" @click="login"  role="button">Connexion</a>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from "./router"
import NavBar from './components/navBar.vue'
export default {
  data(){
    return {
      show : false
    }
  },
  created(){
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  components: {
    NavBar
  },
  methods:{
    login(){
      router.push('/login')
    },
    fetchData(){
    const path = this.$route
    if ( path.name == null){
      return this.show = true
    }
    else {
      return this.show = false
    }
    }
  }
}
</script>
<style>
html, body {
  display: flex;
  flex-direction: column;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  position: relative;
}
.cover-container{
  padding: 0px;
  margin: 0px;
  background-image: url("./assets/image_accueil.jpg");
  background-size: cover;
  align-items: flex-end;
  margin-bottom: 0px !important;
}

.texte_intro{
  background-color: rgb(20, 38, 69, 0.85);
  color: white;
  padding: 25px;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 5rem;

}
.texte_intro .btn{
  max-height: 4rem;
  font-size: 2rem;
}
</style>