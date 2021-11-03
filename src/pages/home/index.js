import {useEffect, useRef} from 'react';
import Navbar from 'components/commons/navbar';
import Footer from 'components/commons/footer';

import {
    cloudsBanner,
    titleImg,
    movie,
    episodesRoadmap,
    projectRoadmap,
    giveaways,
    guest,
    bannerVideo,
    bananaIcon,
    benefits,
    chuckyVideo,
    trailerVideo
}
from 'images';

import {Link} from 'react-router-dom';

import {data, data2, data3} from './data-roadmap';
import teamData from '../data-team';
import castData from './data-cast';
import faqData from './data-faq';
import benefitsData from './benefits-data';

import ReactHtml from 'raw-html-react';
import MintSection from './mint-section';

import {connect} from 'react-redux';
import {set_section} from 'redux/actions/navbarActions';
import {set_member} from 'redux/actions/teamMembersActions';

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

                // case "FAQ":
                //     y = faqSection.current.scrollIntoView()
                //     window.scrollBy(0, -45);
                //     break;

                case "ROADMAP":
                    y = roadMapSection.current.scrollIntoView()
                    window.scrollBy(0, -45);
                    break;

                // case "TEAM":
                //     y = teamSection.current.scrollIntoView()
                //     window.scrollBy(0, -45);
                //     break;



                default: break;

            }
            // console.log(y);
        }, [navbarReducer.section]
    );

    return (
        <div>
            

            <section className="hero is-medium banner-home" ref={homeSection} style={{position: 'relative', height: '666px'}} ref={homeSection}>

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
                        <br/>
                        <div className="column">
                            <div className="pl-5" style={{borderLeft: '3px solid #FFC000'}}>                                
                                <h1 className="title has-text-white is-size-5 has-text-weight-bold">Welcome to The Red Ape Family!</h1>
                                <h1 className="title has-text-warning is-size-6 has-text-weight-bold">MEET CHUCKY!</h1>
                            </div>
                            <br/><br/>
                            <div className="pl-5">
                                <video playsInline autoPlay muted loop style={{width:'350px'}}>
                                    <source src={chuckyVideo} type="video/mp4"/>
                                </video> 
                            </div>

                        </div>
                    </div>
                }
            />

            <SectionLayout
                className="has-background-primary p-0 m-0"
                content={
                    <hr style={{margin: '0', background: '#393939'}}/>
                }
            />    

            {/* trailer */}
            <SectionLayout
                className="has-background-primary"
                content={
                    <div>
                        <h1 className="title has-text-white is-4 has-text-left has-text-weight-bold">SEASON 1 <span className="has-text-warning">TRAILER</span></h1>
                        <p className="title has-text-white is-6 mb-0">
                            It’s 2130. The earth is dying. But all is not lost! Four Bored Apes. One Dog. A Lazy Lion with a stethoscope. On a mission to Mars!
                            <br/><br/>
                            Muskville Let’s Fucking go!
                        </p>
                        <br/><br/>
                        <div className="columns" >
                            <div className="column">                                
                                <video controls>
                                    <source src={trailerVideo} type="video/mp4"/>
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
                    <div>
                        
                        <br/>
                        <div className="columns">
                            <div className="column has-text-centered  px-4">                                
                            <h1 className="title has-text-white is-4 has-text-left has-text-weight-bold">EXCLUSIVE BENEFITS FOR <br/><span className="has-text-warning">THE RED APE FAMILY</span> HOLDERS</h1>
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
                                    <img src={benefits} alt="" width="400"/>
                                </div>                
                            </div>
                        </div>
                    </div>
                }
            />

            <SectionLayout
                className="has-background-black p-0 m-0"
                content={
                    <hr style={{margin: '0', background: '#393939'}}/>
                }
            />            

            {/*roadmap*/}
            <SectionLayout                
                _ref={roadMapSection}
                className="has-background-black"
                content={
                    <div>
                        <h1 className="title has-text-white is-4 has-text-left ">SEASON 1 MIDSEASON <span className="has-text-warning">ROADMAP</span> </h1>
                        <br/><br/>
                        <div className="columns is-vcentered" style={{background: '#FBDD1D'}}>
                            <div className="column p-0">
                                <figure className="image is-16x9">
                                    <img src={episodesRoadmap} alt=""/>
                                </figure>
                            </div>
                            <div className="column p-0 is-4">
                                <figure className="image">
                                    <img src={giveaways} alt=""/>
                                </figure>
                            </div>
                        </div>
                    </div>
                }               
            />

            {/*roadmap*/}
            <SectionLayout
                className="has-background-black"
                content={
                    <div>
                        
                        <h1 className="title has-text-white is-4 has-text-left has-font-title">TURN YOUR NFT INTO A STAR AND <span className="has-text-warning">GET PAID</span>!</h1>
                        <br/><br/>
                        <div className="columns is-vcentered" style={{background: '#FCE711'}}>                             
                            <div className="column p-0 is-4" >
                                <figure className="image">
                                    <img src={guest} alt=""/>
                                </figure>
                            </div>     
                            <div className="column p-0">
                                <figure className="image is-16x9">
                                    <img src={projectRoadmap} alt=""/>
                                </figure>
                            </div>                    
                        </div>
                    </div>
                }
            />

            {/* faq section */}
            <SectionLayout
                className="has-background-primary"
                content={
                    <div className="">  
                        <h1 className="title has-text-white is-4 has-text-centered">FREQUENTLY ASKED QUESTIONS</h1>
                        <br/><br/>
                        <ul>
                            {
                                faqData.map((item, i) =>
                                    <details style={{borderBottom: '3px solid #452E2F'}} key={i}>
                                        <summary className="has-text-white is-size-5 has-text-weight-bold pr-5">{item.question}</summary>
                                        <p className="has-text-white"><ReactHtml html={item.answer}/></p>
                                    </details>
                                )
                            }
                        </ul>

                    </div>
                }       
            />

            {/* team  */}
            <SectionLayout
                className="has-background-black"
                content={
                    <div>
                        <h1 className="title has-text-white has-text-centered is-4">MEET THE TEAM</h1>
                        <br/><br/><br/>

                        <div className="columns is-multiline px-3">
                            <div className="column"></div>
                            {
                                [...teamData].splice(0, 3).map( (t, i) =>
                                    <div className="column has-text-centered" key={i}>

                                        <Link to="/team">
                                            <img className="is-rounded bwToColorImg" onClick={() => props.set_member(i)} src={t.imageurl} alt="" width="150" style={{boxShadow: '0px 0px 1px 5px #585858, 3px 3px 1px 5px rgba(0, 0, 0, 0.5)', borderRadius: '50%'}}/>
                                        </Link>

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
                        <br className="is-hidden-mobile"/><br className="is-hidden-mobile"/>
                        <div className="columns is-multiline px-3">
                            {
                                [...teamData].splice(3, 5).map( (t, i) =>
                                    <div className="column has-text-centered" key={i} >

                                        <Link to="/team">
                                            <img className="is-rounded bwToColorImg" onClick={() => props.set_member(i+3)} src={t.imageurl} alt="" width="150" style={{boxShadow: '0px 0px 1px 5px #585858, 3px 3px 1px 5px rgba(0, 0, 0, 0.5)', borderRadius: '50%'}}/>
                                        </Link>

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
                        <br className="is-hidden-mobile"/><br className="is-hidden-mobile"/>
                        <div className="columns is-multiline px-3">
                            <div className="column"></div>
                            {
                                [...teamData].splice(8, 4).map( (t, i) =>
                                    <div className="column has-text-centered" key={i}>

                                        {
                                            i == 1 || i == 2 ?
                                                <img className="is-rounded bwToColorImg" src={t.imageurl} alt="" width="150" style={{boxShadow: '0px 0px 1px 5px #585858, 3px 3px 1px 5px rgba(0, 0, 0, 0.5)', borderRadius: '50%'}}/>
                                            :
                                                <Link to="/team">
                                                    <img className="is-rounded bwToColorImg" onClick={() => props.set_member(i+8)} src={t.imageurl} alt="" width="150" style={{boxShadow: '0px 0px 1px 5px #585858, 3px 3px 1px 5px rgba(0, 0, 0, 0.5)', borderRadius: '50%'}}/>
                                                </Link>
                                        }

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
                }
            />
            

            {/* cast */}
            <SectionLayout
                className="has-background-primary"
                content={
                    <div>
                        <h1 className="title has-text-white has-text-weight-bold has-text-centered is-4">MEET THE CAST</h1>
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
                }
            />

            <SectionLayout
                className="has-background-black"
                content={
                    <div className="has-text-centered">
                        <h1 className="title has-text-warning is-4">MUSKVILLE IS WAITING!</h1>
                        <h1 className="title has-text-white is-3">Get your ticket to Mars and Join our Discord!</h1>
                        <br/>
                        <a href="https://discord.gg/HxE754wj9r" target="_blank" className="button is-cpurple has-text-white is-size-4 is-rounded has-font-audiowide" style={{width: '200px'}}>
                            <strong>HOP ON!</strong></a>
                        <br/>                        
                    </div>
                }                
            />

            <SectionLayout
                className="has-background-black p-0 m-0"
                content={
                    <hr style={{margin: '0', background: '#393939'}}/>
                }
            />  
        </div>
    );
}

const mapStateToProps = state => ({
    navbarReducer: state.navbarReducer
});

export default connect(
    mapStateToProps,
    {
        set_section,
        set_member
    }
)(HomePage);
