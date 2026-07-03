import {createClient} from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion = '2025-01-01'

// Sanity nije podešen dok NEXT_PUBLIC_SANITY_PROJECT_ID nije postavljen —
// koristimo lažni ID da createClient ne baci grešku pri build-u; getteri u
// lib/data.ts nikad ne pozivaju client.fetch dok projectId nije postavljen.
export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
})
