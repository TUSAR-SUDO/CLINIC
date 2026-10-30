"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { motion } from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { CLINIC } from "@/lib/clinic";

export interface LiquidMetalNavProps {
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function LiquidMetalNav({
  activeId = "skin",
  onSelect,
  className = "",
}: LiquidMetalNavProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState(activeId);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const rippleId = useRef(0);

  useEffect(() => {
    setActiveTab(activeId);
  }, [activeId]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const styleId = "shader-canvas-style-nav";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-nav canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-nav-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(3.5);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    let isMounted = true;

    const loadShader = async () => {
      try {
        if (shaderRef.current && isMounted) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          );
        }
      } catch (error) {
        console.error("[LiquidMetalNav] Failed to load shader:", error);
      }
    };

    loadShader();

    return () => {
      isMounted = false;
      if (shaderMount.current?.destroy) {
        try {
          shaderMount.current.destroy();
        } catch {}
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { label: string; href: string },
  ) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1);
        } else {
          shaderMount.current?.setSpeed?.(0.6);
        }
      }, 300);
    }

    if (navContainerRef.current) {
      const rect = navContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    const serviceKey = item.label.toLowerCase();
    setActiveTab(serviceKey);

    // Notify listeners / panels
    if (["dental", "skin", "hair", "pmu"].includes(serviceKey)) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("aesthedent:select-service", {
            detail: serviceKey,
          }),
        );
      }
      onSelect?.(serviceKey);
    }
  };

  return (
    <div
      ref={navContainerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "relative",
            minWidth: "480px",
            height: "46px",
            transformStyle: "preserve-3d",
            transition:
              "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            transform: "none",
          }}
        >
          {/* Top Layer: Navigation Links */}
          <nav
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "46px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
              gap: "2px",
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
              zIndex: 30,
            }}
            aria-label="Clinic sections"
          >
            {CLINIC.nav.map((link) => {
              const itemKey = link.label.toLowerCase();
              const isActive = activeTab === itemKey;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleItemClick(e, link)}
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "7px 15px",
                    borderRadius: "100px",
                    fontSize: "13.5px",
                    fontWeight: isActive ? 500 : 420,
                    letterSpacing: "-0.01em",
                    color: isActive ? "#ffffff" : "#cbbec6",
                    textShadow: isActive
                      ? "0px 1px 3px rgba(0, 0, 0, 0.8)"
                      : "0px 1px 2px rgba(0, 0, 0, 0.5)",
                    transition:
                      "color 0.3s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.3s ease",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="liquid-nav-indicator"
                      style={{
                        position: "absolute",
                        inset: "2px",
                        borderRadius: "100px",
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 100%)",
                        boxShadow:
                          "inset 0px 1px 1px rgba(255, 255, 255, 0.35), 0px 2px 6px rgba(0, 0, 0, 0.35)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        zIndex: -1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Middle Layer: Dark Metallic Aubergine Capsule Body */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "46px",
              transformStyle: "preserve-3d",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: "translateZ(10px)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "calc(100% - 4px)",
                height: "42px",
                margin: "2px",
                borderRadius: "100px",
                background:
                  "linear-gradient(180deg, #3A1530 0%, #170914 100%)",
                boxShadow:
                  "inset 0px 2px 4px rgba(0, 0, 0, 0.5), inset 0px 1px 1.5px rgba(255, 255, 255, 0.12)",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </div>

          {/* Bottom Layer: Liquid Metal WebGL Shader Rim */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "46px",
              transformStyle: "preserve-3d",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: "translateZ(0px)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                height: "46px",
                width: "100%",
                borderRadius: "100px",
                boxShadow: isHovered
                  ? "0px 0px 0px 1px rgba(58, 21, 48, 0.5), 0px 16px 24px 0px rgba(58, 21, 48, 0.28), 0px 4px 6px 0px rgba(0, 0, 0, 0.2)"
                  : "0px 0px 0px 1px rgba(58, 21, 48, 0.35), 0px 12px 20px -8px rgba(58, 21, 48, 0.35), 0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
                transition:
                  "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease",
                background: "rgb(0 0 0 / 0)",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container-nav"
                style={{
                  borderRadius: "100px",
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  height: "46px",
                }}
              />
            </div>
          </div>

          {/* Click Ripple Effect */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 35,
              borderRadius: "100px",
              overflow: "hidden",
              transform: "translateZ(25px)",
            }}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 70%)",
                  pointerEvents: "none",
                  animation: "ripple-nav-animation 0.6s ease-out",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiquidMetalNav;

