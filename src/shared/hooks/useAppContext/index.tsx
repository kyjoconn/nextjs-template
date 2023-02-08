import {useContext} from "react";

import {AppContext} from "@shared/context/AppContext";

function useAppContext() {
    const {user} = useContext(AppContext);
    return {user};
}

export default useAppContext;
