import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Zap, Shield, Brain, LineChart, Lock, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function EvolutionGlitch() {
  const { state, dispatch } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [glitchPhase, setGlitchPhase] = useState(0);
  
  const shouldTrigger = state.billTotal >= 3000 && !state.isCommanderUnlocked;
  
  useEffect(() => {
    if (shouldTrigger && !isPlaying) {
      triggerEvolution();
    }
  }, [shouldTrigger]);
  
  const playBassSound = useCallback(() => {
    // Create bass sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillator for bass
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(55, audioContext.currentTime); // Low bass A
    
    // Add some rumble
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(40, audioContext.currentTime);
    
    // Fade in and out
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.8, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
    
    gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode2.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.1);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.8);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.5);
    oscillator2.start(audioContext.currentTime);
    oscillator2.stop(audioContext.currentTime + 1.8);
    
    // Add some high frequency sweep
    const oscillator3 = audioContext.createOscillator();
    const gainNode3 = audioContext.createGain();
    oscillator3.connect(gainNode3);
    gainNode3.connect(audioContext.destination);
    oscillator3.type = 'sawtooth';
    oscillator3.frequency.setValueAtTime(200, audioContext.currentTime + 0.5);
    oscillator3.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 1.5);
    
    gainNode3.gain.setValueAtTime(0, audioContext.currentTime + 0.5);
    gainNode3.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.8);
    gainNode3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
    
    oscillator3.start(audioContext.currentTime + 0.5);
    oscillator3.stop(audioContext.currentTime + 1.5);
  }, []);
  
  const triggerEvolution = async () => {
    setIsPlaying(true);
    
    // Play bass sound
    playBassSound();
    
    // Start glitch phases
    for (let i = 0; i < 4; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setGlitchPhase(i);
    }
    
    // Unlock Commander
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch({ type: 'UNLOCK_COMMANDER' });
    
    // End animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsPlaying(false);
    dispatch({ type: 'COMPLETE_EVOLUTION' });
  };
  
  const handleDismiss = () => {
    setIsPlaying(false);
    dispatch({ type: 'COMPLETE_EVOLUTION' });
  };
  
  if (!isPlaying && !state.isCommanderUnlocked) return null;
  
  return (
    <AnimatePresence>
      {(isPlaying || state.isCommanderUnlocked) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          {/* Glitch Overlay Background */}
          <div className="absolute inset-0 bg-black/90">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px]" />
            
            {/* Purple Glitch Effect */}
            {isPlaying && (
              <>
                <motion.div
                  animate={{
                    x: [-10, 10, -5, 5, 0],
                    opacity: [0, 1, 0.5, 1, 0],
                  }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="absolute inset-0 bg-purple-600/20 mix-blend-screen"
                />
                <motion.div
                  animate={{
                    x: [10, -10, 5, -5, 0],
                    opacity: [0, 0.8, 0.3, 0.8, 0],
                  }}
                  transition={{ duration: 0.4, repeat: 3 }}
                  className="absolute inset-0 bg-cyan-600/20 mix-blend-screen"
                />
                
                {/* RGB Split Effect */}
                <motion.div
                  animate={{ 
                    textShadow: [
                      '-2px 0 #ff0000, 2px 0 #00ffff',
                      '2px 0 #ff0000, -2px 0 #00ffff',
                      '-1px 0 #ff0000, 1px 0 #00ffff',
                      '0 0',
                    ]
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                />
              </>
            )}
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            {isPlaying ? (
              <>
                {/* Evolution Text */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [0.5, 1.2, 1], opacity: [0, 1, 1] }}
                  transition={{ duration: 2 }}
                  className="relative"
                >
                  <h1 className="text-6xl md:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 animate-pulse">
                    KRYNOX CORE
                  </h1>
                  <h2 className="text-4xl md:text-6xl font-bold text-cyan-400 mt-4 tracking-[0.5em]">
                    EVOLVING...
                  </h2>
                  
                  {/* Glitch Lines */}
                  <motion.div
                    animate={{ y: [-100, 100] }}
                    transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent h-20"
                  />
                </motion.div>
                
                {/* Loading Indicators */}
                <motion.div 
                  className="mt-12 flex justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-4 h-4 rounded-full bg-purple-500"
                    />
                  ))}
                </motion.div>
              </>
            ) : (
              // Unlock Success Screen
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-purple-900/80 to-black/90 p-12 rounded-3xl border-2 border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.5)]"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-6"
                >
                  <Crown className="w-20 h-20 text-yellow-400" />
                </motion.div>
                
                <h2 className="text-4xl font-bold text-white mb-4">
                  AI COMMANDER UNLOCKED
                </h2>
                
                <p className="text-purple-300 text-lg mb-8 max-w-md">
                  Your KRYNOX CORE has evolved. Access the Elite Tier features now available in your sidebar.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDismiss}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-white flex items-center gap-2 mx-auto"
                >
                  <Sparkles className="w-5 h-5" />
                  ENTER COMMAND CENTER
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </div>
          
          {/* Noise/Static Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bW9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
