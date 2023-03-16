import React, { useState } from "react";
import userContext from "../contexts/userContext";

const Providers = (props) => {
    const [user, setUser] = useState(null);

    return (
        <div>
            <userContext.Provider value={{ user, setUser }}>
                {props.children}
            </userContext.Provider>
        </div>
    );
};

export default Providers;
