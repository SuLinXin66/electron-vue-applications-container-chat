<template>
  <div @click.stop.prevent="routesContentMenuHide" @contextmenu="routesContentMenuShow" class="people-item">
    <div class="left" :class="isOnLine || isGroup ? '':'offline'">
      <img v-show="typeof userChatInfo.icon !== 'undefined' && userChatInfo.icon.length && userChatInfo.icon.length > 1"
           :src="userChatInfo.icon" alt="头像">
    </div>
    <div class="right">
      <span :class="isGroup?'group-name' : 'user-name'">{{`${userChatInfo.userInfo.userName}( ${userChatInfo.userInfo.name} )`}}</span>
      <span v-if="!isGroup" class="user-sign">{{userChatInfo.meAbout}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "vue-property-decorator";
  import {ContentMenuEvent, UserChatInfo} from "@/types";

  @Component({})
  export default class PeopleItem extends Vue {

    @Prop({type: Boolean, default: false})
    private isGroup!: boolean;

    // @Prop({type: Boolean, default: true})
    // private isOnLine!: boolean;

    private get isOnLine() {
      if (!this.userChatInfo || !this.userChatInfo.nowStatus || parseInt(this.userChatInfo.nowStatus) === 2) {
        return false
      }
      return true;
    }

    @Prop({type: Object, default: () => ({})})
    private userChatInfo!: UserChatInfo;

    @Emit("routesContentMenuShow")
    private routesContentMenuShow(event: MouseEvent): ContentMenuEvent {
      return {
        type: "item",
        itemId: this.userChatInfo.userId,
        event
      }
    }

    @Emit("routesContentMenuHide")
    private routesContentMenuHide() {
      return "";
    }

  }
</script>

<style lang="less" scoped>
  .people-item {
    width: 100%;
    height: 52px;
    margin: 8px 0;
    padding: 5px 15px 5px 15px;
    position: relative;
    vertical-align: middle;

    &:hover {
      background-color: rgba(0, 0, 0, .05);
      cursor: pointer;
    }

    & > div {
      float: left;

      span {
        width: 100%;
        display: block;
        text-align: left;
      }

      .group-name {
        height: 43px;
        line-height: 43px;
      }

      .user-name {
        color: #333333;
        font-weight: bold;
        font-size: 14px;
      }

      .user-sign {
        width: 98%;
        color: rgba(0, 0, 0, 0.5);
        font-size: 12px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .right {
      padding-top: 8px;
      padding-left: 8px;
      position: absolute;
      right: 0;
      left: 60px;
      top: 0;
      bottom: 0;
    }

    .left {
      padding-top: 8px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 60px;
      text-align: right;
      line-height: 52px;

      &.offline::after {
        content: "";
        width: 36px;
        height: 36px;
        border-radius: 100%;
        position: absolute;
        left: 24px;
        top: 8px;
        background-color: rgba(0, 0, 0, 0.6);
      }

      img {
        width: 36px;
        height: 36px;
        border-radius: 100%;
      }
    }
  }
</style>
