import React from 'react';
import { Helmet } from 'react-helmet'

export default function Facebook({
  title,
  type,
  url,
  image,
  description,
  locale,
  siteName,
  article,
}) {

  const isArticle = type === 'article' && article

  return (
    <Helmet>
      {title && (
        <meta property="og:title" content={title} />
      )}
      {type && (
        <meta property="og:type" content={type} />
      )}
      {url && (
        <meta property="og:url" content={url} />
      )}
      {image && image.url && (
        <meta property="og:image" content={image.url} />
      )}
      {image && image.url && (
        <meta property="og:image:secure_url" content={image.url} />
      )}
      {image && image.width && (
        <meta property="og:image:type" content={image.type} />
      )}
      {image && image.uwidthrl && (
        <meta property="og:image:width" content={image.width} />
      )}
      {image && image.height && (
        <meta property="og:image:height" content={image.height} />
      )}
      {image && image.alt && (
        <meta property="og:image:alt" content={image.alt} />
      )}
      {description && (
        <meta property="og:description" content={description} />
      )}
      {locale && (
        <meta property="og:locale" content={locale} />
      )}
      {siteName && (
        <meta property="og:site_name" content={siteName} />
      )}

      {isArticle && article && article.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {isArticle && article && article.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {isArticle && article && article.author && article.author.url && (
        <meta property="article:author" content={article.author.url} />
      )}
      {isArticle && article && article.section && (
        <meta property="article:section" content={article.section} />
      )}

      {isArticle && article && article.tags && article.tags.map(
        (articleTag) => <meta key={articleTag} property="article:tag" content={articleTag} />
      )}

    </Helmet>
  );
}
