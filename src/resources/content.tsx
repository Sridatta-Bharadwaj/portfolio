import { Blog, Gallery, Home, Newsletter, Person, Social, Work, Certifications } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Sridatta",
  lastName: "Bharadwaj Parupudi",
  name: `Sridatta Bharadwaj Parupudi`,
  role: "Student",
  avatar: "/images/gallery/avatar3.png",
  email: "sridatta.bharadwaj2006@gmail.com",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Telugu", "Hindi"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Sridatta-Bharadwaj",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/sridatta-bharadwaj-p-730147327/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/sridatta_07/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} | Portfolio`,
  description: `Personal portfolio showcasing projects, skills, and learning journey in computer science and software development.`,
  headline: <>Turning ideas into clean digital experiences</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured Project</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Selected work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm Sridatta Bharadwaj, a Computer Science student passionate about
      problem-solving, design, and building practical software.
    </>
  ),
};


// Technical skills and studies data (displayed on home page)
const skills = [
  {
    title: "Python",
    description: (
      <>Skilled in Python for algorithms, data structures, and problem-solving.</>
    ),
    tags: [
      {
        name: "Python",
        icon: "python",
      },
    ],
  },
  {
    title: "HTML",
    description: (
      <>Proficient in semantic HTML markup and web structure.</>
    ),
    tags: [
      {
        name: "HTML",
        icon: "html",
      },
    ],
  },
  {
    title: "CSS",
    description: (
      <>Expert in styling with CSS3, responsive design, and animations.</>
    ),
    tags: [
      {
        name: "CSS",
        icon: "css",
      },
    ],
  },
];

const studies = [
  {
    name: "Amrita Vishwa Vidyapeetham",
    description: <>Persued my B.tech in CSE with Minor in AI&ML.</>,
  },
  {
    name: "Sri Vasistha Jr College",
    description: <>Studied Intermediate or class 11 and class 12.</>,
  },
  {
    name: "Matrusri DAV Public School",
    description: <>Studied class 1 - class 10.</>,
  },
];


const work: Work = {
  path: "/work",
  label: "projects",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};


const certifications: Certifications = {
  path: "/certifications",
  label: "Certifications",
  title: `Certifications – ${person.name}`,
  description: `Professional certifications and credentials earned by ${person.name}`,
  certifications: [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueDate: "2024-12",
      credentialId: "CERT-123456",
      link: "https://aws.amazon.com",
      description: <>Cloud computing fundamentals and AWS services</>,
      image: "/images/certs/aws-badge.png",
    },
    {
      title: "Google Cloud Associate Cloud Engineer",
      issuer: "Google Cloud",
      issueDate: "2024-11",
      credentialId: "CERT-234567",
      link: "https://cloud.google.com",
      description: <>Google Cloud infrastructure and deployment</>,
      image: "/images/certs/gcp-badge.png",
    },
    {
      title: "Azure Fundamentals",
      issuer: "Microsoft",
      issueDate: "2024-10",
      credentialId: "CERT-345678",
      link: "https://microsoft.com",
      description: <>Microsoft Azure cloud platform basics</>,
      image: "/images/certs/azure-badge.png",
    },
    {
      title: "Full Stack Web Development",
      issuer: "Coursera",
      issueDate: "2024-09",
      credentialId: "CERT-456789",
      description: <>Frontend and backend web development technologies</>,
    },
    {
      title: "React Advanced Patterns",
      issuer: "Frontend Masters",
      issueDate: "2024-08",
      credentialId: "CERT-567890",
      description: <>Advanced React patterns and best practices</>,
    },
  ],
};


export { person, social, newsletter, home, work, certifications, skills, studies };
