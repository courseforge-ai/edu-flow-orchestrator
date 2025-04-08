
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";
import { IntegrationsTab } from "@/components/admin/IntegrationsTab";
import { SettingsTab } from "@/components/admin/SettingsTab";
import { OrganizationsTab } from "@/components/admin/OrganizationsTab";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("integrations");

  return (
    <div className="container mx-auto py-10">
      <PageTitle title="Super Admin" icon={Settings}>
        {/* Add any actions you want here */}
      </PageTitle>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="organizations">Organization Management</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-8">
          <IntegrationsTab />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <SettingsTab />
        </TabsContent>

        <TabsContent value="organizations" className="space-y-6">
          <OrganizationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
