# Docusaurus Blog

A blog and knowledge base built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## TOC

- [Docusaurus Blog](#docusaurus-blog)
    - [Quickstart](#quickstart)
    - [Description](#description)
    - [Configuration steps](#configuration-steps)
    - [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition 
    link="https://github.com/mickkc/dso-blog"
    title="Github Repo" 
    type="tip">
Check out this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

1. Clone the Repository:
    ```bash
    git clone https://github.com/mickkc/dso-blog
    ```
2. Enter the project's root directory:
    ```bash
    cd dso-blog
    ```
3. Install the required dependencies using pnpm:
    ```bash
    pnpm install
    ```
4. Run the project locally:
    ```bash
    pnpm start
    ```
5. You can now access the site at http://localhost:3000.

## Description

This is a personal blog / knowledge base where I document my [projects](/docs/projects/overview) and things I learned during my continuing education at the Developer Akademie DevSecOps Course.

## Configuration steps

- Forked and cloned the project: `git clone https://github.com/mickkc/dso-blog`
- Created a new branch: `git checkout -b "setup-blog"`.
- Installed the required dependencies: `pnpm install`.
- Updated all references to the URL, the template repository, and its organization to reflect my repository and user.
- Changed the website's title and tagline in the `docusaurus.config.ts` config file.
- Created a custom icon and added it to the configuration.
- Introduced a `GIT_REPOSITORY_URL` configuration option that is used in the navbar and "Edit this page" links.
- Fixed an issue where the "Edit this page" links didn't work because GitHub's url scheme is slightly different than the generated urls.
- Added a link to my projects in the footer.
- Removed the default "Community" section from the footer.
- Linked the new repository and the template in the footer's "More" section.
- Updated the copyright notice to include my name and mention the template.
- Documented automatic deployment through GitHub Actions in the README.
- Removed the Contributing section from the README.
- Enabled GitHub pages to be deployed using the action.

## Further References

- This project's repository on GitHub: https://github.com/mickkc/dso-blog
- The Template used in this project: https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template
- The framework used to build this project: https://docusaurus.io/
