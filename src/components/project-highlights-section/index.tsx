import {JSX, useState} from "react";
import styles from './styles.module.css';
import clsx from "clsx";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import useBaseUrl, {useBaseUrlUtils} from "@docusaurus/useBaseUrl";

type ProjectTechnology = {
    name: string;
    imageUrl: string;
}

type ProjectDetails = {
    title: string;
    description: string;
    imageUrl: string;
    documentationUrl: string | null;
    repositoryUrl: string | null;
    technologies: Array<ProjectTechnology>;
}

const ProjectList: ProjectDetails[] = [
    {
        title: 'Baby Tools World',
        description: 'Baby Tools World is an online store designed for educational purposes. ' +
            'My task was to implement a new feature: create tags that could be added to products via the admin web interface, ' +
            'filter products by those tags, and display them on the product page. ' +
            'I also updated the rating functionality and wrote a compose file for easy deployment.',
        imageUrl: 'baby-tools-world.png',
        documentationUrl: '/docs/projects/baby-tools-world/',
        repositoryUrl: 'https://github.com/mickkc/baby-tools-world',
        technologies: [
            { name: 'Python', imageUrl: 'python.svg' },
            { name: 'Django', imageUrl: 'django.svg' },
            { name: 'YAML', imageUrl: 'yaml.svg' },
            { name: 'Database', imageUrl: 'database.svg' },
            { name: 'Docker', imageUrl: 'docker.svg' },
        ]
    },
    {
        title: 'Truck Signs API',
        description: 'The Truck Signs API serves as the backend for an online store. ' +
            'The original project had a faulty setup that made installation and operation difficult, and it stored passwords directly in the code. ' +
            'I fixed the setup so that now, the entire application runs in containers, persists data across restarts, and no longer uses hardcoded credentials.',
        imageUrl: 'truck-signs-api.png',
        documentationUrl: '/docs/projects/truck-sings-api-v2/',
        repositoryUrl: 'https://github.com/mickkc/truck-signs-api',
        technologies: [
            { name: 'Python', imageUrl: 'python.svg' },
            { name: 'Django', imageUrl: 'django.svg' },
            { name: 'YAML', imageUrl: 'yaml.svg' },
            { name: 'Docker', imageUrl: 'docker.svg' },
            { name: 'Database', imageUrl: 'database.svg' },
            { name: 'Shell scripting', imageUrl: 'shell.svg' },
        ]
    },
    {
        title: 'OWASP Juice Shop',
        description: 'Worked through a wide range of challenges in the OWASP Juice Shop, an intentionally vulnerable web application used to teach and practice finding common security flaws. ' +
            'I used Burp Suite to intercept and manipulate HTTP traffic, and wrote a custom directory-enumeration tool in Python (a GoBuster-style scanner using Selenium) to discover hidden endpoints. ' +
            'Beyond exploiting the vulnerabilities, I also completed the coding challenges that teach how to fix them, and understanding how to mitigate them in the future.',
        imageUrl: 'owasp-juice-shop.webp',
        documentationUrl: '/docs/projects/juice-shop-master/',
        repositoryUrl: null,
        technologies: [
            { name: 'Python', imageUrl: 'python.svg' },
            { name: 'IT Security', imageUrl: 'security.svg' },
        ]
    },
    {
        title: 'Minecraft Server',
        description: 'A Minecraft server configuration that uses Docker and Docker Compose to automatically download and configure a server. ' +
            'The server binary is downloaded from the official Mojang servers and packaged into an image containing the Java runtime, ' +
            'dependencies and a script that automatically creates a configuration file from environment variables that can be defined in the Compose file.',
        imageUrl: 'minecraft.jpg',
        documentationUrl: '/docs/projects/mc-server/',
        repositoryUrl: 'https://github.com/mickkc/mc-server',
        technologies: [
            { name: 'YAML', imageUrl: 'yaml.svg' },
            { name: 'Shell scripting', imageUrl: 'shell.svg' },
            { name: 'Docker', imageUrl: 'docker.svg' },
        ]
    },
    {
        title: 'Wordpress hosting',
        description: 'A WordPress site hosted on a cloud VPS from Hetzner, backed by a MySQL database. ' +
            'Both services run as separate Docker containers orchestrated with Docker Compose, so the whole stack can be started, stopped, or rebuilt with a single command. ' +
            'Site content and database data are kept in persistent volumes, which means containers can be updated or recreated without losing anything.',
        imageUrl: 'wordpress.jpg',
        documentationUrl: '/docs/projects/wordpress/',
        repositoryUrl: 'https://github.com/mickkc/wordpress-docker',
        technologies: [
            { name: 'YAML', imageUrl: 'yaml.svg' },
            { name: 'Database', imageUrl: 'database.svg' },
            { name: 'Docker', imageUrl: 'docker.svg' },
        ]
    }
]

