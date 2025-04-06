
import React from 'react';
import { NodeProps, Position } from '@xyflow/react';
import { Play } from "lucide-react";
import { NodeData } from './types';
import NodeHandle from './NodeHandle';

const TriggerNode: React.FC<NodeProps> = ({ data }) => {
  // Type assertion to ensure data is treated as NodeData
  const nodeData = data as NodeData;
  
  return (
    <div className="w-60 bg-white dark:bg-slate-800 border-2 border-green-400 rounded-md p-3 shadow-md">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-green-100 dark:bg-green-900 rounded-md">
          <Play className="h-4 w-4 text-green-500" fill="currentColor" />
        </div>
        <div className="font-medium text-sm">{nodeData.label}</div>
      </div>
      
      {nodeData.description && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {nodeData.description}
        </div>
      )}
      
      <NodeHandle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TriggerNode;
