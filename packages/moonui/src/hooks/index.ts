"use client";

/**
 * `@moontra/moonui/hooks` — genel amaçlı React hook'ları.
 *
 * NEDEN AYRI ALT-YOL (`./hooks`), ana barrel değil:
 * `src/index.tsx` sözleşme gereği yalnızca iki bölüm içerir (`./components/ui`
 * re-export'u + `cn`). Hook'ları oraya eklemek o sözleşmeyi bozardı, bu yüzden
 * hook'lar kendi giriş noktasından yayımlanır:
 *
 *   import { useLocalStorage } from "@moontra/moonui/hooks"
 *
 * KAPSAM: buraya yalnızca TESTİ OLAN hook'lar alınır. `src/` kökünde henüz
 * dışa açılmamış başka yardımcılar da var (`LazyLoad`, `useLazyImageLoading`,
 * `useIsInViewport`, `useMultipleIntersectionObserver`, `use-scroll-animation`,
 * `use-performance-optimizer` ve `use-toast.ts`'in yetim kopyası). Test
 * kapsamları olmadığı için public API'ye alınmadılar — eklenmeden önce test
 * yazılmalı.
 */

export { useIntersectionObserver } from "../use-intersection-observer";
export type { UseIntersectionObserverOptions } from "../use-intersection-observer";

export { useLocalStorage } from "../use-local-storage";
