import React from "react";

import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import {
  HomeRounded,
  CategoryRounded,
  PointOfSaleRounded,
  MonetizationOnRounded,
} from '@mui/icons-material';


import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

import { 
  Login,
  Home,
  Sales,
  Expenses,
  AddItems,
  AddExpenses,
  AddSales,
  EditItems,
} from "pages";
import AllItems from "pages/AllItems";
import ItemDetails from "pages/ItemDetails";
import CreateItem from "pages/CreateItem";


const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  
  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
        const profileObj = credential ? parseJwt(credential) : null;

        if (profileObj) {
            const response = await fetch(
                "http://localhost:8080/api/v1/users",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: profileObj.name,
                        email: profileObj.email,
                        avatar: profileObj.picture,
                    }),
                },
            );

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        ...profileObj,
                        avatar: profileObj.picture,
                        userid: data._id,
                    }),
                );
            } else {
                return Promise.reject();
            }
        }
        localStorage.setItem("token", `${credential}`);

        return Promise.resolve();
    },
    logout: () => {
        const token = localStorage.getItem("token");

        if (token && typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            axios.defaults.headers.common = {};
            window.google?.accounts.id.revoke(token, () => {
                return Promise.resolve();
            });
        }

        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
        const token = localStorage.getItem("token");

        if (token) {
            return Promise.resolve();
        }
        return Promise.reject();
    },

    getPermissions: async () => null,
    getUserIdentity: async () => {
        const user = localStorage.getItem("user");
        if (user) {
            return Promise.resolve(JSON.parse(user));
        }
    },
};


  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "items",
              list: AllItems,
              show: ItemDetails,
              create: CreateItem,
              edit: EditItems,
              icon: <HomeRounded />
            },
            {
              name: "Purchases",
              list: MuiInferencer,
              icon: <CategoryRounded />
            },
            {
              name: "Sales",
              list: MuiInferencer,
              icon: <PointOfSaleRounded />
            },
            {
              name: "Expenses",
              list: MuiInferencer,
              icon: <MonetizationOnRounded />
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
