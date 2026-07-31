import { useState, Suspense, useEffect, useCallback, lazy } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { Preload, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import Preloader from './components/dom/Preloader';
import PaperTransition from './components/dom/PaperTransition';
import { AudioProvider, useAudio } from './context/AudioManager';
import { initAudio } from './utils/audioManager';
import { PerformanceProvider, usePerformance } from './context/PerformanceContext';
import { SceneProvider, useScene } from './context/SceneContext';
import NavigationUI from './components/ui/NavigationUI';
import GlobalOverlay from './components/ui/GlobalOverlay';
import ScreenReaderOverlay from './components/ui/ScreenReaderOverlay';
import { useDocumentMeta } from './hooks/useDocumentMeta';

// Lazy load the heavy 3D experience
const Experience = lazy(() => import('./components/canvas/Experience'));

import './styles/main.scss';

import { 
  ENTRANCE_TEXTURES, 
  CORRIDOR_TEXTURES, 
  UI_TEXTURES,
  PRELOAD_ALL, 
  PRELOAD_LOADER,
  ABOUT_TEXTURES,
  IMAGE_ASSETS,
  filterTexturesByDevice
} from './config/texturePreloadList';
import { TextureLoader } from 'three';

// Standard Browser-level Image Preloader (for <img> tags)
const preloadBrowserImage = (path) => {
  if (typeof window === 'undefined') return;
  const img = new Image();
  img.src = path;
};

const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || '');
const isWeakCPU = typeof navigator.hardwareConcurrency !== 'undefined' && navigator.hardwareConcurrency <= 4;
const isLowRAM = typeof navigator.deviceMemory !== 'undefined' && navigator.deviceMemory <= 4;
const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 450;
const isLowEnd = isMobileDevice || isWeakCPU || isLowRAM || isSmallScreen;

const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

// Trigger Three.js preloads at module level (as standard for Drei)
if (isLowEnd) {
  const CORE_TEXTURES = [...ENTRANCE_TEXTURES, ...CORRIDOR_TEXTURES, ...UI_TEXTURES, ...IMAGE_ASSETS];
  const filteredCore = filterTexturesByDevice(CORE_TEXTURES, supportsHover);
  const filteredAbout = filterTexturesByDevice(ABOUT_TEXTURES, supportsHover);

  filteredCore.forEach(path => useTexture.preload(path));
  filteredAbout.forEach(path => useLoader.preload(TextureLoader, path));
} else {
  const filteredAll = filterTexturesByDevice(PRELOAD_ALL, supportsHover);
  const filteredLoader = filterTexturesByDevice(PRELOAD_LOADER, supportsHover);
  
  filteredAll.forEach(path => useTexture.preload(path));
  filteredLoader.forEach(path => useLoader.preload(TextureLoader, path));
}

// Helper component to handle global audio enable on interaction
const GlobalAudioEnabler = () => {
  const { enableAudio } = useAudio();
  useEffect(() => {
    const handleInteraction = () => enableAudio();
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [enableAudio]);
  return null;
};

// Bridge component to handle dynamic meta tags + deep link auto-teleport
function DocumentMetaBridge() {
  useDocumentMeta();
  const { initialRoom, deeplinkHandled, hasEntered, teleportTo } = useScene();

  useEffect(() => {
    if (initialRoom && hasEntered && !deeplinkHandled.current) {
      deeplinkHandled.current = true;
      setTimeout(() => teleportTo(initialRoom), 300);
    }
  }, [initialRoom, hasEntered, teleportTo, deeplinkHandled]);

  return null;
}

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const { settings, downgradeTier, tier } = usePerformance();

  useEffect(() => {
    initAudio();
  }, []);

  const handleSceneReady = useCallback(() => {
    requestAnimationFrame(() => {
      setSceneReady(true);
    });
  }, []);

  return (
    <AudioProvider>
      <SceneProvider>
        <DocumentMetaBridge />
        <GlobalAudioEnabler />
        <div className="app">
          {/* Full screen 3D Canvas */}
          <div className="canvas-wrapper">
            <Canvas
              camera={{
                position: [0, 0.2, 28],
                fov: 60,
                near: 0.1,
                far: 150
              }}
              gl={{
                antialias: settings.antialias,
                alpha: false,
                powerPreference: settings.powerPreference,
                localClippingEnabled: true,
                failIfMajorPerformanceCaveat: true
              }}
              dpr={settings.dpr}
              shadows={settings.shadows}
            >
              <color attach="background" args={['#fdf8e2']} /> {/* TINTED TO DEEP PURPLE */}
              <fog attach="fog" args={['#fdf8e2', 15, 50]} /> {/* FOG TINTED TO DEEP PURPLE */}

              <Suspense fallback={null}>
                <Experience
                  isLoaded={isLoaded}
                  onSceneReady={handleSceneReady}
                  performanceTier={tier}
                />
                <Preload all />
              </Suspense>
            </Canvas>
          </div>

          {/* Navigation UI - Hamburger, Map, Back, Audio */}
          {isLoaded && (
            <>
              <NavigationUI />
              <GlobalOverlay />
              <PaperTransition />
              <ScreenReaderOverlay />
            </>
          )}

          {/* 2D Preloader */}
          <Preloader
            ready={sceneReady}
            onComplete={() => setIsLoaded(true)}
          />
        </div>
      </SceneProvider>
    </AudioProvider>
  );
}

import { AchievementsProvider } from './context/AchievementsContext';

export default function App() {
  useEffect(() => {
    const filteredImages = filterTexturesByDevice(IMAGE_ASSETS, supportsHover);
    filteredImages.forEach(path => preloadBrowserImage(path));
  }, []);

  return (
    <PerformanceProvider>
      <AchievementsProvider>
        <AppContent />
      </AchievementsProvider>
    </PerformanceProvider>
  );
}
