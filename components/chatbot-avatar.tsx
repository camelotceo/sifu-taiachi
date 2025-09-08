"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"

function Avatar() {
  return (
    <mesh position={[0, -0.5, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="#8fbc8f" />
      {/* Simple representation - in production, you'd load a 3D model */}
      <mesh position={[0, 0.3, 0.5]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#f4a460" />
      </mesh>
      <mesh position={[-0.2, 0.4, 0.6]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
      <mesh position={[0.2, 0.4, 0.6]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
    </mesh>
  )
}

export function ChatbotAvatar() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="soft" />
          <Avatar />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}
