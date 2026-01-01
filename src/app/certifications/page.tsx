import {
    Column,
    Heading,
    Meta,
    Schema,
    Text,
    Grid,
} from "@once-ui-system/core";
import { baseURL, person, certifications } from "@/resources";
import { CertificationCard } from "@/components/certifications/CertificationCard";

export async function generateMetadata() {
    return Meta.generate({
        title: certifications.title,
        description: certifications.description,
        baseURL: baseURL,
        image: `/api/og/generate?title=${encodeURIComponent(certifications.title)}`,
        path: certifications.path,
    });
}

export default function Certifications() {
    // Sort certifications by date (newest first)
    const sortedCerts = [...certifications.certifications].sort(
        (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
    );

    return (
        <Column maxWidth="m" paddingY="24" gap="xl">
            <Schema
                as="webPage"
                baseURL={baseURL}
                path={certifications.path}
                title={certifications.title}
                description={certifications.description}
                image={`/api/og/generate?title=${encodeURIComponent(certifications.title)}`}
                author={{
                    name: person.name,
                    url: `${baseURL}/`,
                    image: `${baseURL}${person.avatar}`,
                }}
            />

            {/* Header */}
            <Column fillWidth gap="m" horizontal="center" align="center" paddingY="xl">
                <Heading variant="display-strong-xl" align="center">
                    Certifications
                </Heading>
                <Text
                    variant="body-default-l"
                    onBackground="neutral-weak"
                    align="center"
                    wrap="balance"
                    style={{ maxWidth: "600px" }}
                >
                    Professional certifications and credentials I've earned through continuous learning and development.
                </Text>
            </Column>

            {/* Certifications Grid */}
            {sortedCerts.length > 0 ? (
                <Grid columns="2" gap="16" fillWidth s={{ columns: 1 }}>
                    {sortedCerts.map((cert, index) => (
                        <CertificationCard key={index} cert={cert} />
                    ))}
                </Grid>
            ) : (
                <Column
                    fillWidth
                    horizontal="center"
                    vertical="center"
                    gap="m"
                    padding="xl"
                    style={{ minHeight: "200px" }}
                >
                    <Heading variant="heading-default-l" align="center">
                        No certifications yet
                    </Heading>
                    <Text
                        variant="body-default-m"
                        onBackground="neutral-weak"
                        align="center"
                    >
                        Certifications will be displayed here as they are earned.
                    </Text>
                </Column>
            )}
        </Column>
    );
}
