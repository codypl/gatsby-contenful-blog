import React from 'react';
import { Helmet } from 'react-helmet'
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from 'gatsby'
import Facebook from './Facebook'
import Twitter from './Twitter'

export default function Seo({
  title, description,
  imageUrl, imageAlt,
  article, noIndex
}) {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)

  const {
    siteName,
    defaultTitle,
    defaultDescription,
    siteUrl,
    lang,
    ogLang,
    logo,
    defaultImage,
    social,
    contact
  } = site.siteMetadata


  const seo = {
    title: title || (article && article.title) || defaultTitle,
    description: description || (article && article.description) || defaultDescription,
    image: {
      url: imageUrl || (article && article.image && article.image.url) || `${siteUrl}${defaultImage.url}`,
      alt: imageAlt || (article && article.image && article.image.alt) || defaultImage.alt,
      type: defaultImage.type,
      height: defaultImage.height,
      width: defaultImage.width
    },
    url: `${siteUrl}${pathname}`,
    logo: `${siteUrl}/${logo}`,
    author: {
      name: (article && article.author && article.author.name) || siteName,
      url: (article && article.author && article.author.url) || siteUrl,
      twitter: (article && article.author && article.author.twitter) || social.twitter.name,
    }
  }

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "legalName": siteName,
    "url": siteUrl,
    "logo": seo.logo,
    "sameAs": [
      social.twitter.url,
      social.linkedin.url
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": contact.telephone,
      "email": contact.email,
      "contactType": "customer service"
    }]
  };

  const structuredDataArticle = article && {

    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "image": seo.image.url,
    "url": seo.url,
    "headline": seo.title,
    "description": seo.description,
    "dateCreated": article.publishedTime,
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime,
    "inLanguage": ogLang,
    "isFamilyFriendly": "true",
    "mainEntityOfPage": seo.url,
    "keywords": `[${article.tags}]`,
    "genre": `[${article.tags}]`,
    "articleSection": article.section,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "url": article.author.url,
    },
    "creator": {
      "@type": "Person",
      "name": article.author.name,
      "url": article.author.url,
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": siteUrl,
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": contact.telephone,
          "email": contact.email,
          "contactType": "customer service"
        }],
      "logo": {
        "@type": "ImageObject",
        "url": seo.logo,
      }
    },
  }

  let ldjson = article ? structuredDataArticle : structuredData

  return (
    <>
      <Helmet>
        <html lang={lang} prefix="og: https://ogp.me/ns# article: http://ogp.me/ns/article#" />
        <title>{seo.title}</title>
        <link rel="canonical" href={seo.url} />
        <meta name="description" content={seo.description} />
        <meta name="author" content={seo.author.name} />
        <meta name="copyright" content={siteName} />
        {noIndex && (
          <meta name="robots" content="noindex,follow"></meta>
        )}
        <script type="application/ld+json">{JSON.stringify(ldjson)}</script>
      </Helmet>
      <Facebook
        title={seo.title}
        description={seo.description}
        image={seo.image}
        type={article ? 'article' : 'website'}
        url={seo.url}
        locale={ogLang}
        siteName={siteName}
        article={article}
      />
      <Twitter
        title={seo.title}
        description={seo.description}
        url={seo.url}
        image={seo.image}
        siteUsername={social.twitter.name}
        creatorUsername={seo.author.twitter}
      />
    </>
  );
}

const query = graphql`
      query SEO {
        site {
        siteMetadata {
        siteName
        defaultTitle: title
        defaultDescription: description
        siteUrl : url
        lang
        ogLang
        logo,
        defaultImage: image {
          url
          alt
          type
          width
          height
        }
        social {
          twitter {
            name,
            url
          },
          linkedin {
            name,
            url
          },
        }
        contact
        {
          email,
          telephone
        }
      }
    }
  }
 `
