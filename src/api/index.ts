import {AjaxRequest} from "@/api/types";

export const queryUserChat: (data: { idCode: string }) => AjaxRequest = data => ({
  url: "/user/queryByIdCode",
  method: "post",
  sendDataType: "json",
  data
});
