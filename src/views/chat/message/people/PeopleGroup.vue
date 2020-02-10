<template>
  <div @click.stop.prevent="showOrHidePeople" @contextmenu.stop.prevent="routesContentMenuShow"
       :class="`people-group ${isShowPeoples ? 'active': ''}`">
    <div class="left">
      <i class="chat-font icon-jiantou"></i>
    </div>
    <div class="right">
      <span>{{userGroup.name}}</span>
    </div>
    <div v-show="isShowPeoples" class="peoples">
      <PeopleItem v-for="(item) in userGroup.list" :key="item.userId" @routesContentMenuShow="itemRoutesContentMenuShow"
                  @routesContentMenuHide="routesContentMenuHide" :user-chat-info="item"/>
      <!--      <PeopleItem/>-->
      <!--      <PeopleItem/>-->
      <!--      <PeopleItem/>-->
      <!--      <PeopleItem/>-->
      <!--      <PeopleItem/>-->
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "vue-property-decorator";
  import PeopleItem from "@/views/chat/message/people/PeopleItem.vue";
  import {ContentMenuEvent, UserGroup} from "@/types";

  @Component({
    components: {
      PeopleItem
    }
  })
  export default class PeopleGroup extends Vue {

    @Prop({type: Object, default: () => ({})})
    private userGroup!: UserGroup;

    private isShowPeoples: boolean = false;


    private mounted(): void {
    }

    private itemRoutesContentMenuShow(e: ContentMenuEvent) {
      e.groupId = this.userGroup.id;
      return e;
    }

    @Emit("routesContentMenuShow")
    private routesContentMenuShow(e: MouseEvent): ContentMenuEvent {
      return {
        type: "group",
        groupId: this.userGroup.id,
        event: e
      };
    }

    @Emit("routesContentMenuHide")
    private routesContentMenuHide() {
      console.log("单机按下")
      return "";
    }

    private showOrHidePeople() {
      this.routesContentMenuHide();
      this.isShowPeoples = !this.isShowPeoples;
    }

  }
</script>

<style lang="less" scoped>
  .people-group {
    width: 100%;
    min-height: 18px;
    line-height: 18px;
    font-size: 14px;
    margin: 10px 0;
    cursor: pointer;

    &.active > .left > i {
      margin-top: -5px;
      display: block;
      transform: rotate(90deg);
    }

    .left, .right {
      float: left;
    }

    .right {
      color: #333333;
    }

    .left {
      color: #888888;
      width: 28px;
      text-align: right;
      padding-right: 3px;
    }

    .peoples {
      width: 100%;
      overflow: hidden;

      &:last-child {
        margin-bottom: -10px;
      }
    }
  }
</style>
