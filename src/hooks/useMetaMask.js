

import React, {useState, useEffect, useMemo,useCallback} from 'react';
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/connector";


export const MetaMaskContext = React.createContext(null)



export const  MetaMaskProvider = ({childern}) => {
     const [isActive, setIsActive] = useState(false)
     const [isLoading, setIsLoading] = useState(true)
     const [shouldDisable, setShouldDisable] = useState(false) // Should disable connect button while connecting to MetaMask
     const { activate, account,active, deactivate } = useWeb3React()
     
     //init loading for metamask
useEffect(()=>{
         connect().then(val =>{
             setIsLoading(false)
         })
     })
     // Now check if the app/website is connected or not to metamask
     const handleIsActive = useCallback(() => {
        console.log('App is connected with MetaMask ', active)
        setIsActive(active)
    }, [active])
    useEffect(() => {
        handleIsActive()
    }, [handleIsActive])

      // Connect to MetaMask wallet
      const connect = async () => {
        console.log('Connecting to MetaMask...')
        setShouldDisable(true)
        try {
            await activate(injected).then(() => {
                setShouldDisable(false)
            })
        } catch(error) {
            console.log('Error on connecting: ', error)
        }
    }

    // Disconnect from Metamask wallet
    const disconnect = async () => {
        console.log('Disconnecting wallet from App...')
        try {
            await deactivate()
        } catch(error) {
            console.log('Error on disconnnect: ', error)
        }
    }

    const values = useMemo(
        () => ({
            isActive,
            account,
            isLoading,
            connect,
            disconnect,
            shouldDisable
        }),
        [isActive, isLoading, shouldDisable, account]
    )
    return (
    <MetaMaskContext.Provider value={values}>{childern}</MetaMaskContext.Provider>
    );}

export default function useMetaMask () {
    const context = React.useContext(MetaMaskContext)

    if (context === undefined){
        throw new Error ("useMetaMask hook must be used with a MetaMaskProvider Component")
    }

    return context
}




