import React, { FunctionComponent, PropsWithChildren, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links";

interface QualifiedAnchorLinkProps {
  to: string;
}
const QualifiedAnchorLink: FunctionComponent<PropsWithChildren<QualifiedAnchorLinkProps>> = ({ to, children }) => {
  const data = useStaticQuery<Queries.allAnchorsQuery>(graphql`
    query allAnchors {
      allContentfulPage {
        nodes {
          slug
          textbody {
            references {
              ... on ContentfulAnchor {
                name
              }
            }
          }
        }
      }
    }
  `)
  //return <pre>{JSON.stringify(data, null, 4)}</pre>
  const nodes = data.allContentfulPage.nodes;
  const parentSlugByAnchorName = useMemo(() =>
    nodes.map((node) => {
      return node.textbody?.references?.map((reference) => {
        if (reference && Object.hasOwn(reference, 'name') && reference?.name) {
          return { anchor: reference.name, slug: node.slug }
        }
      })
    }).flat().filter(i => i).reduce((obj: { [key: string]: string }, item) => {
      if (item && item.anchor) {
        obj[item.anchor] = item.slug;
      }
      return obj;
    }, {})
    , [nodes]);
  console.log(parentSlugByAnchorName)

  const parentSlug = parentSlugByAnchorName[to];
  return <AnchorLink to={"/" + parentSlug + "#" + to}>{children}</AnchorLink>

}

export default QualifiedAnchorLink

