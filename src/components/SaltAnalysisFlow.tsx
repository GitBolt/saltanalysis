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
    const xCenter = 400;
    const ySpacing = 180;
    const xSpacing = 300;

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
    const hasOnlyConfirmatoryTest = cationTests.length === 1 && cationTests[0].confirmatory;
    const lastCationTestIndex = hasOnlyConfirmatoryTest ? -1 : cationTests.findIndex(test => test.confirmatory) - 1;
    
    // Add preliminary tests in sequence
    cationTests.slice(0, lastCationTestIndex).forEach((test, index) => {
      const xOffset = -150 - (index * 300); // Each test moves further left
      nodes.push({
        id: `cation-${index}`,
        type: 'default',
        data: {
          label: `${test.experiment}\n↓\n${test.observation}\n↓\n${test.inference}`
        },
        position: { 
          x: xCenter - xSpacing + xOffset,
          y: ySpacing * 2 // All preliminary tests at exact same level
        },
        className: styles.testNode
      });
    });

    // Last preliminary test should also be at the same level as siblings
    if (lastCationTestIndex >= 0) {
      const lastTest = cationTests[lastCationTestIndex];
      const confirmTest = cationTests.find(test => test.confirmatory);
      
      // Last preliminary test - now at same level as other tests
      nodes.push({
        id: `cation-${lastCationTestIndex}`,
        type: 'default',
        data: {
          label: `${lastTest.experiment}\n↓\n${lastTest.observation}\n↓\n${lastTest.inference}`
        },
        position: { 
          x: xCenter - xSpacing,
          y: ySpacing * 2 // Same level as other tests
        },
        className: styles.testNode
      });

      // Only confirmatory test goes below
      if (confirmTest) {
        nodes.push({
          id: 'cation-confirmatory',
          type: 'default',
          data: {
            label: `${confirmTest.name}\n${confirmTest.experiment}\n↓\n${confirmTest.observation}\n↓\n${confirmTest.inference}`
          },
          position: { 
            x: xCenter - xSpacing,
            y: ySpacing * 3 // Only confirmatory test goes one level below
          },
          className: styles.confirmatoryNode
        });
      }
    } else if (hasOnlyConfirmatoryTest) {
      // If there's only a confirmatory test, show it directly under analysis
      const confirmTest = cationTests[0];
      nodes.push({
        id: 'cation-confirmatory',
        type: 'default',
        data: {
          label: `${confirmTest.name}\n${confirmTest.experiment}\n↓\n${confirmTest.observation}\n↓\n${confirmTest.inference}`
        },
        position: { 
          x: xCenter - xSpacing,
          y: ySpacing * 2 // Position directly under analysis node
        },
        className: styles.confirmatoryNode
      });
    }

    // Add anion tests
    const anionTests = anion.tests;
    const hasOnlyAnionConfirmatoryTest = anionTests.length === 1 && anionTests[0].confirmatory;
    const lastAnionTestIndex = hasOnlyAnionConfirmatoryTest ? -1 : anionTests.findIndex(test => test.confirmatory) - 1;
    
    // Add preliminary tests in sequence
    anionTests.slice(0, lastAnionTestIndex).forEach((test, index) => {
      const xOffset = 150 + (index * 300); // Each test moves further right
      nodes.push({
        id: `anion-${index}`,
        type: 'default',
        data: {
          label: `${test.experiment}\n↓\n${test.observation}\n↓\n${test.inference}`
        },
        position: { 
          x: xCenter + xSpacing + xOffset,
          y: ySpacing * 2 // All tests at same vertical level
        },
        className: styles.testNode
      });
    });

    // Add last preliminary test and confirmatory test in sequence
    if (lastAnionTestIndex >= 0) {
      const lastTest = anionTests[lastAnionTestIndex];
      const confirmTest = anionTests.find(test => test.confirmatory);
      
      // Last preliminary test
      nodes.push({
        id: `anion-${lastAnionTestIndex}`,
        type: 'default',
        data: {
          label: `${lastTest.experiment}\n↓\n${lastTest.observation}\n↓\n${lastTest.inference}`
        },
        position: { 
          x: xCenter + xSpacing + (lastAnionTestIndex % 2 ? 150 : -150),
          y: ySpacing * (lastAnionTestIndex + 2)
        },
        className: styles.testNode
      });

      // Confirmatory test
      if (confirmTest) {
        nodes.push({
          id: 'anion-confirmatory',
          type: 'default',
          data: {
            label: `${confirmTest.name}\n${confirmTest.experiment}\n↓\n${confirmTest.observation}\n↓\n${confirmTest.inference}`
          },
          position: { 
            x: xCenter + xSpacing + (lastAnionTestIndex % 2 ? 150 : -150),
            y: ySpacing * (lastAnionTestIndex + 3)
          },
          className: styles.confirmatoryNode
        });
      }
    } else if (hasOnlyAnionConfirmatoryTest) {
      const confirmTest = anionTests[0];
      nodes.push({
        id: 'anion-confirmatory',
        type: 'default',
        data: {
          label: `${confirmTest.name}\n${confirmTest.experiment}\n↓\n${confirmTest.observation}\n↓\n${confirmTest.inference}`
        },
        position: { 
          x: xCenter + xSpacing,
          y: ySpacing * 2
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
    const lastCationTestIndex = cationTests.findIndex(test => test.confirmatory) - 1;

    // Connect analysis to all preliminary tests except the last one
    cationTests.slice(0, lastCationTestIndex).forEach((_, index) => {
      edges.push({
        id: `cation-analysis-to-${index}`,
        source: 'cation-analysis',
        target: `cation-${index}`,
        type: 'smoothstep',
        animated: true,
      });
    });

    // Connect analysis to last preliminary test
    if (lastCationTestIndex >= 0) {
      edges.push({
        id: `cation-analysis-to-last`,
        source: 'cation-analysis',
        target: `cation-${lastCationTestIndex}`,
        type: 'smoothstep',
        animated: true,
      });

      // Connect last preliminary test to confirmatory test
      if (cationTests.find(test => test.confirmatory)) {
        edges.push({
          id: 'cation-last-to-confirmatory',
          source: `cation-${lastCationTestIndex}`,
          target: 'cation-confirmatory',
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#00b894' }
        });
      }
    }

    // Connect anion tests
    const anionTests = anion.tests;
    const lastAnionTestIndex = anionTests.findIndex(test => test.confirmatory) - 1;

    // Connect analysis to all preliminary tests except the last one
    anionTests.slice(0, lastAnionTestIndex).forEach((_, index) => {
      edges.push({
        id: `anion-analysis-to-${index}`,
        source: 'anion-analysis',
        target: `anion-${index}`,
        type: 'smoothstep',
        animated: true,
      });
    });

    // Connect analysis to last preliminary test
    if (lastAnionTestIndex >= 0) {
      edges.push({
        id: `anion-analysis-to-last`,
        source: 'anion-analysis',
        target: `anion-${lastAnionTestIndex}`,
        type: 'smoothstep',
        animated: true,
      });

      // Connect last preliminary test to confirmatory test
      if (anionTests.find(test => test.confirmatory)) {
        edges.push({
          id: 'anion-last-to-confirmatory',
          source: `anion-${lastAnionTestIndex}`,
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