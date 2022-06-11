import * as React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/Layout"
import Seo from "../components/Seo/Seo";
import ListArticleCards from "../components/ListArticleCards"
import website from '../../config/website'


export default function CategoryTemplate ({
  pageContext: { id },
  data: {
    category
  }
}) {
  return (
    <Layout customSEO>
    <Seo
        title={"Blog " + website.siteName + " - " + category.seoTitle}
        description={category.seoDescription}
      />
      <h1 className="mb-10">Articles related to {category.name}</h1>
      <ListArticleCards hideCategory typeCard={"leftAligned"} articles={category.blog_post}/>

    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryQuery($id: String!) {
    category : contentfulCategory(id: {eq: $id}) {
      ...categoryData
    }
  }
`
