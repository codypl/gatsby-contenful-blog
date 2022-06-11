import * as React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/Layout"
import Seo from "../components/Seo/Seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ListArticleCards from "../components/ListArticleCards"

export default function AuthorTemplate ({
  pageContext: { id },
  data: {
    author
  }
}) {
  return (
    <Layout customSEO>
      <Seo
        title={author.name + " - " + author.role}
        description={"Discorver all articles written by " + author.name }
        noIndex
      />
      <Author author={author}/>

      <h2 className="mt-5">Articles from this author</h2>
      <ListArticleCards hideAuthor typeCard={"leftAligned"} articles={author.blog_post} />

    </Layout>
  )
}

function Author(props) {
  const author = props.author
  return (
    <div className='mx-auto mb-10 text-center'>
      <GatsbyImage className='rounded-full' image={getImage(author.photo.gatsbyImageData)} alt={author.photo.description} />
      <h1 className="mx-auto mt-5 ">{author.name}</h1>
      <p className="mx-auto mt-1 text-xl font-semibold text-gradient-secondary">{author.role}</p>
      <p className='mx-auto mt-6'>{author.description}</p>
    </div>
  );
}



export const pageQuery = graphql`
  query AuthorQuery($id: String!) {
    author : contentfulAuthor(id: {eq: $id}) {
      ...authorData
    }
  }
`
