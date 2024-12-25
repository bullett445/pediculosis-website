import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from './Layout';
import RichText from './Richtext';

const PageTemplate: FunctionComponent<PageProps<Queries.PageBySlugQuery>> = (props) => {
  const graphqlData = props.data;
  const page = graphqlData.contentfulPage;
  console.log(page)
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
                  }
                  ... on ContentfulImageWithCaption {
                    contentful_id
                    __typename
                    image { gatsbyImageData(layout: FULL_WIDTH) }
                    caption { raw }
                  }
                  ... on ContentfulHtml {
                    contentful_id
                    __typename
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