import { DocumentActionComponent } from 'sanity';
import { PublishIcon, UnpublishIcon, TrashIcon } from '@sanity/icons';

// Bulk Publish Action
export const BulkPublishAction: DocumentActionComponent = (props) => {
  return {
    label: 'Publish',
    icon: PublishIcon,
    tone: 'positive',
    onHandle: () => {
      // Implementation would use Sanity client to publish
      console.log('Bulk publishing documents');
      props.onComplete();
    },
  };
};

// Bulk Unpublish Action
export const BulkUnpublishAction: DocumentActionComponent = (props) => {
  return {
    label: 'Unpublish',
    icon: UnpublishIcon,
    tone: 'caution',
    onHandle: () => {
      // Implementation would use Sanity client to unpublish
      console.log('Bulk unpublishing documents');
      props.onComplete();
    },
  };
};

// Bulk Delete Action
export const BulkDeleteAction: DocumentActionComponent = (props) => {
  return {
    label: 'Delete',
    icon: TrashIcon,
    tone: 'critical',
    onHandle: () => {
      // Implementation would use Sanity client to delete
      if (confirm('Are you sure you want to delete selected documents? This cannot be undone.')) {
        console.log('Bulk deleting documents');
        props.onComplete();
      }
    },
  };
};
