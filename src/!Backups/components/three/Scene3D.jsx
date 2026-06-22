import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Grid } from '@react-three/drei';

function CarModel() {
  try {
    // Carrega o arquivo do carro da pasta public/models/car.glb
    const { scene } = useGLTF('/models/car.glb');
    return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
  } catch (error) {
    // Caso o arquivo car.glb ainda não esteja lá, renderiza um bloco provisório
    return (
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.2, 0.7, 1.1]} />
        <meshStandardMaterial color="#1f222a" roughness={0.3} metalness={0.8} />
      </mesh>
    );
  }
}

export default function Scene3D() {
  return (
    <div className="w-full h-[400px] md:h-[550px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 1.2, 3.8], fov: 45 }}>
        {/* Iluminação ambiente controlada */}
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
        
        <Suspense fallback={null}>
          {/* O Stage cuida de sombras de contato e luzes de estúdio profissionais automaticamente */}
          <Stage intensity={0.6} environment="city" adjustCamera={false}>
            <CarModel />
          </Stage>
          
          {/* Grid de showroom neon vermelho embaixo do carro */}
          <Grid
            renderOrder={-1}
            position={[0, -0.01, 0]}
            args={[10, 10]}
            cellSize={0.4}
            cellThickness={0.8}
            cellColor="#1f1f24"
            sectionSize={2}
            sectionThickness={1.2}
            sectionColor="#e30613"
            fadeDistance={8}
          />
        </Suspense>

        {/* Controles da câmera */}
        <OrbitControls 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 2.1} // Bloqueia a câmera para não descer abaixo do chão
          minDistance={2}
          maxDistance={7}
        />
      </Canvas>
    </div>
  );
}