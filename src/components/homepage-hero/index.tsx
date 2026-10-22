import styles from './styles.module.css';
import {JSX} from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import useBaseUrl from "@docusaurus/useBaseUrl";


export default function (): JSX.Element {
    useBrokenLinks().collectAnchor('about-me');

    return (
        <section className={styles.heroSection} id="about-me">
            <div className={`${styles.heroContent} container`}>
                <img className={styles.heroImage} src={useBaseUrl("/img/photo.webp")}/>
                <p className={styles.greeting}>
                    Hey there. 👋 I am
                </p>
                <h1 className={styles.name}>
                    Tim Schachtner
                </h1>
                <p className={styles.title}>
                    DevSecOps Engineer
                    <br/>
                    Full-stack developer
                </p>
                <p className={styles.heroDescription}>
                    I'm a full-stack developer and DevSecOps engineer with a strong interest in the security side of building software.
                    I like working across the whole stack: writing application features, containerising and deploying them,
                    and thinking about how each piece could be attacked or hardened.
                </p>
                <a href="#contact" className="button button--secondary button--lg">
                    Contact  me
                </a>
            </div>
        </section>
    )
}