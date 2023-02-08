import React, {createContext, useEffect, useState} from "react";
import { User } from "@shared/utils/Auth";


export interface AppContextProps {
    children: React.ReactNode;
    user: User
}

type AppContext = AppContextProps;

export const AppContext = createContext<Partial<AppContext>>({});

export const WithAppContext = ({children, ...props}: AppContextProps) => {
    const {user}: {user: User} = props;
    return <AppContext.Provider value={{user}}>{children}</AppContext.Provider>;
};
