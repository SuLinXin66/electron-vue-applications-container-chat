<template>
  <div @mousedown="mousedown($event)" class="chat-top">
    <span @click="hideWindow" title="关闭" class="close-btn chat-font icon-guanbi"></span>
    <div class="user-info">
      <div class="left">
        <div :style="calcStyle" class="user-img">
          <Dropdown class="state-pos">
            <div :class="`now-state ${imgStateStr}`"></div>
            <DropdownMenu slot="list">
              <DropdownItem>
                <RadioGroup v-model="imgState" vertical>
                  <Radio :disabled="imgState==='3'" label="0">
                    <i class="online"></i>
                    <span>在线</span>
                  </Radio>
                  <Radio :disabled="imgState==='3'" label="1">
                    <i class="busy"></i>
                    <span>忙碌</span>
                  </Radio>
                  <Radio disabled label="2">
                    <i class="offline"></i>
                    <span>离线</span>
                  </Radio>
                </RadioGroup>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <span :title="calcUserName" class="user-name">{{calcUserName}}</span>
        </div>
        <div class="bottom">
          <span :title="signText" @click.stop.prevent="signTextClick" v-show="!isInSign"
                class="sign">{{signText}}</span>
          <Input ref="signInput" @on-blur="updateSign(false)" @on-enter="updateSign(true)" v-show="isInSign"
                 style="width: 98%;"
                 placeholder="再此输入说说"
                 v-model="sign" size="small"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  import {Dropdown, DropdownMenu, DropdownItem, RadioGroup, Radio, Icon, Input} from "view-design";
  import {UserChatInfo} from "@/types";
  import {sendAjax} from "@/api/axios/request";
  import {updateUserAboutDesc, updateUserNowStatues} from "@/api";

  @Component({
    components: {
      Dropdown, DropdownMenu, DropdownItem, RadioGroup, Radio, Icon, Input
    }
  })
  export default class TopContent extends Vue {

    @Prop({required: false, type: Object, default: () => ({})})
    private userInfo!: UserChatInfo;

    private isInSign: boolean = false;

    private userName: string = 'wuhen(苏林鑫)wuhen(苏林鑫)wuhen(苏林鑫)wuhen(苏林鑫)wuhen(苏林鑫)wuhen(苏林鑫)';

    private sign: string = "";

    private isEnter: boolean = false;

    private get calcUserName() {
      if (this.userInfo && this.userInfo.userInfo) {
        return `${this.userInfo.userInfo.userName}( ${this.userInfo.userInfo.name} )`
      }
      return ""
    }

    private get calcStyle() {
      let style: any = {};
      if (this.userInfo.icon) {
        style.backgroundImage = `url(${this.userInfo.icon})`
      } else {
        style.border = `1px solid black`
      }

      return style;
    }

    private get signText() {
      if (typeof this.userInfo.meAbout == "undefined" || this.userInfo.meAbout == "") {
        return "再此输入自我描述"
      } else {
        return this.userInfo.meAbout
      }
    }

    // 我要money我要money要要要

    private get imgStateStr() {
      const nowStatus = parseInt(this.userInfo.nowStatus);
      if (nowStatus == 0) {
        return "online";
      }

      if (nowStatus == 1) {
        return "busy";
      }

      return "offline";
    }

    private get imgState() {
      if (this.userInfo && typeof this.userInfo.nowStatus != "undefined") {
        return this.userInfo.nowStatus.toString();
      }
      return "3"
    }

    private set imgState(str: string) {
      this.settingStatues(str)
    }

    private async settingStatues(str: string) {
      try {
        await sendAjax(updateUserNowStatues({
          userInfo: {
            idCode: this.userInfo.userInfo.idCode
          },
          nowStatus: str
        } as any));
        this.userInfo.nowStatus = str
      } catch (e) {
        this.electronRemote.dialog.showMessageBoxSync(this.electronRemote.getCurrentWindow(), {
          title: "修改失败",
          message: "用户当前在线状态修改失败, 请稍后重新尝试",
          type: 'error',
          buttons: ["确定"],
          defaultId: 0
        });
      }

    }

    private hideWindow() {
      this.electronRemote.getCurrentWindow().hide()
    }

    private mousedown(e: any) {
      const remote = this.electronRemote;
      const currWindowPosition = remote.getCurrentWindow().getPosition();
      let formX = e.screenX - currWindowPosition[0];
      let formY = e.screenY - currWindowPosition[1];
      document.onmousemove = function (e) {
        remote.getCurrentWindow().setPosition((e.screenX - formX), (e.screenY - formY));
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }

    private signTextClick() {
      this.isInSign = !this.isInSign;
      if (this.isInSign) {
        setTimeout(() => {
          (this.$refs["signInput"] as Input).focus();
          console.log((this.$refs["signInput"] as Input));
          ((this.$refs["signInput"] as Input).$refs["input"] as any).value = this.userInfo.meAbout;
        }, 100)
      }
    }

    private async updateSign(isEnter: boolean) {
      if (this.isEnter) {
        this.isEnter = false;
        return
      }
      const signVal = (this.$refs["signInput"] as Input).value;
      try {
        await sendAjax(updateUserAboutDesc({
          userInfo: {
            idCode: this.userInfo.userInfo.idCode
          },
          meAbout: signVal
        } as any));
        this.userInfo.meAbout = signVal as string;
      } catch (e) {
        let title = "修改自我描述失败";
        let content = e.message;
        if (e.code == 12) {
          content = "连接服务器失败, 请检查您配置的地址是否正确"
        } else if (e.data && e.data.msg) {
          title += "( " + e.data.code + " )";
          content = e.data.msg;
        }
        this.electronRemote.dialog.showMessageBoxSync(this.electronRemote.getCurrentWindow(), {
          title,
          message: content,
          type: 'error',
          buttons: ["确定"],
          defaultId: 0
        });
      }
      this.isEnter = isEnter;
      this.isInSign = !this.isInSign;
    }

  }
</script>

<style lang="less" scoped>
  .online {
    background-color: lawngreen;
  }

  .busy {
    background-color: darkorange;
  }

  .offline {
    background-color: #999999;
  }

  .chat-top {
    width: 100%;
    height: 82px;
    cursor: move;

    .close-btn:hover {
      color: rgba(0, 0, 0, 0.9);
      cursor: pointer;
    }

    .close-btn {
      z-index: 9999999999;
      color: rgba(0, 0, 0, 0.5);
      padding: 3px;
      line-height: 18px;
      font-size: 18px;
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 5px;
      text-align: center;
      /*background-color: rgba(0,0,0,0.6);*/
    }

    .user-info {
      width: 100%;
      height: 100%;
      position: relative;
      background-color: transparent;
      display: flex; /*设为伸缩容器*/


      .left, .right {
        float: left;
        height: 100%;
      }

      .left {
        margin-right: 6px;
        /*width: 110px;*/

        .user-img {
          cursor: pointer;
          position: relative;
          width: 58px;
          height: 58px;
          /*background-image: url("../../../assets/timg.jpeg");*/
          background-size: 100% 100%;
          border-radius: 29px;
          margin: 18px 0 0 12px;

          .state-pos {
            position: absolute;
            right: 5px;
            bottom: 0;
          }

          .now-state {
            width: 12px;
            height: 12px;
            border-radius: 6px;
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }

      .right {
        flex: 1;

        .top, .bottom {
          width: 100%;
          height: 50%;
          overflow: hidden;
          color: white;
        }

        .top {
          /*background-color: deepskyblue;*/
          position: relative;

          .user-name {
            text-align: left;
            padding-left: 3px;
            cursor: default;
            display: block;
            width: 98%;
            font-size: 15px;
            position: absolute;
            left: 0;
            bottom: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: bold;
            padding-right: 28px;
          }
        }

        .bottom {
          position: relative;
          /*height: 20px;*/
          /*background-color: lightgreen;*/

          .sign {
            text-align: left;
            padding-left: 5px;
            cursor: pointer;
            margin-top: 3px;
            width: 98%;
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      }
    }

  }
</style>
