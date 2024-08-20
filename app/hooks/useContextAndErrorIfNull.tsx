import { useContext, Context } from "react";

function useContextAndErrorIfNull<T>(context: Context<T | null>): T {
    const contextValue = useContext(context);

    if (contextValue === null) {
        throw new Error("Context has not been provided!");
    }

    return contextValue;
}

export default useContextAndErrorIfNull;
