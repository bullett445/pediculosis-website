import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from './Layout';
import RichText from './Richtext';

const PageTemplate: FunctionComponent<PageProps<Queries.PageBySlugQuery>> = (props) => {
  const graphqlData = props.data;
  const page = graphqlData.contentfulPage;
  if (page?.slug) {
    return <>
      <Layout slug={page.slug}>
        <RichText json={page?.textbody} />
      </Layout>
    </>
  }
}


export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
  contentfulPage(slug: {eq: $slug}) {
    title
    slug
    textbody  { raw 
                references {
                  ... on ContentfulPage {
                    contentful_id
                    __typename
                    slug                    
                  }
                  ... on ContentfulAsset {
                    contentful_id
                    __typename
                    gatsbyImageData
                    description
                    url
                  }
                  ... on ContentfulImageWithCaption {
                    contentful_id
                    __typename
                    image { 
                      gatsbyImageData(layout: FULL_WIDTH) 
                      description
                    }
                    caption { raw 
                    references {
                        ... on ContentfulAsset {
                          contentful_id
                          __typename
                          url
                        }
                      }
                    }
                  }
                  ... on ContentfulHtml {
                    contentful_id
                    __typename
                    html {
                      html
                    }
                    assets {
                      file {
                        url
                      }
                    }
                  }
                  ... on ContentfulAnchor {
                    contentful_id
                    __typename
                    name
                  }
                }
              }
  }
}
`

export default PageTemplate

interface HeadProps {
  data: Queries.PageBySlugQuery;
}

export const Head: FunctionComponent<HeadProps> = ({ data }) => {
  return <title>{data?.contentfulPage.title}</title>
}