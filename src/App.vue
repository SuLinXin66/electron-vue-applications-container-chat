<template>
  <div id="app">
    <Chat :user-list="userList" :user-info="userInfo"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  import Chat from "@/views/chat/Chat.vue";
  import {RemoteEventNames, UserLocalEventNames} from "@/const";
  import {EventReturn, UserChatInfo, UserInfo, UserList} from "@/types";
  import {sendAjax} from "@/api/axios/request";
  import {queryDefaultUserList, queryUserChat} from "@/api";

  @Component({
    components: {
      Chat
    }
  })
  export default class App extends Vue {

    private userInfo: UserChatInfo = {} as any;

    private userList: UserList = {} as any;

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

        const userListResp = await sendAjax(queryDefaultUserList({
          idCode: data.result!.idCode
        }));


        this.userList = {
          default: {
            id: 0,
            name: this.userInfo.userInfo.companyName,
            list: userListResp.data.result
          },
          more: []
        };
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
