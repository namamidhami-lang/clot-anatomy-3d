import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { ClotDataEntry } from '../types'

type Props = {
  modelPath: string
  clotLocations: ClotDataEntry[]
  onSelect: (id?: string) => void
}

function CenteredModel({ path }: { path: string }) {
  const gltf = useGLTF(path)
  const ref = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useEffect(() => {
    if (!ref.current) return

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(ref.current)
    const size = box.getSize(new THREE.Vector3()).length()
    const center = box.getCenter(new THREE.Vector3())

    // Center model
    ref.current.position.sub(center)

    // Scale to reasonable size
    const scale = 1 / size
    ref.current.scale.setScalar(scale * 2)

    // Move camera back correctly
    camera.position.set(0, 0, 3)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera])

  return <primitive ref={ref} object={gltf.scene} />
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
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial color="red" />
      <Html distanceFactor={10}>
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

export default function AnatomyViewer({
  modelPath,
  clotLocations,
  onSelect
}: Props) {
  return (
    <Canvas
      camera={{ fov: 50 }}
      style={{ background: '#f5f5f5' }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      <Suspense fallback={null}>
        <CenteredModel path={modelPath} />
        {clotLocations.map(c => (
          <Hotspot
            key={c.id}
            id={c.id}
            label={c.shortLabel || c.name}
            pos={c.position3D as [number, number, number]}
            onClick={onSelect}
          />
        ))}
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={1}
        maxDistance={6}
        target={[0, 0, 0]}
      />
    </Canvas>
  )
}
