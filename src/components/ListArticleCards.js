import React from "react"
import ArticleCard from "../components/ArticleCard"

const ListArticleCards = ({ articles, typeCard, hideCategory, hideAuthor, hideIllustration }) => {
  return (
    <div className="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
      {articles && articles.slice(0, articles.length).map((articleNode) => {
        let article = articleNode.node ? articleNode.node : articleNode
        return (
          <div key={article.id} className="">
            <ArticleCard typeCard={typeCard} article={article} hideCategory={hideCategory} hideAuthor={hideAuthor} hideIllustration={hideIllustration} />
          </div>
        )
      })}
    </div>
  )
}

export default ListArticleCards