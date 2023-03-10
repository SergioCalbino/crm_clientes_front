import React, { useState } from "react";


const CRMContext = React.createContext([ {}, () => {} ])

const CRMProvider = props => {


    //Definir el State inicial

    const [auth, setAuth] = useState({
        token: '',
        auth: false
    });

    return (
        <CRMContext.Provider value={[auth, setAuth]} >
             {props.children}
        </CRMContext.Provider>
    )

}

export { CRMContext, CRMProvider }