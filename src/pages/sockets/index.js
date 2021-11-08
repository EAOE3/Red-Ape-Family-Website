import { useEffect, useState } from "react";

import ReactHtml from 'raw-html-react';

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
    const [trigger, setTrigger] = useState(0);
    const [signResult, setSignResult] = useState({
        done: false,
        msg: ''
    });
    

    useEffect(
        () => {
            if(ready && !signed) {

                const from = wallet.currentAccount;
                var params = [from, sign(1, id)];
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
                                error: true,
                                msg: 'Sign denied by user, please try again'
                            });

                            return;
                        }  
                        
                        setSigned(true);

                        setSignResult({
                            done: true,
                            error: true,
                            msg: 'unknown error while signing, please try again'
                        });

                        return;
                    }

                    const rink_web3 = new Web3(provider);

                    const verifyContract = new rink_web3.eth.Contract(verifyABI, '0xf19F05A5B903522a4696DEC1Be3cE698Ec57b77d');
                    const tx = verifyContract.methods.addAddress(id, result.result); 

                    let accounts = await rink_web3.eth.getAccounts();

                    tx.send({
                        from: accounts[0]
                    });

                    setSignResult({
                        done: true,
                        error: false,
                        msg: 'verified by </br>' + wallet.currentAccount
                    });
                    
                   
                });
                        
            }
        }, [ready, trigger]
    );

    useEffect(() => {

        if(!wallet.isConnected || wallet.currentAccount === "" || web3Reducer.initialized === false ) {
            return;
        }

        web3.eth.getChainId().then(id => id == 1 ? setRinkeby(true) : setRinkeby(false));

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
                                    signResult.done?
                                        signResult.error ?
                                                <div className="has-text-centered">
                                                    <h1 className="title has-text-white has-text-centered"><ReactHtml html={signResult.msg}/></h1>
                                                    <button className="button is-cyellow" onClick={() => setTrigger(trigger+1)}>Try again</button>
                                                </div>
                                            :
                                            <h1 className="title has-text-white has-text-centered"><ReactHtml html={signResult.msg}/></h1>



                                        
                                    :
                                        <h1 className="title has-text-white has-text-centered">verifying id <br/>{id}</h1>
                                }                                
                            </div>                            
                        :
                            <button type="button" className="button is-cyellow" onClick={e => props.request_change_network(1)}>
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