<script>
import axios from 'axios';
export default {
  data() {
    return {
      userName: null,
      password: null,
      cExpiryDays: 30
    };
  },
  methods: {
    SetCookie: function(cname, cvalue, cexpiredays){
      //SetCookie: function(cname, cvalue, cPassword, cPasswordValue, cexpiredays){
      const expirationDate = new Date();
      expirationDate.setDate((expirationDate.getDate)+(cexpiredays*24*60*60*1000));
      let expires = "expires= " + expirationDate.toUTCString();
      document.cookie = cname + "=" + cvalue + ";"  + expires + ";path=/";
      //document.cookie = cname + "=" + cvalue + ";" + cPassword + "=" + cPasswordValue + ";"  + expires + ";path=/";
    },
    GetCookie: function(cname){
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i<ca.length; i++){
        let c = ca[i];
        while (c.charAt(0)== ''){
          c= c.substring(1);
        }
        if (c.indexOf(name)==0){
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    CheckCookie: function(){
      let username = this.GetCookie("userName");
      if (username != ""){
        alert("Hej igen" + username);
      } else {
        username = prompt("Indtast venligst brugernavn:", "");
        if (username != "" && username != null){
          this.SetCookie("userName", username, this.cExpiryDays)
        }
      }
    },
    async PostLogin() {
      axios.post("https://zuncapapi.azurewebsites.net/api/Users/login", 
        {
          name: this.userName,
          password: this.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        console.log(this.userName + ' ' + this.password);
        //this.SetCookie("userName", this.userName, "password", this.password, this.cExpiryDays)
        this.SetCookie("userName", this.userName, this.cExpiryDays)

    },
  },
  mounted: function() {
    console.log("mounting")
    let cookie = this.GetCookie("userName")
    console.log(cookie)
    console.log("mounted")
  }
  
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
                placeholder="your name" />
            </div>
            <div class="form-group">
              <label for="Password">Password</label>
              <input
                v-model="this.password"
                type="password"
                class="form-control"
                placeholder="Your Password" />
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
