import { JobListing, MentorshipProgram, Event, Resource } from '@shared/types';

export const fallbackJobListings: JobListing[] = [
  {
    id: "job-1",
    title: "Senior Full Stack Developer",
    company: "TechVision Inc.",
    location: "Bangalore (Hybrid)",
    workArrangement: "Remote",
    jobType: "Full-time",
    description: "Build and maintain scalable web applications with React, Node.js, and AWS. Flexible work hours and 3 days WFH per week.",
    requirements: [
      "5+ years of experience with full stack development",
      "Proficiency in React, Node.js, and AWS",
      "Experience with CI/CD pipelines"
    ],
    salary: {
      min: 1800000,
      max: 2500000,
      currency: "INR"
    },
    postedDate: "2023-07-15"
  },
  {
    id: "job-2",
    title: "Frontend Developer",
    company: "WomenInTech Solutions",
    location: "Any Location",
    workArrangement: "Remote",
    jobType: "Part-time",
    description: "Create responsive web interfaces using React and modern CSS. Fully remote with flexible hours, ideal for working parents.",
    requirements: [
      "3+ years of experience with frontend development",
      "Proficiency in React, HTML5, CSS3",
      "Experience with UI/UX design principles"
    ],
    salary: {
      min: 1200000,
      max: 1800000,
      currency: "INR"
    },
    postedDate: "2023-07-18",
    applicationUrl: "https://womenintech.com/careers"
  },
  {
    id: "job-3",
    title: "DevOps Engineer",
    company: "CloudNative Systems",
    location: "Mumbai",
    workArrangement: "Hybrid",
    jobType: "Full-time",
    description: "Implement and manage CI/CD pipelines, Kubernetes clusters, and cloud infrastructure on AWS and GCP. 2 days remote per week.",
    requirements: [
      "4+ years of experience with DevOps",
      "Proficiency in Kubernetes, Docker, Terraform",
      "AWS or GCP certification preferred"
    ],
    salary: {
      min: 1600000,
      max: 2200000,
      currency: "INR"
    },
    postedDate: "2023-07-10"
  },
  {
    id: "job-4",
    title: "Data Scientist",
    company: "Analytix Labs",
    location: "Pune",
    workArrangement: "Remote",
    jobType: "Full-time",
    description: "Develop and implement machine learning models to solve complex business problems. Fully remote position with flexible hours.",
    requirements: [
      "3+ years of experience in data science",
      "Proficiency in Python, Pandas, Scikit-learn",
      "Experience with deep learning frameworks a plus"
    ],
    salary: {
      min: 1500000,
      max: 2200000,
      currency: "INR"
    },
    postedDate: "2023-07-20"
  },
  {
    id: "job-5",
    title: "UX/UI Designer",
    company: "DesignFirst Creative",
    location: "Bangalore",
    workArrangement: "Hybrid",
    jobType: "Full-time",
    description: "Create intuitive user experiences and visually appealing interfaces for web and mobile applications. 3 days remote per week.",
    requirements: [
      "4+ years of experience in UX/UI design",
      "Proficiency in Figma, Adobe XD",
      "Portfolio showcasing user-centered design process"
    ],
    salary: {
      min: 1400000,
      max: 2000000,
      currency: "INR"
    },
    postedDate: "2023-07-12"
  }
];

export const fallbackMentorshipPrograms: MentorshipProgram[] = [
  {
    id: "mentorship-1",
    title: "TechWomen Leadership Program",
    status: "Applications Open",
    startDate: "August 15, 2023",
    duration: "3 months",
    description: "Connects emerging women leaders in tech with mentors from leading companies in Silicon Valley and the Bay Area.",
    learnMoreUrl: "https://techwomen.org/leadership",
    applyUrl: "https://techwomen.org/leadership/apply"
  },
  {
    id: "mentorship-2",
    title: "Women in Engineering Mentorship",
    status: "Coming Soon",
    startDate: "September 10, 2023",
    duration: "6 months",
    description: "Pairs mid-career engineers with senior leaders to accelerate career growth and overcome gender-specific challenges.",
    learnMoreUrl: "https://womeninengineering.org/mentorship"
  },
  {
    id: "mentorship-3",
    title: "Coding Sisters Program",
    status: "Applications Open",
    startDate: "August 1, 2023",
    duration: "4 months",
    description: "Mentorship for women beginning their software development careers, with emphasis on practical coding skills and career navigation.",
    learnMoreUrl: "https://codingsisters.org",
    applyUrl: "https://codingsisters.org/apply"
  },
  {
    id: "mentorship-4",
    title: "Executive Leadership for Women in Tech",
    status: "Coming Soon",
    startDate: "October 5, 2023",
    duration: "12 months",
    description: "High-level mentorship program designed for women aiming for C-suite positions in technology companies.",
    learnMoreUrl: "https://executivewomenintech.org"
  }
];

export const fallbackEvents: Event[] = [
  {
    id: "event-1",
    title: "Women in Data Science Conference",
    type: "Conference",
    date: "2023-08-25",
    time: "09:00-17:00",
    location: "Hyderabad International Convention Center",
    description: "Annual conference focusing on the latest trends in data science, with speakers from leading technology companies and research institutions.",
    registerUrl: "https://widsconference.org/register"
  },
  {
    id: "event-2",
    title: "Tech Resume Workshop",
    type: "Workshop",
    date: "2023-08-10",
    time: "14:00-16:00",
    location: "Online",
    description: "Learn how to craft an effective technical resume that highlights your skills and experiences. Includes resume review session.",
    registerUrl: "https://techresume.org/workshop"
  },
  {
    id: "event-3",
    title: "Leadership Skills for Women in Tech",
    type: "Seminar",
    date: "2023-09-05",
    time: "10:00-12:00",
    location: "Taj Bangalore",
    description: "Interactive seminar focused on developing leadership skills specific to navigating technology careers as a woman.",
    registerUrl: "https://womenleaders.tech/seminar"
  },
  {
    id: "event-4",
    title: "Negotiation Strategies Workshop",
    type: "Workshop",
    date: "2023-08-18",
    time: "15:00-17:00",
    location: "Online",
    description: "Practical workshop teaching effective negotiation strategies for job offers, promotions, and workplace opportunities.",
    registerUrl: "https://negotiationskills.org/workshop"
  }
];

export const fallbackResources: Resource[] = [
  {
    id: "resource-1",
    title: "Women in Tech Career Guide",
    type: "Article",
    description: "Comprehensive guide to navigating a successful career in technology as a woman, including challenges and strategies.",
    url: "https://careersforwomen.org/tech-guide"
  },
  {
    id: "resource-2",
    title: "Technical Interview Preparation",
    type: "Video",
    description: "Video series covering common technical interview questions and effective response strategies.",
    url: "https://techinterviews.org/prepare"
  },
  {
    id: "resource-3",
    title: "Salary Negotiation for Women",
    type: "Article",
    description: "Guidelines specifically for women on how to effectively negotiate salary and benefits in the tech industry.",
    url: "https://womenintech.org/salary-negotiation"
  },
  {
    id: "resource-4",
    title: "Building a Tech Career After a Break",
    type: "Course",
    description: "Online course designed for women returning to tech careers after a break, including skill refreshers and job search strategies.",
    url: "https://returntotech.org/course"
  }
];
