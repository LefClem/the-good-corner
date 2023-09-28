import React from 'react'
import { Category } from '@/types/category.type'
import Link from 'next/link'

type CategoryProps = {
    category: Category
}

function Category({ category } : CategoryProps) {
  return (
    <>
      <Link href={`/category/${category.id}`} className="category-navigation-link">{category.name}</Link>    
    </>
  )
}

export default Category;