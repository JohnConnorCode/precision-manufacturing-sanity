import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

export async function GET() {
  const readToken = process.env.SANITY_API_READ_TOKEN
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

  const results: Record<string, unknown> = {
    tokenPresent: !!readToken,
    tokenLength: readToken?.length ?? 0,
    tokenPrefix: readToken?.substring(0, 5) ?? 'NONE',
    projectId: projectId ?? 'MISSING',
    dataset: dataset ?? 'MISSING',
    nodeEnv: process.env.NODE_ENV,
  }

  // Test if the token actually works with a Sanity query
  if (readToken && projectId) {
    try {
      const testClient = createClient({
        projectId,
        dataset: dataset || 'production',
        apiVersion: '2024-01-01',
        useCdn: false,
        token: readToken,
      })

      // Query for preview URL secrets (what defineEnableDraftMode does internally)
      const secrets = await testClient.fetch(
        `*[_type == "sanity.previewUrlSecret"] | order(_updatedAt desc) [0] { _id, _type, _updatedAt }`,
        {},
        { perspective: 'raw' }
      )
      results.sanityQueryWorks = true
      results.secretFound = !!secrets
      results.secretId = secrets?._id ?? null
    } catch (err: unknown) {
      results.sanityQueryWorks = false
      results.sanityError = err instanceof Error ? err.message : String(err)
    }
  }

  return NextResponse.json(results)
}
