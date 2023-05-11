<script>
  export default {
    data(){
      return {
        nameUser:"",
        telefonNummer:0,
        password:""
      }
    }
  }
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-auto mx-auto">
        <form>
          <div class="form-login">
            <h1>Register</h1>
            <div class="form-group">
              <label for="TlfNr">Fornavn</label>
              <div class="input-group-prepend"></div>
              <input
                v-model="addUser.name"
                type="text"
                class="form-control"
                placeholder="Bob"
              />
              <label for="TlfNr">Efternavn</label>
              <input type="text" class="form-control" placeholder="Bobsen" />
            </div>
            <div class="form-group">
              <label for="TlfNr">Telefon Nummer</label>
              <input
                v-model="addUser.telefon"
                type="number"
                class="form-control"
                placeholder=" eks. 12345678"
              />
            </div>
            <div class="form-group">
              <label for="Password">Password</label>
              <input
                v-model="addUser.password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1"
                >Husk mig</label
              >
            </div>
            <button
              v-on:click="addItem()"
              type="submit"
              class="btn btn-primary"
            >
              Register
            </button>

            <a href="#">Har du allerede konto? intet problem. Login her.</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
