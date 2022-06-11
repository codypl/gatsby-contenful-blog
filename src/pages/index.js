import * as React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/Layout"
import ListArticleCards from "../components/ListArticleCards"
import website from '../../config/website'

// markup
const IndexPage = ({ data }) => {
  const articles = data.allContentfulBlogPost.edges
  return (
    <Layout >
      <h1>{website.title}</h1>
      <p className="my-5">
        {website.description}
      </p>

      <ListArticleCards articles={articles} />

    </Layout>
  )
}

export default IndexPage


export const pageQuery = graphql`
  query IndexQuery {
    allContentfulBlogPost {
      edges {
          node {
            ...blogPostData
          }
      }
    }
  }
`
