<script>
import axios from 'axios';
export default {
  data() {
    return {
      nameUser: "",
      password: 0,
    };
  },
  methods: {
    async PostLogin() {
      axios
        .post("https://zuncapapi.azurewebsites.net/api/Users/login", {
          name: this.nameUser,
          password: this.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .console.log(this.nameUser + this.password);
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
                :="this.nameUser"
                type="text"
                class="form-control"
                placeholder="your name"
              />
            </div>
            <div class="form-group">
              <label for="Password">Password</label>
              <input
                :="this.password"
                type="password"
                class="form-control"
                placeholder="Password"
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
            <br />
            <small id="PhoneHelp" class="form-text text-muted"
              >Ingen konto? intet problem. Register her.</small
            >
            <br />
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
