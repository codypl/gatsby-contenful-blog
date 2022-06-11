module.exports = {
  pathPrefix: '/',
  siteName: 'Gastby SEO Starter Blog',
  title: 'Gastby SEO Starter Blog',
  description: 'This is a simple blog built with Gatsby, Contentful and Tailwind.',
  logo: '/images/icon.png',
  url: 'https://cody-gatsby-contenful.netlify.app/', // Domain of your site. No trailing slash!
  lang: 'en', // Language Tag on <html> element
  ogLang: 'en_US', // Facebook Language
  image: {
    url: '/images/default-share-image.png',
    alt: 'Add your alternative text here',
    type: 'png',
    width: 1280,
    height: 670,
  },
  contact: {
    telephone: '+33646858661',
    email: 'cody@aurorbe.com',
  },
  social: {
    twitter: {
      name: "@Aurorbe_Agency",
      url: "https://twitter.com/Aurorbe_Agency",
    },
    facebook: null,
    linkedin: {
      name: "cody-cn",
      url: "https://www.linkedin.com/in/cody-cn/",
    }
  },
  menu: [
    {
      id: 'home',
      name: 'Home',
      url: "/"
    }
  ],

  // JSONLD / Manifest
  favicon: './static/favicon.png', // Used for manifest favicon generation
  shortName: '', // shortname for manifest. MUST be shorter than 12 characters
  author: '', // Author for schemaORGJSONLD
  themeColor: '#81D9DC',
  backgroundColor: '#FEFBF5',



}
