import React from 'react'
import { Link } from 'gatsby';

export default function Category(props) {
  const category = props.category
  return (
    <Link to={'/category/' + category.slug} className="font-semibold text-gradient-secondary hover:text-gradient-secondary">
      {category.name}
    </Link>
  )
}
