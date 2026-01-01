"use client";

import { Card, Column, Text, Row, Tag, Button } from "@once-ui-system/core";
import { Certification } from "@/types";
import styles from "./CertificationCard.module.scss";

interface CertificationCardProps {
    cert: Certification;
}

export function CertificationCard({ cert }: CertificationCardProps) {
    return (
        <Card
            className={styles.card}
            padding="l"
            radius="m"
            border="neutral-alpha-weak"
            background="surface"
        >
            <Column gap="12" fillWidth>
                {/* Header with date */}
                <Row fillWidth horizontal="between" vertical="start">
                    <Column gap="4" flex="1">
                        <Text variant="heading-strong-m">{cert.title}</Text>
                        <Text variant="label-default-s" onBackground="brand-weak">
                            {cert.issuer}
                        </Text>
                    </Column>
                    <Text variant="label-default-s" onBackground="neutral-weak">
                        {cert.issueDate}
                    </Text>
                </Row>

                {/* Description */}
                {cert.description && (
                    <Text variant="body-default-s" onBackground="neutral-weak">
                        {cert.description}
                    </Text>
                )}

                {/* Footer with credential and link */}
                {(cert.credentialId || cert.link) && (
                    <Row fillWidth horizontal="between" vertical="center" paddingTop="8">
                        {cert.credentialId && (
                            <Text variant="label-default-s" onBackground="neutral-weak">
                                ID: {cert.credentialId}
                            </Text>
                        )}
                        {cert.link && (
                            <Button
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="tertiary"
                                size="s"
                                suffixIcon="external"
                            >
                                View Credential
                            </Button>
                        )}
                    </Row>
                )}
            </Column>
        </Card>
    );
}
