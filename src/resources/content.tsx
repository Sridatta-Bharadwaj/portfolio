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
  label: "Projects",
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
      title: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      issueDate: "2026-01",
      credentialId: "6956cafba420c936fa858634",
      link: "https://badges.parchment.com/public/assertions/BclCb19SQMKOyngs0-C9Zw",
      description: <>Postman API fundamentals and best practices</>,
      image: "/images/certs/postman-badge.png",
    },
    {
      title: "Gemini certified university student",
      issuer: "Google",
      issueDate: "2025-12",
      expiryDate: "2028-12",
      credentialId: "033a967f-e9a8-46a9-9f82-b4f60368c42f?",
      link: "https://edu.google.accredible.com/033a967f-e9a8-46a9-9f82-b4f60368c42f#acc.vKysqmMn",
      description: <>Google Gemini certified university student</>,
      image: "/images/certs/gemini-badge.png",
    },
  ],
};


export { person, social, newsletter, home, work, certifications, skills, studies };
