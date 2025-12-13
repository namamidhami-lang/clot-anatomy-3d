import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF } from '@react-three/drei'
import { ClotDataEntry } from '../types'

type Props = {
  modelPath: string
  clotLocations: ClotDataEntry[]
  onSelect: (id?: string) => void
}

function Hotspot({ pos, label, id, onClick }: { pos: [number,number,number]; label: string; id: string; onClick: (id: string) => void }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[3]} />
      <meshStandardMaterial color="red" />
      <Html distanceFactor={8} position={[0, 6, 0]}>
        <button onClick={() => onClick(id)} className="bg-white px-2 py-1 rounded text-xs shadow">
          {label}
        </button>
      </Html>
    </mesh>
  )
}

function Model({ path }: { path: string }) {
  const gltf = useGLTF(path)
  return <primitive object={gltf.scene} scale={1.1} />
}

export default function AnatomyViewer({ modelPath, clotLocations, onSelect }: Props) {
  const hotspotMap = clotLocations.map(c => ({
    id: c.id,
    label: c.shortLabel || c.name,
    pos: c.position3D as [number,number,number]
  }))

  return (
    <Canvas camera={{ position: [0, 0, 200], fov: 35 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[50, 50, 50]} intensity={0.8} />
      <React.Suspense fallback={null}>
        <Model path={modelPath} />
        {hotspotMap.map(h => (
          <Hotspot key={h.id} id={h.id} pos={h.pos} label={h.label} onClick={(id) => onSelect(id)} />
        ))}
      </React.Suspense>
      <OrbitControls enablePan={true} enableZoom={true} />
    </Canvas>
  )
}
