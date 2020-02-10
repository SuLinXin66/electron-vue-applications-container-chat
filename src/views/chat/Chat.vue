<template>
  <div :style="calcStyle" class="chat-view">
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>新增</v-contextmenu-item>
      <v-contextmenu-item>删除</v-contextmenu-item>
      <v-contextmenu-item>修改</v-contextmenu-item>
    </v-contextmenu>
    <TopContent :user-info="userInfo"/>
    <Selects/>
    <div v-contextmenu:contextmenu class="msg-content">
      <Vuescroll :ops="ops">
        <keep-alive>
          <router-view @routesContentMenuShow="routesContentMenuShow" @routesContentMenuHide="()=>$refs['contextmenu'].hide()" :user-list="userList"/>
        </keep-alive>
      </Vuescroll>
    </div>
  </div>
</template>

<script lang="ts">

  import {Component, Prop, Vue} from "vue-property-decorator";

  import TopContent from "@/views/chat/top/TopContent.vue";
  import Selects from "@/views/chat/selects/Selects.vue";

  import Vuescroll from "vuescroll"
  import {ContentMenuEvent, UserChatInfo, UserList} from "@/types";

  @Component({
    components: {
      TopContent, Selects, Vuescroll
    }
  })
  export default class Chat extends Vue {
    private ops = {
      scrollPanel: {
        scrollingX: false
      },
      bar: {
        background: '#888888'
      }
    };

    @Prop({type: Object, default: () => ({})})
    private userInfo!: UserChatInfo;

    @Prop({type: Object, default: () => ({})})
    private userList!: UserList;

    private routesContentMenuShow(e: ContentMenuEvent) {
      console.log(e);
      console.log("点击触发");
      (this.$refs["contextmenu"] as any).show({
        top: e.event.y,
        left: e.event.x
      });
    };

    private get calcStyle() {
      let style: any = {};

      if (this.userInfo.chatBgcImg) {
        style.backgroundImage = `url(${this.userInfo.chatBgcImg})`
      }

      if (this.userInfo.chatBgcColor) {
        style.backgroundColor = this.userInfo.chatBgcColor;
      }

      return style
    }

  }
</script>

<style lang="less" scoped>
  * {
    user-select: none;
  }

  .chat-view {
    /*background-image: url("../../../assets/tmp/bgc/bgc.jpg");*/
    /*background-color: lightskyblue;*/
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;
    /*background-color: rgba(0, 0, 0, 0.3);*/
    background-size: 100% 100%;

    .msg-content {
      position: absolute;
      left: 0;
      right: 0;
      top: 146px;
      bottom: 28px;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
</style>
