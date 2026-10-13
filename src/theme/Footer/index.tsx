import {JSX} from "react";
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HomepageFooter from "@site/src/components/HomepageFooter";

type Props = WrapperProps<typeof FooterType>;

/**
 * Hides the default Docusaurus footer on the homepage only.
 */
export default function FooterWrapper(props: Props): JSX.Element | null {
    const {pathname} = useLocation();
    const homeUrl = useBaseUrl('/');

    if (pathname === homeUrl) {
        return <HomepageFooter/>;
    }

    return <Footer {...props}/>;
}
