import { graphql } from 'gatsby'

export const fragments = graphql`
    fragment blogPostMiniData on ContentfulBlogPost {
      id
      title
      slug
      description
      image {
        gatsbyImageData(layout: FULL_WIDTH, quality: 80, formats: [WEBP, AUTO], placeholder: BLURRED)
        description
        file {
          url
        }
      }
      readeableDate: createdAt(formatString: "MMMM E, YYYY", locale: "en")
      author {
        ...authorMiniData
      }
    }

    fragment blogPostShortData on ContentfulBlogPost {
      ...blogPostMiniData
      category {
          ...categoryMiniData
      }
    }
    
    fragment blogPostData on ContentfulBlogPost {
      ...blogPostShortData
      author {
          ...authorData
      }
      tags {
        ...tagData
      }
      createdAt(formatString: "YYYY-MM-DD")
      updatedAt(formatString: "YYYY-MM-DD")
      text {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            gatsbyImageData(layout: FULL_WIDTH, quality: 80, formats: [WEBP, AUTO], placeholder: BLURRED)
            description
          }
        }
      }
    }

    fragment tagData on ContentfulTag {
      id
      name
      slug
      color
      blog_post {
        ...blogPostShortData
      }
    }

    fragment categoryMiniData on ContentfulCategory {
      id
      name
      slug
      seoTitle
      seoDescription
    }

    fragment categoryData on ContentfulCategory {
      ...categoryMiniData
      blog_post {
        ...blogPostShortData
      }
    }

    fragment authorMiniData on ContentfulAuthor {
      id
      name
      slug
      photo {
        gatsbyImageData(
          layout: CONSTRAINED, 
          quality: 80, 
          formats: [WEBP, AUTO], 
          placeholder: BLURRED,
          aspectRatio: 1
          height: 260
          width: 260
          )
        description
      }
      description
      role
      twitterUsername
    }

    fragment authorData on ContentfulAuthor {
      ...authorMiniData
      blog_post {
        ...blogPostShortData
      }
    }
`