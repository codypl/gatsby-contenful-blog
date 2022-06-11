import { Link } from "gatsby"
import React from "react"
const Color = require('color');

const ListTags = ({ tags }) => {
  return (
    <div className="flex space-x-2">
      {tags.slice(0, tags.length).map((tag, index) => {
        const bgColorTag = Color(tag.color).lighten(0.8);
        return (
          <Link to={'/tag/' + tag.slug} key={index} style={{ border: bgColorTag }}>
            <span style={{ color: tag.color }}>#</span>{tag.name}
          </Link>
        )
      })}
    </div>
  )
}

export default ListTags