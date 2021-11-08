import { useEffect, useState } from "react";

import Web3 from 'web3';
import HDWalletProvider from "@truffle/hdwallet-provider";

import ConnectBtn from 'components/connect-btn';

import { connect } from "react-redux";
import { request_change_network } from "redux/actions/walletActions";


import { useParams } from "react-router";

import sign from './sign';
import verifyABI from 'abis/verification.json';
import { combineReducers } from "redux";

const infuraKey = process.env.REACT_APP_INFURA_KEY;

let provider = new HDWalletProvider({
    mnemonic: {
        phrase: "dwarf drink catch circle buffalo youth decorate curve intact bronze network robust"
    },
    providerOrUrl: "https://rinkeby.infura.io/v3/11f174db725547409da7cd3cfe404777"
});



const SocketPage = props => {

    const web3Reducer = props.web3Reducer;
    const {web3} = web3Reducer;
    const wallet = props.wallet;   

    const {id} = useParams();

    const [ready, setReady] = useState(false);
    const [signed, setSigned] = useState(false);
    const [rinkeby, setRinkeby] = useState(false);
    const [signResult, setSignResult] = useState({
        done: false,
        msg: ''
    });
    

    useEffect(
        () => {
            if(ready && !signed) {               
                setSigned(true);

                const from = wallet.currentAccount;
                var params = [from, sign(4, id)];
                var method = 'eth_signTypedData_v4';               
        
                web3.currentProvider.sendAsync({
                    method, 
                    params,
                    from,
                }, async (err, result) => {
                    if (err) {
                        console.error(err);

                        if(err.code === 4001){
                            setSignResult({
                                done: true,
                                msg: 'Sign denied by user, please try again'
                            });

                            return;
                        }                            

                        setSignResult({
                            done: true,
                            msg: 'unknown error while signing, please try again'
                        });

                        return;
                    }

                    const rink_web3 = new Web3(provider);

                    const verifyContract = new rink_web3.eth.Contract(verifyABI, '0x330bdBd86c31347d60393606E925EE4aa3ddab74');
                    const tx = verifyContract.methods.addAddress(id, result.result); 

                    let accounts = await rink_web3.eth.getAccounts();

                    setSignResult({
                        done: true,
                        msg: 'Success verification'
                    });
                   
                });
                        
            }
        }, [ready]
    );

    useEffect(() => {

        if(!wallet.isConnected || wallet.currentAccount === "" || web3Reducer.initialized === false ) {
            return;
        }

        web3.eth.getChainId().then(id => id == 4 ? setRinkeby(true) : setRinkeby(false));

        if(!rinkeby)
            return;

        setReady(true);
        
    }, [wallet, web3Reducer, rinkeby]);

    return(
        <div className="has-background-primary" style={{height: '100%', width: '100%', display: 'grid', placeItems: 'center'}}>
            <div>
                {
                    wallet.isConnected ? 
                        rinkeby ? 
                            <div>                                                            
                                {
                                    signResult.done ?
                                        <h1 className="title has-text-white">{signResult.msg}</h1>
                                    :
                                        <h1 className="title has-text-white">verifying id {id}</h1>
                                }                                
                            </div>                            
                        :
                            <button type="button" className="button is-cyellow" onClick={e => props.request_change_network(4)}>
                                Switch network
                            </button>
                    :
                        <ConnectBtn/>
                }                
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
    {
        request_change_network
    }
)(SocketPage);