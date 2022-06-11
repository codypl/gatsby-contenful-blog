import React from 'react';
import { Helmet } from 'react-helmet'

export default function Twitter({title, description, image, url, siteUsername, creatorUsername }) {
  return (
    <Helmet>
      <meta name="twitter:card" content="summary_large_image" />
      {title && (
        <meta name="twitter:title" content={title} />
      )}
      {description && (
        <meta name="twitter:description" content={description} />
      )}
      {url && (
        <meta name="twitter:url" content={url}></meta>
      )}
      {image && image.url &&(
        <meta name="twitter:image" content={image.url} />
      )}
      {image && image.alt &&(
        <meta name="twitter:image:alt" content={image.alt} />
      )}
      {image && image.width && (
        <meta name="twitter:image:width" content={image.width}></meta>
      )}
      {image && image.height && (
        <meta name="twitter:image:height" content={image.height}></meta>
      )}
      {siteUsername && (
        <meta name="twitter:site" content={siteUsername} />
      )}
      {creatorUsername && (
        <meta name="twitter:creator" content={creatorUsername} />
      )}
      {url && (
        <meta name="twitter:domain" content={url} />
      )}
    </Helmet>
  );
}
