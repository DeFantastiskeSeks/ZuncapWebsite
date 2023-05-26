<script>
export default {
  data() {
    return {
      //https://www.openuv.io/dashboard?tab=0
      weatherData: null,
      lat: 0,
      lng: 0,
      UVI: 0,
      messageFaktor: null,
      messageUVI: null,
      loading: false
    };
  },
  methods: {
    DisplayWarningMessage: async function() {
      if (this.UVI >= 0 && this.UVI < 1.9) {
        this.messageFaktor = "Du kan brug for solcream";
        this.messageUVI = "Meget Lavt";
      } else if (this.UVI >= 2 && this.UVI <= 2,9) {
        this.messageFaktor = "Du kan bruge faktor 15, en gang hver time";
        this.messageUVI = "Lavt";
      } else if (this.UVI >= 3 && this.UVI < 5.9) {
        this.messageFaktor = "Du kan bruge faktor 15, en gang hver time";
        this.messageUVI = "Moderat";
      } else if (this.UVI >= 6 && this.UVI < 7.9) {
        this.messageFaktor = "Du kan bruge faktor 30, en gang hver 20 minut";
        this.messageUVI = "Højt";
      } else if (this.UVI >= 8 && this.UVI < 9.9) {
        this.messageFaktor = "Du kan bruge faktor 50, en gang hver 15 minut";
        this.messageUVI = "Meget høj";
      } else if (this.UVI >= 10 && this.UVI < 15) {
        this.messageFaktor = "Du kan bruge faktor 50+, en gang hver 10 minut";
        this.messageUVI = "Forfærdelig højt";
      }
    },
    GetWeatherData: async function () {
      var myHeaders = new Headers();
      myHeaders.append("x-access-token", "openuv-egfdrlhojc8ya-io");
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };      

      await fetch(
        "https://api.openuv.io/api/v1/uv?lat=" +
          this.lat +
          "&lng=" +
          this.lng +
          "&alt=100&dt=",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.UVI = data.result.uv;
          this.loading = false;
        })
        .catch((error) => console.log("error", error));
    },
    GetPosition: function () {
      if ("geolocation" in navigator) {
        this.loading = true;
        navigator.geolocation.getCurrentPosition((position) => {
          this.Succes(position);
        });
      } else {
        this.Error();
      }
    },
    Succes: async function (position) {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      await this.GetWeatherData();
    },
    Error: function () {
      console.log("Geolocation not permited or disabled");
    },
  },
  async created() {
    this.GetPosition();
    this.DisplayWarningMessage();
  },
  watch: {
    UVI: async function () {
      await this.DisplayWarningMessage();
    },
  },
};
</script>

<template>
  <div class="container h-100">
    <div class="d-flex align-items-center justify-content-center h-100">
      <div class="card">
        <div class="card-header bg-card">
          <h1 class="card-title text-center">UV-Index</h1>
        </div>
        <div class="card-body text-center">
          <!-- et kort er meget godt-->
          <div class="spinner-border text-orange" style="width: 3rem; height: 3rem;" v-if="loading" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="container" v-if="!loading">
            <div class="d-flex align-items-center justify-content-center">            
              <div class="row">
                <div class="col bg-orange rounded-circle">
                  <h1 class="py-3 fw-bold" style="font-size: 6rem">
                    {{ UVI.toFixed(1) }}
                  </h1>
                </div>
              </div>
            </div>
            <div class="mt-3">{{ messageFaktor }}</div>
            <div class="my-2">{{ messageUVI }}</div>
            <button
              type="button"
              class="btn btn-color mt-2"
              v-on:click="GetPosition()">
              Update
            </button>
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
