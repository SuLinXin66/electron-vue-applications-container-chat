import {AjaxRequest} from "@/api/types";
import {UserChatInfo} from "@/types";

export const queryUserChat: (data: { idCode: string }) => AjaxRequest = data => ({
  url: "/user/queryByIdCode",
  method: "post",
  sendDataType: "json",
  data
});

export const queryDefaultUserList: (data: { idCode: string }) => AjaxRequest = data => ({
  url: "/user/queryDefaultUserList",
  method: "post",
  sendDataType: "json",
  data
});

export const updateUserAboutDesc: (data: UserChatInfo) => AjaxRequest = data => ({
  url: "/user/updateUserAboutDesc",
  method: "post",
  sendDataType: "json",
  data
});

export const updateUserNowStatues: (data: UserChatInfo) => AjaxRequest = data => ({
  url: "/user/updateNowStatues",
  method: "post",
  sendDataType: "json",
  data
});
