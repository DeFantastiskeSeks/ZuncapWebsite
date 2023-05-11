<script setup></script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-auto mx-auto">
        <form>
          <div class="form-login">
            <h1>Log in</h1>
            <div class="form-group">
              <label for="TlfNr">Telefon Nummer</label>
              <input
                type="text"
                class="form-control"
                placeholder=" eks. 12345678"
              />
            </div>
            <div class="form-group">
              <label for="Password">Password</label>
              <input
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
            <button type="submit" class="btn btn-primary">Login</button>
            <br />
            <small id="PhoneHelp" class="form-text text-muted"
              >Ingen konto? intet problem. Register her.</small
            >
            <br />
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
