"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

// Generate a random, technical network of nodes and connections
function NetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesCount = 100;
  const connectionsCount = 150;

  // Generate random positions for nodes
  const [positions, linesData] = useMemo(() => {
    const pos = new Float32Array(nodesCount * 3);
    const nodes: THREE.Vector3[] = [];

    // Create a dense horizontal band of nodes to represent a system pipeline
    for (let i = 0; i < nodesCount; i++) {
      const x = (Math.random() - 0.5) * 20; // Spread wide across X
      const y = (Math.random() - 0.5) * 5;  // Tight Y
      const z = (Math.random() - 0.5) * 10; // Medium Z depth

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Connect nodes that are close to each other
    const lines = [];
    let connectionsMade = 0;
    
    for (let i = 0; i < nodesCount && connectionsMade < connectionsCount; i++) {
      for (let j = i + 1; j < nodesCount && connectionsMade < connectionsCount; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 4) { // Only connect if close
          lines.push([nodes[i], nodes[j]]);
          connectionsMade++;
        }
      }
    }

    return [pos, lines];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow, deliberate pan
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* The Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FF3B1D"
          size={0.06}
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* The Connections */}
      <group>
        {linesData.map((line, i) => {
          const geometry = new THREE.BufferGeometry().setFromPoints(line);
          const material = new THREE.LineBasicMaterial({
            color: "#A1A1AA",
            transparent: true,
            opacity: 0.15, // Subtle structural lines
          });
          const lineObj = new THREE.Line(geometry, material);
          return <primitive key={`conn-${i}`} object={lineObj} />;
        })}
      </group>
    </group>
  );
}

// Data signals traveling along the network
function DataSignals() {
  const signalCount = 50;
  const groupRef = useRef<THREE.Group>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(signalCount * 3);
    const vel = new Float32Array(signalCount * 3);

    for (let i = 0; i < signalCount; i++) {
      pos[i * 3] = -15 + Math.random() * 5; // Start on left
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      // Fast horizontal velocity
      vel[i * 3] = 0.05 + Math.random() * 0.1;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const pointsMesh = groupRef.current.children[0] as THREE.Points;
    const posAttr = pointsMesh.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < signalCount; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset when reaching the right edge
      if (posArray[i * 3] > 15) {
        posArray[i * 3] = -15;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 4;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.12}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <NetworkMesh />
      <DataSignals />
      <AdaptiveDpr pixelated />
    </>
  );
}

export function PipelineScene() {
  return (
    <div className="absolute inset-0 z-0 bg-[#050505]">
      {/* Subtle radial gradient overlay to focus center */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_80%)] pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
