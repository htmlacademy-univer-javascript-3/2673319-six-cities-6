export type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type User = UserInfo & {
  email: string;
}

export type UserData = User & {
  token: string;
}
