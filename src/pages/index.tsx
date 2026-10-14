import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageHero from "@site/src/components/HomepageHero";
import {JSX} from "react";
import ProjectHighlights from "@site/src/components/ProjectHighlights";

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHero/>
      <ProjectHighlights/>
    </Layout>
  );
}
