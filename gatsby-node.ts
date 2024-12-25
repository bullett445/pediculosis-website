import path from "path"

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
  
    return new Promise((resolve, reject) => {
      const page = path.resolve('./src/templates/page.tsx')
      resolve(
        graphql(
          `query allpages {
              allContentfulPage {
                edges {
                  node {
                    title
                    slug
                  }
                }
              }
            }
            `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
  
          const posts = result.data.allContentfulPage.edges
          posts.forEach((post, index) => {
            let uri = post.node.slug === 'willkommen' ? '/' : `/${post.node.slug}`
            createPage({
                path: `${uri}`,
              component: page,
              context: {
                slug: post.node.slug
              },
            })
          })
        })
      )
    })
  }