<script>
export default {
  data() {
    return {
      hudtype: null,
      hudtypeResultat: null,
      nuance: 0,
      skoldet: 0,
      brun: 0,
      øjenfarve: 0,
      hårfarve: 0,
      fregner: 0,
      showResult: false
    };
  },
  methods: {
    CalculatehudtypeResultat() {
      const result =
        this.nuance +
        this.skoldet +
        this.brun +
        this.øjenfarve +
        this.hårfarve +
        this.fregner;
      this.hudtypeResultat = result;

      if (result >= 0 && result <= 3) {
        this.hudtype = 1
      } else if (result >= 4 && result <= 7) {
        this.hudtype = 2
      } else if (result >= 8 && result <= 11) {
        this.hudtype = 3
      } else if (result >= 12 && result <= 14) {
        this.hudtype = 4
      } else if (result <= 15) {
        this.hudtype = 5
      }

      this.showResult = true;
    },
  },
}
</script>

<template>
  <div class="container">
    <h1>Hudtype Test</h1>
    <form v-on:submit.prevent="CalculatehudtypeResultat()">
      <div class="form-hudtype">
        <div class="form-group form-group-text">
          <label for="nuance">
            Hold paletten med de syv nuancer mod undersiden af din underarm,
            hvor din hud typisk ikke er så eksponeret for solens stråling.
            Hvad er din hudnuance?
          </label>
          <button type="button" class="btn btn-color mb-3 d-block" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Se din hudfarve
          </button>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Test skema for din hudtype</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <img class="img-fluid" src="../assets/img/HudfarveSkema.png" alt="Hudfarve Skema">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-color" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          
          <select name="nuance" v-model="nuance" class="form-select select-dark" id="nuance">
            <option :value="parseInt(0)" style="background-color: rgb(239, 218, 198);">A</option>
            <option :value="parseInt(0)" style="background-color: rgb(237, 207, 181);">B</option>
            <option :value="parseInt(1)" style="background-color: rgb(232, 200, 155);">C</option>
            <option :value="parseInt(1)" style="background-color: rgb(221, 181, 139);">D</option>
            <option :value="parseInt(2)" style="background-color: rgb(204, 155, 104);">E</option>
            <option :value="parseInt(2)" style="background-color: rgb(185, 147, 95);">F</option>
            <option :value="parseInt(3)" style="background-color: rgb(148, 113, 84);">G</option>
          </select>
        </div>
        <div class="form-group form-group-text">
          <label for="skoldet">
            Bliver du skoldet i den første sommersol, hvis du ikke beskytter
            dig?
          </label>
          <select name="skoldet" v-model="skoldet" class="form-select select-dark" id="skoldet">
            <option :value="parseInt(0)">Bliver altid skoldet</option>
            <option :value="parseInt(1)">Bliver sommetider skoldet</option>
            <option :value="parseInt(2)">Bliver sjældent skoldet</option>
            <option :value="parseInt(3)">Bliver aldrig skoldet</option>
          </select>
        </div>
        <div class="form-group form-group-text">
          <label for="brun">
            Bliver du brun i den første sommersol, hvis du ikke beskytter dig?
          </label>
          <select name="brun" v-model="brun" class="form-select select-dark" id="brun">
            <option :value="parseInt(0)">Bliver aldrig brun</option>
            <option :value="parseInt(1)">Bliver lidt brun</option>
            <option :value="parseInt(2)">Bliver noget brun</option>
            <option :value="parseInt(3)">Bliver kraftig brun</option>
          </select>
        </div>
        <div class="form-group form-group-text">
          <label for="øjenfarve">Hvad er din øjenfarve?</label>
          <select name="øjenfarve" v-model="øjenfarve" class="form-select select-dark" id="øjenfarve">
            <option :value="parseInt(0)" style="background-color: rgb(77, 77, 199)">Blå</option>
            <option :value="parseInt(1)" style="background-color: rgb(110, 110, 110)">Grå</option>
            <option :value="parseInt(1)" style="background-color: rgb(14, 122, 14)">Grøn</option>
            <option :value="parseInt(2)" style="background-color: rgb(103, 52, 12)">Brun</option>
          </select>
        </div>
        <div class="form-group form-group-text">
          <label for="hårfarve">
            Hvad er (var) din naturlige hårfarve, da du var 18 år?
          </label>
          <select name="hårfarve" v-model="hårfarve" class="form-select select-dark" id="hårfarve">
            <option :value="parseInt(0)" style="background-color: rgb(243, 90, 8)">Rødt</option>
            <option :value="parseInt(0)" style="background-color: rgb(252, 237, 116)">Blond</option>
            <option :value="parseInt(1)" style="background-color: rgb(185, 93, 27)">Lysebrunt</option>
            <option :value="parseInt(2)" style="background-color: rgb(98, 51, 21)">Mørkebrunt</option>
            <option :value="parseInt(2)" style="background-color: rgb(34, 13, 2)">Sort</option>
          </select>
        </div>
        <div class="form-group form-group-text">
          <label for="fregner">Har du fregner?</label>
          <select name="fregner" v-model="fregner" class="form-select select-dark" id="fregner">
            <option :value="parseInt(0)">Ja, mange</option>
            <option :value="parseInt(1)">Ja, få</option>
            <option :value="parseInt(2)">Nej</option>
          </select>
        </div>
        <div>
          <button type="submit" class="btn btn-color" name="submitbtn">Gem</button>
        </div>
      </div>
    </form>
    <div class="d-flex justify-content-center mt-3" v-if="showResult">
        <div class="card text-white bg-success" style="max-width: 22rem;">
          <div class="card-header d-flex justify-content-between">
            <span>Resultat</span>
            <button type="button" v-on:click="showResult = false" class="btn-close btn-close-white" aria-label="Close"></button>
          </div>
          <div class="card-body">
            <h4 class="card-title">Din Hudtype: <strong>{{ hudtype }}</strong></h4>
            <p class="card-text" name="hudtypeResultat"> Hudtype points: {{ hudtypeResultat }}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
