<template>
  <div :style="calcStyle" class="chat-view">
    <TopContent :user-info="userInfo"/>
    <Selects/>
    <div class="msg-content">
      <Vuescroll :ops="ops">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </Vuescroll>
    </div>
  </div>
</template>

<script lang="ts">

  import {Component, Prop, Vue} from "vue-property-decorator";

  import TopContent from "@/views/chat/top/TopContent.vue";
  import Selects from "@/views/chat/selects/Selects.vue";
  import PeopleGroup from "@/views/chat/message/people/PeopleGroup.vue";

  import Vuescroll from "vuescroll"
  import {UserChatInfo} from "@/types";

  @Component({
    components: {
      PeopleGroup,
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

    private get calcStyle() {
      let style: any = {};

      if (this.userInfo.chatBgcImg) {
        style.backgroundImage = `url(${this.userInfo.chatBgcImg})`
      }

      if (this.userInfo.chatBgcColor) {
        style.backgroundColor = this.userInfo.chatBgcColor;
      }

      console.log(style);
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
