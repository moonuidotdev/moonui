"use client"

import * as React from "react"
import { motion, useInView, useAnimation, Variants } from "framer-motion"
import { cn } from "../../lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
  triggerOnce?: boolean
  stagger?: number
  className?: string
  variants?: Variants
  animate?: boolean
  style?: React.CSSProperties
  id?: string
}

const defaultVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" }
  }
}

const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    distance = 50,
    threshold = 0.1,
    triggerOnce = true,
    stagger = 0,
    className,
    variants,
    animate = true,
    style,
    id
  }, ref) => {
    const controls = useAnimation()
    const elementRef = React.useRef<HTMLDivElement>(null)
    const isInView = useInView(elementRef, { 
      amount: threshold,
      once: triggerOnce
    })

    // Custom variants with distance
    const customVariants = React.useMemo(() => {
      if (variants) return variants
      
      const baseVariants = defaultVariants[direction] || defaultVariants.up
      
      return {
        hidden: {
          ...baseVariants.hidden,
          ...(direction === "up" && { y: distance }),
          ...(direction === "down" && { y: -distance }),
          ...(direction === "left" && { x: distance }),
          ...(direction === "right" && { x: -distance })
        },
        visible: baseVariants.visible
      }
    }, [direction, distance, variants])

    React.useEffect(() => {
      if (!animate) return
      
      if (isInView) {
        controls.start("visible")
      } else if (!triggerOnce) {
        controls.start("hidden")
      }
    }, [isInView, controls, triggerOnce, animate])

    React.useImperativeHandle(ref, () => elementRef.current!)

    if (!animate) {
      return (
        <div
          ref={elementRef}
          className={className}
          style={style}
          id={id}
        >
          {children}
        </div>
      )
    }

    return (
      <motion.div
        ref={elementRef}
        variants={customVariants}
        initial="hidden"
        animate={controls}
        transition={{
          duration,
          delay: delay + stagger,
          ease: "easeOut"
        }}
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

// ScrollReveal container for staggered animations
interface ScrollRevealContainerProps {
  children: React.ReactNode
  stagger?: number
  className?: string
  style?: React.CSSProperties
  id?: string
}

const ScrollRevealContainer = React.forwardRef<HTMLDivElement, ScrollRevealContainerProps>(
  ({ children, stagger = 0.1, className, style, id }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { amount: 0.1, once: true })

    React.useImperativeHandle(ref, () => containerRef.current!)

    return (
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger
            }
          }
        }}
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

// ScrollReveal item for use within containers
interface ScrollRevealItemProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  distance?: number
  className?: string
  variants?: Variants
  style?: React.CSSProperties
  id?: string
}

const ScrollRevealItem = React.forwardRef<HTMLDivElement, ScrollRevealItemProps>(
  ({
    children,
    direction = "up",
    duration = 0.6,
    distance = 50,
    className,
    variants,
    style,
    id
  }, ref) => {
    const customVariants = React.useMemo(() => {
      if (variants) return variants
      
      const baseVariants = defaultVariants[direction] || defaultVariants.up
      
      return {
        hidden: {
          ...baseVariants.hidden,
          ...(direction === "up" && { y: distance }),
          ...(direction === "down" && { y: -distance }),
          ...(direction === "left" && { x: distance }),
          ...(direction === "right" && { x: -distance })
        },
        visible: baseVariants.visible
      }
    }, [direction, distance, variants])

    return (
      <motion.div
        ref={ref}
        variants={customVariants}
        transition={{
          duration,
          ease: "easeOut"
        }}
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