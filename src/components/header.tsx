import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Col, Image } from 'react-bootstrap';

const Header = () => {
  const data = useStaticQuery<Queries.HeaderQuery>(graphql`
    query Header {
      allContentfulSite {
        nodes {
          logo {
            file {
              url
            }
          }
          title
        }
      }
    }
  `)
  //return <pre>{JSON.stringify(data, null, 4)}</pre>
  const headerimage = data.allContentfulSite.nodes[0].logo?.file?.url;
  const pagetitle = data.allContentfulSite.nodes[0].title;
  return <>
    <Col md={3}><Image src={headerimage} fluid /></Col>
    <Col md={9}><h1>{pagetitle}</h1></Col>
  </>
}

export default Header