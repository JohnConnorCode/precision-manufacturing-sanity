'use client';

import { Badge, Card, Flex, Stack, Text } from '@sanity/ui';
import { CheckmarkCircleIcon, ClockIcon, WarningOutlineIcon } from '@sanity/icons';

interface StatusBadgeProps {
  status: 'published' | 'draft' | 'scheduled';
  publishedAt?: string;
  scheduledAt?: string;
}

export function StatusBadge({ status, publishedAt, scheduledAt }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'published':
        return {
          icon: CheckmarkCircleIcon,
          color: 'positive',
          text: 'Published',
          subtitle: publishedAt ? `Published ${new Date(publishedAt).toLocaleDateString()}` : undefined,
        };
      case 'draft':
        return {
          icon: WarningOutlineIcon,
          color: 'caution',
          text: 'Draft',
          subtitle: 'Not published yet',
        };
      case 'scheduled':
        return {
          icon: ClockIcon,
          color: 'primary',
          text: 'Scheduled',
          subtitle: scheduledAt ? `Scheduled for ${new Date(scheduledAt).toLocaleDateString()}` : undefined,
        };
      default:
        return {
          icon: WarningOutlineIcon,
          color: 'default',
          text: 'Unknown',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card padding={3} radius={2} tone={config.color as any}>
      <Flex align="center" gap={2}>
        <Icon />
        <Stack space={1}>
          <Text size={1} weight="semibold">
            {config.text}
          </Text>
          {config.subtitle && (
            <Text size={0} muted>
              {config.subtitle}
            </Text>
          )}
        </Stack>
      </Flex>
    </Card>
  );
}
