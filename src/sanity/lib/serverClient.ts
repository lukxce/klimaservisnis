import 'server-only'
import {createClient} from 'next-sanity'

import {projectId, dataset, apiVersion} from './client'

// Koristi write token — sme se uvoziti SAMO iz server koda (API route handlere i sl.),
// nikad iz komponenti koje se šalju u browser.
export const serverClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})
