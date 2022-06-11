import * as React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/Layout"
import Seo from "../components/Seo/Seo";
import ListArticleCards from "../components/ListArticleCards"
import website from '../../config/website'

export default function TagTemplate ({
  pageContext: { id },
  data: {
    tag
  }
}) {
  return (
    <Layout customSEO>
    <Seo
        title={tag.name + " Archives - Blog " + website.siteName}
        noIndex
      />
      <h1 className="mb-10">Articles with the tag "{tag.name}" :</h1>
      <ListArticleCards articles={tag.blog_post}/>

    </Layout>
  )
}

export const pageQuery = graphql`
  query TagQuery($id: String!) {
    tag : contentfulTag(id: {eq: $id}) {
      ...tagData
    }
  }
`
