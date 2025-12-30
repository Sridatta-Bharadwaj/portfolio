import { Column, Heading, Meta, Schema, Text, Button, Row } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingY="24" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Header */}
      <Column fillWidth gap="m" horizontal="center" align="center" paddingY="xl">
        <Heading variant="display-strong-xl" align="center">
          Projects
        </Heading>
        <Text 
          variant="body-default-l" 
          onBackground="neutral-weak" 
          align="center"
          wrap="balance"
          style={{ maxWidth: '600px' }}
        >
          Coming soon! I'm currently working on exciting projects that will be showcased here.
        </Text>
      </Column>

      {/* Empty State with Illustration */}
      <Column 
        fillWidth 
        horizontal="center" 
        align="center" 
        gap="l"
        paddingY="xl"
        style={{ minHeight: '400px' }}
      >
        <div style={{
          fontSize: '120px',
          opacity: 0.3,
          filter: 'grayscale(100%)',
        }}>
          🚧
        </div>
        
        <Column gap="m" horizontal="center" align="center">
          <Heading variant="heading-strong-l" align="center">
            Under Construction
          </Heading>
          <Text 
            variant="body-default-m" 
            onBackground="neutral-weak" 
            align="center"
            style={{ maxWidth: '400px' }}
          >
            I'm working on some amazing projects. Check back soon to see what I've been building!
          </Text>
        </Column>

        {/* CTA Buttons */}
        <Row gap="12" paddingTop="l">
          <Button
            href="/"
            variant="secondary"
            size="m"
            prefixIcon="home"
          >
            Go Home
          </Button>
          <Button
            href="/about"
            variant="secondary"
            size="m"
            prefixIcon="person"
          >
            Learn More About Me
          </Button>
        </Row>
      </Column>
    </Column>
  );
}