// Adapted from MengTo/threeui (MIT). See LICENSE and README in this directory.
import { useEffect, useRef } from 'react';
import { RIBBON_FIELD_FRAGMENT_SHADER, RIBBON_FIELD_VERTEX_SHADER } from './ribbonFieldShaders';

export default function RibbonFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let frame = 0;
    let visible = true;
    let lost = false;
    let previous = 0;
    const dispose = () => {
      cancelAnimationFrame(frame);
      if (buffer) gl.deleteBuffer(buffer);
      for (const shader of shaders) gl.deleteShader(shader);
      if (program) gl.deleteProgram(program);
    };
    try {
      for (const [type, source] of [[gl.VERTEX_SHADER, RIBBON_FIELD_VERTEX_SHADER], [gl.FRAGMENT_SHADER, RIBBON_FIELD_FRAGMENT_SHADER]] as const) {
        const shader = gl.createShader(type);
        if (!shader) throw new Error('Shader unavailable');
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Shader unavailable');
      }
      program = gl.createProgram();
      if (!program) throw new Error('Program unavailable');
      shaders.forEach(shader => gl.attachShader(program!, shader));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Program unavailable');
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      const resolution = gl.getUniformLocation(program, 'resolution');
      const time = gl.getUniformLocation(program, 'time');
      gl.uniform2f(gl.getUniformLocation(program, 'pointer'), 0.72, 0.42);
      const resize = () => {
        const bounds = canvas.getBoundingClientRect();
        const ratio = Math.min(devicePixelRatio || 1, 1.25);
        canvas.width = Math.max(1, Math.round(bounds.width * ratio));
        canvas.height = Math.max(1, Math.round(bounds.height * ratio));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resolution, canvas.width, canvas.height);
      };
      const render = (now: number) => {
        frame = 0;
        if (!visible || document.hidden || lost) return;
        if (now - previous >= 1000 / 30) {
          gl.uniform1f(time, now * 0.00018);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          canvas.style.opacity = '1';
          previous = now;
        }
        frame = requestAnimationFrame(render);
      };
      const sync = () => {
        if (visible && !document.hidden && !lost && !frame) frame = requestAnimationFrame(render);
        else if (!visible || document.hidden || lost) { cancelAnimationFrame(frame); frame = 0; }
      };
      const onLost = () => { lost = true; canvas.style.opacity = '0'; sync(); };
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
      const resizeObserver = new ResizeObserver(resize);
      observer.observe(canvas);
      resizeObserver.observe(canvas);
      document.addEventListener('visibilitychange', sync);
      canvas.addEventListener('webglcontextlost', onLost);
      resize(); sync();
      return () => {
        observer.disconnect(); resizeObserver.disconnect();
        document.removeEventListener('visibilitychange', sync);
        canvas.removeEventListener('webglcontextlost', onLost);
        dispose();
      };
    } catch { dispose(); }
  }, []);
  return <canvas ref={canvasRef} className="invitation-ribbons" aria-hidden="true" />;
}
