<script>
import axios from 'axios'
export default {
  data() {
    return {
      //https://www.openuv.io/dashboard?tab=0
      weatherData: null,
      apiKey: 'openuv-180e7rlhkig55y-io',
      lat: null,
      lon: null,
      geoApiURL: 'http://api.openweathermap.org/geo/1.0/direct?q=DK&appid=',
      weatherApiURL: 'https://api.openuv.io/api/v1/uv?lat=55.65&lng=12.13&alt=100:alt&dt=:d',
      UVI: 0,
      messageFaktor: null,
      messageUVI: null
    };
  },
  methods: {
    DisplayWarningMessage() {
      if (this.UVI >= 0 && this.UVI < 3) {
        this.messageFaktor = "Faktor : Du kan bruge faktor 15, en gang hver time, min person";
        this.messageUVI = "UVI : Lavt";
      }
      else if (this.UVI >= 3 && this.UVI <= 6) {
        this.messageFaktor = "Faktor : Du kan bruge faktor 15, en gang hver time, min person";
        this.messageUVI = "UVI : Moderat";
      }
      else if (this.UVI >= 6 && this.UVI <= 8) {
        this.messageFaktor = "Faktor : Du kan bruge faktor 30, en gang hver 20, min person";
        this.messageUVI = "UVI : Højt";
      }
      else if (this.UVI >= 8 && this.UVI <= 10) {
        this.messageFaktor = "Faktor : Du kan bruge faktor 50, en gang hver 15, min person";
        this.messageUVI = "UVI : Meget høj";
      }
      else if (this.UVI >= 10 && this.UVI <= 15) {
        this.messageFaktor = "Faktor : Du kan bruge faktor 50+, en gang hver 10, min person";
        this.messageUVI = "UVI: Forfærdelig højt";
      }
    },
    async GetWeatherData() {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", "openuv-180e7rlhkig55y-io");
        myHeaders.append("Content-Type", "application/json");
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://api.openuv.io/api/v1/uv?lat=55.65&lng=12.13&alt=100&dt=", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    },
    async GetPosition() {
      try {
        const response = await axios.get(this.geoApiURL + this.apiKey)
        this.lat = response.data[0].lat
        this.lon = response.data[0].lon
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.GetWeatherData()
  },
  watch: {
    UVI: function() {
      this.DisplayWarningMessage()
    } 
  },
};
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header bg-card">
        <h1 class="card-title">UV-Index</h1>
      </div>
      <div class="card-body">
        <!-- et kort er meget godt-->
        <div v-on:change="DisplayWarningMessage()">{{ UVI }}</div>
        <div>{{ messageFaktor }}</div>
        <div>{{ messageUVI }}</div>
        <div class="text-center mt-2">
          <button type="button" class="btn btn-color mx-2" v-on:click="this.UVI++">+</button>
          <button type="button" class="btn btn-color mx-2" v-on:click="this.UVI--">-</button>
        </div>
        <div class="text-center">
          <button type="button" class="btn btn-color mt-2" v-on:click="GetWeatherData()">
          Update
        </button>
        </div>
      </div>
      <div class="card-footer bg-card">
        <small>Uhhh</small>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>