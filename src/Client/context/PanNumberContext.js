import React, {createContext,useState} from "react";
const PanNumberContext = createContext();

const PanNumberProvider = ({children})=>{
    const [panNumber, setPanNumber] = useState('');
    return(
        <PanNumberContext.Provider value={{panNumber,setPanNumber}}>
            {children}
        </PanNumberContext.Provider>
    );
}
export {PanNumberProvider, PanNumberContext};