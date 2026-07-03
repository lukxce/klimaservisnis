import {type SchemaTypeDefinition} from 'sanity'

import {siteSettings} from './siteSettings'
import {service} from './service'
import {servicePage} from './servicePage'
import {product} from './product'
import {blogPost} from './blogPost'
import {contactSubmission} from './contactSubmission'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [siteSettings, service, servicePage, product, blogPost, contactSubmission],
}
