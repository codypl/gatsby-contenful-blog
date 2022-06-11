require('dotenv').config({
  path: `.env`,
})

const website = require('./config/website')

module.exports = {
  siteMetadata: {
    siteName: website.siteName,
    title: website.title,
    description: website.description,
    url: website.url,
    siteUrl: website.url,
    lang: website.lang,
    ogLang: website.ogLang,
    logo: website.logo,
    image: website.image,
    social: website.social,
    contact: website.contact,
  },
  plugins: [
  {
    resolve: 'gatsby-source-contentful',
    options: {
      accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      spaceId: `${process.env.CONTENTFUL_SPACE_ID}`,
    }
  }, "gatsby-plugin-styled-components", "gatsby-plugin-sass", "gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-react-helmet",
  {
    resolve: 'gatsby-plugin-sitemap',
    options: {
      exclude: ['/tag', '/confirmed'],
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};