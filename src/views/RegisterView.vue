<script>
import axios from 'axios';
export default {
  data() {
    return {
      nameUser: "",
      tlfNr: null,
      password: null,
    };
  },
  methods: {
    PostRegister: async function() {
      if (this.tlfNr == null) {
        this.tlfNr = 0;
      }
      axios.post("https://zuncapapi.azurewebsites.net/api/Users/register", 
        {
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
  <div class="container h-100">
    <div class="d-flex align-items-center justify-content-center h-100">
      <div class="card">
        <div class="card-header bg-orange">
          <h1 class="card-title">Register</h1>
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="PostRegister()">
            <div class="form-login">              
              <div class="form-group">
                <label for="navn">Brugernavn:</label>
                <div class="input-group-prepend"></div>
                <input v-model="nameUser" type="text" class="form-control" placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="TlfNr">Tlf:</label>
                <input v-model="tlfNr" type="text" class="form-control" placeholder="12345678" />
              </div>
              <div class="form-group">
                <label for="Password">Password</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                  placeholder="Password" />
              </div>
              <button type="submit" class="btn btn-color"> Register </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
