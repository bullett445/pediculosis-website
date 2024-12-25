import  React, { Fragment, FunctionComponent }  from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import classnames from 'classnames';

interface SideNavigationProps {
  slug: string;
  keyPrefix: string;
}

export const SideNavigation: FunctionComponent<SideNavigationProps> = ({slug, keyPrefix}) => {
    const data = useStaticQuery<Queries.NavigationPagesQuery>(graphql`
     query NavigationPages {
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
    //return <pre>{JSON.stringify(data, null, 4)}</pre>

    function NavItem(props: { navItem: any, currentPageSlug: any }) {
        return <div className={"p-1"}>
            <Link to={'/' + props.navItem.slug}>
                <NavTitle active={props.currentPageSlug === props.navItem.slug}>{props.navItem.title}</NavTitle>
            </Link>
        </div>;
    }

    const NavTitle = (props: {active: boolean, children: any}) => {
        return <span className={classnames({'font-weight-bold': props.active })}>{props.children}</span>
    }


    const navigation = data.allContentfulSite.nodes[0].navigation;

    const navItems = navigation?.map((navItem) => {
        if(navItem?.__typename === 'ContentfulPage') {
            return <NavItem key={keyPrefix + navItem.slug} navItem={navItem} currentPageSlug={slug}/>
        } else if(navItem?.__typename === 'ContentfulSubNavigation') {
            const dropDownItems = navItem?.subPages?.map((subPage) => {
                return <NavItem key={keyPrefix + subPage?.slug} navItem={subPage} currentPageSlug={slug}/>
            })
            return <Fragment key={keyPrefix + navItem?.mainPage?.slug}><NavItem  navItem={navItem.mainPage} currentPageSlug={slug}/>
                <div className={"ms-2"}><small>{dropDownItems}</small></div></Fragment>
        }
    })

 //       <Nav.Item key={node.node.slug}><Link to={"/" + node.node.slug}>{node.node.title}</Link></Nav.Item>
 //   )

    return  <>{navItems}</>
   ;
}

export default SideNavigation;