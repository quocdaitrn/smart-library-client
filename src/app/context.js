import React from "react";
const state = {
    loginVisible: false,
    signupVisible: false,
};
export const AppContext = React.createContext(state); 