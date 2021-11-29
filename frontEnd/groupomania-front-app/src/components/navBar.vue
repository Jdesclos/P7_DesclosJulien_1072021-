<template>
  <div id="nav" class="navbar navbar-expand  ">
    <router-link to="/" class="col-sm-6 text-left"> <img src="../assets/icon-left-font-monochrome-white.svg"></router-link>
    <span class="col-sm-6 text-right" v-if="isLoggedIn">
      <router-link to="/home">Home</router-link>
      <a @click="logout">Logout</a>
    </span>
    <span class="col-sm-6 text-right" v-else>
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
    </span>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLogin}
    },
    methods: {
      async logout (){
        await this.$store.dispatch('LogOut')
        this.$router.push('/login')
      }
    },
}
</script>
<style>
#nav {
  padding: 30px;
  background-color: rgb(20, 38, 69);
}
#nav a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
}
#nav a:last-child{
  margin-left: 2rem;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
