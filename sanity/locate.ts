import { DocumentLocation, DocumentLocationsState } from 'sanity/presentation'

export function locate(params: { id: string, type: string }, context: any): DocumentLocation | DocumentLocationsState | null {
  console.log('locate', params, context)
  return null
}
