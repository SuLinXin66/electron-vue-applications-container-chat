<template>
  <div id="app">
    <Chat :user-info="userInfo"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  import Chat from "@/views/chat/Chat.vue";
  import {RemoteEventNames, UserLocalEventNames} from "@/const";
  import {EventReturn, UserChatInfo, UserInfo} from "@/types";
  import {sendAjax} from "@/api/axios/request";
  import {queryUserChat} from "@/api";

  @Component({
    components: {
      Chat
    }
  })
  export default class App extends Vue {

    private userInfo: UserChatInfo = {} as any;

    private async mounted() {
      const data: EventReturn<UserInfo> = this.electronIpcRenderer.sendSync(UserLocalEventNames.queryUserInfo);
      if (data.error) {
        this.electronIpcRenderer.send(RemoteEventNames.chatMainLoading, "获取登录用户信息失败!");
        return
      }
      try {
        const resp = await sendAjax(queryUserChat({
          idCode: data.result!.idCode
        }));
        this.userInfo = resp.data.result;
        console.log(this.userInfo)
        this.electronIpcRenderer.send(RemoteEventNames.chatMainLoading)
      } catch (e) {
        let content = "请稍后重新尝试";
        if (e.code == 12) {
          content = "连接服务器失败"
        } else if (e.data && e.data.msg) {
          content = e.data.msg;
        } else {
          content = e.message;
        }
        this.electronIpcRenderer.send(RemoteEventNames.chatMainLoading, content);
        return
      }


    }
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
