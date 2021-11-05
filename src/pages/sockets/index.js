import { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";

import { useParams } from "react-router";

import io from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_WSS_ENDPOINT;

const SocketPage = props => {

    const web3Reducer = props.web3Reducer;
    const {web3} = web3Reducer;
    const wallet = props.wallet;

    const {id} = useParams();   
  

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // const socket = socketIOClient("http://193.176.87.163:5555/");
        const socket = io("http://193.176.87.163:5555/", { transports: ["websocket"] });
        console.log(socket);

        socket.on("connect", () => {
            console.log('connected');
            socket.send("Hello World from client");
        })

        // const socket = io(ENDPOINT, { transports: ["websocket"] });
        // setSocket(socket);        


        // const socket = new WebSocket("ws://193.176.87.163:5555/");
        // console.log(socket);

        // socket.addEventListener('open', function (event) {
        //     socket.send('Hello Server!');
        // });
        
      /*  if(!web3Reducer.initialized || wallet.currentAccount.length == 0)
            return;
        console.log(web3Reducer.initialized);
        const msgParams = JSON.stringify({
            domain: {
                // Defining the chain aka Rinkeby testnet or Ethereum Main Net
                chainId: 4,
                // Give a user friendly name to the specific contract you are signing for.
                name: 'Address validation',
                // Just let's you know the latest version. Definitely make sure the field name is correct.
                version: '1',
            },
        
            // Defining the message signing data content.
            message: {
                
                // - Anything you want. Just a JSON Blob that encodes the data you want to send
                // - No required fields
                // - This is DApp Specific
                // - Be as explicit as possible when building out the message schema.
                
                id: id,

            },
            // Refers to the keys of the *types* object below.
            primaryType: 'VerifyData',
            types: {
                // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },                
                ],              
                // Refer to PrimaryType
                VerifyData: [
                    { name: 'id', type: 'string' },                
                ]              
            }
        
        });

        const from = wallet.currentAccount;
        var params = [from, msgParams];
        var method = 'eth_signTypedData_v4';

        web3.currentProvider.sendAsync({
            method, 
            params,
            from,
        }, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(result);
            // socket.emit("signature", {
            //     signature: result,
            // });
        }); */
                
        
    }, []);


    return(
        <div style={{height: '100%', width: '100%', display: 'grid', placeItems: 'center'}}>
            <div>
                <h1 className="title is-primary">verifying id...</h1>                
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    web3Reducer: state.web3Reducer,
    wallet: state.walletReducer
});

export default connect(
    mapStateToProps,
    null
)(SocketPage);