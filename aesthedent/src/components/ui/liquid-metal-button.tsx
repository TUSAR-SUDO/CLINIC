"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles, ArrowRight } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

export interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  viewMode?: "text" | "icon";
  width?: number;
  height?: number;
  variant?: "aubergine" | "cream" | "dark" | "default";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
  width: customWidth,
  height: customHeight,
  variant = "aubergine",
  icon,
  children,
  className = "",
  ariaLabel,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const dimensions = useMemo(() => {
    if (viewMode === "icon") {
      const h = customHeight || 44;
      const w = customWidth || 44;
      return {
        width: w,
        height: h,
        innerWidth: w - 4,
        innerHeight: h - 4,
        shaderWidth: w,
        shaderHeight: h,
      };
    } else {
      const h = customHeight || 44;
      const w =
        customWidth ||
        (label.length > 8 ? Math.round(Math.max(142, label.length * 8.6 + 38)) : 142);
      return {
        width: w,
        height: h,
        innerWidth: w - 4,
        innerHeight: h - 4,
        shaderWidth: w,
        shaderHeight: h,
      };
    }
  }, [viewMode, customWidth, customHeight, label]);

  const isCream = variant === "cream";
  const isDark = variant === "dark";

  useEffect(() => {
    if (typeof document === "undefined") return;

    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
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
              u_scale: 1,
              u_shape: 0,
              u_fit: 2,
              u_offsetX: 0,
              u_offsetY: 0,
            },
            undefined,
            0.6,
          );
        }
      } catch (error) {
        console.error("[LiquidMetalButton] Failed to load shader:", error);
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
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.();
  };

  // Theming
  const textColor = isCream ? "#3A1530" : "#f3eee8";
  const bgGradient = isCream
    ? "linear-gradient(180deg, #FFFFFF 0%, #F5EFEB 100%)"
    : isDark
      ? "linear-gradient(180deg, #202020 0%, #000000 100%)"
      : "linear-gradient(180deg, #3A1530 0%, #1f0b1a 100%)";

  const outerShadow = isCream
    ? isPressed
      ? "0px 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 1px 2px 0px rgba(0, 0, 0, 0.15)"
      : isHovered
        ? "0px 0px 0px 1px rgba(58, 21, 48, 0.2), 0px 10px 18px 0px rgba(0, 0, 0, 0.12), 0px 3px 6px 0px rgba(0, 0, 0, 0.08)"
        : "0px 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 8px 16px -6px rgba(0, 0, 0, 0.1)"
    : isPressed
      ? "0px 0px 0px 1px rgba(58, 21, 48, 0.5), 0px 1px 2px 0px rgba(0, 0, 0, 0.4)"
      : isHovered
        ? "0px 0px 0px 1px rgba(58, 21, 48, 0.5), 0px 12px 16px 0px rgba(58, 21, 48, 0.25), 0px 4px 6px 0px rgba(0, 0, 0, 0.2)"
        : "0px 0px 0px 1px rgba(58, 21, 48, 0.3), 0px 10px 20px -8px rgba(58, 21, 48, 0.35)";

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "relative",
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            transformStyle: "preserve-3d",
            transition:
              "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            transform: "none",
          }}
        >
          {/* Text & Icon Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transformStyle: "preserve-3d",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, gap 0.4s ease",
              transform: "translateZ(20px)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            {children ? (
              children
            ) : viewMode === "icon" ? (
              icon ? (
                icon
              ) : (
                <Sparkles
                  size={16}
                  style={{
                    color: textColor,
                    filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))",
                    transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transform: "scale(1)",
                  }}
                />
              )
            ) : (
              <span
                style={{
                  fontSize: "13.2px",
                  color: textColor,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  textShadow: isCream
                    ? "none"
                    : "0px 1px 3px rgba(0, 0, 0, 0.7)",
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: "scale(1)",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                {label}
                {icon || (
                  <ArrowRight
                    size={14}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    style={{
                      transition: "transform 0.3s ease",
                      transform: isHovered ? "translateX(2px)" : "none",
                    }}
                  />
                )}
              </span>
            )}
          </div>

          {/* Background Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
              transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: `${dimensions.innerWidth}px`,
                height: `${dimensions.innerHeight}px`,
                margin: "2px",
                borderRadius: "100px",
                background: bgGradient,
                boxShadow: isPressed
                  ? isCream
                    ? "inset 0px 2px 4px rgba(0, 0, 0, 0.2)"
                    : "inset 0px 2px 4px rgba(0, 0, 0, 0.6), inset 0px 1px 2px rgba(0, 0, 0, 0.4)"
                  : isCream
                    ? "inset 0px 1px 1.5px rgba(255, 255, 255, 1)"
                    : "inset 0px 1px 1px rgba(255, 255, 255, 0.15)",
                transition:
                  "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>

          {/* WebGL Shader Rim Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
              transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                height: `${dimensions.height}px`,
                width: `${dimensions.width}px`,
                borderRadius: "100px",
                boxShadow: outerShadow,
                transition:
                  "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                background: "rgb(0 0 0 / 0)",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container-exploded"
                style={{
                  borderRadius: "100px",
                  overflow: "hidden",
                  position: "relative",
                  width: `${dimensions.shaderWidth}px`,
                  maxWidth: `${dimensions.shaderWidth}px`,
                  height: `${dimensions.shaderHeight}px`,
                  transition: "width 0.4s ease, height 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* Ripple Click Layer */}
          <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none",
              zIndex: 40,
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
              overflow: "hidden",
              borderRadius: "100px",
            }}
            aria-label={ariaLabel || label}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: isCream
                    ? "radial-gradient(circle, rgba(58, 21, 48, 0.25) 0%, rgba(58, 21, 48, 0) 70%)"
                    : "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
                  pointerEvents: "none",
                  animation: "ripple-animation 0.6s ease-out",
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LiquidMetalButton;
