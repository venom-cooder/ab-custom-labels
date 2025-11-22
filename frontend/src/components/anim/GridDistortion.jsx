import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// REMOVED: import './GridDistortion.css'; <-- Ensure this line is GONE

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// ... (Rest of the GridDistortion code remains the same)
// Just make sure that import line is deleted at the top!

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}`;

const GridDistortion = ({ grid = 15, mouse = 0.1, strength = 0.15, relaxation = 0.9, imageSrc, className = '' }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const planeRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTexture: { value: null },
      uDataTexture: { value: null }
    };

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, texture => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      uniforms.uTexture.value = texture;
      handleResize();
    });

    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = Math.random() * 255 - 125;
      data[i * 4 + 1] = Math.random() * 255 - 125;
    }

    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    planeRef.current = plane;
    scene.add(plane);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      if (plane) plane.scale.set(width, height, 1);
      
      const aspect = width / height;
      camera.left = -aspect; 
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      
      uniforms.resolution.value.set(width, height, 1, 1);
    };

    window.addEventListener('resize', handleResize);
    
    const mouseState = { x: 0, y: 0, vX: 0, vY: 0, prevX: 0, prevY: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouseState.vX = x - mouseState.prevX;
      mouseState.vY = y - mouseState.prevY;
      mouseState.x = x;
      mouseState.y = y;
      mouseState.prevX = x;
      mouseState.prevY = y;
    };

    container.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;

      const data = dataTexture.image.data;
      for (let i = 0; i < size * size; i++) {
        data[i * 4] *= relaxation;
        data[i * 4 + 1] *= relaxation;
      }

      const gridMouseX = size * mouseState.x;
      const gridMouseY = size * mouseState.y;
      const maxDist = size * mouse;

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
          if (distSq < maxDist * maxDist) {
            const index = 4 * (i + size * j);
            const power = Math.min(maxDist / Math.sqrt(distSq), 10);
            data[index] += strength * 100 * mouseState.vX * power;
            data[index + 1] -= strength * 100 * mouseState.vY * power;
          }
        }
      }
      dataTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, [grid, mouse, strength, relaxation, imageSrc]);

  return <div ref={containerRef} className={`distortion-container ${className}`} />;
};

export default GridDistortion;