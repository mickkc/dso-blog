import {JSX, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import Link from '@docusaurus/Link';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import styles from './styles.module.css';

/**
 * Tracks whether the header should be visible:
 * always visible near the top, hidden while scrolling down, shown again when scrolling up.
 */
function useHideOnScroll(threshold: number): boolean {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const onScroll = () => {
            const currentY = window.scrollY;

            if (currentY <= threshold) {
                setVisible(true);
            } else if (currentY > lastScrollY.current) {
                setVisible(false);
            } else if (currentY < lastScrollY.current) {
                setVisible(true);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return visible;
}

const HomepageNavbar = (): JSX.Element => {
    const visible = useHideOnScroll(64);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={clsx(styles.header, !visible && !menuOpen && styles.hidden)}>
            <nav className={`${styles.nav} container`}>
                <button
                    type="button"
                    className={styles.menuButton}
                    onClick={() => setMenuOpen(open => !open)}>
                    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                        {menuOpen ? (
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        ) : (
                            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        )}
                    </svg>
                </button>
                <ul
                    id="homepage-nav-links"
                    className={clsx(styles.links, menuOpen && styles.linksOpen)}
                    onClick={e => {
                        if ((e.target as HTMLElement).closest('a')) setMenuOpen(false);
                    }}>
                    <li>
                        <Link to="#about-me" className={styles.link}>
                            About me
                        </Link>
                    </li>
                    <li>
                        <Link to="#my-skills" className={styles.link}>
                            My skills
                        </Link>
                    </li>
                    <li>
                        <Link to="#my-projects" className={styles.link}>
                            My projects
                        </Link>
                    </li>
                    <li>
                        <Link to="#contact" className={styles.link}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <NavbarColorModeToggle className={styles.colorToggle}/>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default HomepageNavbar;
