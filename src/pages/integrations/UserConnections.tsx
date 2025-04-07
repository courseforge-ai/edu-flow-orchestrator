
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, AlertCircle, CheckCircle, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CanvasConnector } from "@/components/integrations/canvas/CanvasConnector";
import { IntegrationConnection, useIntegrationConnections } from "./useIntegrationConnections";
import { Skeleton } from "@/components/ui/skeleton";

const iconMapping: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="h-5 w-5" />
};

export const UserConnections = () => {
  const { connections, isLoading, error, removeConnection } = useIntegrationConnections();
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deletingConnection, setDeletingConnection] = useState<string | null>(null);

  const handleDeleteConnection = async (connectionId: string) => {
    try {
      setDeletingConnection(connectionId);
      await removeConnection(connectionId);
      
      toast({
        title: "Connection removed",
        description: "The integration connection has been removed successfully."
      });
    } catch (error) {
      toast({
        title: "Error removing connection",
        description: error.message || "Failed to remove the connection.",
        variant: "destructive"
      });
    } finally {
      setDeletingConnection(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Connections</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6">
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <h3 className="text-xl font-semibold">Error Loading Connections</h3>
              <p className="text-muted-foreground">{error.message}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Connections</h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" /> Add Connection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Integration Connection</DialogTitle>
              <DialogDescription>
                Connect to your learning management system.
              </DialogDescription>
            </DialogHeader>
            <CanvasConnector />
          </DialogContent>
        </Dialog>
      </div>

      {connections.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2 py-6">
              <h3 className="text-xl font-semibold">No Connections Yet</h3>
              <p className="text-muted-foreground">
                Connect your learning systems to enable integrations.
              </p>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-1 h-4 w-4" /> Add Your First Connection
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((connection) => (
            <ConnectionCard 
              key={connection.id} 
              connection={connection} 
              onDelete={handleDeleteConnection}
              isDeleting={deletingConnection === connection.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ConnectionCardProps {
  connection: IntegrationConnection;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

const ConnectionCard = ({ connection, onDelete, isDeleting }: ConnectionCardProps) => {
  const iconComponent = iconMapping[connection.connector.icon] || <CheckCircle className="h-5 w-5" />;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              {iconComponent}
            </div>
            <div>
              <CardTitle className="text-lg">{connection.connection_name}</CardTitle>
              <CardDescription>{connection.connector.name}</CardDescription>
            </div>
          </div>
          <Badge variant={connection.is_active ? "default" : "outline"}>
            {connection.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <p>Connected on {new Date(connection.created_at).toLocaleDateString()}</p>
          {connection.auth_credentials?.canvas_url && (
            <p className="truncate">{connection.auth_credentials.canvas_url}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => onDelete(connection.id)}
          disabled={isDeleting}
        >
          <Trash2 className="mr-1 h-4 w-4" />
          {isDeleting ? "Removing..." : "Remove Connection"}
        </Button>
      </CardFooter>
    </Card>
  );
};
