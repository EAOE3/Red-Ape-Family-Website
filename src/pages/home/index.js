import {useEffect, useRef} from 'react';
import Navbar from 'components/commons/navbar';
import Footer from 'components/commons/footer';

import {

    cloudsBanner,
    titleImg,
    movie,
    giveaways,
    roadmap,
    bannerVideo,
    bananaIcon,
    benefitsVideo,
    chuckyVideo
}
from 'images';

import {data, data2, data3} from './data-roadmap';
import teamData from '../data-team';
import castData from './data-cast';
import faqData from './data-faq';
import benefitsData from './benefits-data';

import ReactHtml from 'raw-html-react';
import MintSection from './mint-section';

import {connect} from 'react-redux';
import {set_section} from 'redux/actions/navbarActions';

import sectionLayout from 'layouts/section';

import './home.scss';
import SectionLayout from 'layouts/section';


const HomePage = props => {

    const homeSection = useRef(null);
    const faqSection = useRef(null);
    const roadMapSection = useRef(null);
    const teamSection = useRef(null);

    const {navbarReducer} = props;


    useEffect(
        () => {
            let y = 0;
            switch (navbarReducer.section) {
                case "HOME":
                    y = homeSection.current.scrollIntoView()
                    break;

                case "FAQ":
                    y = faqSection.current.scrollIntoView()
                    window.scrollBy(0, -45);
                    break;

                case "ROADMAP":
                    y = roadMapSection.current.scrollIntoView()
                    window.scrollBy(0, -45);
                    break;

                case "TEAM":
                    y = teamSection.current.scrollIntoView()
                    window.scrollBy(0, -45);
                    break;



                default: break;

            }
            // console.log(y);
        }, [navbarReducer.section]
    );

    return (
        <div>
            

            <section className="hero is-medium banner-home" ref={homeSection} style={{position: 'relative', height: '666px'}}>

                <div className="video-container">
                    <video playsInline autoPlay muted loop>
                        <source src={bannerVideo} type="video/mp4"/>
                    </video>
                    <div className="invisible-panel">
                    </div>
                </div>

                <div className="hero-body bg-gradient is-flex is-flex-direction-column py-0" style={{height: '500px'}}>                
                    <div className="container is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-flex-end" style={{width: '100%'}}>
                        <div className="columns is-vcentered  px-3" style={{transform: 'translateY(-50px)'}}>                            
                            <div className="column  has-text-centered">
                                <a href="https://discord.gg/HxE754wj9r" target="_blank" className="button is-cpurple has-text-white is-size-4 is-rounded has-font-audiowide">
                                <strong>JOIN DISCORD</strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
             {/* mint section */}
            <SectionLayout
                className="has-background-primary"
                content={
                    <div className="columns">
                        <div className="column has-text-centered  px-4">
                            <MintSection/>
                        </div>
                        <div className="column">
                            <div className="pl-5" style={{borderLeft: '3px solid #FFC000'}}>
                                <h1 className="title has-text-warning is-size-6">MEET CHUCKY!</h1>
                                <h1 className="title has-text-white is-size-5">Welcome to The Red Ape Family!</h1>
                            </div>
                            <br/>
                            <div className="pl-5">
                                <video playsInline autoPlay muted loop style={{width:'350px'}}>
                                    <source src={chuckyVideo} type="video/mp4"/>
                                </video> 
                            </div>

                        </div>
                    </div>
                }
            />

            {/* exclusive benefits */}
            <SectionLayout
                className="has-background-black"
                content={
                    <div className="columns">
                        <div className="column has-text-centered  px-4">
                            <h1 className="title has-text-white is-4 has-text-left">EXCLUSIVE BENEFITS FOR <br/><span className="has-text-warning">THE RED APE FAMILY</span> HOLDERS</h1>
                            <br/>
                            <ul>
                                {
                                    benefitsData.map((item, i) =>
                                        <li className="media is-size-6" key={i}>
                                            <div className="media-left">      
                                                <figure className="image is-24x24">
                                                    <img src={bananaIcon} alt=""/>                                        
                                                </figure>
                                            </div>
                                            <div className="media-content has-text-left">
                                                <span className="has-text-white">{item.body}</span>
                                            </div>
                                        </li>                                        
                                    )
                                }
                            </ul>
                        </div>
                        <div className="column" style={{position: 'relative'}}>                            
                            <div className="pl-5">
                                <video playsInline autoPlay muted loop style={{width:'350px'}}>
                                    <source src={benefitsVideo} type="video/mp4"/>
                                </video>
                            </div>                
                        </div>
                 </div>
                }
            />

 
            

            {/*roadmap
            <section className="has-background-black px-4" ref={roadMapSection}>
                <div className="columns">
                <div className="column p-0">
                        <figure className="image is-16x9">
                            <img src={giveaways} alt=""/>
                        </figure>
                    </div>
                    <div className="column p-0">
                        <figure className="image is-16x9">
                            <img src={roadmap} alt=""/>
                        </figure>
                    </div>                    
                </div>
            </section>*/}

            {/* old roadmap section
            <section className="has-background-primary py-6 is-hidden">
                <div className="container has-text-centered">
                        <h1 className="title has-text-white">ROADMAP SEASON 1</h1>
                    <ul className="roadmap-list">
                        {
                            data3.map( (rmap, i) =>
                                <li className="has-text-white mb-3 is-size-5 has-text-weight-bold" key={i}>
                                    <span className="has-text-warning">{rmap.title}</span> <br/>
                                    <span><ReactHtml html={rmap.body}/></span>
                                </li>
                            )
                        }
                    </ul>
                    <br/>
                    <h1 className="subtitle has-text-white has-text-weight-bold is-italic">
                        OTHER ANNOUNCEMENTS WILL BE MADE THROUGHOUT THE SEASON
                    </h1>

                </div>
            </section>*/}

            {/* team 
            <section className="has-background-black px-4" ref={teamSection}>
                <div className="container py-6">
                        <h1 className="title has-text-white has-text-centered">MEET THE TEAM</h1>
                        <br/><br/><br/>

                    <div className="columns is-multiline px-3">
                        <div className="column"></div>
                        {
                            [...teamData].splice(0, 3).map( (t, i) =>
                                <div className="column has-text-centered" key={i}>


                                    <img className="is-rounded bwToColorImg" src={t.imageurl} alt="" width="150" style={{boxShadow: '0px 0px 1px 5px #585858, 3px 3px 1px 5px rgba(0, 0, 0, 0.5)', borderRadius: '50%'}}/>


                                    <br/>
                                    <br/>

                                    <div className="" style={{height:"80px"}}>
                                        <h1 className="title has-text-white is-5 has-text-centered">{t.name}</h1>
                                        <h1 className="subtitle has-text-white is-6 has-text-centered">{t.charge}</h1>
                                    </div>
                                    <h1 className="subtitle has-text-white is-5 has-text-centered"><ReactHtml html={t.link}/></h1>
                                </div>
                            )
                        }
                        <div className="column"></div>
                    </div>
                    <br/><br/>
                    <div className="columns is-multiline px-3">
                        {
                            [...teamData].splice(3, 5).map( (t, i) =>
                                <div className="column has-text-centered" key={i}>


                                    <img className="is-rounded bwToColorImg" src={t.imageurl} alt="" width="150" style={{boxShadow: '0px 0px 1px 5px #585858, 3px 3px 1px 5px rgba(0, 0, 0, 0.5)', borderRadius: '50%'}}/>


                                    <br/>
                                    <br/>

                                    <div className="" style={{height:"80px"}}>
                                        <h1 className="title has-text-white is-5 has-text-centered">{t.name}</h1>
                                        <h1 className="subtitle has-text-white is-6 has-text-centered">{t.charge}</h1>
                                    </div>
                                    <h1 className="subtitle has-text-white is-5 has-text-centered"><ReactHtml html={t.link}/></h1>
                                </div>
                            )
                        }
                    </div>
                    <br/><br/>
                    <div className="columns is-multiline px-3">
                        <div className="column"></div>
                        {
                            [...teamData].splice(8, 4).map( (t, i) =>
                                <div className="column has-text-centered" key={i}>


                                    <img className="is-rounded bwToColorImg" src={t.imageurl} alt="" width="150" style={{boxShadow: '0px 0px 1px 5px #585858, 3px 3px 1px 5px rgba(0, 0, 0, 0.5)', borderRadius: '50%'}}/>


                                    <br/>
                                    <br/>

                                    <div className="" style={{height:"80px"}}>
                                        <h1 className="title has-text-white is-5 has-text-centered">{t.name}</h1>
                                        <h1 className="subtitle has-text-white is-6 has-text-centered">{t.charge}</h1>
                                    </div>
                                    <h1 className="subtitle has-text-white is-5 has-text-centered"><ReactHtml html={t.link}/></h1>
                                </div>
                            )
                        }
                        <div className="column"></div>
                    </div>

                </div>
            </section>*/}

            {/*tokenomics
            <section className="has-background-primary px-4">
                <div className="container py-6">
                    <h1 className="title has-text-white has-text-weight-bold has-text-centered">MEET THE CAST</h1>
                    <br/><br/><br/>
                    <div className="columns">
                        {
                            [...castData].splice(0, 5).map( (c, i) =>
                                <div className="column has-text-centered" key={i}>
                                    <img className="is-rounded" src={c.imageurl} alt="" width="150" style={{boxShadow: '0px 0px 1px 5px #585858, 3px 3px 1px 5px rgba(0, 0, 0, 0.5)', borderRadius: '50%'}}/>
                                    <br/><br/>
                                    <div className="" style={{height:"80px"}}>
                                        <h1 className="title is-5 has-text-centered has-text-white">{c.name}</h1>
                                        <h1 className="subtitle is-5 has-text-centered mb-0 has-text-white">{c.discord}</h1>
                                    </div>
                                    <h1 className="subtitle is-5 has-text-centered"><ReactHtml html={c.link}/></h1>
                                </div>
                            )
                        }
                    </div>
                    <br/><br/>
                        <h1 className="subtitle has-text-white has-text-centered mb-5">Starting Episode 2</h1>
                    <br/>

                    <div className="columns ">
                        <div className="column"></div>
                        {
                            [...castData].splice(5, 3).map( (c, i) =>
                                <div className="column has-text-centered" key={i}>
                                    <img className="is-rounded" src={c.imageurl} alt="" width="150" style={{boxShadow: '0px 0px 1px 5px #585858, 3px 3px 1px 5px rgba(0, 0, 0, 0.5)', borderRadius: '50%'}}/>
                                    <br/><br/>
                                    <div className="" style={{height:"80px"}}>
                                        <h1 className="title is-5 has-text-centered has-text-white">{c.name}</h1>
                                        <h1 className="subtitle is-5 has-text-centered mb-0 has-text-white">{c.discord}</h1>
                                    </div>
                                    <h1 className="subtitle is-5 has-text-centered"><ReactHtml html={c.link}/></h1>
                                </div>
                            )
                        }
                        <div className="column"></div>
                    </div>

                </div>
            </section>*/}

        </div>
    );
}

const mapStateToProps = state => ({
    navbarReducer: state.navbarReducer
});

export default connect(
    mapStateToProps,
    {
        set_section
    }
)(HomePage);
