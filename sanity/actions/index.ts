import { DocumentActionComponent } from 'sanity';
import { DuplicateAction } from './DuplicateAction';

export const resolveDocumentActions = (
  prev: DocumentActionComponent[],
  context: any
): DocumentActionComponent[] => {
  const { schemaType } = context;

  // Add duplicate action to specific document types
  if (['service', 'industry', 'resource', 'teamMember', 'caseStudy', 'testimonial', 'certification'].includes(schemaType)) {
    return [...prev, DuplicateAction];
  }

  return prev;
};
