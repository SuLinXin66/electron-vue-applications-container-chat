<template>
  <div id="app">
    <Chat/>
  </div>
</template>

<script lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
  import {Component, Vue} from "vue-property-decorator";

  import Chat from "@/views/chat/Chat.vue";

  @Component({
    components: {
      Chat
    }
  })
  export default class App extends Vue {

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
