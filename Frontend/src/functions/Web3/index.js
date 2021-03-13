import Web3 from 'web3';
import ABI from "../../contracts/verify.json";

const loadWeb3 = async () => {
    if(window.ethereum){
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    }
    else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
        // window.alert('Non-Ethereum browser detected. you should consider trying MetaMask')
    }
}

const loadBlockChainData = async (setAccount, setNetworkId, setTokenContract) => {
    const web3 = window.web3;
    // Load Account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    localStorage.account = accounts[0];
    const networkId = await web3.eth.net.getId();
    setNetworkId(networkId); 
    localStorage.networkId = networkId;
    const tokenContract = await new web3.eth.Contract(ABI,"0x7a8D808CDd4BDb08b29F217d0237A5d1a857B6df");
    setTokenContract(tokenContract);
    console.log(tokenContract)

}

const listenAccountChange = async (setAccount) => {
    const web3 = window.web3;
    window.ethereum.on('accountsChanged', async () => {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        localStorage.account = accounts[0];
    } )
}

const listenNetworkChange = async (setNetworkId) => {
    const web3 = window.web3;
    window.ethereum.on('networkChanged', async () => {
        const networkId = await web3.eth.net.getId();
        setNetworkId(networkId);
        localStorage.networkId = networkId;
    } )
}

export {
    loadWeb3,
    loadBlockChainData,
    listenAccountChange,
    listenNetworkChange,
}