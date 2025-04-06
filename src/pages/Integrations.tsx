
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  GraduationCap, Mail, Calendar, CheckCircle, Users, DollarSign, FolderOpen, 
  BookOpen, BarChart2, Zap, Brain, Monitor, Link as LinkIcon, Search, Info, ExternalLink
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar } from "@/components/Sidebar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Define the integration category type
interface IntegrationCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  integrations: Integration[];
}

interface Integration {
  id: string;
  name: string;
  isAvailable: boolean;
  description?: string;
}

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const isMobile = useIsMobile();

  const handleConnect = (integration: Integration) => {
    if (integration.isAvailable) {
      toast({
        title: "Connection Started",
        description: `Connecting to ${integration.name}...`,
      });
    } else {
      toast({
        title: "Coming Soon",
        description: `${integration.name} integration is coming soon.`,
        variant: "destructive",
      });
    }
  };

  // Define all integration categories
  const categories: IntegrationCategory[] = [
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

  // Filter categories based on search query and active tab
  const filteredCategories = categories.map(category => ({
    ...category,
    integrations: category.integrations.filter(integration => {
      const matchesSearch = 
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        category.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === "available") {
        return matchesSearch && integration.isAvailable;
      } else if (activeTab === "coming-soon") {
        return matchesSearch && !integration.isAvailable;
      }
      
      return matchesSearch;
    })
  })).filter(category => category.integrations.length > 0);

  // Count available and upcoming integrations
  const availableCount = categories.reduce(
    (acc, category) => acc + category.integrations.filter(i => i.isAvailable).length, 0
  );
  
  const upcomingCount = categories.reduce(
    (acc, category) => acc + category.integrations.filter(i => !i.isAvailable).length, 0
  );

  return (
    <div className="flex h-screen">
      {!isMobile && <Sidebar />}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto py-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Integrations</h1>
            </div>
            <p className="text-muted-foreground">
              Connect your learning platforms, communication tools, and more to build powerful automated workflows.
            </p>
          </div>
          
          {/* Search bar and tabs */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search integrations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All ({categories.reduce((acc, cat) => acc + cat.integrations.length, 0)})</TabsTrigger>
                <TabsTrigger value="available">Available ({availableCount})</TabsTrigger>
                <TabsTrigger value="coming-soon">Coming Soon ({upcomingCount})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Categories and integrations */}
          <ScrollArea className="flex-1 pr-4">
            <div className="grid gap-8 pb-8">
              {filteredCategories.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p>No integrations found for "{searchQuery}"</p>
                  </CardContent>
                </Card>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">{category.title}</h2>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {category.integrations.map((integration) => (
                        <Card 
                          key={integration.id} 
                          className={`overflow-hidden transition-all duration-300 hover:shadow-md ${!integration.isAvailable ? "opacity-80" : ""}`}
                        >
                          <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
                            <div>
                              <CardTitle className="text-base flex items-center gap-1">
                                {integration.name}
                                {integration.description && (
                                  <HoverCard>
                                    <HoverCardTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                                        <Info className="h-3.5 w-3.5" />
                                        <span className="sr-only">Info</span>
                                      </Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent side="top">
                                      <p className="text-sm">{integration.description}</p>
                                    </HoverCardContent>
                                  </HoverCard>
                                )}
                              </CardTitle>
                            </div>
                            {integration.isAvailable ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-950">
                                Available
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-100 text-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800">
                                Coming soon
                              </Badge>
                            )}
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <CardDescription className="line-clamp-2 h-10">
                              {integration.description || `Connect to ${integration.name} to enhance your learning workflows.`}
                            </CardDescription>
                          </CardContent>
                          <div className="px-4 pb-4">
                            <Button 
                              size="sm" 
                              className="w-full"
                              disabled={!integration.isAvailable}
                              variant={integration.isAvailable ? "default" : "outline"}
                              onClick={() => handleConnect(integration)}
                            >
                              {integration.isAvailable ? "Connect" : "Coming Soon"}
                              {integration.isAvailable && <ExternalLink className="ml-1 h-3.5 w-3.5" />}
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                    <Separator className="mt-6" />
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
