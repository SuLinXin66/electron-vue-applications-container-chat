export interface EventReturn<T> {
  error: boolean
  msg?: string
  result?: T,
  err?: Error,
  numberOfUpdated?: number,
  upsert?: boolean
}

export interface UserInfo {
  name: string
  sex: string
  age: number
  idCode: string
  phone: string
  companyName: string
  jobName: string
  postsName: string
  deptName: string
  status: string
  dataInTime: string
  endUpdateTime: string
  userName: string
  firstLogin: boolean
  password?: string
  email?: string
  registryTime?: string
}

export interface UserChatInfo {
  id: number
  userId: number
  icon: string
  meAbout: string
  chatBgcImg: string
  chatBgcColor: string
  nowStatus: string
  userInfo: UserInfo
}
