const remoteEventNamesPrefix = "remote-event-names-";
export const RemoteEventNames = {
  loginLoading: remoteEventNamesPrefix + "loginLoading",
  floatTrayLoading: remoteEventNamesPrefix + "floatTrayLoading",
  chatMainLoading: remoteEventNamesPrefix + "chatMainLoading"
};

const userLocalDbEventNamePrefix = "userLocalDb-";
export const UserLocalEventNames = {
  findOne: userLocalDbEventNamePrefix + "find-one",
  update: userLocalDbEventNamePrefix + "update",
  loginOk: userLocalDbEventNamePrefix + "login-ok",
  queryUserInfo: userLocalDbEventNamePrefix + "query-user-info"
};
