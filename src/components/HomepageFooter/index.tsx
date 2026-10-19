import {JSX} from "react";
import styles from './styles.module.css';

export default function HomepageFooter(): JSX.Element {
    return (
        <footer className={`${styles.footer} container`}>
            <a href="#about-me" className={styles.arrow}>
                <svg width="40" height="90" viewBox="0 0 40 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="39" height="89" rx="19.5" stroke="currentColor"/>
                    <path d="M19 70C19 70.5523 19.4477 71 20 71C20.5523 71 21 70.5523 21 70H19ZM20 20L14.2265 30H25.7735L20 20ZM21 70L21 29H19L19 70H21Z" fill="currentColor"/>
                </svg>
            </a>
            <p>
                © Tim Schachtner 2026
            </p>
            <p>
                Built with Docusaurus.
            </p>
        </footer>
    )
}