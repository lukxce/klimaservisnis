import {groq} from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`

export const servicesQuery = groq`*[_type == "service"] | order(order asc, _createdAt asc)`

export const featuredServicesQuery = groq`*[_type == "service" && featured == true] | order(order asc)`

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]`

export const servicePagesQuery = groq`*[_type == "servicePage"]`

export const servicePageBySlugQuery = groq`*[_type == "servicePage" && slug.current == $slug][0]`

export const productsQuery = groq`*[_type == "product"] | order(_createdAt desc)`

export const featuredProductsQuery = groq`*[_type == "product" && featured == true] | order(_createdAt desc)`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]`

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc)`

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]`
