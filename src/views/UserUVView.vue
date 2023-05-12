<script>
import axios from "axios";
import { onMounted } from "vue";
export default {
  data() {
    return {
      nameUser: "simon",
      userData: {userId: 0, name: '', telefonNummer: 0, password: '', hudtype: 0, uvExpo: 0},
    };
  },
  methods: {
    async GetUserInfo() {
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
  },
  mounted: async function () {
    await this.GetUserInfo()
    console.log("mounted");
  },
};
</script>

<template>
  <div class="container">
    <div class="text-center">
      <h1>Bruger UV-Index</h1>
      <div id="userData-container">
        <p>
          BrugerId: {{userData.userId}}
        </p>
        <p>
          Navn: {{userData.name}}
        </p>
        <p>
          Telefon Nummer: {{userData.telefonNummer}}
        </p>
        <p>
          Hudtype {{userData.hudtype}}
        </p>
        <p>
          UV-Index: {{userData.uvExpo}}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
