const sign = (chainId, id, wallet) => {

    const msgParams = JSON.stringify({
        domain: {
            // Defining the chain aka Rinkeby testnet or Ethereum Main Net
            chainId: chainId,
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
            
            id: id
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
                { name: 'id', type: 'string' }
            ]
        }
    
    });

    return msgParams;

};

export default sign; 