/**
 * Publishing Workflow System
 * Multi-step approval process for content publishing
 */

export interface WorkflowState {
  status: 'draft' | 'in-review' | 'approved' | 'rejected' | 'published';
  assignedTo?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  updatedAt: string;
}

export const workflowStates = {
  DRAFT: 'draft',
  IN_REVIEW: 'in-review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PUBLISHED: 'published',
} as const;

// Workflow schema fields to add to documents
export const workflowFields = [
  {
    name: 'workflowState',
    type: 'object',
    title: 'Workflow Status',
    fields: [
      {
        name: 'status',
        type: 'string',
        title: 'Status',
        options: {
          list: [
            { title: 'Draft', value: 'draft' },
            { title: 'In Review', value: 'in-review' },
            { title: 'Approved', value: 'approved' },
            { title: 'Rejected', value: 'rejected' },
            { title: 'Published', value: 'published' },
          ],
          layout: 'radio',
        },
        initialValue: 'draft',
      },
      {
        name: 'assignedTo',
        type: 'string',
        title: 'Assigned To',
        description: 'Email of person responsible for review',
      },
      {
        name: 'reviewedBy',
        type: 'string',
        title: 'Reviewed By',
        description: 'Email of person who reviewed',
        readOnly: true,
      },
      {
        name: 'reviewNotes',
        type: 'text',
        title: 'Review Notes',
        description: 'Notes from reviewer',
        rows: 3,
      },
      {
        name: 'updatedAt',
        type: 'datetime',
        title: 'Status Updated',
        readOnly: true,
      },
    ],
  },
];

// Workflow transition rules
export const workflowTransitions = {
  draft: ['in-review', 'published'],
  'in-review': ['approved', 'rejected', 'draft'],
  approved: ['published', 'draft'],
  rejected: ['draft'],
  published: ['draft'],
};

// Check if transition is allowed
export function canTransition(
  currentStatus: string,
  newStatus: string
): boolean {
  const allowedTransitions = workflowTransitions[currentStatus as keyof typeof workflowTransitions];
  return allowedTransitions?.includes(newStatus) || false;
}

// Get workflow badge color
export function getWorkflowBadgeColor(status: string): string {
  switch (status) {
    case 'draft':
      return 'default';
    case 'in-review':
      return 'primary';
    case 'approved':
      return 'positive';
    case 'rejected':
      return 'critical';
    case 'published':
      return 'success';
    default:
      return 'default';
  }
}

// Workflow notifications (stub for future implementation)
export async function sendWorkflowNotification(
  documentId: string,
  documentType: string,
  newStatus: string,
  assignedTo?: string
) {
  // TODO: Implement email/Slack notifications
  console.log(`Workflow notification: ${documentType} ${documentId} moved to ${newStatus}`);
  if (assignedTo) {
    console.log(`Assigned to: ${assignedTo}`);
  }
}
