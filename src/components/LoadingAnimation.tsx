'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useStore } from '@/lib/store';

interface LoadingAnimationProps {
  onComplete: () => void;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cakeRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1410);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 1.5);
    pointLight.position.set(5, 5, 5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xff69b4, 1);
    spotLight.position.set(-5, 3, 3);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Create 3D Cake
    const cakeGroup = new THREE.Group();
    cakeRef.current = cakeGroup;

    // Cake base (cylinder)
    const cakeGeometry = new THREE.CylinderGeometry(1.2, 1.3, 0.8, 32);
    const cakeMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b4513,
      shininess: 100,
      emissive: 0x4a2511,
    });
    const cake = new THREE.Mesh(cakeGeometry, cakeMaterial);
    cake.castShadow = true;
    cake.receiveShadow = true;
    cakeGroup.add(cake);

    // Frosting layer
    const frostingGeometry = new THREE.CylinderGeometry(1.25, 1.35, 0.2, 32);
    const frostingMaterial = new THREE.MeshPhongMaterial({
      color: 0xfffacd,
      shininess: 120,
      emissive: 0xe8d5b7,
    });
    const frosting = new THREE.Mesh(frostingGeometry, frostingMaterial);
    frosting.position.y = 0.5;
    frosting.castShadow = true;
    frosting.receiveShadow = true;
    cakeGroup.add(frosting);

    // Cherries on top
    const cherryGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const cherryMaterial = new THREE.MeshPhongMaterial({
      color: 0xff1744,
      shininess: 110,
    });

    for (let i = 0; i < 5; i++) {
      const cherry = new THREE.Mesh(cherryGeometry, cherryMaterial);
      const angle = (i / 5) * Math.PI * 2;
      cherry.position.set(
        Math.cos(angle) * 0.8,
        0.65,
        Math.sin(angle) * 0.8
      );
      cherry.castShadow = true;
      cakeGroup.add(cherry);
    }

    // Chocolate drip
    const dripGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const dripGeometry = new THREE.ConeGeometry(0.05, 0.5, 16);
      const dripMaterial = new THREE.MeshPhongMaterial({
        color: 0x3e2723,
        shininess: 80,
      });
      const drip = new THREE.Mesh(dripGeometry, dripMaterial);
      const angle = (i / 4) * Math.PI * 2;
      drip.position.set(
        Math.cos(angle) * 1.2,
        0.4,
        Math.sin(angle) * 1.2
      );
      drip.scale.set(1, 0, 1);
      dripGroup.add(drip);
    }
    cakeGroup.add(dripGroup);

    scene.add(cakeGroup);

    // Particle system for cream particles
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6;

      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = Math.random() * 0.01;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.userData.velocity = velocities;

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xfffacd,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    particlesRef.current = particleSystem;
    scene.add(particleSystem);

    // Animate Cake Rotation
    gsap.to(cakeGroup.rotation, {
      y: Math.PI * 4,
      duration: 6,
      ease: 'sine.inOut',
    });

    // Animate Chocolate Drips
    dripGroup.children.forEach((drip, index) => {
      gsap.to(drip.scale, {
        y: 1,
        duration: 2,
        delay: 1 + index * 0.2,
        ease: 'back.out',
      });
    });

    // Animate Frosting shimmer
    gsap.to(frostingMaterial, {
      emissive: new THREE.Color(0xffd700),
      duration: 1,
      repeat: 3,
      yoyo: true,
    });

    // Loading text animation
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
      gsap.to(loadingText, {
        opacity: 0.5,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
      });
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate cake
      if (cakeRef.current) {
        cakeRef.current.rotation.y += 0.001;
      }

      // Update particles
      if (particlesRef.current) {
        const posAttr = particlesRef.current.geometry.getAttribute('position');
        const pos = posAttr.array as Float32Array;
        const vel = particlesRef.current.geometry.userData.velocity;

        for (let i = 0; i < particleCount * 3; i += 3) {
          pos[i] += vel[i];
          pos[i + 1] += vel[i + 1];
          pos[i + 2] += vel[i + 2];

          // Reset particles that go too far
          if (Math.abs(pos[i]) > 3 || Math.abs(pos[i + 1]) > 3 || Math.abs(pos[i + 2]) > 3) {
            pos[i] = (Math.random() - 0.5) * 6;
            pos[i + 1] = (Math.random() - 0.5) * 6;
            pos[i + 2] = (Math.random() - 0.5) * 6;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Complete animation after 5 seconds
    setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsComplete(true);
          onComplete();
          renderer.dispose();
          cancelAnimationFrame(animationFrameId);
        },
      });
    }, 5000);

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-gradient-to-b from-[#1a1410] to-[#2d2419] flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#ffd700]/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#ff69b4]/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="loading-text text-center z-10">
        <h2 className="text-3xl font-light text-[#fffacd] tracking-widest mb-2">
          Baked Fresh
        </h2>
        <p className="text-sm text-[#d4a574] tracking-[0.2em]">Loading Premium Experience</p>
      </div>
    </div>
  );
};