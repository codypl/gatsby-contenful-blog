import React from "react"
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from "../components/Seo/Seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import website from '../../config/website'
import ListTags from "../components/ListTags";
import Category from "../components/Category";


const richTextImages = {};

const Bold = ({ children }) => <span className="font-bold">{children}</span>;
const Italic = ({ children }) => <span className="italic">{children}</span>;
const Underline = ({ children }) => <span className="underline">{children}</span>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>,
    [MARKS.UNDERLINE]: (text) => <Underline>{text}</Underline>,
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const imageData = richTextImages[node.data.target.sys.id];
      const image = getImage(imageData.image)
      return <GatsbyImage image={image} alt={imageData.alt} />
    },
  },
}

export default function BlogPost ({
  pageContext: { id },
  data: {
    blogPost
  }
}) {

  const tags = blogPost.tags
  let tagsArray = [];
  tags.forEach(function (tag) {
    tagsArray.push(tag.name)
  });

  const article = {
    title: blogPost.title,
    description: blogPost.description,
    content: blogPost.text,
    image: {
      url: `https:${blogPost.image.file.url}`,
      alt: blogPost.image.description,
    },
    author: {
      name: blogPost.author.name,
      url: website.url+"/author/"+blogPost.author.slug,
      twitter: blogPost.author.twitterUsername
    },
    modifiedTime: blogPost.createdAt,
    publishedTime: blogPost.updatedAt,
    section: blogPost.category.name,
    tags: tagsArray,
  };

  article.content.references.map(reference => (
    richTextImages[reference.contentful_id] = { "image": reference.gatsbyImageData, "alt": reference.description }
  ))
  
  return (
    <Layout customSEO>
      <Seo
        article={article}
      />
      <article>
        <Category category={blogPost.category}/>
        <h1 className="mt-2">{article.title}</h1>
        <p className="my-4 text-lg max-w-prose text-default-soft">{article.description}</p>
        <ListTags tags={tags}/>
        <GatsbyImage className='mt-1 rounded-sm shadow-md' image={getImage(blogPost.image.gatsbyImageData)} alt={blogPost.image.description} />
       
        <div className="flex items-center mt-4">
          <GatsbyImage className='w-20 rounded-full ' image={getImage(blogPost.author.photo.gatsbyImageData)} alt={blogPost.author.photo.description} />
          <div className="flex items-end justify-between w-full pb-2 ml-3 border-b border-soft">
            <p>Written by <Link to={'/author/'+blogPost.author.slug}>{article.author.name}</Link></p>
            <p className="text-default-soft">Published on {blogPost.readeableDate}</p>
          </div>

        </div>
        <div className="my-5">{documentToReactComponents(JSON.parse(article.content.raw), options)}</div>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    blogPost : contentfulBlogPost(id: {eq: $id}) {
      ...blogPostData
    }
  }
`

