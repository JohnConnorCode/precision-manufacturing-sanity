/**
 * Scheduled Publishing Schema
 * Adds publish date/time fields to documents for scheduled publishing
 */

export const scheduledPublishingFields = [
  {
    name: 'publishedAt',
    type: 'datetime',
    title: 'Published At',
    description: 'When this document was published',
    readOnly: true,
  },
  {
    name: 'scheduledFor',
    type: 'datetime',
    title: 'Schedule Publish',
    description: 'Schedule this document to be published at a specific date/time',
    validation: (Rule: any) =>
      Rule.custom((scheduledFor: string, context: any) => {
        if (!scheduledFor) return true;
        const scheduledDate = new Date(scheduledFor);
        const now = new Date();
        if (scheduledDate < now) {
          return 'Scheduled date must be in the future';
        }
        return true;
      }),
  },
  {
    name: 'unpublishAt',
    type: 'datetime',
    title: 'Unpublish At',
    description: 'Automatically unpublish this document at a specific date/time',
    validation: (Rule: any) =>
      Rule.custom((unpublishAt: string, context: any) => {
        if (!unpublishAt) return true;
        const unpublishDate = new Date(unpublishAt);
        const scheduledFor = (context.document as any)?.scheduledFor;
        if (scheduledFor && unpublishDate <= new Date(scheduledFor)) {
          return 'Unpublish date must be after the scheduled publish date';
        }
        return true;
      }),
  },
];

// Helper function to check if document should be published
export function shouldBePublished(doc: any): boolean {
  const now = new Date();
  const scheduledFor = doc.scheduledFor ? new Date(doc.scheduledFor) : null;
  const unpublishAt = doc.unpublishAt ? new Date(doc.unpublishAt) : null;

  // If scheduled for future, don't publish yet
  if (scheduledFor && scheduledFor > now) {
    return false;
  }

  // If unpublish time has passed, don't show
  if (unpublishAt && unpublishAt <= now) {
    return false;
  }

  return true;
}
