<template>
  <div class="messages">
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
    <PeopleItem/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  import PeopleItem from "@/views/chat/message/people/PeopleItem.vue";

  @Component({
    components: {PeopleItem},
  })
  export default class Messages extends Vue {

  }
</script>

<style lang="less" scoped>
</style>