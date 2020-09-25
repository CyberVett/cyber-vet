export interface IUser {
  accessToken: string;
  info: IUserInfo;
  role: string;
}

interface IUserInfo {
  accountId: string;
  id: string;
  role: string;
  staff: any;
}