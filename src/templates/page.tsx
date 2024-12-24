import React from 'react'
import { graphql } from 'gatsby'
import Layout  from '../components/layout';
import RichText from '../components/richtext';
import {PageBySlugQuery} from '../gatsby-types';

const PageTemplate = (props) => {
    const graphqlData: PageBySlugQuery = props.data;
    const page = graphqlData.contentfulPage;
    console.log(page)
    return <>
       
        <Layout slug={page.slug}>
            <RichText json={page.textbody} />
        </Layout>
    </>
}

export default PageTemplate

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
                    filename
                  }
                  ... on ContentfulImageWithCaption {
                    contentful_id
                    __typename
                  }
                  ... on ContentfulHtml {
                    contentful_id
                    __typename
                  }
                }
              }
  }
}
`