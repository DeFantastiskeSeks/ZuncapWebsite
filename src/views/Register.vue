<script>
import axios from 'axios';
export default {
  data() {
    return {
      nameUser: "",
      tlfNr: 0,
      password: null,
    };
  },
  methods: {
    async PostRegister() {
      axios
        .post("https://zuncapapi.azurewebsites.net/api/Users/register", {
          name: this.nameUser,
          telefonNummer: this.tlfNr,
          password: this.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
      console.log(this.nameUser + " " + this.tlfNr + " " + + this.password);
    },
  },
};  
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-auto mx-auto">
        <form v-on:submit.prevent="PostRegister()">
          <div class="form-login">
            <h1>Register</h1>
            <div class="form-group">
              <label for="navn">Navn</label>
              <div class="input-group-prepend"></div>
              <input v-model="nameUser" type="text" class="form-control" placeholder="Name" />
            </div>
            <div class="form-group">
              <label for="TlfNr">Telefon Nummer</label>
              <input v-model="tlfNr" type="number" class="form-control" placeholder=" eks. 12345678" />
            </div>
            <div class="form-group">
              <label for="Password">Password</label>
              <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-primary"> Register </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
