
import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Connection,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NodeTypes } from './nodes/types';
import ActionNode from './nodes/ActionNode';
import TriggerNode from './nodes/TriggerNode';
import ConditionNode from './nodes/ConditionNode';

// Define the node types for the flow
const nodeTypes = {
  action: ActionNode,
  trigger: TriggerNode,
  condition: ConditionNode
};

// Initial nodes for the workflow
const initialNodes = [
  {
    id: 'trigger-1',
    type: 'trigger',
    position: { x: 250, y: 50 },
    data: { label: 'New Assignment', description: 'When a new assignment is created' }
  }
];

// Initial edges for the workflow
const initialEdges: Edge[] = [];

const WorkflowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle new connections between nodes
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Add a new node to the workflow
  const onAddNode = (nodeType: NodeTypes, label: string) => {
    const newNodeId = `${nodeType}-${nodes.length + 1}`;
    let nodeData = {
      label,
      description: `${nodeType} node description`
    };
    
    // Position the new node below the last node
    const lastNode = nodes[nodes.length - 1];
    const position = {
      x: lastNode.position.x,
      y: lastNode.position.y + 150
    };
    
    setNodes([
      ...nodes,
      {
        id: newNodeId,
        type: nodeType,
        position,
        data: nodeData
      }
    ]);
  };

  return (
    <div className="h-[800px] w-full border rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-background"
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right" className="bg-background p-2 rounded-md border shadow-sm">
          <div className="flex flex-col gap-2">
            <button 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              onClick={() => onAddNode('action', 'New Action')}
            >
              Add Action
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => onAddNode('condition', 'New Condition')}
            >
              Add Condition
            </button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
