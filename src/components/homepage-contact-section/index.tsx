import styles from './styles.module.css';
import {JSX} from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";

type ContactOption = {
    icon: string;
    href: string;
    name: string;
}

const ContactOptions: Array<ContactOption> = [
    {
        icon: 'email.svg',
        href: 'mailto:tim@schachtner.email',
        name: 'tim@schachtner.email'
    }
]

export default function HomepageContact(): JSX.Element {
    useBrokenLinks().collectAnchor('contact');

    return (
        <section className={styles.contact} id="contact">
            <div className={`container ${styles.contactContainer}`}>
                <div>
                    <h2>
                        Contact me
                    </h2>
                    <p>
                        I’m looking for my first full-time role as a junior full-stack developer or DevSecOps engineer.
                        I enjoy building applications end to end, and I’ve been focusing on making them secure along the
                        way: automated pipelines, container hardening, and security checks in CI. If you think I’d be a
                        good fit for your team, I’d love to hear from you!
                    </p>
                </div>
                <div className={styles.contactListContainer}>
                    <p className={styles.contactListHeader}>
                        Looking forward to hearing from you!
                    </p>
                    <ul className={styles.contactList}>
                        {ContactOptions.map((option, idx) => (
                            <li key={idx}>
                                <a href={option.href} className={styles.contactItem}>
                                    <img src={`/img/icons/${option.icon}`} alt={option.name}/>
                                    <span>{option.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
