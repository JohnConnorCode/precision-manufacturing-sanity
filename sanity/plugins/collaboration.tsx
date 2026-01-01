import { definePlugin } from 'sanity';

/**
 * Real-Time Collaboration Plugin
 * Enables presence indicators and collaborative editing
 */

export const collaboration = definePlugin({
  name: 'collaboration',
});

// Presence configuration
export const presenceConfig = {
  enabled: true,

  // Show user avatars and cursors
  showPresence: true,

  // Enable comments and discussions
  enableComments: true,

  // Maximum users shown in presence indicator
  maxPresenceUsers: 10,
};

// Collaborative features
export const collaborativeFeatures = {
  // Document locking
  documentLocking: {
    enabled: true,
    timeout: 300000, // 5 minutes
    warningThreshold: 60000, // 1 minute warning
  },

  // Real-time updates
  realtime: {
    enabled: true,
    throttle: 1000, // 1 second
    conflictResolution: 'last-write-wins',
  },

  // Comments and annotations
  comments: {
    enabled: true,
    allowThreads: true,
    allowReactions: true,
    allowMentions: true,
  },

  // Change tracking
  changeTracking: {
    enabled: true,
    showInline: true,
    highlightDuration: 3000, // 3 seconds
  },
};

// Collaboration utilities
export const collaborationUtils = {
  // Get active users on a document
  async getActiveUsers(client: any, documentId: string) {
    // This would integrate with Sanity's presence API
    return await client.fetch(
      `*[_type == "system.presence" && documentId == $documentId]{
        userId,
        userName,
        userAvatar,
        lastSeen,
        currentField
      }`,
      { documentId }
    );
  },

  // Lock a document for editing
  async lockDocument(client: any, documentId: string, userId: string) {
    const lockId = `lock.${documentId}`;

    try {
      await client.create({
        _id: lockId,
        _type: 'documentLock',
        documentId,
        lockedBy: userId,
        lockedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 300000).toISOString(), // 5 minutes
      });
      return true;
    } catch (_error) {
      // Lock already exists
      return false;
    }
  },

  // Release document lock
  async unlockDocument(client: any, documentId: string) {
    const lockId = `lock.${documentId}`;

    try {
      await client.delete(lockId);
      return true;
    } catch (_error) {
      return false;
    }
  },

  // Add a comment to a document
  async addComment(
    client: any,
    documentId: string,
    userId: string,
    comment: string,
    field?: string
  ) {
    await client.create({
      _type: 'comment',
      documentId,
      documentRef: { _type: 'reference', _ref: documentId },
      userId,
      comment,
      field,
      createdAt: new Date().toISOString(),
      resolved: false,
    });
  },

  // Get comments for a document
  async getComments(client: any, documentId: string) {
    return await client.fetch(
      `*[_type == "comment" && documentId == $documentId && !resolved] | order(createdAt desc)`,
      { documentId }
    );
  },

  // Resolve a comment
  async resolveComment(client: any, commentId: string) {
    await client.patch(commentId).set({ resolved: true }).commit();
  },
};

// Activity feed
export const activityFeed = {
  // Get recent activity for a document
  async getDocumentActivity(client: any, documentId: string, limit: number = 20) {
    return await client.fetch(
      `*[_type in ["transaction", "comment", "documentLock"] && documentId == $documentId] | order(_createdAt desc) [0...$limit]`,
      { documentId, limit }
    );
  },

  // Get team activity
  async getTeamActivity(client: any, limit: number = 50) {
    return await client.fetch(
      `*[_type in ["service", "industry", "resource", "teamMember"]] | order(_updatedAt desc) [0...$limit] {
        _id,
        _type,
        title,
        _updatedAt,
        "updatedBy": *[_type == "transaction" && references(^._id)] | order(_createdAt desc) [0].author
      }`,
      { limit }
    );
  },
};

// Notification system
export const notificationSystem = {
  notificationTypes: [
    'mention',
    'comment',
    'documentShared',
    'documentPublished',
    'approvalRequired',
    'approvalGranted',
    'approvalDenied',
  ],

  // Create a notification
  async createNotification(
    client: any,
    userId: string,
    type: string,
    title: string,
    message: string,
    documentId?: string
  ) {
    await client.create({
      _type: 'notification',
      userId,
      type,
      title,
      message,
      documentId,
      documentRef: documentId ? { _type: 'reference', _ref: documentId } : undefined,
      read: false,
      createdAt: new Date().toISOString(),
    });
  },

  // Get unread notifications
  async getUnreadNotifications(client: any, userId: string) {
    return await client.fetch(
      `*[_type == "notification" && userId == $userId && !read] | order(createdAt desc)`,
      { userId }
    );
  },

  // Mark notification as read
  async markAsRead(client: any, notificationId: string) {
    await client.patch(notificationId).set({ read: true }).commit();
  },
};
