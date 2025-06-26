<template>
  <div id="app">
    <div class="container">
      <h1>Simulador de Bonificaciones</h1>
      <BonificacionSimulator />
    </div>
  </div>
</template>

<script>
import BonificacionSimulator from './components/BonificacionSimulator.vue'

export default {
  name: 'App',
  components: {
    BonificacionSimulator
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}
</style>
