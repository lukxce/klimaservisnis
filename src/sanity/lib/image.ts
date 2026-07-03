import {createImageUrlBuilder} from '@sanity/image-url'
import type {Image} from 'sanity'

import {dataset, projectId} from './client'

const imageBuilder = createImageUrlBuilder({projectId, dataset})

export const urlForImage = (source: Image) => imageBuilder.image(source)
