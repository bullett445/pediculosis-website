import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import RichText from './Richtext';

const Footer = () => {
    const data = useStaticQuery<Queries.FooterQuery>(graphql`
    query Footer {
      allContentfulSite {
        nodes {
          footer {
            raw
            references {
                  ... on ContentfulAnchor {
                    contentful_id
                    __typename
                    name
                  }
                } 
          }
        }
      }
    }
  `)
    //return <pre>{JSON.stringify(data, null, 4)}</pre>
    return <RichText json={data.allContentfulSite.nodes[0].footer}/>
}

export default Footer