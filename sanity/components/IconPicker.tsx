'use client';

import React, { useState, useMemo } from 'react';
import { StringInputProps, set, unset } from 'sanity';
import { TextInput, Button, Card, Grid, Box, Text, Flex, Stack } from '@sanity/ui';
import * as Icons from 'lucide-react';

// List of commonly used icons for manufacturing/industrial sites
const COMMON_ICONS = [
  'Cog', 'Settings', 'Wrench', 'Hammer', 'Factory',
  'Box', 'Package', 'Truck', 'Plane', 'Ship',
  'Zap', 'Wind', 'Droplet', 'Flame', 'Battery',
  'Shield', 'Lock', 'Award', 'CheckCircle', 'Star',
  'Target', 'Crosshair', 'Radio', 'Cpu', 'Server',
  'FileText', 'ClipboardList', 'BarChart', 'TrendingUp', 'Activity',
  'Users', 'User', 'Building', 'Home', 'MapPin',
  'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Plus',
  'Minus', 'X', 'Check', 'Info', 'AlertCircle',
  'Circle', 'Square', 'Triangle', 'Hexagon', 'Layers'
];

// Get all available Lucide icons
const ALL_ICONS = Object.keys(Icons).filter(
  (key) => key !== 'createLucideIcon' && typeof (Icons as any)[key] === 'function'
);

export default function IconPicker(props: StringInputProps) {
  const { value, onChange, elementProps } = props;
  const [showPicker, setShowPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter icons based on search
  const filteredIcons = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return COMMON_ICONS;

    return ALL_ICONS.filter(icon =>
      icon.toLowerCase().includes(query)
    ).slice(0, 50); // Limit to 50 results
  }, [searchQuery]);

  const handleIconSelect = (iconName: string) => {
    onChange(set(iconName));
    setShowPicker(false);
    setSearchQuery('');
  };

  const handleClear = () => {
    onChange(unset());
    setShowPicker(false);
  };

  const IconComponent = value ? (Icons as any)[value] : null;

  return (
    <Stack space={3}>
      <Flex gap={2}>
        <Box flex={1}>
          <TextInput
            {...elementProps}
            value={value || ''}
            onChange={(event) => onChange(set(event.currentTarget.value))}
            placeholder="Enter icon name or click to select"
          />
        </Box>
        <Button
          mode="ghost"
          tone="primary"
          text={showPicker ? 'Hide Picker' : 'Select Icon'}
          onClick={() => setShowPicker(!showPicker)}
        />
        {value && (
          <Button
            mode="ghost"
            tone="critical"
            text="Clear"
            onClick={handleClear}
          />
        )}
      </Flex>

      {/* Current Icon Preview */}
      {value && IconComponent && (
        <Card padding={3} border radius={2}>
          <Flex align="center" gap={3}>
            <IconComponent size={24} />
            <Text size={1} muted>
              Current: <strong>{value}</strong>
            </Text>
          </Flex>
        </Card>
      )}

      {/* Icon Picker */}
      {showPicker && (
        <Card padding={3} border radius={2} shadow={1}>
          <Stack space={3}>
            <TextInput
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
            />

            <Text size={1} muted>
              {searchQuery ? `Found ${filteredIcons.length} icons` : `Showing ${COMMON_ICONS.length} common icons`}
            </Text>

            <Box style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Grid columns={[4, 6, 8]} gap={2}>
                {filteredIcons.map((iconName) => {
                  const Icon = (Icons as any)[iconName];
                  if (!Icon) return null;

                  const isSelected = value === iconName;

                  return (
                    <Button
                      key={iconName}
                      mode="ghost"
                      tone={isSelected ? 'primary' : 'default'}
                      onClick={() => handleIconSelect(iconName)}
                      style={{
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        minHeight: '80px',
                        border: isSelected ? '2px solid var(--card-focus-ring-color)' : undefined,
                      }}
                      title={iconName}
                    >
                      <Icon size={24} />
                      <Text size={0} style={{ fontSize: '10px', textAlign: 'center', wordBreak: 'break-word' }}>
                        {iconName}
                      </Text>
                    </Button>
                  );
                })}
              </Grid>
            </Box>

            {searchQuery && filteredIcons.length > 50 && (
              <Text size={1} muted align="center">
                Showing first 50 results. Refine your search to see more.
              </Text>
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
