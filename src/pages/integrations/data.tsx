
import { 
  GraduationCap, Mail, Calendar, CheckCircle, Users, DollarSign, FolderOpen, 
  BookOpen, BarChart2, Zap, Brain, Monitor
} from "lucide-react";
import { IntegrationCategory } from "./types";

export const integrationCategories: IntegrationCategory[] = [
  {
    id: "lms",
    title: "Learning Management Systems",
    icon: <GraduationCap className="h-5 w-5" />,
    description: "Connect to popular learning platforms to manage courses, assignments, and student data.",
    integrations: [
      { id: "canvas", name: "Canvas", isAvailable: true, description: "Integrate with Canvas LMS for seamless course and assignment management." },
      { id: "blackboard", name: "Blackboard", isAvailable: false, description: "Coming soon: Connect with Blackboard to manage courses and student data." },
      { id: "moodle", name: "Moodle", isAvailable: true, description: "Synchronize with Moodle to manage your courses and educational resources." },
      { id: "google-classroom", name: "Google Classroom", isAvailable: false, description: "Coming soon: Connect with Google Classroom for assignment and course integration." }
    ]
  },
  {
    id: "communication",
    title: "Communication & Collaboration",
    icon: <Mail className="h-5 w-5" />,
    description: "Connect to email, messaging, and team collaboration tools to streamline communication.",
    integrations: [
      { id: "gmail", name: "Gmail", isAvailable: true, description: "Send automated emails and notifications through Gmail." },
      { id: "outlook", name: "Outlook", isAvailable: false, description: "Coming soon: Connect with Outlook for email integration." },
      { id: "slack", name: "Slack", isAvailable: true, description: "Send notifications and updates to Slack channels." },
      { id: "teams", name: "Microsoft Teams", isAvailable: false, description: "Coming soon: Connect with Microsoft Teams for chat and collaboration." },
      { id: "zoom", name: "Zoom", isAvailable: true, description: "Schedule and manage Zoom meetings automatically." },
      { id: "google-meet", name: "Google Meet", isAvailable: false, description: "Coming soon: Integrate with Google Meet for video conferencing." },
      { id: "discord", name: "Discord", isAvailable: false, description: "Coming soon: Connect with Discord for community engagement." }
    ]
  },
  {
    id: "scheduling",
    title: "Scheduling & Calendar",
    icon: <Calendar className="h-5 w-5" />,
    description: "Integrate with calendar systems to manage scheduling and time-based events.",
    integrations: [
      { id: "google-calendar", name: "Google Calendar", isAvailable: true, description: "Sync events with Google Calendar to manage schedules." },
      { id: "outlook-calendar", name: "Microsoft Outlook Calendar", isAvailable: false, description: "Coming soon: Connect with Outlook Calendar for scheduling." },
      { id: "apple-calendar", name: "Apple Calendar", isAvailable: false, description: "Coming soon: Integrate with Apple Calendar for event management." }
    ]
  },
  {
    id: "assessment",
    title: "Assessment & Feedback",
    icon: <CheckCircle className="h-5 w-5" />,
    description: "Connect with assessment tools to manage quizzes, tests, and feedback collection.",
    integrations: [
      { id: "kahoot", name: "Kahoot!", isAvailable: false, description: "Coming soon: Integrate with Kahoot! for interactive quizzes." },
      { id: "quizlet", name: "Quizlet", isAvailable: false, description: "Coming soon: Connect with Quizlet for study materials." },
      { id: "socrative", name: "Socrative", isAvailable: false, description: "Coming soon: Use Socrative for classroom quizzes and assessments." },
      { id: "turnitin", name: "Turnitin", isAvailable: false, description: "Coming soon: Connect with Turnitin for plagiarism detection." },
      { id: "google-forms", name: "Google Forms", isAvailable: true, description: "Collect and process responses from Google Forms." },
      { id: "poll-everywhere", name: "Poll Everywhere", isAvailable: false, description: "Coming soon: Engage audiences with interactive polling." }
    ]
  },
  {
    id: "sis",
    title: "Student Information Systems",
    icon: <Users className="h-5 w-5" />,
    description: "Connect to SIS platforms to manage student data, enrollment, and academic records.",
    integrations: [
      { id: "powerschool", name: "PowerSchool", isAvailable: false, description: "Coming soon: Integrate with PowerSchool for student data management." },
      { id: "infinite-campus", name: "Infinite Campus", isAvailable: false, description: "Coming soon: Connect with Infinite Campus for student information." },
      { id: "skyward", name: "Skyward", isAvailable: false, description: "Coming soon: Use Skyward for student record management." },
      { id: "banner", name: "Banner", isAvailable: false, description: "Coming soon: Integrate with Banner for higher education data." },
      { id: "ellucian", name: "Ellucian", isAvailable: false, description: "Coming soon: Connect with Ellucian for campus management." }
    ]
  },
  {
    id: "financial",
    title: "Financial & Commerce",
    icon: <DollarSign className="h-5 w-5" />,
    description: "Integrate with payment processing and financial management tools.",
    integrations: [
      { id: "stripe", name: "Stripe", isAvailable: true, description: "Process payments and subscriptions with Stripe." },
      { id: "paypal", name: "PayPal", isAvailable: false, description: "Coming soon: Accept payments through PayPal." },
      { id: "square", name: "Square", isAvailable: false, description: "Coming soon: Process payments with Square." },
      { id: "quickbooks", name: "QuickBooks", isAvailable: false, description: "Coming soon: Manage accounting with QuickBooks." }
    ]
  },
  {
    id: "content",
    title: "Content & Resource Management",
    icon: <FolderOpen className="h-5 w-5" />,
    description: "Connect to file storage and content management systems.",
    integrations: [
      { id: "google-drive", name: "Google Drive", isAvailable: true, description: "Store and access files in Google Drive." },
      { id: "dropbox", name: "Dropbox", isAvailable: false, description: "Coming soon: Integrate with Dropbox for file storage." },
      { id: "onedrive", name: "OneDrive", isAvailable: false, description: "Coming soon: Connect with OneDrive for document management." },
      { id: "notion", name: "Notion", isAvailable: false, description: "Coming soon: Use Notion for knowledge management." },
      { id: "github", name: "GitHub", isAvailable: true, description: "Connect with GitHub for code and project management." },
      { id: "wikimedia", name: "Wikimedia Commons", isAvailable: false, description: "Coming soon: Access open educational resources." }
    ]
  },
  {
    id: "library",
    title: "Digital Libraries & Repositories",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Connect to digital libraries and academic repositories for educational resources.",
    integrations: [
      { id: "jstor", name: "JSTOR", isAvailable: false, description: "Coming soon: Access JSTOR academic resources." },
      { id: "gale", name: "Gale", isAvailable: false, description: "Coming soon: Integrate with Gale for scholarly content." },
      { id: "ebsco", name: "EBSCO", isAvailable: false, description: "Coming soon: Connect to EBSCO research databases." },
      { id: "overdrive", name: "OverDrive", isAvailable: false, description: "Coming soon: Access digital books and audiobooks." },
      { id: "openstax", name: "OpenStax", isAvailable: false, description: "Coming soon: Integrate open educational resources." }
    ]
  },
  {
    id: "analytics",
    title: "Reporting & Analytics",
    icon: <BarChart2 className="h-5 w-5" />,
    description: "Connect to analytics and data visualization tools for educational insights.",
    integrations: [
      { id: "power-bi", name: "Power BI", isAvailable: false, description: "Coming soon: Visualize data with Power BI." },
      { id: "tableau", name: "Tableau", isAvailable: false, description: "Coming soon: Create data dashboards with Tableau." },
      { id: "google-data-studio", name: "Google Data Studio", isAvailable: false, description: "Coming soon: Generate reports with Google Data Studio." },
      { id: "looker", name: "Looker", isAvailable: false, description: "Coming soon: Analyze data with Looker." },
      { id: "quicksight", name: "AWS QuickSight", isAvailable: false, description: "Coming soon: Create cloud-based business intelligence." }
    ]
  },
  {
    id: "automation",
    title: "Workflow Automation & Notifications",
    icon: <Zap className="h-5 w-5" />,
    description: "Connect to automation tools and notification services for streamlined processes.",
    integrations: [
      { id: "twilio", name: "Twilio", isAvailable: false, description: "Coming soon: Send SMS and voice notifications." },
      { id: "mailchimp", name: "Mailchimp", isAvailable: false, description: "Coming soon: Manage email marketing campaigns." },
      { id: "sendgrid", name: "SendGrid", isAvailable: false, description: "Coming soon: Send transactional emails at scale." },
      { id: "pusher", name: "Pusher", isAvailable: false, description: "Coming soon: Enable real-time notifications." },
      { id: "firebase", name: "Firebase", isAvailable: false, description: "Coming soon: Use Firebase for backend services." },
      { id: "zapier", name: "Zapier", isAvailable: true, description: "Connect apps and automate workflows with Zapier." }
    ]
  },
  {
    id: "adaptive-learning",
    title: "Adaptive Learning & AI Tools",
    icon: <Brain className="h-5 w-5" />,
    description: "Connect to AI-powered learning tools and adaptive educational platforms.",
    integrations: [
      { id: "squirrel-ai", name: "Squirrel AI", isAvailable: false, description: "Coming soon: Personalize learning with AI." },
      { id: "dreambox", name: "DreamBox", isAvailable: false, description: "Coming soon: Use adaptive math learning." },
      { id: "khanmigo", name: "Khanmigo", isAvailable: false, description: "Coming soon: Connect with Khan Academy's AI tutor." },
      { id: "grammarly", name: "Grammarly", isAvailable: false, description: "Coming soon: Enhance writing with AI suggestions." }
    ]
  },
  {
    id: "iot",
    title: "IoT & Smart Classroom Devices",
    icon: <Monitor className="h-5 w-5" />,
    description: "Connect to smart classroom devices and IoT systems for enhanced learning environments.",
    integrations: [
      { id: "rfid", name: "RFID Systems", isAvailable: false, description: "Coming soon: Track attendance with RFID technology." },
      { id: "smart-boards", name: "Smart Boards", isAvailable: false, description: "Coming soon: Integrate interactive smart boards." },
      { id: "projectors", name: "Projectors", isAvailable: false, description: "Coming soon: Control smart projectors automatically." },
      { id: "classroom-iot", name: "Classroom IoT Sensors", isAvailable: false, description: "Coming soon: Monitor classroom conditions with IoT." }
    ]
  }
];
