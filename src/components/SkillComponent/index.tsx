import clsx from "clsx";
import {JSX, useEffect, useRef, useState} from "react";
import styles from './styles.module.css';

type Skill = {
    icon: string;
    name: string;
    bulletPoints: Array<string>;
}

const SkillList: Array<Skill> = [
    {
        icon: 'docker.svg',
        name: 'Docker',
        bulletPoints: [
            'Custom images with Dockerfiles',
            'Multi-container stacks with Compose',
            'Networks & persistent volumes',
            'Configuration via environment variables',
        ]
    },
    {
        icon: 'cicd.svg',
        name: 'CI/CD',
        bulletPoints: [
            'Pipelines with GitHub Actions & Jenkins',
            'Publishing images to GHCR & Docker Hub',
            'Deployments via rsync & SSH',
        ]
    },
    {
        icon: 'linux.svg',
        name: 'Linux & Shell',
        bulletPoints: [
            'Administering Debian servers',
            'Hardening SSH with key-based login',
            'Bash scripts and helpers',
            'Daily driver since 2023',
        ]
    },
    {
        icon: 'security.svg',
        name: 'IT Security',
        bulletPoints: [
            'Pentesting with Burp Suite (Juice Shop)',
            'Custom pentesting tools in Python',
            'OWASP Top 10: XSS, SQLi, broken auth'
        ]
    },
    {
        icon: 'git.svg',
        name: 'Git',
        bulletPoints: [
            'Merging, rebasing, cherry-picking',
            'Resolving merge conflicts',
            'Conventional commit messages',
            'GitHub & Forgejo, all from the CLI',
        ]
    },
    {
        icon: 'database.svg',
        name: 'Databases / SQL',
        bulletPoints: [
            'PostgreSQL, MySQL and SQLite',
            'Relational schema design',
            'SQL queries & migrations',
            'Containerized databases with volumes'
        ]
    },
    {
        icon: 'python.svg',
        name: 'Python',
        bulletPoints: [
            'Web apps & REST APIs with Flask/Django',
            'Browser automation with Selenium',
            'Automated tests',
            'CLI scripts and helpers',
        ]
    },
    {
        icon: 'kotlin.svg',
        name: 'Kotlin',
        bulletPoints: [
            'Websites & REST APIs with Ktor',
            'Exposed ORM & Flyway migrations',
            'Android apps with Jetpack Compose',
        ]
    },
    {
        icon: 'flutter.svg',
        name: 'Flutter',
        bulletPoints: [
            'Cross-platform apps with one codebase',
            'Responsive UIs with Material 3',
            'iOS test builds via TestFlight',
        ]
    },
    {
        icon: 'html.svg',
        name: 'HTML & CSS',
        bulletPoints: [
            'Semantic, accessible markup',
            'Server- & client-side rendering',
            'Theming & dark mode with CSS variables',
            'Transitions, animations, hover effects',
        ]
    },
    {
        icon: 'javascript.svg',
        name: 'JavaScript / TypeScript',
        bulletPoints: [
            'Frontends with React and Vue.js',
            'REST APIs with Express.js',
        ]
    },
    {
        icon: 'docusaurus.svg',
        name: 'Static site generator',
        bulletPoints: [
            'This portfolio, built with Docusaurus',
            'Docs in Markdown/MDX',
            'Custom React components',
            'Auto-deployment to GitHub Pages',
        ]
    }
]

function Skill({ icon, name, bulletPoints }: Skill) {
    return (
        <div className="card padding--none">
            <div className={styles.skillContent}>
                <img src={`/img/skills/${icon}`} alt={name} className={styles.skillImage}/>
                <p className={styles.skillName}>
                    {name}
                </p>
            </div>

            <div className={styles.skillOverlay}>
                <p>How I used this skill:</p>
                <ul className="margin--none">
                    {bulletPoints.map((text, idx) => (
                        <li key={idx}>
                            {text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default function SkillComponent(): JSX.Element {
    const listRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const getPageWidth = (list: HTMLDivElement) =>
        list.clientWidth + (parseFloat(getComputedStyle(list).columnGap) || 0);

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const update = () => {
            const width = getPageWidth(list);
            setPageCount(Math.round((list.scrollWidth - list.clientWidth) / width) + 1);
            setPage(Math.round(list.scrollLeft / width));
        };

        update();
        list.addEventListener('scroll', update, {passive: true});
        window.addEventListener('resize', update);
        return () => {
            list.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    const goToPage = (idx: number) => {
        const list = listRef.current;
        list?.scrollTo({left: idx * getPageWidth(list), behavior: 'smooth'});
    };

    return (
        <section className={styles.skills} id="my-skills">
            <div className="container">
                <h2>My skills</h2>
                <div className={styles.skillList} ref={listRef}>
                    {SkillList.map((props, idx) => (
                        <Skill key={idx} {...props}/>
                    ))}
                </div>

                {pageCount > 1 && (
                    <div className={styles.pagination}>
                        {Array.from({length: pageCount}, (_, idx) => (
                            <button
                                key={idx}
                                className={clsx(styles.paginationDot, idx === page && styles.paginationDotActive)}
                                onClick={() => goToPage(idx)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}