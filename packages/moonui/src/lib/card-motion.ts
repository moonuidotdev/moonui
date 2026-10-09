"use client"

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

/**
 * `Card`ın `interactive` kökü. framer-motion'ı (~38 KB gz) YALNIZ bu modül içe aktarır;
 * `card.tsx` onu `React.lazy` ile yükler, böylece etkileşimsiz kart framer-motion'ı
 * ilk yüke taşımaz. `src/lib` altında olduğu için ayrı bir giriş noktası değildir; registry/CLI'da `card.tsx` ile birlikte gönderilir
 * (scripts/lib/free-registry.js › SHIPPED_LIB_MODULES), bu yüzden JSX içermez (`.ts`).
 */
const CardMotionRoot = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  (props, ref) => React.createElement(motion.div, { ref, ...props })
);
CardMotionRoot.displayName = "CardMotionRoot";

export default CardMotionRoot;
