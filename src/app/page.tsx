import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  Grid,
  Card,
  Tag,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Projects } from "@/components/work/Projects";
//import { CertificationCard } from "@/components/certifications/CertificationCard";
import { GitHubCalendar } from "@/components/GitHubCalendar";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  // Get latest 3 certifications (you'll need to sort by date)
  const latestCertifications = [
    // This will be populated from your certifications data
    // For now, showing structure
  ];

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero Section */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {/* Avatar and Name */}
          <RevealFx fillWidth horizontal="center" paddingBottom="16">
            <Avatar src={person.avatar} size="xl" />
          </RevealFx>

          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="8">
            <Heading wrap="balance" variant="display-strong-l" align="center">
              {person.name}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.1} fillWidth horizontal="center" paddingBottom="16">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              {person.role}
            </Text>
          </RevealFx>

          {/* Location and Languages */}
          <RevealFx delay={0.2} fillWidth horizontal="center" paddingBottom="24">
            <Row gap="16" wrap horizontal="center">
              <Row gap="8" vertical="center">
                <Text variant="label-default-s" onBackground="brand-weak">📍</Text>
                <Text variant="label-default-s">{person.location}</Text>
              </Row>
              {person.languages && person.languages.length > 0 && (
                <Row gap="8">
                  {person.languages.map((language, index) => (
                    <Tag key={index} size="m">
                      {language}
                    </Tag>
                  ))}
                </Row>
              )}
            </Row>
          </RevealFx>

          {/* Introduction */}
          <RevealFx translateY="8" delay={0.3} fillWidth horizontal="center" paddingBottom="32">
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="body-default-l"
              align="center"
              style={{ maxWidth: '600px' }}
            >
              {about.intro.description}
            </Text>
          </RevealFx>

          {/* CTA Buttons */}
          <RevealFx paddingTop="12" delay={0.4} horizontal="center">
            <Row gap="12" wrap horizontal="center">
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="primary"
                size="m"
                arrowIcon
              >
                About Me
              </Button>
              <Button
                data-border="rounded"
                href="/work"
                variant="secondary"
                size="m"
                prefixIcon="grid"
              >
                View Projects
              </Button>
              <Button
                data-border="rounded"
                href={`mailto:${person.email}`}
                variant="secondary"
                size="m"
                prefixIcon="email"
              >
                Contact
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* Divider */}
      <RevealFx delay={0.5}>
        <Line maxWidth="40" />
      </RevealFx>

      {/* Skills Section */}
      <RevealFx translateY="16" delay={0.6}>
        <Column fillWidth gap="m" horizontal="center">
          <Heading as="h2" variant="heading-strong-xl" align="center">
            Technical Skills
          </Heading>
          <Grid columns="3" gap="16" fillWidth>
            {about.technical.skills.slice(0, 3).map((skill, index) => (
              <Card
                key={index}
                padding="l"
                radius="m"
                border="neutral-alpha-weak"
                background="surface"
              >
                <Column gap="8">
                  <Text variant="heading-strong-m">{skill.title}</Text>
                  {skill.description && (
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                  )}
                  {skill.tags && skill.tags.length > 0 && (
                    <Row wrap gap="8" paddingTop="8">
                      {skill.tags.map((tag, tagIndex) => (
                        <Tag key={tagIndex} size="s">
                          {tag.name}
                        </Tag>
                      ))}
                    </Row>
                  )}
                </Column>
              </Card>
            ))}
          </Grid>
        </Column>
      </RevealFx>

      {/* Latest Certifications */}
      <RevealFx translateY="16" delay={0.7}>
        <Column fillWidth gap="m" horizontal="center">
          <Row fillWidth horizontal="between" vertical="center">
            <Heading as="h2" variant="heading-strong-xl">
              Latest Certifications
            </Heading>
            <Button
              href="/certifications"
              variant="tertiary"
              size="s"
              suffixIcon="arrowRight"
            >
              View All
            </Button>
          </Row>
          <Grid columns="3" gap="16" fillWidth>
            {/* This will render your latest 3 certifications */}
            {/* <CertificationCard /> components will go here */}
            <Card padding="l" radius="m" border="neutral-alpha-weak" background="surface">
              <Column gap="12">
                <Text variant="heading-strong-m">Coming Soon</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Your certifications will be displayed here
                </Text>
              </Column>
            </Card>
          </Grid>
        </Column>
      </RevealFx>

      {/* GitHub Contributions */}
      <RevealFx translateY="16" delay={0.8}>
        <Column fillWidth gap="m" horizontal="center">
          <Heading as="h2" variant="heading-strong-xl" align="center">
            GitHub Contributions
          </Heading>
          <GitHubCalendar />
        </Column>
      </RevealFx>
    </Column>
  );
}