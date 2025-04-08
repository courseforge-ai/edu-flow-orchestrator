
import { Switch } from "@/components/ui/switch";

export const SettingsTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Platform Settings</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Configure global settings for your integration platform.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Development Mode</p>
            <p className="text-sm text-muted-foreground">
              Enable debug features and logging
            </p>
          </div>
          <Switch />
        </div>
        
        <div className="bg-card rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Allow Third-party Integrations</p>
            <p className="text-sm text-muted-foreground">
              Enable external developers to create integrations
            </p>
          </div>
          <Switch />
        </div>
        
        <div className="bg-card rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Strict Authentication</p>
            <p className="text-sm text-muted-foreground">
              Require additional verification for sensitive operations
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  );
};
