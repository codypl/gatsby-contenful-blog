const path = require("path")
const _ = require('lodash')

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = (promise) =>
  promise.then((result) => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve('./src/templates/blogPost.js')
  const authorTemplate = require.resolve('./src/templates/author.js')
  const categoryTemplate = require.resolve('./src/templates/category.js')
  const tagTemplate = require.resolve('./src/templates/tag.js')

  const result = await wrapper(
    graphql(`
        {
          allContentfulBlogPost {
              edges {
                  node {
                    id
                    slug
                  }
              }
          }
          allContentfulAuthor {
            edges {
                node {
                  id
                  slug
                }
            }
          }
          allContentfulCategory {
            edges {
                node {
                  id
                  slug
                }
            }
          }
          allContentfulTag {
            edges {
                node {
                  id
                  slug
                }
            }
          }
        }
    `)
  )

  const blogPostsList = result.data.allContentfulBlogPost.edges
  const authorList = result.data.allContentfulAuthor.edges
  const categoryList = result.data.allContentfulCategory.edges
  const tagList = result.data.allContentfulTag.edges

    blogPostsList.forEach((edge) => {
      createPage({
        path: `/blog/${edge.node.slug}`,
        component: blogPostTemplate,
        context: {
          id : edge.node.id,
        },
      })
    })

    authorList.forEach((edge) => {
      createPage({
        path: `/author/${edge.node.slug}`,
        component: authorTemplate,
        context: {
          id : edge.node.id,
        },
      })
    })

    categoryList.forEach((edge) => {
      createPage({
        path: `/category/${edge.node.slug}`,
        component: categoryTemplate,
        context: {
          id : edge.node.id,
        },
      })
    })

    tagList.forEach((edge) => {
      createPage({
        path: `/tag/${edge.node.slug}`,
        component: tagTemplate,
        context: {
          id : edge.node.id,
        },
      })
    })

}