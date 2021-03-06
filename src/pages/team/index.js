import {useEffect} from 'react';
import _teamData from '../data-team';
import ReactHtml from 'raw-html-react';

import { connect } from 'react-redux';

const teamData = [..._teamData].sort((a,b) => {
    if (a.sortId < b.sortId) {
        return -1;
    }
    if (a.sortId > b.sortId) {
        return 1;
    }

    // a must be equal to b
    return 0;
});

const Team = props => {

    const refs = [];


    console.log(props.teamMemberReducer);

    useEffect(
        () => {
            window.scrollTo(0, 0);
        }, []
    );

    useEffect(
        () => {
            if(props.teamMemberReducer.section != null){
                refs[props.teamMemberReducer.section].scrollIntoView();
                window.scrollBy(0, -56);
            }
        }, [props.teamMemberReducer]
    );

    return(
        <div>
            <section className="py-6 has-background-black">
                <div className="container has-text-centered px-3">

                    <h1 className="title has-text-white is-size-3">Team</h1>
                    <br/>

                    <ul>
                        {
                            teamData.map( (t, i) => {

                                if(i == 9 || i == 10 ) return null;

                                return(
                                    <li className=" mb-6" key={i} ref={ref => refs[i] = ref}>

                                        <div className="columns is-vcentered">
                                            <div className="column is-3" style={{borderRight: '2px solid #585858'}}>
                                                <div className="has-text-centered mb-5" style={{width: '100%', display: 'grid', placeItems: 'center'}}>
                                                    <div style={{width: '180px'}}>
                                                        <figure className='image is-square'>
                                                            <img className="is-rounded" src={t.imageurl} alt="" style={{boxShadow: '0px 0px 1px 5px #585858, 3px 3px 1px 5px rgba(0, 0, 0, 0.5)'}}/>
                                                        </figure>
                                                    </div>
                                                </div>
                                                <h1 className="subtitle has-text-white is-5"><ReactHtml html={t.link}/></h1>
                                            </div>
                                            <div className="column has-text-left pl-6">
                                                <div className="" style={{height:"100px"}}>
                                                    <h1 className="title has-text-white is-5">{t.name}</h1>
                                                    <h1 className="subtitle has-text-white is-6">{t.charge}</h1>
                                                </div>
                                                <p className="has-text-white has-text-justified">
                                                    {
                                                        t.info
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>

                </div>
            </section>


        </div>
    );
}

const mapStateToProps = state => ({
    teamMemberReducer: state.teamMemberReducer
});

export default connect(
    mapStateToProps, 
    null
)(Team);
