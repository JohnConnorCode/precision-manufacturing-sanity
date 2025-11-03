'use client';

import { useCallback } from 'react';
import { StringInputProps, set, unset } from 'sanity';
import { Stack, Text, TextInput, Flex, Card } from '@sanity/ui';

const PRESET_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Green', value: '#10B981' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Slate', value: '#64748B' },
  { name: 'Gray', value: '#6B7280' },
];

export function ColorPicker(props: StringInputProps) {
  const { elementProps, onChange, value = '' } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange]
  );

  const selectColor = useCallback(
    (color: string) => {
      onChange(set(color));
    },
    [onChange]
  );

  return (
    <Stack space={3}>
      <TextInput
        {...elementProps}
        onChange={handleChange}
        value={value}
        placeholder="#000000"
      />

      {value && (
        <Card
          padding={4}
          radius={2}
          style={{ backgroundColor: value }}
        >
          <Text style={{ color: '#fff', mixBlendMode: 'difference' }}>
            {value}
          </Text>
        </Card>
      )}

      <Stack space={2}>
        <Text size={1} weight="semibold">Quick Pick:</Text>
        <Flex wrap="wrap" gap={2}>
          {PRESET_COLORS.map((color) => (
            <Card
              key={color.value}
              padding={3}
              radius={2}
              style={{
                backgroundColor: color.value,
                cursor: 'pointer',
                border: value === color.value ? '2px solid #000' : 'none',
              }}
              onClick={() => selectColor(color.value)}
              title={color.name}
            >
              <Text size={1} style={{ color: '#fff', mixBlendMode: 'difference' }}>
                {color.name}
              </Text>
            </Card>
          ))}
        </Flex>
      </Stack>
    </Stack>
  );
}
