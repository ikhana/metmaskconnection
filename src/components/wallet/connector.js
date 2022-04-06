
import styledComponents from "styled-components";
import { InjectedConnector } from "@web3-react/injected-connector"

import useMetaMask from "../../hooks/useMetaMask";
function Connector() {

    const {connect, disconnect, isActive, account} = useMetaMask();
  return (
    <div>
     
     <Button primary onClick={connect}>Connect, MetaMask!</Button>
     <div>Connected Account with Metamask{isActive ? account: ''}</div>
     <Button onClick={disconnect}>Disconnect MetaMask</Button>
    </div>
  );
}


const Button =styledComponents.button`

  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


export default Connector;


export const injected = new InjectedConnector({ supportedChainIds: [1, 42, 1337] })
