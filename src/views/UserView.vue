<script>
import axios from "axios";
//import { count } from "console";
import { setTransitionHooks } from "vue";
export default {
  data() {
    return {
      time: 60000 * 1,
      alertTime: null,
      cUserName: null,
      userData: {
        userId: 0,
        name: "",
        telefonNummer: 0,
        password: "",
        hudtype: 1,
        uvExpo: 11,
        time: 0,
      },
    };
  },
  methods: {
    GetUserInfo: async function (userName) {
      console.log("getting user info");
      axios
        .post("https://zuncapapi.azurewebsites.net/api/Users/getuser", {
          name: userName,

        })
        .then((response) => {
          console.log(response.data);
          this.userData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetInfoTimer: async function (userUVIndex, userHudtype) {
      debugger;
      if ((userUVIndex >= 3) & (userUVIndex < 5)) {
        if (userHudtype == 1) {
          this.alertTime = 40;
        } else if (userHudtype == 2) {
          this.alertTime = 55;
        } else if (userHudtype == 3) {
          this.alertTime = 65;
        } else if (userHudtype == 4) {
          this.alertTime = 95;
        } else if (userHudtype >= 5) {
          this.alertTime = 130;
        }
      } else if ((userUVIndex >= 5) & (userUVIndex < 7)) {
        if (userHudtype == 1) {
          this.alertTime = 22;
        } else if (userHudtype == 2) {
          this.alertTime = 32;
        } else if (userHudtype == 3) {
          this.alertTime = 36;
        } else if (userHudtype == 4) {
          this.alertTime = 56;
        } else if (userHudtype >= 5) {
          this.alertTime = 78;
        }
      } else if ((userUVIndex >= 7) & (userUVIndex < 9)) {
        if (userHudtype == 1) {
          this.alertTime = 15;
        } else if (userHudtype == 2) {
          this.alertTime = 20;
        } else if (userHudtype == 3) {
          this.alertTime = 25;
        } else if (userHudtype == 4) {
          this.alertTime = 40;
        } else if (userHudtype >= 5) {
          this.alertTime = 55;
        }
      } else if ((userUVIndex >= 9) & (userUVIndex < 11)) {
        if (userHudtype == 1) {
          this.alertTime = 12;
        } else if (userHudtype == 2) {
          this.alertTime = 16;
        } else if (userHudtype == 3) {
          this.alertTime = 18;
        } else if (userHudtype == 4) {
          this.alertTime = 30;
        } else if (userHudtype >= 5) {
          this.alertTime = 42;
        }
      } else if (userUVIndex >= 11) {
        if (userHudtype == 1) {
          this.alertTime = 10;
        } else if (userHudtype == 2) {
          this.alertTime = 15;
        } else if (userHudtype == 3) {
          this.alertTime = 15;
        } else if (userHudtype == 4) {
          this.alertTime = 25;
        } else if (userHudtype >= 5) {
          this.alertTime = 35;
        }
      }
    },
    startTimer: function() {

      let starttimer = 0;
      //let userUVExpo = this.userData.uvExpo
      //let userHudtype = this.userData.hudtype
      //let endTime = this.GetInfoTimer(userUVExpo, userHudtype)
      
      if (this.userData.uvExpo > 3) {
        const interval = setInterval(() => {
          starttimer = starttimer + 1;
          console.log(starttimer)

          if (starttimer > this.alertTime) {
            clearInterval(interval);
            starttimer = 0;
          }
        }, 1000);
      }
    },

    dayCount () {
      let time = this.startTimer()
      
      if (0 < time < this.alertTime){
        dayCount++
      }
      if ( time > this.alertTime ) {
        dayCount = 0
      }
    },
    
    alertBeforeMaxUV: function () {
      alert("Om 10 minutter er i risiko for at blive solskoldet, og miste din streak");
    },
    alertMaxUV: function () {
      alert("Du er i risiko for at blive solskoldet, og har mistet din streak");
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
    
  }, //Methods End
  mounted: async function () {
    let cookie = this.GetCookie("userName");
    if (cookie != null) {
      this.cUserName = cookie[0];
      if (this.cUserName != null) {
        await this.GetUserInfo(this.cUserName);
      }
    }

    await this.GetInfoTimer(this.userData.uvExpo, this.userData.hudtype);
    setTimeout(this.alertMaxUV, this.alertTime * 60000);
    setTimeout(this.alertBeforeMaxUV, (this.alertTime - 10) * 60000);
    console.log(this.alertTime)
    debugger;
    this.startTimer()
    //console.log("AlertTime: " + this.alertTime);
    console.log("mounted");
  
  },
};
</script>
 
<template>
  <div class="container">
    <div>
      <h1 style="font-size: 50px">Bruger</h1>
      <button @click="GetUserInfo()"></button>
      <div id="userData-container">
        <table style="width: 40%; height: 300px; font-size: 30px">
          <tr>
            <td>Navn:</td>
            <td>{{ userData.name }}</td>
          </tr>
          <tr>
            <td>Telefon Nummer:</td>
            <td>{{ userData.telefonNummer }}</td>
          </tr>
          <tr>
            <td>Hudtype</td>
            <td>{{ userData.hudtype }}</td>
          </tr>
          <tr>
            <td>Sol status:</td>
            <td>Du har (ikke) fået nok Sol</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
