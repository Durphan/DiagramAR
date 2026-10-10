import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';

// Importante: Importar los estilos propios de React Flow
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', data: { label: 'Inicio' }, position: { x: 200, y: 50 }, type: 'input' },
  { id: '2', data: { label: 'Proceso' }, position: { x: 200, y: 150 } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

export default function MiFlujo() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    // Es vital darle un tamaño explícito (alto y ancho) al contenedor
    <div style={{ width: '100%', height: '500px', backgroundColor: '#1e1e1e'}}>
  <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
  >
    <Controls />
    <Background />
  </ReactFlow>
</div>
  );
}