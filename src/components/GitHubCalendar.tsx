"use client";

import React, { useEffect, useState } from 'react';
import { Column, Card, Heading } from "@once-ui-system/core";

export const GitHubCalendar: React.FC = () => {
    const username = "Sridatta-Bharadwaj";
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check if dark mode is enabled
        const root = document.documentElement;
        const theme = root.getAttribute('data-theme');
        setIsDark(theme === 'dark');

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            const newTheme = root.getAttribute('data-theme');
            setIsDark(newTheme === 'dark');
        });

        observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

        return () => observer.disconnect();
    }, []);

    // GitHub's green color for contribution graph
    const githubColor = '26a641';

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
            <Column fillWidth horizontal="center" gap="m">
                <Heading variant="heading-strong-l" align="center">
                    @{username}'s GitHub Contributions
                </Heading>
                <div className="github-calendar-container" style={{
                    width: '100%',
                    maxWidth: '900px',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: '#000000',
                    border: '1px solid #1a1a1a',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <img
                        src={`https://ghchart.rshah.org/${githubColor}/${username}`}
                        alt={`${username}'s GitHub Contribution Graph`}
                        style={{
                            width: '100%',
                            height: 'auto',
                            imageRendering: '-webkit-optimize-contrast',
                            filter: 'invert(1) hue-rotate(180deg)',
                        }}
                    />
                </div>
            </Column>
        </Card>
    );
};