<template>
  <div>
    <PeoplesGroup @routesContentMenuShow="routesContentMenuShow" @routesContentMenuHide="routesContentMenuHide" :user-group="userList.default"/>
    <!--    <PeoplesGroup/>-->
    <!--    <PeoplesGroup/>-->
    <!--    <PeoplesGroup/>-->
    <!--    <PeoplesGroup/>-->
    <!--    <PeoplesGroup/>-->
    <!--    <PeoplesGroup/>-->
    <!--    <PeoplesGroup/>-->
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "vue-property-decorator";

  import PeoplesGroup from "../message/people/PeopleGroup.vue";
  import {UserList} from "@/types";

  @Component({
    components: {
      PeoplesGroup
    }
  })
  export default class Peoples extends Vue {

    @Prop({type: Object, default: () => ({})})
    private userList!: UserList;

    @Emit("routesContentMenuShow")
    private routesContentMenuShow(e:any){
      console.log("12345");
      return e;
    }

    @Emit("routesContentMenuHide")
    private routesContentMenuHide(e: any){
      return e;
    }

    private mounted(): void {
    }

  }
</script>

<style scoped>

</style>
