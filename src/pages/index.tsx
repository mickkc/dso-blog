import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageHero from "@site/src/components/homepage-hero";
import {JSX} from "react";
import SkillComponent from "@site/src/components/my-skills-section";
import ProjectHighlights from "@site/src/components/project-highlights-section";
import HomepageContact from "@site/src/components/homepage-contact-section";

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="DevSecOps Engineer & Full-stack developer: building secure pipelines and infrastructure">
      <HomepageHero/>
      <SkillComponent/>
      <ProjectHighlights/>
      <HomepageContact/>
    </Layout>
  );
}
