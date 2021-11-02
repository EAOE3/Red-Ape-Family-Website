import './section.scss';

const SectionLayout = props => {
    console.log(props);
    return(
        <section className={`section-layout px-3 ${props.className}`}>
            <div className="container">
                {props.content}
            </div>
        </section>
    );
}

export default SectionLayout;