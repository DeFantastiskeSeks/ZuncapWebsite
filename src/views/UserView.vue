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
      cExpiredays: 5,
      dayCount: 0,
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
      await axios
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

      let timer = 0;
      
      //let userUVExpo = this.userData.uvExpo
      //let userHudtype = this.userData.hudtype
      //let endTime = this.GetInfoTimer(userUVExpo, userHudtype)
      
      if (this.userData.uvExpo > 3) {

        const interval = setInterval(() => {
          timer = timer + 1;
          console.log("sekunder: " + timer)

          if (timer === 10 ){
            this.dayCount = this.dayCount + 1;
            console.log("Daycount: " + this.dayCount)
          }

          if (timer > this.alertTime * 60) {
            clearInterval(interval);
            timer = 0;
            this.dayCount = 0;
          }
        }, 1000);
      }
    },

    // dayCount () {
    //   let count = 0
      
    //   if (0 < timer < this.alertTime){
    //     count = count + 1
    //   }
    //   if ( this.startTimer > this.alertTime ) {
    //     count = 0
    //   }
    // },
    
    SetCookie: async function (cname, cvalue, cPasswordValue, cexpiredays) {
      const expirationDate = new Date();
      expirationDate.setDate(
        expirationDate.getDate + cexpiredays * 24 * 60 * 60 * 1000
      );
      let expires = "expires= " + expirationDate.toUTCString();
      document.cookie =
        "sunExpoCount" + "=" + cvalue + "," + cPasswordValue + ";" + expires + ";path=/";
    },
    alertBeforeMaxUV: function () {
      alert("Om 10 minutter er i risiko for at blive solskoldet, og miste din streak");
    },
    alertMaxUV: function () {
      alert("Du er i risiko for at blive solskoldet, og du har mistet din streak");
    },
    GetCookie: async function (name) {
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
    SunReminder: function () {
      let cookie = this.GetCookie("sunExpoCount");
      if (cookie == null) {
       return null;
      }
      let cDate = new Date()
      // cDate.setDate(cDate.getDate() + (3 * 24 * 60 * 60 * 1000))
      cDate.setTime(cDate.getTime() + (3 * 24 * 60 * 60 * 1000))

      // const cDate = new Date()
      // cDate.setDate(cDate.getDate() + 3);
      console.log("cDate: " + cDate);

      const MS_PER_DAY = 1000 * 60 * 60 * 24;
      const date = new Date()
      console.log("date: " + date);
      const diffence = Math.floor((cDate - date) / MS_PER_DAY);
      console.log("Diffence: " + diffence);
      if (diffence > 2){
        alert("Du har ikke fået nok sol i " + diffence + "dage")
        console.log("Diffence: " + diffence);
      }
    },
  }, //Methods End
  mounted: async function () {
    let cookie = await this.GetCookie("userName");
    if (cookie != null) {
      this.cUserName = cookie[0];
    }
    if (this.cUserName != null) {
      await this.GetUserInfo(this.cUserName);
    }
    
    this.alertMaxUV();
    this.SetCookie();
    this.SunReminder();

    
    await this.GetInfoTimer(this.userData.uvExpo, this.userData.hudtype);
    setTimeout(this.alertMaxUV, this.alertTime * 60000);
    setTimeout(this.alertBeforeMaxUV, (this.alertTime - 10) * 60000);
    console.log(this.alertTime)
    
    this.startTimer()
    console.log(this.dayCount())
    //console.log("AlertTime: " + this.alertTime);
    console.log("mounted");
  
  },
};
</script>
  
<template>
  <div class="container h-100">
    <div class="d-flex align-items-center justify-content-center h-100">
      <div class="card">
        <div class="card-header bg-orange">
          <h1 class="card-title">Bruger</h1>
        </div>
        <div class="card-body">          
          <button @click="GetUserInfo()" class="btn btn-color">Update</button>
          <div id="userData-container" class="row">            
            <div class="mt-2 col-12 row">
              <div class="col fw-bold">
                Navn
              </div>
              <div class="col">
                {{ userData.name }}
              </div>
            </div>
            <div class="mt-2 col-12 row">
              <div class="col fw-bold">
                Tlf:
              </div>
              <div class="col">
                {{ userData.telefonNummer }}
              </div>
            </div>
            <div class="mt-2 col-12 row">
              <div class="col fw-bold">
                Hudtype:
              </div>
              <div class="col">
                {{ userData.hudtype }}
              </div>
            </div>
            <div class="mt-2 col-12 row">
              <div class="col fw-bold">
                UV-Expo:
              </div>
              <div class="col">
                {{ userData.uvExpo }}
              </div>
            </div>
            <div class="mt-2 col-12 row">
              <div class="col fw-bold">
                Dage med sol:
              </div>
              <div class="col">
                {{ dayCount }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer bg-card">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <img class="img-fluid" style="height: 2.5rem;" src="../assets/img/orangutan.png" alt="Orangutan">
            </div>
            <small> Shine up your life </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
