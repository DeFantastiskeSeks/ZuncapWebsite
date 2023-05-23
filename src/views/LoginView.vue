<script>
import axios from "axios";
export default {
  data() {
    return {
      userName: null,
      password: null,
      cExpiryDays: 30,
    };
  },
  methods: {
    SetCookie: function (cname, cvalue, cPasswordValue, cexpiredays) {
      const expirationDate = new Date();
      expirationDate.setDate(
        expirationDate.getDate + cexpiredays * 24 * 60 * 60 * 1000
      );
      let expires = "expires= " + expirationDate.toUTCString();
      document.cookie =
        cname + "=" + cvalue + "," + cPasswordValue + ";" + expires + ";path=/";
    },
    GetCookie: function (name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            if (cookieValue.indexOf(",") !== -1) {
              cookieValue = cookieValue.split(",");
            }
            break;
          }
        }
      }
      return cookieValue;
    },
    async PostLogin() {
      axios
        .post("https://zuncapapi.azurewebsites.net/api/Users/login", {
          name: this.userName,
          password: this.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(this.userName + " " + this.password);
      this.SetCookie(
        "userName",
        this.userName,
        this.password,
        this.cExpiryDays
      );
    },
  },
  mounted: function () {
    console.log("mounting");
    console.log(this.userName + " " + this.password);
    let cookie = this.GetCookie("userName");
    if (cookie != null) {
      this.userName = cookie[0];
      this.password = cookie[1];
      if (this.userName && this.password != null) {
        this.PostLogin();
        window.location.href = "/user";
      }
    }
    console.log(this.userName + " " + this.password);
    console.log("mounted");
  },
};
</script>

<template>
  <div class="container h-100">
    <div class="d-flex align-items-center justify-content-center h-100">
      <div class="card">
        <div class="card-header bg-orange">
          <h1 class="card-title">Log in</h1>
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="PostLogin()">
          <div class="form-login">            
            <div class="form-group">
              <label for="nameUser">Brugernavn:</label>
              <input
                v-model="this.userName"
                type="text"
                class="form-control"
                placeholder="Brugernavn"
              />
            </div>
            <div class="form-group">
              <label for="Password">Password:</label>
              <input
                v-model="this.password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
            <div hidden class="form-check">
              <input type="checkbox" class="form-check-input" />
              <label class="form-check-label">Husk mig</label>
            </div>
            <div>
              <button onclick="location.href='/user'" type="submit" class="btn btn-color" name="submitbtn">Login</button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
