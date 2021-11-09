import {useState, useEffect} from 'react';
import CountDown from 'components/count-down';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import {request_change_network, check_connected_to_operating_network, request_connection} from 'redux/actions/walletActions';
import {start_minting_tx} from 'redux/actions/txActions';


const Form = props => {

    const [videoOpen, setVideoOpen] = useState(false);

    const [webData, setWebData] = useState(null);
    // console.log(webData);
    const erc_contract = props.web3Reducer.contracts['ERC_CONTRACT'];
//console.log(props.wallet.con);
    useEffect(
        () => {
            props.check_connected_to_operating_network();
        }, [props.wallet.networkId]
    );

    useEffect(
        () => {
            getWebData();
        }, [props.wallet.connectedToOperatingNetwork]
    );

    useEffect(
        () => {
            getWebData();
        }, [props.wallet.currentAccount]
    );

    // console.log(webData);
    const getWebData = async () => {
        if(props.wallet.connectedToOperatingNetwork){
            let webData = null;
            // console.log(await erc_contract.methods.webData(props.wallet.currentAccount).call());
            try {
                webData = await erc_contract.methods.webData(props.wallet.currentAccount).call();
                webData = {
                    ...webData,
                    mintsLeft: webData.maxMint - webData.userMints
                }                
                webData.giveaway1 = 84 - (333 - Number(webData.leftNFT));                
            } catch (e) {
                console.log('ERROR CONSULTING DATA', e);
            }finally{
                setWebData(webData);
            }
        }
        else{
            setWebData(null);
        }
    }
    // console.log(webData);


    const validationSchema = Yup.object().shape({
        mintQuantity: Yup.number()
    });

    const formik = useFormik({
        initialValues: {
            mintQuantity: 1,
        },
        // validationSchema: validationSchema,
        onSubmit: async values => {
            // alert(JSON.stringify(values, null, 2));
            const wallet = props.wallet;

            // const webData = await erc_contract.methods.webData(props.wallet.currentAccount).call();

            await props.start_minting_tx({
                value: Number(webData.price) * Number(values.mintQuantity),
                amount:  Number(values.mintQuantity),
                episodeId: webData.episode
            });
        },
    });

    useEffect(
        () => {
            getWebData();
            formik.setFieldValue("mintQuantity", 1);
        }, [props.txReducer.MINT_TX.success]
    );


    const onIncreaseClicked = e => {
        if(webData == null) return;


        if( Number(formik.values.mintQuantity) < webData.mintsLeft)
            formik.setFieldValue( "mintQuantity",  Number(formik.values.mintQuantity) + 1 );

    }

    const onDecreaseClicked = e => {
        if(webData == null) return;

        if( Number(formik.values.mintQuantity) > 1)
            formik.setFieldValue( "mintQuantity",  Number(formik.values.mintQuantity) - 1 );
    }

    return(
        <form onSubmit={formik.handleSubmit}>
            <div class={`modal ${videoOpen ? 'is-active' : ''}`}>
                <div class="modal-background"></div>
                <div class="modal-content">
                    <figure class="image is-16by9">
                        <iframe class="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/kuWPm0w1bfE" frameborder="0" allowFullscreen></iframe>
                    </figure>
                </div>
                <button class="modal-close is-large" aria-label="close" onClick={e => setVideoOpen(false)}></button>
            </div>
            <div className="has-text-centered" >

                {/* hidden input to count mints quantity */}
                <div className="control">
                    <input className="is-hidden" name="mintQuantity" type="number" onChange={formik.handleChange} value={formik.values.mintQuantity}/>
                </div>

                {
                    props.wallet.currentAccount
                    ? (
                        props.wallet.connectedToOperatingNetwork ?
                            <div>
                                <button className="button has-font-audiowide is-cyellow is-rounded has-text-black has-text-weight-bold is-size-4" type="button" style={{height: '', width: '40px'}} onClick={onDecreaseClicked} disabled={ Number(formik.values.mintQuantity) == 1}>-</button> &nbsp;
                                <button className={`button has-font-audiowide is-cyellow is-rounded has-text-black has-text-weight-bold is-size-4 ${props.txReducer.MINT_TX.loading ? 'is-loading' : ''} `} type="submit" disabled={!props.wallet.connectedToOperatingNetwork || !(webData && webData.mintsLeft > 0)} >MINT {formik.values.mintQuantity}</button> &nbsp;
                                <button className="button has-font-audiowide is-cyellow is-rounded has-text-black has-text-weight-bold is-size-4" type="button" style={{height: '', width: '40px'}} onClick={onIncreaseClicked} disabled={ (webData && webData.mintsLeft == formik.values.mintQuantity) }>+</button>
                                <br/><br/>
                                {
                                    webData == null ?
                                        null
                                    :
                                        <div className="">
                                            <h1 className="subtitle mb-0 has-text-white has-text-weight-bold is-hidden">Your mints: {webData.userMints}</h1>
                                            <h1 className="has-text-white has-text-weight-bold"> Episode 1 Tokens Left: {webData.leftNFT}</h1>
                                        </div>
                                }
                            </div>
                        :
                            <button type="button" className="button is-cyellow" onClick={e => props.request_change_network(1)}>
                                Switch to ETH Mainnet
                            </button>
                    ) : (
                        <button type="button" className="button is-cyellow" onClick={async e => await props.request_connection()}>
                            Connect wallet
                        </button>
                    )
                }

                <div>{(webData && webData.mintsLeft == 0) ? 'You have reached the minting limit for this episode! Thank you so much!' : ''}</div>
                <br/><br/>                
                <p className="has-text-centered has-text-weight-bold has-text-light has-font-audiowide is-size-6">
                    <div style={{color: '#d1d1d1'}}>
                        Presale of Ep1 is LIVE (0.95 Eth + Gas)<br/>
                        Reveal of Ep1 on November 23<br/>
                        10 Tokens per wallet / MetaMask only<br/>
                    </div>
                    <br/>
                    <a className="has-text-warning" onClick={e => setVideoOpen(true)}>HOW TO MINT FROM YOUR SMARTPHONE </a>
                    <hr style={{width:'200px', margin: '40px auto', background: '#4E4E4E' }}/>
                    <span className="has-text-warning" onClick={e => setVideoOpen(true)}>REVEAL <br/> <CountDown className="is-uppercase"/></span>
                    <hr style={{width:'200px', margin: '40px auto', background: '#4E4E4E' }}/>
                    <span className="has-text-warning" onClick={e => setVideoOpen(true)}>
                        
                        {
                            webData && webData.giveaway1 ?
                                TOKENS TILL MUTANT GIVEAWAY
                                <br/>
                                {webData.giveaway1}
                            :
                                CONNECT YOUR WALLET TO SEE HOW MANY MINFS LEFT UNTIL MUTANT GIVEAWAY
                        }                        
                    </span>
                    
                    
                </p>
                
            </div>
        </form>
    );
}

const mapStateToProps = state => ({
    wallet: state.walletReducer,
    web3Reducer: state.web3Reducer,
    txReducer: state.txReducer
});
export default connect(
    mapStateToProps,
    {
        request_change_network,
        request_connection,

        check_connected_to_operating_network,
        start_minting_tx
    }
)(Form);
