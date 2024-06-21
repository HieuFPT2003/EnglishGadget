import classes from './HomePageContent.module.css';
function HomePageContent({ solution, description }) {
    return (
        <section className={classes.section}>
            <h1 className={classes.solution}>{solution}</h1>
            <p className={classes.de}>{description}</p>
        </section>
    );
}

export default HomePageContent;
