
import React from 'react';
import { NodeProps, Position } from '@xyflow/react';
import { SplitSquareVertical } from "lucide-react";
import { NodeData } from './types';
import NodeHandle from './NodeHandle';

const ConditionNode: React.FC<NodeProps> = ({ data }) => {
  // Type assertion to ensure data is treated as NodeData
  const nodeData = data as NodeData;
  
  return (
    <div className="w-60 bg-white dark:bg-slate-800 border-2 border-amber-400 rounded-md p-3 shadow-md">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-amber-100 dark:bg-amber-900 rounded-md">
          <SplitSquareVertical className="h-4 w-4 text-amber-500" />
        </div>
        <div className="font-medium text-sm">{nodeData.label}</div>
      </div>
      
      {nodeData.description && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {nodeData.description}
        </div>
      )}
      
      <NodeHandle type="target" position={Position.Top} />
      <NodeHandle type="source" position={Position.Bottom} id="yes" className="left-1/4 translate-x-1/2" />
      <NodeHandle type="source" position={Position.Bottom} id="no" className="left-3/4 -translate-x-1/2" />
    </div>
  );
};

export default ConditionNode;
