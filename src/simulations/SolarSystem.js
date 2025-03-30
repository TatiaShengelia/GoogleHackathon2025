import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Navbar from '../navigationbar/Navbar';

const SolarSystem = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    let animationFrameId;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // Renderer config
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 7;
    camera.position.y = 1;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Skybox
    const skyGeometry = new THREE.SphereGeometry(400, 32, 32);
    const skyMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('/img/stars.jpg'),
      side: THREE.DoubleSide
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sunMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('/img/sunmap.jpg'),
      emissive: 0xffaa00,
      emissiveIntensity: 0.7,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    const sunLight = new THREE.PointLight(0xFFFFFF, 40, 100000000);
    sun.add(sunLight);

    // Planets configuration
    const planets = [
      { name: 'mercury', size: 0.2, texture: 'mercurymap.jpg', orbitRadius: 4, speed: 0.002 },
      { name: 'venus', size: 0.4, texture: 'venusmap.jpg', orbitRadius: 6, speed: 0.0008 },
      { name: 'earth', size: 0.5, texture: 'earthmap.jpg', orbitRadius: 8, speed: 0.0006 },
      { name: 'mars', size: 0.35, texture: 'marsmap.jpg', orbitRadius: 10, speed: 0.0003 },
      { name: 'jupiter', size: 1, texture: 'jupitermap.jpg', orbitRadius: 16, speed: 0.0001 },
      { name: 'saturn', size: 0.7, texture: 'saturnmap.jpg', orbitRadius: 20, speed: 0.00009, ring: true },
      { name: 'uranus', size: 0.7, texture: 'uranusmap.jpg', orbitRadius: 26, speed: 0.00007, ring: true },
      { name: 'neptune', size: 0.5, texture: 'neptunemap.jpg', orbitRadius: 30, speed: 0.00005 }
    ];

    // Create planets
    const planetMeshes = planets.map(planet => {
      const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(`/img/${planet.texture}`)
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      if (planet.ring) {
        const ringGeometry = new THREE.RingGeometry(0.9, 1.3, 30);
        const ringMaterial = new THREE.MeshLambertMaterial({
          map: new THREE.TextureLoader().load(
            `/img/${planet.name === 'saturn' ? 'saturnring.png' : 'uranusring.jpg'}`
          ),
          side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }
      
      scene.add(mesh);
      return { ...planet, mesh };
    });

    // Create orbits
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xc8c8c8, transparent: true, opacity: 0.05 });
    planetMeshes.forEach(({ orbitRadius }) => {
      const orbit = createOrbit(orbitRadius);
      scene.add(orbit);
    });

    function createOrbit(radius) {
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        ));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return new THREE.LineLoop(geometry, orbitMaterial);
    }

    // Animation
    const animate = () => {
      controls.update();
      
      planetMeshes.forEach(planet => {
        planet.mesh.rotation.y += 0.01;
        const angle = Date.now() * planet.speed;
        planet.mesh.position.x = Math.cos(angle) * planet.orbitRadius;
        planet.mesh.position.z = Math.sin(angle) * planet.orbitRadius;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      scene.traverse(child => {
        if (child.isMesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    };
  }, []);

  return (
    <>
    <Navbar />
    <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
    </>
  );
};

export default SolarSystem;