'use client';

import { useCallback } from 'react';
import { StringInputProps, set, unset } from 'sanity';
import { Stack, Text, TextInput, Button } from '@sanity/ui';

export function SlugInput(props: StringInputProps) {
  const { elementProps, onChange, value = '' } = props;
  // Access document with proper type assertion
  const document = (props as any).document;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange]
  );

  const slugify = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }, []);

  const generateSlug = useCallback(() => {
    // Try to get title from document
    const title = document?.title || '';
    if (title) {
      const slug = slugify(title);
      onChange(set(slug));
    }
  }, [document, onChange, slugify]);

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        onChange={handleChange}
        value={value}
        placeholder="URL-friendly slug (e.g., my-awesome-service)"
      />
      <Button
        tone="primary"
        text="Generate from Title"
        onClick={generateSlug}
        mode="ghost"
        fontSize={1}
      />
      {value && (
        <Text size={1} muted>
          Preview: /{value}
        </Text>
      )}
    </Stack>
  );
}
