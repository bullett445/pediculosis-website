import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import React, { FunctionComponent } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import classnames from 'classnames';

interface PaginationProps {
    currentSlug: string;
}

const Pagination: FunctionComponent<PaginationProps> = ({ currentSlug }) => {
    const data = useStaticQuery<Queries.PaginationQuery>(graphql`
     query Pagination {
      allContentfulSite {
        nodes {
          navigation {
            __typename
            ... on ContentfulPage {
              slug
              title
            }
            ... on ContentfulSubNavigation {
              mainPage {
                slug
                title
              }
              subPages {
                slug
                title
              }
            }
          }
        }
      }
    }
    `)

    let navback = null;
    let navforward = null;
    let hereIam = false;

    const navNodes = data.allContentfulSite.nodes[0].navigation;
    let pages = [];
    pages.push({ 'slug': 'willkommen', 'title': 'Willkommen' })
    for (const node of navNodes ?? []) {
        switch (node.__typename) {
            case 'ContentfulPage':
                pages.push({ 'slug': node.slug, 'title': node.title });
                break;
            case 'ContentfulSubNavigation':
                pages.push({ 'slug': node.mainPage.slug, 'title': node.mainPage.title });
                for (const subPage of node.subPages) {
                    pages.push({ 'slug': subPage.slug, 'title': subPage.title });
                }
                break;
        }
    }

    for (const page of pages) {
        if (hereIam) {
            navforward = page;
            break;
        }
        if (page.slug === currentSlug) {
            hereIam = true;
            continue;
        }
        navback = page;
    }
    //return <pre>{JSON.stringify(pages, null, 4)}</pre>
    if (navback?.slug === 'willkommen')
        navback.slug = '';

    return <div className={"d-flex flex-row justify-content-between"}>
        <Link className={classnames("btn btn-primary", { "invisible": !navback })} to={"/" + navback?.slug}><BsChevronLeft /></Link>
        {(navforward) &&
            <Link className="btn btn-primary align-self-end" to={"/" + navforward.slug}>{navforward.title}<BsChevronRight /></Link>
        }
    </div>
}

export default Pagination;