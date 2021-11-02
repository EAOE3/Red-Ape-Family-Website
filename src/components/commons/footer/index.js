import {opensea, titleImg} from 'images';

const footer = props => {
    return(
        <footer class="footer has-background-black py-5">
            <div class="container has-text-centered">

                <img src={titleImg} alt="" style={{width: "250px"}}/>

                <p>
                    <a href="https://twitter.com/TheRedApeFamily" target="_blank" className="ml-4">
                        <span className="icon has-text-white is-size-4">
                            <i class="fab fa-twitter"></i>
                        </span>
                    </a>
                    <a href="https://twitter.com/TheRedApeFamily" target="_blank" className="ml-4">
                        <span className="icon has-text-white is-size-4">
                            <i class="fab fa-instagram"></i>
                        </span>
                    </a>
                    <a href="https://www.youtube.com/channel/UCLCsACZQEeKOzjfbK2kIo9A" target="_blank" className="ml-4">
                        <span className="icon has-text-white is-size-4">
                            <i class="fab fa-youtube"></i>
                        </span>
                    </a>
                    <a  href="https://discord.gg/HxE754wj9r" target="_blank" className="ml-4">
                        <span className="icon has-text-white is-size-4">
                            <i class="fab fa-discord"></i>
                        </span>
                    </a>
                    <a class="is-size-4 " href="https://opensea.io/collection/unidentified-contract-abzg8vqonl" target="_blank" className="ml-4">
                        <span className="icon has-text-white">
                            <img src={opensea} alt=""/>
                        </span>
                    </a>
                </p>
                <br/>
                <h1 className="subtitle has-text-warning is-6 mb-3">Whitepaper</h1> 
                <h1 className="subtitle has-text-warning is-6 mb-3">0xa803144e27aEf2Ac95E7Ab49214BD2f802C883dD</h1>
                <h1 className="subtitle has-text-warning is-6 mb-3">© 2021 The Red Ape Family. All rights reserved</h1>
            </div>
        </footer>
    );
}

export default footer;
