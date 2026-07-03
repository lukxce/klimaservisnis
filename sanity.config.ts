'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {schema} from './src/sanity/schemaTypes'
import {projectId, dataset, apiVersion} from './src/sanity/lib/client'

export default defineConfig({
  basePath: '/studio',
  name: 'klimaservisnis',
  title: 'Moj Klima Servis Niš — Admin panel',
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool({defaultApiVersion: apiVersion})],
})
