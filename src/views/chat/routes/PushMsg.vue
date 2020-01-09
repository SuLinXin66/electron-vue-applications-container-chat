<template>
  <div class="push-msg">
    <div class="top">
      <div title="系统推送" @click="messageClick(0)" :class="activeId === 0 ? 'left active' : 'left'">
        <i class="chat-font icon icon-xitongtuisong"></i>
      </div>
      <div title="人员推送" @click="messageClick(1)" :class="activeId === 1 ? 'right active' : 'right'">
        <i class="chat-font icon icon-tuisong"></i>
      </div>
    </div>
    <div class="content">
      <VueScroll :ops="ops">
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
        <PeopleItem :is-group="true"/>
      </VueScroll>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import PeopleItem from "@/views/chat/message/people/PeopleItem.vue";
  import VueScroll from "vuescroll";

  @Component({
    components: {PeopleItem, VueScroll}
  })
  export default class PushMsg extends Vue {
    private ops = {
      scrollPanel: {
        scrollingX: false
      },
      bar: {
        background: '#888888'
      }
    };

    private activeId: 0 | 1 = 0;

    private messageClick(active: 0 | 1) {
      if (this.activeId === active) {
        return
      }
      this.activeId = active
    }
  }
</script>

<style lang="less" scoped>
  .push-msg {
    /*width: 100%;*/
    /*height: 100%;*/
    /*position: relative;*/

    .top {
      display: flex;
      position: relative;
      top: 0;
      left: 0;

      .left:hover, .right:hover {
        background-color: rgba(255, 255, 255, 0.5);
      }

      .active {
        background-color: rgba(255, 255, 255, 0.5);
      }

      .active::after {
        content: "";
        display: block;
        width: 100%;
        height: 3px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: darkorange;
      }

      .left, .right {
        position: relative;
        cursor: pointer;
        float: left;
        flex: 1;

        i {
          font-size: 28px;
        }
      }
    }

    .content {
      position: absolute;
      top: 43px;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      /*background-color: deepskyblue;*/
    }
  }
</style>