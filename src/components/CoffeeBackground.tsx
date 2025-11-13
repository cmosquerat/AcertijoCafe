"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CoffeeBean {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  floatSpeed: number;
  opacity: number;
  delay: number;
  type: "bean" | "aeropress" | "v60" | "machine";
}

export default function CoffeeBackground() {
  const [items, setItems] = useState<CoffeeBean[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Handle window resize for responsive sizing
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Initialize coffee items
    const initItems = () => {
      const itemCount = 25;
      const newItems: CoffeeBean[] = [];

      // Coffee beans
      for (let i = 0; i < 15; i++) {
        newItems.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.6 + 0.7, // 0.7 to 1.3
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          floatSpeed: Math.random() * 0.2 + 0.15,
          opacity: Math.random() * 0.15 + 0.35, // 0.35 to 0.5
          delay: Math.random() * 1.5,
          type: "bean",
        });
      }

      // Aeropress
      for (let i = 15; i < 19; i++) {
        newItems.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.4 + 0.8, // 0.8 to 1.2
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          floatSpeed: Math.random() * 0.15 + 0.1,
          opacity: Math.random() * 0.1 + 0.25, // 0.25 to 0.35
          delay: Math.random() * 1.5,
          type: "aeropress",
        });
      }

      // V60
      for (let i = 19; i < 22; i++) {
        newItems.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.4 + 0.8, // 0.8 to 1.2
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          floatSpeed: Math.random() * 0.15 + 0.1,
          opacity: Math.random() * 0.1 + 0.25, // 0.25 to 0.35
          delay: Math.random() * 1.5,
          type: "v60",
        });
      }

      // Coffee machine
      for (let i = 22; i < 25; i++) {
        newItems.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.3 + 0.9, // 0.9 to 1.2
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          floatSpeed: Math.random() * 0.12 + 0.08,
          opacity: Math.random() * 0.08 + 0.22, // 0.22 to 0.3
          delay: Math.random() * 1.5,
          type: "machine",
        });
      }

      setItems(newItems);
    };

    initItems();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getImageSrc = (type: CoffeeBean["type"]) => {
    switch (type) {
      case "bean":
        return "/coffee-bean.svg";
      case "aeropress":
        return "/aeropress-brewing-methods-coffee-svgrepo-com.svg";
      case "v60":
        return "/brewing-methods-coffee-v60-svgrepo-com.svg";
      case "machine":
        return "/barista-coffee-coffee-machine-svgrepo-com.svg";
      default:
        return "/coffee-bean.svg";
    }
  };

  const getSize = (item: CoffeeBean) => {
    // Responsive sizes based on viewport width
    const baseSize = Math.min(windowSize.width, windowSize.height) / 10;
    
    switch (item.type) {
      case "bean":
        return item.size * Math.max(80, baseSize * 0.8);
      case "aeropress":
        return item.size * Math.max(100, baseSize * 1.0);
      case "v60":
        return item.size * Math.max(100, baseSize * 1.0);
      case "machine":
        return item.size * Math.max(120, baseSize * 1.2);
      default:
        return item.size * Math.max(80, baseSize * 0.8);
    }
  };

  return (
    <>
      {/* Simple background - logo matching color */}
      <div className="absolute inset-0 bg-[#1a365c] z-0" />

      {/* Coffee items container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[5] overflow-hidden"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 2s ease-in",
        }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: `${getSize(item)}px`,
              height: `${getSize(item)}px`,
              opacity: item.opacity,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: item.opacity,
              scale: 1,
              y: [
                0,
                -8 - Math.sin(item.id) * 3,
                0,
                6 + Math.cos(item.id) * 3,
                0,
              ],
              x: [
                0,
                Math.sin(item.id) * 4,
                0,
                -Math.sin(item.id) * 4,
                0,
              ],
              rotate: [
                item.rotation,
                item.rotation + 360 + (item.id % 2 === 0 ? 180 : 0),
              ],
            }}
            transition={{
              opacity: { duration: 1.5, delay: item.delay, ease: "easeOut" },
              scale: { duration: 1.5, delay: item.delay, ease: "easeOut" },
              y: {
                duration: item.type === "bean" ? 5 + item.id * 0.4 : 6 + item.id * 0.3,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut",
              },
              x: {
                duration: item.type === "bean" ? 7 + item.id * 0.3 : 8 + item.id * 0.25,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut",
              },
              rotate: {
                duration: item.type === "bean" ? 25 + item.id * 2 : 30 + item.id * 3,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <img
              src={getImageSrc(item.type)}
              alt={
                item.type === "bean"
                  ? "Coffee bean"
                  : item.type === "aeropress"
                  ? "Aeropress"
                  : item.type === "v60"
                  ? "V60"
                  : "Coffee machine"
              }
              className="w-full h-full object-contain"
              style={{
                filter: "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.25))",
                willChange: "transform",
              }}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
