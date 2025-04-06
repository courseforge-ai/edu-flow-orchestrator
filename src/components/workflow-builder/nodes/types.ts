
export type NodeTypes = 'trigger' | 'action' | 'condition';

export interface NodeData {
  label: string;
  description?: string;
  [key: string]: any;
}

// This is just a helper interface for React Flow NodeProps
// It provides proper typing for our components
export interface CustomNodeProps {
  id: string;
  type: string;
  data: NodeData;
  selected?: boolean;
  isConnectable?: boolean;
  xPos: number;
  yPos: number;
  dragHandle?: boolean;
  position: {
    x: number;
    y: number;
  };
}
