<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-navbar">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">Zuncap</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                  <RouterLink class="nav-link" to="/">Home</RouterLink>
                  <RouterLink class="nav-link" to="/hudtypetest">HudtypeTest</RouterLink>
                  <RouterLink class="nav-link" to="/login">Login</RouterLink>
                  <RouterLink class="nav-link" to="/register">Register</RouterLink>
                  <RouterLink class="nav-link" to="/user">Bruger</RouterLink>
                </ul>
            </div>
        </div>
      </nav>
</template>