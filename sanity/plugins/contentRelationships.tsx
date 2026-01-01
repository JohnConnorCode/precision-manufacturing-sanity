import { definePlugin } from 'sanity';

/**
 * Content Relationships Plugin
 * Visualizes and manages relationships between documents
 */

export const contentRelationships = definePlugin({
  name: 'content-relationships',
});

// Relationship mapping configuration
export const relationshipConfig = {
  // Define how different document types relate
  relationships: {
    service: {
      relatedTo: ['industry', 'resource', 'teamMember'],
      fields: {
        industries: {
          type: 'array',
          title: 'Related Industries',
          description: 'Industries that use this service',
          of: [{ type: 'reference', to: [{ type: 'industry' }] }],
        },
        resources: {
          type: 'array',
          title: 'Related Resources',
          description: 'Educational content about this service',
          of: [{ type: 'reference', to: [{ type: 'resource' }] }],
        },
        experts: {
          type: 'array',
          title: 'Service Experts',
          description: 'Team members specialized in this service',
          of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
        },
      },
    },
    industry: {
      relatedTo: ['service', 'resource'],
      fields: {
        services: {
          type: 'array',
          title: 'Relevant Services',
          description: 'Services commonly used in this industry',
          of: [{ type: 'reference', to: [{ type: 'service' }] }],
        },
        resources: {
          type: 'array',
          title: 'Industry Resources',
          description: 'Content specific to this industry',
          of: [{ type: 'reference', to: [{ type: 'resource' }] }],
        },
      },
    },
    resource: {
      relatedTo: ['service', 'industry', 'resource'],
      fields: {
        relatedServices: {
          type: 'array',
          title: 'Related Services',
          description: 'Services mentioned in this resource',
          of: [{ type: 'reference', to: [{ type: 'service' }] }],
        },
        relatedIndustries: {
          type: 'array',
          title: 'Related Industries',
          description: 'Industries this resource applies to',
          of: [{ type: 'reference', to: [{ type: 'industry' }] }],
        },
        relatedResources: {
          type: 'array',
          title: 'Related Resources',
          description: 'Other relevant reading',
          of: [{ type: 'reference', to: [{ type: 'resource' }] }],
        },
      },
    },
  },
};

// Helper functions for relationship queries
export const relationshipQueries = {
  // Get all documents related to a specific document
  async getRelatedDocuments(client: any, documentId: string, documentType: string) {
    const queries = {
      service: `{
        "industries": *[_type == "industry" && references($id)],
        "resources": *[_type == "resource" && references($id)],
        "experts": *[_type == "teamMember" && references($id)]
      }`,
      industry: `{
        "services": *[_type == "service" && references($id)],
        "resources": *[_type == "resource" && references($id)]
      }`,
      resource: `{
        "services": *[_type == "service" && references($id)],
        "industries": *[_type == "industry" && references($id)],
        "relatedResources": *[_type == "resource" && references($id)]
      }`,
    };

    const query = queries[documentType as keyof typeof queries];
    if (!query) return {};

    return await client.fetch(query, { id: documentId });
  },

  // Get relationship graph data for visualization
  async getRelationshipGraph(client: any, documentId: string) {
    return await client.fetch(
      `
      *[_id == $id][0]{
        _id,
        _type,
        title,
        "outbound": *[references(^._id)]{_id, _type, title},
        "inbound": *[^._id in *._ref]{_id, _type, title}
      }
    `,
      { id: documentId }
    );
  },

  // Find orphaned documents (no relationships)
  async findOrphanedDocuments(client: any, documentType: string) {
    return await client.fetch(
      `
      *[_type == $type && !(_id in path("drafts.**"))] {
        _id,
        title,
        "hasInbound": count(*[references(^._id)]) > 0,
        "hasOutbound": count(*[^._id in *._ref]) > 0
      }[!hasInbound && !hasOutbound]
    `,
      { type: documentType }
    );
  },

  // Get most referenced documents
  async getMostReferenced(client: any, documentType: string, limit: number = 10) {
    return await client.fetch(
      `
      *[_type == $type] {
        _id,
        title,
        "referenceCount": count(*[references(^._id)])
      } | order(referenceCount desc) [0...$limit]
    `,
      { type: documentType, limit }
    );
  },
};

// Relationship validation
export const relationshipValidation = {
  // Check for broken references
  async findBrokenReferences(client: any) {
    return await client.fetch(`
      *[_type in ["service", "industry", "resource"]] {
        _id,
        _type,
        title,
        "brokenRefs": *[^._id in path(*._ref) && !(_id in path("**"))]{
          "field": ^._type,
          "ref": _ref
        }
      }[count(brokenRefs) > 0]
    `);
  },

  // Check for circular references
  async findCircularReferences(client: any, documentId: string, visited: Set<string> = new Set()): Promise<boolean> {
    if (visited.has(documentId)) return true;
    visited.add(documentId);

    const references = await client.fetch(
      `*[_id == $id][0].*[_type == "reference"]._ref`,
      { id: documentId }
    );

    for (const refId of references || []) {
      if (await this.findCircularReferences(client, refId, new Set(visited))) {
        return true;
      }
    }

    return false;
  },
};

// Relationship suggestions
export const relationshipSuggestions = {
  // Suggest related content based on tags, categories, or keywords
  async suggestRelatedContent(client: any, documentId: string) {
    return await client.fetch(
      `
      *[_id == $id][0] {
        "suggestions": *[
          _type in ["service", "industry", "resource"]
          && _id != $id
          && (
            category == ^.category ||
            tags match ^.tags ||
            title match ^.title
          )
        ][0...5]{
          _id,
          _type,
          title,
          "relevanceScore": select(
            category == ^.category => 3,
            tags match ^.tags => 2,
            1
          )
        } | order(relevanceScore desc)
      }
    `,
      { id: documentId }
    );
  },
};
