<script>
import axios from 'axios';
export default {
  data() {
    return {
      nameUser: "",
      password: null,
    };
  },
  methods: {
    async PostLogin() {
      axios.post("https://zuncapapi.azurewebsites.net/api/Users/login", 
        {
          name: this.nameUser,
          password: this.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        console.log(this.nameUser + ' ' + this.password);
    },
  },
};
</script> 

<template>
  <div class="container">
    <div class="row">
      <div class="col-auto mx-auto">
        <form v-on:submit.prevent="PostLogin()">
          <div class="form-login">
            <h1>Log in</h1>
            <div class="form-group">
              <label for="nameUser">Navn</label>
              <input
                v-model="this.nameUser"
                type="text"
                class="form-control"
                placeholder="your name"
              />
            </div>
            <div class="form-group">
              <label for="Password">Password</label>
              <input
                v-model="this.password"
                type="password"
                class="form-control"
                placeholder="Your Password"
              />
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
              />
              <label class="form-check-label"
                >Husk mig</label
              >
            </div>
            <button type="submit" class="btn btn-primary" name="submitbtn">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
