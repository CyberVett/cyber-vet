 import { IUser, IHospital, IStaff } from './../types/user';
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface IAuthContext {
  loggedIn: boolean;
  logoutUser: () => void;
  updateUser: (authData: IUser) => void;
  user: IUser | null;
  accessToken: string;
  hospital: IHospital | null;
  role: string;
  staff: IStaff | null;
}

export const AuthContext = React.createContext<IAuthContext>({
  loggedIn: false,
  logoutUser: () => { },
  user: null,
  // @ts-ignore
  updateUser: (IUser: any) => {},
  accessToken: '',
  hospital: null,
  role: '',
  staff: null,
});

