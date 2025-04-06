
import React from 'react';
import { NodeProps, Position } from '@xyflow/react';
import { LucideGitMerge } from "lucide-react";
import { NodeData } from './types';
import NodeHandle from './NodeHandle';

const ActionNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="w-60 bg-white dark:bg-slate-800 border-2 border-blue-400 rounded-md p-3 shadow-md">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-md">
          <LucideGitMerge className="h-4 w-4 text-blue-500" />
        </div>
        <div className="font-medium text-sm">{data.label}</div>
      </div>
      
      {data.description && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {data.description}
        </div>
      )}
      
      <NodeHandle type="target" position={Position.Top} />
      <NodeHandle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ActionNode;
