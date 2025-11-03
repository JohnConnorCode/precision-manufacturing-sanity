import { DocumentActionComponent } from 'sanity';
import { CopyIcon } from '@sanity/icons';

export const DuplicateAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;

  return {
    label: 'Duplicate',
    icon: CopyIcon,
    onHandle: async () => {
      const doc = draft || published;
      if (!doc) return;

      const newId = `${id}-copy-${Date.now()}`;
      const { _id, _type, _rev, _createdAt, _updatedAt, ...docData } = doc as any;

      // Create duplicate with new ID
      const duplicateDoc = {
        ...docData,
        _id: `drafts.${newId}`,
        _type,
        title: `${docData.title} (Copy)`,
      };

      // Note: You'll need to implement the actual duplication logic
      // This requires access to the Sanity client
      console.log('Duplicate document:', duplicateDoc);

      onComplete();
    },
  };
};
