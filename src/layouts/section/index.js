import './section.scss';

const SectionLayout = props => {        
    return(
        <section className={`section-layout px-3 ${props.className}`} ref={props._ref || null}>
            <div className="container">
                {props.content}
            </div>
        </section>
    );
}

export default SectionLayout;