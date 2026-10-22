import {JSX} from "react";
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HomepageNavbar from '@site/src/components/homepage-navbar';

type Props = WrapperProps<typeof NavbarType>;

/**
 * Replaces the default Docusaurus navbar with a custom header on the homepage only.
 */
export default function NavbarWrapper(props: Props): JSX.Element {
    const {pathname} = useLocation();
    const homeUrl = useBaseUrl('/');

    if (pathname === homeUrl) {
        return <HomepageNavbar/>;
    }

    return <Navbar {...props}/>;
}