function ProjectDetailView({ title, description, imageUrl, documentationUrl, repositoryUrl, technologies }: ProjectDetails) {
    const { withBaseUrl } = useBaseUrlUtils();

    return (
        <div className={styles.project}>
            <div className={styles.projectHeader}>
                <h3>
                    {title}
                </h3>
                <div className={styles.projectTechnologies}>
                    {technologies.map((props, idx) => (
                        <div key={idx} className={styles.projectTechnology}>
                            <img src={withBaseUrl(`/img/skills/${props.imageUrl}`)} alt={props.name}/>
                            <p>{props.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <img src={withBaseUrl(`/img/projects/${imageUrl}`)} className={styles.projectImage}/>
            <div className={styles.projectDescription}>
                <p>{description}</p>
                <div className={styles.projectButtons}>
                    {documentationUrl ? <a href={withBaseUrl(documentationUrl)} className="button button--primary" target="_blank">
                        Documentation
                    </a> : null}
                    {repositoryUrl ? <a href={repositoryUrl} className="button button--secondary" target="_blank">
                        GitHub
                    </a> : null}
                </div>
            </div>
        </div>
    )
}

export default function ProjectHighlights(): JSX.Element {
    const [selectedIdx, setSelectedIdx] = useState(0);
    useBrokenLinks().collectAnchor('my-projects');

    return (
        <section className={styles.projectDetails} id="my-projects">
            <div className="container">
                <h2>
                    My project highlights
                </h2>
                <div className={styles.projectBrowser}>
                    <ol className={styles.projectNav} role="tablist">
                        {ProjectList.map((props, idx) => (
                            <li
                                key={idx}
                                className={clsx(styles.projectNavItem, idx === selectedIdx && styles.projectNavItemActive)}
                                onClick={() => setSelectedIdx(idx)}>
                                {props.title}
                            </li>
                        ))}

                        <a href={useBaseUrl("/docs/projects/overview")} className={styles.moreProjects}>
                            <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M21.3356 14.795H7.65397C7.52208 14.795 7.41381 14.7602 7.32915 14.6904C7.24449 14.6206 7.20216 14.5314 7.20216 14.4227V3.90731C7.20216 3.64984 7.0967 3.4343 6.88578 3.2607C6.67511 3.0869 6.41354 3 6.10108 3C5.78862 3 5.52705 3.0869 5.31638 3.2607C5.10546 3.4343 5 3.64984 5 3.90731V14.4227C5 15.026 5.25924 15.5414 5.77773 15.9688C6.29646 16.396 6.92187 16.6097 7.65397 16.6097H21.3356L16.7052 20.4249C16.4869 20.605 16.3717 20.8187 16.3595 21.0661C16.3472 21.3133 16.455 21.5307 16.6828 21.7184C16.9106 21.9061 17.1722 22 17.4675 22C17.7631 22 18.0248 21.9061 18.2526 21.7184L24.6245 16.4678C24.762 16.3545 24.8589 16.235 24.9152 16.1094C24.9717 15.9838 25 15.8481 25 15.7024C25 15.5566 24.9717 15.4209 24.9152 15.2953C24.8589 15.1697 24.762 15.0502 24.6245 14.9369L18.2298 9.66753C18.0116 9.48768 17.7561 9.39896 17.4635 9.40138C17.1708 9.4036 16.9106 9.49856 16.6828 9.68628C16.4702 9.87399 16.3601 10.0864 16.3525 10.3235C16.3449 10.5608 16.455 10.7733 16.6828 10.9611L21.3356 14.795Z"/>
                            </svg>
                            See more projects
                        </a>
                    </ol>
                    <div role="tabpanel">
                        <ProjectDetailView {...ProjectList[selectedIdx]} />
                    </div>
                </div>
                <div className={styles.projectList}>
                    {ProjectList.map((props, idx) => (
                        <ProjectDetailView key={idx} {...props} />
                    ))}

                    <a href={useBaseUrl("/docs/projects/overview")} className={styles.moreProjects}>
                        <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M21.3356 14.795H7.65397C7.52208 14.795 7.41381 14.7602 7.32915 14.6904C7.24449 14.6206 7.20216 14.5314 7.20216 14.4227V3.90731C7.20216 3.64984 7.0967 3.4343 6.88578 3.2607C6.67511 3.0869 6.41354 3 6.10108 3C5.78862 3 5.52705 3.0869 5.31638 3.2607C5.10546 3.4343 5 3.64984 5 3.90731V14.4227C5 15.026 5.25924 15.5414 5.77773 15.9688C6.29646 16.396 6.92187 16.6097 7.65397 16.6097H21.3356L16.7052 20.4249C16.4869 20.605 16.3717 20.8187 16.3595 21.0661C16.3472 21.3133 16.455 21.5307 16.6828 21.7184C16.9106 21.9061 17.1722 22 17.4675 22C17.7631 22 18.0248 21.9061 18.2526 21.7184L24.6245 16.4678C24.762 16.3545 24.8589 16.235 24.9152 16.1094C24.9717 15.9838 25 15.8481 25 15.7024C25 15.5566 24.9717 15.4209 24.9152 15.2953C24.8589 15.1697 24.762 15.0502 24.6245 14.9369L18.2298 9.66753C18.0116 9.48768 17.7561 9.39896 17.4635 9.40138C17.1708 9.4036 16.9106 9.49856 16.6828 9.68628C16.4702 9.87399 16.3601 10.0864 16.3525 10.3235C16.3449 10.5608 16.455 10.7733 16.6828 10.9611L21.3356 14.795Z"/>
                        </svg>
                        See more projects
                    </a>
                </div>
            </div>
        </section>
    )
}
