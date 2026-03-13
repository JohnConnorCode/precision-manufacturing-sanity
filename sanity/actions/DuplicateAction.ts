import { DocumentActionComponent, useClient } from 'sanity';
import { CopyIcon } from '@sanity/icons';

export const DuplicateAction: DocumentActionComponent = (props) => {
  const { draft, published, onComplete } = props;
  const client = useClient({ apiVersion: '2024-01-01' });

  return {
    label: 'Duplicate',
    icon: CopyIcon,
    onHandle: async () => {
      const doc = draft || published;
      if (!doc) return;

      const { _id, _rev, _createdAt, _updatedAt, ...rest } = doc as Record<string, unknown>;

      await client.create({
        ...rest,
        _type: rest._type as string,
        title: `${(rest.title as string) || 'Untitled'} (Copy)`,
      });

      onComplete();
    },
  };
};
