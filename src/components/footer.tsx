import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {FooterQuery} from '../../graphql-types';
import RichText from './richtext';

const Footer = () => {
    const data: FooterQuery = useStaticQuery(graphql`
    query Footer {
      allContentfulSite {
        nodes {
          footer {
            raw
          }
        }
      }
    }
  `)
    //return <pre>{JSON.stringify(data, null, 4)}</pre>
    return <RichText json={data.allContentfulSite.nodes[0].footer.json}/>
}

export default Footer