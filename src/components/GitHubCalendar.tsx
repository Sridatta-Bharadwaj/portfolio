"use client";

import React from 'react';
import { Column, Card } from "@once-ui-system/core";

interface GitHubCalendarProps {
  username: string;
  colorScheme?: 'light' | 'dark';
}

export const GitHubCalendar: React.FC<GitHubCalendarProps> = ({ 
  username,
  colorScheme = 'dark'
}) => {
  return (
    <Card
      fillWidth
      padding="l"
      radius="m"
      border="neutral-alpha-weak"
      background="surface"
      style={{
        overflow: 'hidden'
      }}
    >
      <Column fillWidth horizontal="center">
        <img
          src={`https://ghchart.rshah.org/${colorScheme === 'dark' ? '1f2937' : 'ffffff'}/${username}`}
          alt={`${username}'s GitHub Contribution Graph`}
          style={{
            width: '100%',
            maxWidth: '900px',
            height: 'auto',
            imageRendering: '-webkit-optimize-contrast',
          }}
        />
      </Column>
    </Card>
  );
};