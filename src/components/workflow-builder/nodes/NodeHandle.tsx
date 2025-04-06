
import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface NodeHandleProps {
  type: 'source' | 'target';
  position?: Position;
  id?: string;
  className?: string;
}

const NodeHandle: React.FC<NodeHandleProps> = ({ 
  type, 
  position = Position.Bottom, 
  id,
  className = ''
}) => {
  return (
    <Handle
      type={type}
      position={position}
      id={id}
      className={`bg-blue-500 border-2 border-white h-3 w-3 ${className}`}
    />
  );
};

export default NodeHandle;
