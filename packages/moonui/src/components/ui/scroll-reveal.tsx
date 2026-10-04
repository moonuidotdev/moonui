"use client"

import * as React from "react"
import { motion, Variants, Transition, UseInViewOptions } from "framer-motion"
import { cn } from "../../lib/utils"

/**
 * ScrollReveal Component
 *
 * Reveals content with smooth animations when scrolling into view
 * Built with Framer Motion for performance and flexibility
 *
 * @example
 * ```tsx
 * <ScrollReveal direction="up" delay={0.2}>
 *   <Card>Your content</Card>
 * </ScrollReveal>
 * ```
 */

interface ScrollRevealProps {
  /** Content to reveal */
  children: React.ReactNode
  /** Animation direction */
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale" | "blur"
  /** Animation delay in seconds */
  delay?: number
  /** Animation duration in seconds */
  duration?: number
  /** Distance to animate from (pixels) */
  distance?: number
  /** Viewport threshold for trigger (0-1) */
  threshold?: number
  /** Trigger animation only once */
  once?: boolean
  /** Deprecated: Use 'once' instead */
  triggerOnce?: boolean
  /** Stagger delay for multiple children (deprecated: use ScrollRevealContainer) */
  stagger?: number
  /** Additional CSS classes */
  className?: string
  /** Custom animation variants */
  variants?: Variants
  /** Enable/disable animations */
  animate?: boolean
  /** Custom styles */
  style?: React.CSSProperties
  /** Element ID */
  id?: string
  /** Viewport options for intersection observer */
  viewport?: UseInViewOptions
}

// Default animation variants with professional easing
const createDefaultVariants = (direction: string, distance: number): Variants => {
  const baseVariants: Record<string, Variants> = {
    up: {
      hidden: { opacity: 0, y: distance },
      visible: { opacity: 1, y: 0 }
    },
    down: {
      hidden: { opacity: 0, y: -distance },
      visible: { opacity: 1, y: 0 }
    },
    left: {
      hidden: { opacity: 0, x: distance },
      visible: { opacity: 1, x: 0 }
    },
    right: {
      hidden: { opacity: 0, x: -distance },
      visible: { opacity: 1, x: 0 }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.85 },
      visible: { opacity: 1, scale: 1 }
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" }
    }
  }

  return baseVariants[direction] || baseVariants.up
}

// Professional easing curve
const defaultTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth motion
}

const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({
    children,
    direction = "up",
    delay = 0,
    duration = 0.5,
    distance = 50,
    threshold = 0.3, // Increased from 0.1 for better visibility
    once = true,
    triggerOnce, // Backward compatibility
    stagger = 0,
    className,
    variants,
    animate = true,
    style,
    id,
    viewport
  }, ref) => {
    // Handle backward compatibility
    const shouldTriggerOnce = triggerOnce !== undefined ? triggerOnce : once

    // Get animation variants
    const animationVariants = React.useMemo(() => {
      if (variants) return variants
      return createDefaultVariants(direction, distance)
    }, [direction, distance, variants])

    // Transition configuration
    const transition = React.useMemo<Transition>(() => ({
      ...defaultTransition,
      duration,
      delay: delay + stagger,
    }), [duration, delay, stagger])

    // Viewport configuration
    const viewportConfig = React.useMemo<UseInViewOptions>(() => ({
      once: shouldTriggerOnce,
      amount: threshold,
      ...viewport
    }), [shouldTriggerOnce, threshold, viewport])

    // If animations are disabled, render children in a regular div
    if (!animate) {
      return (
        <div
          ref={ref}
          className={className}
          style={style}
          id={id}
        >
          {children}
        </div>
      )
    }

    // Render with Framer Motion using whileInView pattern
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={animationVariants}
        transition={transition}
        className={cn(className)}
        style={style}
        id={id}
      >
        {children}
      </motion.div>
    )
  }
)

ScrollReveal.displayName = "ScrollReveal"

/**
 * ScrollRevealContainer Component
 *
 * Container for orchestrating staggered scroll reveal animations
 * Uses Framer Motion's staggerChildren for better performance
 *
 * @example
 * ```tsx
 * <ScrollRevealContainer stagger={0.1}>
 *   <ScrollRevealItem>Item 1</ScrollRevealItem>
 *   <ScrollRevealItem>Item 2</ScrollRevealItem>
 * </ScrollRevealContainer>
 * ```
 */

interface ScrollRevealContainerProps {
  /** ScrollRevealItem components */
  children: React.ReactNode
  /** Delay between child animations (seconds) */
  stagger?: number
  /** Additional CSS classes */
  className?: string
  /** Custom styles */
  style?: React.CSSProperties
  /** Element ID */
  id?: string
  /** Viewport threshold for trigger (0-1) */
  threshold?: number
  /** Trigger animation only once */
  once?: boolean
  /** Deprecated: Use 'once' instead */
  triggerOnce?: boolean
  /** Viewport options for intersection observer */
  viewport?: UseInViewOptions
}

const ScrollRevealContainer = React.forwardRef<HTMLDivElement, ScrollRevealContainerProps>(
  ({
    children,
    stagger = 0.1,
    className,
    style,
    id,
    threshold = 0.3,
    once = true,
    triggerOnce,
    viewport
  }, ref) => {
    // Handle backward compatibility
    const shouldTriggerOnce = triggerOnce !== undefined ? triggerOnce : once

    // Viewport configuration
    const viewportConfig = React.useMemo<UseInViewOptions>(() => ({
      once: shouldTriggerOnce,
      amount: threshold,
      ...viewport
    }), [shouldTriggerOnce, threshold, viewport])

    // Container variants for staggered children
    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
          delayChildren: 0
        }
      }
    }

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={containerVariants}
        className={cn(className)}
        style={style}
        id={id}
      >
        {children}
      </motion.div>
    )
  }
)

ScrollRevealContainer.displayName = "ScrollRevealContainer"

/**
 * ScrollRevealItem Component
 *
 * Individual item within a ScrollRevealContainer
 * Automatically inherits timing from parent container
 *
 * @example
 * ```tsx
 * <ScrollRevealItem direction="up">
 *   <Card>Item content</Card>
 * </ScrollRevealItem>
 * ```
 */

interface ScrollRevealItemProps {
  /** Content to animate */
  children: React.ReactNode
  /** Animation direction */
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale" | "blur"
  /** Animation duration in seconds */
  duration?: number
  /** Distance to animate from (pixels) */
  distance?: number
  /** Additional CSS classes */
  className?: string
  /** Custom animation variants */
  variants?: Variants
  /** Custom styles */
  style?: React.CSSProperties
  /** Element ID */
  id?: string
}

const ScrollRevealItem = React.forwardRef<HTMLDivElement, ScrollRevealItemProps>(
  ({
    children,
    direction = "up",
    duration = 0.5,
    distance = 50,
    className,
    variants,
    style,
    id
  }, ref) => {
    // Get animation variants
    const animationVariants = React.useMemo(() => {
      if (variants) return variants
      return createDefaultVariants(direction, distance)
    }, [direction, distance, variants])

    // Transition configuration
    const transition = React.useMemo<Transition>(() => ({
      ...defaultTransition,
      duration,
    }), [duration])

    return (
      <motion.div
        ref={ref}
        variants={animationVariants}
        transition={transition}
        className={cn(className)}
        style={style}
        id={id}
      >
        {children}
      </motion.div>
    )
  }
)

ScrollRevealItem.displayName = "ScrollRevealItem"

export { ScrollReveal, ScrollRevealContainer, ScrollRevealItem }
export type { ScrollRevealProps, ScrollRevealContainerProps, ScrollRevealItemProps }
