import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Col, Image } from 'react-bootstrap';
import { GatsbyImage } from "gatsby-plugin-image";

const Header = () => {
  const data = useStaticQuery<Queries.HeaderQuery>(graphql`
    query Header {
      allContentfulSite {
        nodes {
          logo {
            gatsbyImageData
            description
          }
          title
        }
      }
    }
  `)
  //return <pre>{JSON.stringify(data, null, 4)}</pre>
  const site = data.allContentfulSite.nodes[0]
  const headerimage = site.logo?.gatsbyImageData;
  const pagetitle = site.title;
  return <>
    <Col md={3}><Link to="/"><GatsbyImage image={headerimage} alt={site.logo?.description} /></Link></Col>
    <Col md={9}><h1>{pagetitle}</h1></Col>
  </>
}

export default Header