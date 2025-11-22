import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

// REMOVED: import './LiquidChrome.css'; <-- Ensure this line is GONE

const LiquidChrome = ({
  baseColor = [0.1, 0.1, 0.1],
  speed = 0.2,
  amplitude = 0.3,
  interactive = true,
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const renderer = new Renderer({ antialias: true, alpha: true });
    const gl = renderer.gl;
    
    const vertexShader = `
      attribute vec2 position; attribute vec2 uv; varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uBaseColor;
      varying vec2 vUv;
      void main() {
          vec2 uv = vUv;
          float t = uTime * 0.5;
          float pattern = sin(uv.x * 10.0 + t) * sin(uv.y * 10.0 + t);
          vec3 color = uBaseColor + vec3(pattern * 0.2); 
          gl_FragColor = vec4(color, 1.0);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uBaseColor: { value: new Float32Array(baseColor) }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    }
    window.addEventListener('resize', resize);
    resize();

    let animationId;
    function update(t) {
      animationId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);
    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentElement) gl.canvas.parentElement.removeChild(gl.canvas);
    };
  }, [baseColor, speed]);

  return <div ref={containerRef} className="liquidChrome-container" style={{width:'100%', height:'100%'}} {...props} />;
};

export default LiquidChrome;