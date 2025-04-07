
import React, { useState } from 'react';
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Save, PlayCircle } from "lucide-react";
import WorkflowCanvas from "@/components/workflow-builder/WorkflowCanvas";
import WorkflowSidebar from "@/components/workflow-builder/WorkflowSidebar";
import { ReactFlowProvider } from "@xyflow/react";
import { toast } from "@/hooks/use-toast";

const WorkflowBuilder = () => {
  const isMobile = useIsMobile();
  const [workflowName, setWorkflowName] = useState("Untitled Workflow");
  
  const handleSave = () => {
    toast({
      title: "Workflow Saved",
      description: `${workflowName} has been saved successfully.`,
    });
  };
  
  const handleDeploy = () => {
    toast({
      title: "Workflow Deployed",
      description: `${workflowName} has been deployed and is now active.`,
    });
  };
  
  return (
    <div className="flex h-screen">
      {!isMobile && (
        <SidebarProvider>
          <Sidebar />
        </SidebarProvider>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center bg-background">
          <div>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button onClick={handleDeploy}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Deploy
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ReactFlowProvider>
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <WorkflowSidebar />
              </ResizablePanel>
              <ResizablePanel defaultSize={80}>
                <div className="p-4 h-full overflow-auto">
                  <WorkflowCanvas />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
