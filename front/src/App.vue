<template>
  <div id="wrapper">
    <section id="main">
      <Login />
    </section>
    <footer id="footer">
      <ul class="copyright">
        <li>&copy; Jane Doe</li>
        <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
      </ul>
    </footer>
  </div>
</template>
<script>
import './assets/css/main.css';
import Login from './Login.vue';

export default {
  components: { Login },
};
</script>
<style>
#main {
  background-color: rgba(255, 255, 255, 0.85);
}
input {
  background-color: transparent !important;
}
</style>