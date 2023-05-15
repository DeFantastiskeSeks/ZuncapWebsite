<script>
import axios from "axios";
import { setTransitionHooks } from "vue";
export default {
  data() {
    return {
      time: 60000 * 1,
      alertTime: null,
      userData: {
        userId: 0,
        name: "",
        telefonNummer: 0,
        password: "",
        hudtype: 1,
        uvExpo: 4,
        time:0,
      },
    };
  },
  methods: {
    GetUserInfo: async function() {
      console.log("getting user info");
      axios
        .post("https://zuncapapi.azurewebsites.net/api/Users/getuser", {
          name: "simon",
        })
        .then((response) => {
          console.log(response.data);
          this.userData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetInfoTimer: async function(userUVIndex, userHudtype) {
      if ((userUVIndex >= 3) & (userUVIndex < 5))
      {
        if  (userHudtype == 1) {
            this.alertTime = 40
            
        }
        else if (userHudtype == 2) {
          this.alertTime = 55
        }
        else if (userHudtype == 3) {
          this.alertTime = 65
        }
        else if (userHudtype == 4) {
          this.alertTime = 95
        }
        else (userHudtype == 5); {
          this.alertTime = 130
        }
      }
      else if ((userUVIndex >= 5) & (userUVIndex < 7))
      {
        if (userHudtype == 1) {
          this.alertTime = 22
        } else if (userHudtype == 2) {
          this.alertTime = 32
        } else if (userHudtype == 3) {
          this.alertTime = 36
        } else if (userHudtype == 4) {
          this.alertTime = 56
        } else (userHudtype == 5); {
          this.alertTime = 78
        }
      }
      else if ((userUVIndex >= 7) & (userUVIndex < 9))
      {
        if (userHudtype == 1) {
          this.alertTime = 15
        } else if (userHudtype == 2) {
          this.alertTime = 20
        } else if (userHudtype == 3) {
          this.alertTime = 25
        } else if (userHudtype == 4) {
          this.alertTime = 40
        } else (userHudtype == 5); {
          this.alertTime = 55
        }
      }
      else if ((userUVIndex >= 9) & (userUVIndex < 11))
      {
        if (userHudtype == 1) {
          this.alertTime = 12
        } else if (userHudtype == 2) {
          this.alertTime = 16
        } else if (userHudtype == 3) {
          this.alertTime = 18
        } else if (userHudtype == 4) {
          this.alertTime = 30
        } else (userHudtype == 5); {
          this.alertTime = 42
        }
      }      
      else if (userUVIndex < 11)
      {
        if (userHudtype == 1) {
          this.alertTime = 10
        } else if (userHudtype == 2) {
          this.alertTime = 15
        } else if (userHudtype == 3) {
          this.alertTime = 15
        } else if (userHudtype == 4) {
          this.alertTime = 25
        } else (userHudtype == 5); {
          this.alertTime = 35
        }
      }
      console.log(this.alertTime)
    },
    alertBeforeMaxUV: function() {
      alert('Om 10 minutter har du modtaget den anbefalede mængde UV')
    },
    
    alertMaxUV: function() {
      alert('Du har modtaget den anbefalede mængde UV')
    },

    //Methods End
  },
  mounted: async function () {
    //await this.GetUserInfo();
    await this.GetInfoTimer(this.userData.uvExpo, this.userData.hudtype);

    //setInterval(await this.GetUserInfo, this.time)
    setTimeout(this.alertMaxUV, this.alertTime * 60000)
    setTimeout(this.alertBeforeMaxUV, (this.alertTime - 10) * 60000)
    console.log("AlertTime: " + this.alertTime);
    console.log("mounted");
  },
};
</script>

<template>
  <div class="container">
    <div class="text-center">
      <h1>Bruger UV-Index</h1>
      <div id="userData-container">
        <p>BrugerId: {{ userData.userId }}</p>
        <p>Navn: {{ userData.name }}</p>
        <p>Telefon Nummer: {{ userData.telefonNummer }}</p>
        <p>Hudtype {{ userData.hudtype }}</p>
        <p>UV-Index: {{ userData.uvExpo }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
