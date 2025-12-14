import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF } from '@react-three/drei'
import { ClotDataEntry } from '../types'

type Props = {
  modelPath: string
  clotLocations: ClotDataEntry[]
  onSelect: (id?: string) => void
}

function Hotspot({
  pos,
  label,
  id,
  onClick
}: {
  pos: [number, number, number]
  label: string
  id: string
  onClick: (id: string) => void
}) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshStandardMaterial color="red" />
      <Html distanceFactor={10} position={[0, 0.08, 0]}>
        <button
          onClick={() => onClick(id)}
          className="bg-white px-2 py-1 rounded text-xs shadow"
        >
          {label}
        </button>
      </Html>
    </mesh>
  )
}

function Model({ path }: { path: string }) {
  const gltf = useGLTF(path)

  // Improve rendering
  gltf.scene.traverse((obj: any) => {
    if (obj.isMesh) {
      obj.castShadow = true
      obj.receiveShadow = true
    }
  })

  return (
    <primitive
      object={gltf.scene}
      scale={0.05}
      position={[0, -1.5, 0]}
    />
  )
}

export default function AnatomyViewer({
  modelPath,
  clotLocations,
  onSelect
}: Props) {
  const hotspotMap = clotLocations.map(c => ({
    id: c.id,
    label: c.shortLabel || c.name,
    pos: c.position3D as [number, number, number]
  }))

  return (
    <Canvas
      camera={{ position: [0, 1.5, 3], fov: 45 }}
      shadows
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />

      <Suspense fallback={null}>
        <Model path={modelPath} />
        {hotspotMap.map(h => (
          <Hotspot
            key={h.id}
            id={h.id}
            pos={h.pos}
            label={h.label}
            onClick={onSelect}
          />
        ))}
      </Suspense>

      <OrbitControls
        enablePan
        enableZoom
        minDistance={1.5}
        maxDistance={6}
      />
    </Canvas>
  )
}
