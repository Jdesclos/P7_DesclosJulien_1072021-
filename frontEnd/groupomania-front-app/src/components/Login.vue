<template>
 <section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <form @submit.prevent="submit">
        <div   class="card text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">SE  CONNECTER </h2>
              <p class="text-white-50 mb-5">Entrez votre username et votre mot de passe</p>

              <div class="form-outline form-white mb-4">
                <input name ="username" v-model="form.username" type="username" id="typeusernameX" class="form-control form-control-lg" />
                <label class="form-label" for="typeusernameX">Username</label>
              </div>
              <div class="form-outline form-white mb-4">
                <input name="password" v-model="form.password" type="password" id="typePasswordX" class="form-control form-control-lg" />
                <label class="form-label" for="typePasswordX">Mot de passe</label>
              </div>
              <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Mot de passe oublié ?</a></p>

              <button class="btn btn-outline-light btn-lg px-5" type="submit">Se connecter</button>

              <div class="d-flex justify-content-center text-center mt-4 pt-1">
                 <p v-if="showError" id="error">L'username ou le mot de passe sont erronés</p>
              </div>

            </div>

          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("username", this.form.username);
      User.append("password", this.form.password);
      try {
          await this.LogIn(User);
          this.$router.push("/home");
          this.showError = false
      } catch (error) {
        console.log(error)
        this.showError = true
      }
    },

  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius:30px;
}
button[type=submit]:hover {
  background-color: #45a049;
}
input {
  margin: 5px;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  padding:10px;
  border-radius:30px;
}
#error {
  color: red;
}
.card{
  background-color: rgb(20, 38, 69);
}
</style>
