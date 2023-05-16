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
    let cookie = this.GetCookie("userName", "password");
    if (cookie != null) {
      this.userName = cookie[0];
      this.password = cookie[1];
      if (this.userName && this.password != null) {
        this.PostLogin();
      }
    }
    console.log(this.userName + " " + this.password);
    console.log("mounted");
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
                v-model="this.userName"
                type="text"
                class="form-control"
                placeholder="Brugernavn"
              />
            </div>
            <div class="form-group">
              <label for="Password">Password</label>
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
            <button type="submit" class="btn btn-primary" name="submitbtn">
              Login
            </button>
            <button type="submit" class="btn btn-primary" name="submitbtn">Login</button>
            <button onclick="location.href='/useruv'" type="submit" class="btn btn-primary" name="submitbtn">Redirect</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
