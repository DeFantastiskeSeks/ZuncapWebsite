<script>
import axios from 'axios';
export default {
  data() {
    return {
      nameUser: "simon",
      data: "456645456"
    };
  },
  methods: {
    async GetUserInfo1() {
      axios
        .post("https://zuncapapi.azurewebsites.net/api/Users/getuser", {
          name: this.nameUser,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        this.data = axios.response
    },
  },
};  
function GetUserInfo() {
      axios
        .post("https://zuncapapi.azurewebsites.net/api/Users/getuser", {
          name: "simon",
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        this.data = axios.response
    }
addEventListener("load", GetUserInfo());
</script>

<template>
  <div class="container">
    <div class="text-center">
      <h1>Bruger UV-Index</h1>
      <p v-bind="this.data">
        {{ data }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>