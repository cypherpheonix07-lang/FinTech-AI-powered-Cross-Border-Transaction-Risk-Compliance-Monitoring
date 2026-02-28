import React, { useEffect, useRef, useCallback } from 'react';
import { Network } from 'vis-network';
import 'vis-network/styles/vis-network.css';
import useStore from '../../app/store';
import { debounce } from 'lodash'; // Assuming lodash is available or we can use a simple debounce

const GraphCanvas = () => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);
  const { 
    nodes, 
    edges, 
    selectNode, 
    selectEdge, 
    selectedTracePath,
    isClustered,
    clusterBy
  } = useStore();

  const applyClustering = useCallback(() => {
    if (!networkRef.current) return;

    if (isClustered) {
      const clusterOptions = {
        joinCondition: (childOptions) => {
          return childOptions[clusterBy] !== undefined;
        },
        processProperties: (clusterOptions, childNodes) => {
          const totalRisk = childNodes.reduce((acc, curr) => acc + (curr.risk || 0), 0);
          const avgRisk = totalRisk / childNodes.length;
          const label = childNodes[0][clusterBy];
          
          return {
            ...clusterOptions,
            label: `${label} (${childNodes.length})`,
            risk: avgRisk,
            color: {
              background: avgRisk > 0.6 ? '#dc2626' : avgRisk > 0.3 ? '#f59e0b' : '#334155',
              border: '#1e293b'
            },
            font: { color: '#ffffff', size: 16, strokeWidth: 2 }
          };
        },
        clusterNodeProperties: {
          id: `cluster:${clusterBy}`,
          borderWidth: 3,
          shape: 'diamond',
          size: 35
        }
      };

      networkRef.current.cluster(clusterOptions);
    } else {
      // Open all clusters
      const clusterIds = networkRef.current.getNodesInCluster(`cluster:${clusterBy}`);
      if (clusterIds) {
        networkRef.current.openCluster(`cluster:${clusterBy}`);
      }
    }
  }, [isClustered, clusterBy]);

  useEffect(() => {
    if (!containerRef.current) return;

    const data = {
      nodes: nodes.map(node => ({
        ...node,
        label: node.id,
        title: `Bank: ${node.bank}\nCountry: ${node.country}`,
        color: {
          background: node.isNew ? '#2563eb' : (node.risk > 0.6 ? '#dc2626' : node.risk > 0.3 ? '#f59e0b' : '#1e293b'),
          border: node.isNew ? '#60a5fa' : '#334155',
          highlight: { background: '#2563eb', border: '#60a5fa' }
        },
        font: { color: '#f1f5f9', size: 14 },
        shape: 'dot',
        size: node.isNew ? 35 : 25,
        borderWidth: node.isNew ? 4 : 1
      })),
      edges: edges.map(edge => ({
        ...edge,
        color: { 
          color: edge.isNew ? '#2563eb' : '#475569', 
          highlight: '#2563eb' 
        },
        width: edge.isNew ? 4 : (Math.log(edge.amount || 10) + 1),
        arrows: 'to',
        label: `$${(edge.amount/1000).toFixed(1)}k`
      }))
    };

    if (selectedTracePath) {
      data.nodes = data.nodes.map(node => ({
        ...node,
        borderWidth: selectedTracePath.nodes.includes(node.id) ? 3 : 1,
        color: selectedTracePath.nodes.includes(node.id) 
          ? { ...node.color, border: '#ef4444' } 
          : node.color
      }));

      data.edges = data.edges.map(edge => ({
        ...edge,
        color: selectedTracePath.edges.includes(edge.id) 
          ? { color: '#ef4444', highlight: '#ef4444' } 
          : edge.color,
        width: selectedTracePath.edges.includes(edge.id) ? 4 : edge.width
      }));
    }

    const options = {
      nodes: { shadow: true },
      edges: {
        smooth: { type: 'curvedCW', roundness: 0.2 },
        font: { size: 10, color: '#94a3b8', align: 'middle' }
      },
      interaction: {
        hover: true,
        tooltipDelay: 200,
        zoomView: true,
        dragView: true,
        multiselect: true
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -3000,
          centralGravity: 0.3,
          springLength: 200,
          springConstant: 0.05
        },
        stabilization: { iterations: 150 }
      }
    };

    networkRef.current = new Network(containerRef.current, data, options);

    networkRef.current.on('click', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        if (networkRef.current.isCluster(nodeId)) {
          networkRef.current.openCluster(nodeId);
        } else {
          selectNode(nodeId);
        }
      } else if (params.edges.length > 0) {
        selectEdge(params.edges[0]);
      }
    });

    // Handle clustering if active
    if (isClustered) applyClustering();

    return () => {
      if (networkRef.current) networkRef.current.destroy();
    };
  }, [nodes, edges, selectedTracePath, selectNode, selectEdge, isClustered, clusterBy, applyClustering]);

  return (
    <div ref={containerRef} className="h-full w-full bg-dark-900 rounded-3xl overflow-hidden border border-dark-700 shadow-2xl transition-all" />
  );
};

export default GraphCanvas;
