
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  GraduationCap, Mail, Calendar, CheckCircle, Users, DollarSign, FolderOpen, 
  BookOpen, BarChart2, Zap, Brain, Monitor, Link as LinkIcon, Search
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar } from "@/components/Sidebar";

// Define the integration category type
interface IntegrationCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  integrations: Integration[];
}

interface Integration {
  id: string;
  name: string;
  isAvailable: boolean;
}

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  // Define all integration categories
  const categories: IntegrationCategory[] = [
    {
      id: "lms",
      title: "Learning Management Systems",
      icon: <GraduationCap className="h-5 w-5" />,
      integrations: [
        { id: "canvas", name: "Canvas", isAvailable: true },
        { id: "blackboard", name: "Blackboard", isAvailable: false },
        { id: "moodle", name: "Moodle", isAvailable: true },
        { id: "google-classroom", name: "Google Classroom", isAvailable: false }
      ]
    },
    {
      id: "communication",
      title: "Communication & Collaboration",
      icon: <Mail className="h-5 w-5" />,
      integrations: [
        { id: "gmail", name: "Gmail", isAvailable: true },
        { id: "outlook", name: "Outlook", isAvailable: false },
        { id: "slack", name: "Slack", isAvailable: true },
        { id: "teams", name: "Microsoft Teams", isAvailable: false },
        { id: "zoom", name: "Zoom", isAvailable: true },
        { id: "google-meet", name: "Google Meet", isAvailable: false },
        { id: "discord", name: "Discord", isAvailable: false }
      ]
    },
    {
      id: "scheduling",
      title: "Scheduling & Calendar",
      icon: <Calendar className="h-5 w-5" />,
      integrations: [
        { id: "google-calendar", name: "Google Calendar", isAvailable: true },
        { id: "outlook-calendar", name: "Microsoft Outlook Calendar", isAvailable: false },
        { id: "apple-calendar", name: "Apple Calendar", isAvailable: false }
      ]
    },
    {
      id: "assessment",
      title: "Assessment & Feedback",
      icon: <CheckCircle className="h-5 w-5" />,
      integrations: [
        { id: "kahoot", name: "Kahoot!", isAvailable: false },
        { id: "quizlet", name: "Quizlet", isAvailable: false },
        { id: "socrative", name: "Socrative", isAvailable: false },
        { id: "turnitin", name: "Turnitin", isAvailable: false },
        { id: "google-forms", name: "Google Forms", isAvailable: true },
        { id: "poll-everywhere", name: "Poll Everywhere", isAvailable: false }
      ]
    },
    {
      id: "sis",
      title: "Student Information Systems",
      icon: <Users className="h-5 w-5" />,
      integrations: [
        { id: "powerschool", name: "PowerSchool", isAvailable: false },
        { id: "infinite-campus", name: "Infinite Campus", isAvailable: false },
        { id: "skyward", name: "Skyward", isAvailable: false },
        { id: "banner", name: "Banner", isAvailable: false },
        { id: "ellucian", name: "Ellucian", isAvailable: false }
      ]
    },
    {
      id: "financial",
      title: "Financial & Commerce",
      icon: <DollarSign className="h-5 w-5" />,
      integrations: [
        { id: "stripe", name: "Stripe", isAvailable: true },
        { id: "paypal", name: "PayPal", isAvailable: false },
        { id: "square", name: "Square", isAvailable: false },
        { id: "quickbooks", name: "QuickBooks", isAvailable: false }
      ]
    },
    {
      id: "content",
      title: "Content & Resource Management",
      icon: <FolderOpen className="h-5 w-5" />,
      integrations: [
        { id: "google-drive", name: "Google Drive", isAvailable: true },
        { id: "dropbox", name: "Dropbox", isAvailable: false },
        { id: "onedrive", name: "OneDrive", isAvailable: false },
        { id: "notion", name: "Notion", isAvailable: false },
        { id: "github", name: "GitHub", isAvailable: true },
        { id: "wikimedia", name: "Wikimedia Commons", isAvailable: false }
      ]
    },
    {
      id: "library",
      title: "Digital Libraries & Repositories",
      icon: <BookOpen className="h-5 w-5" />,
      integrations: [
        { id: "jstor", name: "JSTOR", isAvailable: false },
        { id: "gale", name: "Gale", isAvailable: false },
        { id: "ebsco", name: "EBSCO", isAvailable: false },
        { id: "overdrive", name: "OverDrive", isAvailable: false },
        { id: "openstax", name: "OpenStax", isAvailable: false }
      ]
    },
    {
      id: "analytics",
      title: "Reporting & Analytics",
      icon: <BarChart2 className="h-5 w-5" />,
      integrations: [
        { id: "power-bi", name: "Power BI", isAvailable: false },
        { id: "tableau", name: "Tableau", isAvailable: false },
        { id: "google-data-studio", name: "Google Data Studio", isAvailable: false },
        { id: "looker", name: "Looker", isAvailable: false },
        { id: "quicksight", name: "AWS QuickSight", isAvailable: false }
      ]
    },
    {
      id: "automation",
      title: "Workflow Automation & Notifications",
      icon: <Zap className="h-5 w-5" />,
      integrations: [
        { id: "twilio", name: "Twilio", isAvailable: false },
        { id: "mailchimp", name: "Mailchimp", isAvailable: false },
        { id: "sendgrid", name: "SendGrid", isAvailable: false },
        { id: "pusher", name: "Pusher", isAvailable: false },
        { id: "firebase", name: "Firebase", isAvailable: false },
        { id: "zapier", name: "Zapier", isAvailable: true }
      ]
    },
    {
      id: "adaptive-learning",
      title: "Adaptive Learning & AI Tools",
      icon: <Brain className="h-5 w-5" />,
      integrations: [
        { id: "squirrel-ai", name: "Squirrel AI", isAvailable: false },
        { id: "dreambox", name: "DreamBox", isAvailable: false },
        { id: "khanmigo", name: "Khanmigo", isAvailable: false },
        { id: "grammarly", name: "Grammarly", isAvailable: false }
      ]
    },
    {
      id: "iot",
      title: "IoT & Smart Classroom Devices",
      icon: <Monitor className="h-5 w-5" />,
      integrations: [
        { id: "rfid", name: "RFID Systems", isAvailable: false },
        { id: "smart-boards", name: "Smart Boards", isAvailable: false },
        { id: "projectors", name: "Projectors", isAvailable: false },
        { id: "classroom-iot", name: "Classroom IoT Sensors", isAvailable: false }
      ]
    }
  ];

  // Filter categories based on search query
  const filteredCategories = categories.map(category => ({
    ...category,
    integrations: category.integrations.filter(integration => 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.integrations.length > 0);

  return (
    <div className="flex h-screen">
      {!isMobile && <Sidebar />}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto py-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Integrations</h1>
          </div>
          
          {/* Search bar */}
          <div className="mb-6">
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
                      {category.icon}
                      <h2 className="text-lg font-semibold">{category.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {category.integrations.map((integration) => (
                        <Card key={integration.id} className={!integration.isAvailable ? "opacity-60" : ""}>
                          <CardHeader className="p-4">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base">{integration.name}</CardTitle>
                              {integration.isAvailable ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                  Available
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-100 text-gray-500 hover:bg-gray-100">
                                  Coming soon
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
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
