<script>
import axios from "axios";
export default {
  data() {
    return {
      //https://www.openuv.io/dashboard?tab=0
      weatherData: null,
      apiKey: "openuv-180e7rlhkig55y-io",
      lat: 0,
      lng: 0,
      geoApiURL: "http://api.openweathermap.org/geo/1.0/direct?q=DK&appid=",
      UVI: 0,
      messageFaktor: null,
      messageUVI: null,
    };
  },
  methods: {
    DisplayWarningMessage() {
      if (this.UVI >= 2 && this.UVI < 3) {
        this.messageFaktor =
          "Du kan bruge faktor 15, en gang hver time";
        this.messageUVI = "Lavt";
      } else if (this.UVI >= 3 && this.UVI <= 6) {
        this.messageFaktor =
          "Du kan bruge faktor 15, en gang hver time";
        this.messageUVI = "Moderat";
      } else if (this.UVI >= 6 && this.UVI <= 8) {
        this.messageFaktor =
          "Du kan bruge faktor 30, en gang hver 20 minut";
        this.messageUVI = "Højt";
      } else if (this.UVI >= 8 && this.UVI <= 10) {
        this.messageFaktor =
          "Du kan bruge faktor 50, en gang hver 15 minut";
        this.messageUVI = "Meget høj";
      } else if (this.UVI >= 10 && this.UVI <= 15) {
        this.messageFaktor =
          "Du kan bruge faktor 50+, en gang hver 10 minut";
        this.messageUVI = "Forfærdelig højt";
      }
    },
    GetWeatherData: function() {
      var myHeaders = new Headers();
      myHeaders.append("x-access-token", "openuv-egfdrlhojc8ya-io");
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };      

      fetch(
        "https://api.openuv.io/api/v1/uv?lat=" +
          this.lat +
          "&lng=" +
          this.lng +
          "&alt=100&dt=",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          const newResult = JSON.parse(result);
          this.UVI = newResult.result.uv;
        })
        .catch((error) => console.log("error", error));
    },
    GetPosition: function() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.Succes(position);
        });
      } else {
        this.Error();
      }
    },
    Succes: function(position) {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.GetWeatherData();
    },
    Error: function() {
      console.log("Geolocation not permited or disabled");
    },
    ChangeBackground: function() {
      document.getElementsByName('body')
    }
  },
  created() {
    this.GetPosition();
  },
  watch: {
    UVI: function () {
      this.DisplayWarningMessage();
    },
  },
};
</script>

<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <div class="card">
      <div class="card-header bg-card">
        <h1 class="card-title text-center">UV-Index</h1>
      </div>
      <div class="card-body">
        <!-- et kort er meget godt-->
        <div class="container d-flex align-items-center justify-content-center">
          <div class="row">
            <div class="col bg-orange rounded-circle">
              <h1 class="px-4 fw-bold" style="font-size: 6rem;">{{ parseInt(UVI) }}</h1>
            </div>
          </div>
        </div>
        <div class="text-center">
          <div class="mt-3">{{ messageFaktor }}</div>
          <div class="my-2">{{ messageUVI }}</div>
        </div>
        <div class="text-center">
          <button
            type="button"
            class="btn btn-color mt-2"
            v-on:click="GetPosition()"
          >
            Update
          </button>
        </div>
      </div>
      <div class="card-footer bg-card">        
        <div class="d-flex align-items-center justify-content-between">
          <div v-on:hover="ChangeBackground()">
            <img class="img-fluid" style="height: 2.5rem;" src="../assets/img/orangutan.png" alt="Orangutan">
          </div>
          <small>
            Shine up your life
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
