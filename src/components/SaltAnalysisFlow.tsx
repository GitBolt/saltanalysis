import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from '@/styles/SaltAnalysisFlow.module.css';
import { Ion, Test } from '@/types/ions';
import { calculateSaltFormula } from '@/utils/formula';

interface SaltAnalysisFlowProps {
  anion: Ion;
  cation: Ion;
}

const SaltAnalysisFlow: React.FC<SaltAnalysisFlowProps> = ({ anion, cation }) => {
  const createNodes = (anion: Ion, cation: Ion): Node[] => {
    const nodes: Node[] = [];
    const xCenter = 500;
    const ySpacing = 250; // Increased for better vertical separation
    const xSpacing = 500; // Increased for better horizontal separation
    const nodeWidth = 250; // Account for node width + padding
    const nodeGap = 50; // Gap between nodes

    // Salt name node
    nodes.push({
      id: 'salt',
      type: 'default',
      data: {
        label: `Analysis of ${calculateSaltFormula(cation, anion)}`
      },
      position: { x: xCenter, y: 0 },
      className: styles.saltNode
    });

    // Analysis type nodes
    nodes.push({
      id: 'cation-analysis',
      type: 'default',
      data: {
        label: `Cation Analysis: ${cation.name} [${cation.formula}]`
      },
      position: { x: xCenter - xSpacing, y: ySpacing },
      className: styles.analysisNode
    });

    nodes.push({
      id: 'anion-analysis',
      type: 'default',
      data: {
        label: `Anion Analysis: ${anion.name} [${anion.formula}]`
      },
      position: { x: xCenter + xSpacing, y: ySpacing },
      className: styles.analysisNode
    });

    // Add cation tests
    const cationTests = cation.tests;
    const cationPreliminaryTests = cationTests.filter(test => !test.confirmatory);
    const cationConfirmatoryTest = cationTests.find(test => test.confirmatory);
    const preliminaryCount = cationPreliminaryTests.length;

    // Calculate total width needed and starting position for centered distribution
    const totalWidthNeeded = preliminaryCount * nodeWidth + (preliminaryCount - 1) * nodeGap;
    const cationStartX = xCenter - xSpacing - totalWidthNeeded / 2 + nodeWidth / 2;

    // Add preliminary tests distributed evenly
    cationPreliminaryTests.forEach((test, index) => {
      nodes.push({
        id: `cation-${index}`,
        type: 'default',
        data: {
          label: `${test.experiment}\n↓\n${test.observation}\n↓\n${test.inference}`
        },
        position: {
          x: cationStartX + index * (nodeWidth + nodeGap),
          y: ySpacing * 2
        },
        className: styles.testNode
      });
    });

    // Add confirmatory test centered below
    if (cationConfirmatoryTest) {
      nodes.push({
        id: 'cation-confirmatory',
        type: 'default',
        data: {
          label: `${cationConfirmatoryTest.name || 'Confirmatory Test'}\n${cationConfirmatoryTest.experiment}\n↓\n${cationConfirmatoryTest.observation}\n↓\n${cationConfirmatoryTest.inference}`
        },
        position: {
          x: xCenter - xSpacing,
          y: ySpacing * 3
        },
        className: styles.confirmatoryNode
      });
    }

    // Add anion tests
    const anionTests = anion.tests;
    const anionPreliminaryTests = anionTests.filter(test => !test.confirmatory);
    const anionConfirmatoryTest = anionTests.find(test => test.confirmatory);
    const anionPreliminaryCount = anionPreliminaryTests.length;

    // Calculate starting position for anion preliminary tests
    const anionTotalWidth = anionPreliminaryCount * nodeWidth + (anionPreliminaryCount - 1) * nodeGap;
    const anionStartX = xCenter + xSpacing - anionTotalWidth / 2 + nodeWidth / 2;

    // Add preliminary tests distributed evenly
    anionPreliminaryTests.forEach((test, index) => {
      nodes.push({
        id: `anion-${index}`,
        type: 'default',
        data: {
          label: `${test.experiment}\n↓\n${test.observation}\n↓\n${test.inference}`
        },
        position: {
          x: anionStartX + index * (nodeWidth + nodeGap),
          y: ySpacing * 2
        },
        className: styles.testNode
      });
    });

    // Add confirmatory test centered below
    if (anionConfirmatoryTest) {
      nodes.push({
        id: 'anion-confirmatory',
        type: 'default',
        data: {
          label: `${anionConfirmatoryTest.name || 'Confirmatory Test'}\n${anionConfirmatoryTest.experiment}\n↓\n${anionConfirmatoryTest.observation}\n↓\n${anionConfirmatoryTest.inference}`
        },
        position: {
          x: xCenter + xSpacing,
          y: ySpacing * 3
        },
        className: styles.confirmatoryNode
      });
    }

    return nodes;
  };

  const createEdges = (anion: Ion, cation: Ion): Edge[] => {
    const edges: Edge[] = [];

    // Connect salt to analysis types
    edges.push(
      {
        id: 'salt-to-cation',
        source: 'salt',
        target: 'cation-analysis',
        type: 'smoothstep',
        animated: true,
      },
      {
        id: 'salt-to-anion',
        source: 'salt',
        target: 'anion-analysis',
        type: 'smoothstep',
        animated: true,
      }
    );

    // Connect cation tests
    const cationTests = cation.tests;
    const cationPreliminaryTests = cationTests.filter(test => !test.confirmatory);
    const hasCationConfirmatory = cationTests.some(test => test.confirmatory);

    // Connect analysis to all preliminary tests
    cationPreliminaryTests.forEach((_, index) => {
      edges.push({
        id: `cation-analysis-to-${index}`,
        source: 'cation-analysis',
        target: `cation-${index}`,
        type: 'smoothstep',
        animated: true,
      });
    });

    // Connect analysis to confirmatory test (or last preliminary test to confirmatory)
    if (hasCationConfirmatory) {
      if (cationPreliminaryTests.length > 0) {
        // Connect last preliminary test to confirmatory
        edges.push({
          id: 'cation-last-to-confirmatory',
          source: `cation-${cationPreliminaryTests.length - 1}`,
          target: 'cation-confirmatory',
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#00b894' }
        });
      } else {
        // Connect analysis directly to confirmatory if no preliminary tests
        edges.push({
          id: 'cation-analysis-to-confirmatory',
          source: 'cation-analysis',
          target: 'cation-confirmatory',
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#00b894' }
        });
      }
    }

    // Connect anion tests
    const anionTests = anion.tests;
    const anionPreliminaryTests = anionTests.filter(test => !test.confirmatory);
    const hasAnionConfirmatory = anionTests.some(test => test.confirmatory);

    // Connect analysis to all preliminary tests
    anionPreliminaryTests.forEach((_, index) => {
      edges.push({
        id: `anion-analysis-to-${index}`,
        source: 'anion-analysis',
        target: `anion-${index}`,
        type: 'smoothstep',
        animated: true,
      });
    });

    // Connect to confirmatory test
    if (hasAnionConfirmatory) {
      if (anionPreliminaryTests.length > 0) {
        // Connect last preliminary test to confirmatory
        edges.push({
          id: 'anion-last-to-confirmatory',
          source: `anion-${anionPreliminaryTests.length - 1}`,
          target: 'anion-confirmatory',
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#00b894' }
        });
      } else {
        // Connect analysis directly to confirmatory if no preliminary tests
        edges.push({
          id: 'anion-analysis-to-confirmatory',
          source: 'anion-analysis',
          target: 'anion-confirmatory',
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#00b894' }
        });
      }
    }

    return edges;
  };

  const initialNodes = createNodes(anion, cation);
  const initialEdges = createEdges(anion, cation);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className={styles.flowContainer}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        proOptions={{ hideAttribution: true }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.75 }}
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background />
        <Controls className={styles.controls} position="bottom-right" />
      </ReactFlow>
    </div>
  );
};

export default SaltAnalysisFlow; 