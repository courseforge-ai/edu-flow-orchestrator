
export type NodeTypes = 'trigger' | 'action' | 'condition';

export interface NodeData {
  label: string;
  description?: string;
  [key: string]: any;
}
