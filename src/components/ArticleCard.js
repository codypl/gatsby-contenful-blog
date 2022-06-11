import React from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from 'gatsby';
import Category from './Category';

export default function ArticleCard({ article, typeCard, hideCategory, hideAuthor, hideIllustration }) {
  const mini = typeCard && typeCard === "mini";
  const leftAligned = typeCard && typeCard === "leftAligned";
  return (
    <>
      {
        mini ? (
          <MinimalCard />
        ) :
          <Card />

      }
    </>
  )


  function Card() {
    return (
      <div className={leftAligned ? "" : "text-center"}>
        <IllustrationCard />
        <div className='py-5'>
          <CategoryCard />
          <TitleCard className={leftAligned ? "" : "mx-auto"} />
          <DescriptionCard className={leftAligned ? "" : "mx-auto"} />
          <FooterCard className={leftAligned ? "" : "justify-center"} />
        </div>
      </div>
    );
  }

  function MinimalCard() {
    return (
      <div>
        <CategoryCard />
        <TitleCard />
        <DescriptionCard />
        <FooterCard />
      </div>
    );
  }

  function CategoryCard() {
    return (
      <>
        {!hideCategory && (
          <Category category={article.category} />
        )}
      </>
    );
  }

  function TitleCard(props) {
    const className = props.className ? props.className : " "
    return (
      <Link to={'/blog/' + article.slug}>
        <p className={className + ' font-bold mb-0 mt-2 ' + (mini ? ' text-lg ' : ' text-2xl')}>{article.title}</p>
      </Link>
    );
  }

  function DescriptionCard(props) {
    const className = props.className ? props.className : " "

    return (
      <p className={className + ' font-light opacity-80 ' + (mini ? 'mb-1 mt-1 ' : 'mb-3 mt-2 ')}>{article.description}</p>
    );
  }

  function FooterCard(props) {
    const className = props.className ? props.className : " "
    return (
      <div className={'flex items-center space-x-3 ' + (className)}>
        {!mini && !hideAuthor && (
          <Link to={'/author/' + article.author.slug}>
            <GatsbyImage className='w-12 rounded-full' image={getImage(article.author.photo.gatsbyImageData)} alt={article.author.photo.description} />
          </Link>
        )}
        <div className={'text-left ' + (mini ? "flex items-center space-x-2" : "")}>
          {!hideAuthor && (
            <Link to={'/author/' + article.author.slug}>
              <p className='font-bold'>{article.author.name}</p>
            </Link>
          )}
          <p className={(mini ? "mt-0.5 " : "") + ' font-mono text-xs font-light opacity-80'}><span className={mini ? "sr-only" : ""}>Published on</span> {article.readeableDate}</p>
        </div>
      </div>
    );
  }

  function IllustrationCard() {
    return (
      <>
        {!hideIllustration && (
          <Link to={'/blog/' + article.slug}>
            <GatsbyImage className='rounded-md' image={getImage(article.image.gatsbyImageData)} alt={article.image.description} />
          </Link>
        )}
      </>
    );
  }



}
