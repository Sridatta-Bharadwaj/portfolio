"use client";

import {
  AvatarGroup,
  Card,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  const backgroundImage = images?.[0];

  return (
    <Card
      className={styles.projectCard}
      as="div"
      radius="m"
      border="neutral-alpha-weak"
      padding="l"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {backgroundImage && <div className={styles.overlay} />}
      
      <Column className={styles.content} fillWidth gap="m">
        {title && (
          <Heading as="h2" wrap="balance" variant="heading-strong-l" style={{ color: "white" }}>
            {title}
          </Heading>
        )}
        
        {description?.trim() && (
          <Text wrap="balance" variant="body-default-s" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
            {description}
          </Text>
        )}
        
        {(avatars?.length > 0 || content?.trim() || link) && (
          <Column gap="12" paddingTop="8">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            
            <Flex gap="16" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s" style={{ color: "white" }}>
                    Read case study
                  </Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s" style={{ color: "white" }}>
                    View project
                  </Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Column>
    </Card>
  );
};
