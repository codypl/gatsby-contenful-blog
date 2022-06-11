import React from 'react';
import Seo from './Seo/Seo';
import { Link } from 'gatsby';
import DarkToggle from './DarkToggle';
import website from '../../config/website';

export default function Layout({ children, customSEO }) {
  return (
    <div className='flex flex-col justify-between min-h-screen '>
      {!customSEO && <Seo />}

      <header className='shadow-lg'>
        <nav className='flex p-5 space-x-5 bg-interface'>
          {website.menu.map((menuItem) => {
            return (
              <Link key={menuItem.name} to={menuItem.url}>{menuItem.name}</Link>
            )
          })}
        </nav>
      </header>
      

      <main className='p-10'>
        {children}
      </main>

      <footer className='flex items-center p-5 mt-auto space-x-5 bg-interface'>
        <DarkToggle/>
        <Link to='https://github.com/codypl/Gatsby-Contenful-Blog'>View Source on GitHub</Link>
      </footer>
      
    </div>
  )
}
