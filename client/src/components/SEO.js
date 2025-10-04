import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = 'Portfolio - Full Stack Developer',
  description = 'Professional portfolio showcasing full-stack development projects and skills',
  keywords = 'developer, portfolio, react, node.js, mongodb, full-stack, web development',
  image = '/og-image.jpg',
  url = 'https://yourportfolio.com'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Your Name" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Your Name",
          "jobTitle": "Full Stack Developer",
          "url": url,
          "sameAs": [
            "https://github.com/yourusername",
            "https://linkedin.com/in/yourusername"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;