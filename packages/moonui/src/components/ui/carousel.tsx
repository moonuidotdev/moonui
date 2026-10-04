"use client"

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";

/**
 * Premium Carousel Component
 *
 * Embla Carousel tabanlı, erişilebilir ve esnek carousel bileşeni.
 * Yatay/dikey yön desteği, klavye navigasyonu ve plugin (autoplay vb.) desteği sunar.
 */

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Embla carousel seçenekleri (loop, align, axis vb.) */
  opts?: CarouselOptions;
  /** Embla plugin listesi (ör. autoplay) */
  plugins?: CarouselPlugin;
  /** Kaydırma yönü */
  orientation?: "horizontal" | "vertical";
  /** Embla API'sine dışarıdan erişmek için callback */
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextProps
  extends Pick<CarouselProps, "opts" | "plugins" | "setApi"> {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: "horizontal" | "vertical";
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

/**
 * Carousel context hook'u — Carousel alt bileşenlerinin embla API'sine
 * ve yön bilgisine erişmesini sağlar.
 */
function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

/* -------------------------------------------------------------------------------------------------
 * Carousel Root
 * -----------------------------------------------------------------------------------------------*/
const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Yön bilgisi opts.axis ile de verilebilir — orientation prop'u öncelikli
    const resolvedOrientation =
      orientation || (opts?.axis === "y" ? "vertical" : "horizontal");

    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: resolvedOrientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    /**
     * #308-2: `aria-roledescription="carousel"/"slide"` doğru set edilmişti ama slayt
     * DEĞİŞİMİNİ duyuran hiçbir şey yoktu — klavye/buton ile ilerleyen ekran-okuyucu
     * kullanıcısı hangi slaytta olduğunu öğrenemiyordu. Embla'nın zaten dinlenen "select"
     * olayına bağlı bir `aria-live="polite"` durum bölgesi eklendi.
     */
    const [slideState, setSlideState] = React.useState<{ current: number; total: number }>(
      { current: 0, total: 0 }
    );

    // Embla "select" olayında ileri/geri butonlarının durumunu güncelle
    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setSlideState({
        current: emblaApi.selectedScrollSnap() + 1,
        total: emblaApi.scrollSnapList().length,
      });
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    // Klavye navigasyonu: yatayda sol/sağ, dikeyde yukarı/aşağı ok tuşları
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const prevKey =
          resolvedOrientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
        const nextKey =
          resolvedOrientation === "horizontal" ? "ArrowRight" : "ArrowDown";

        if (event.key === prevKey) {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === nextKey) {
          event.preventDefault();
          scrollNext();
        }
      },
      [resolvedOrientation, scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api.off("reInit", onSelect);
        api.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          orientation: resolvedOrientation,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("moonui-theme", "relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
          {/*
            #308-2: Görsel olarak gizli durum bölgesi. `aria-live="polite"` sayesinde slayt
            değişimi (buton, klavye ya da sürükleme fark etmeksizin) duyurulur; `aria-atomic`
            metnin tamamının okunmasını sağlar. Slayt sayısı henüz bilinmiyorken (ilk render,
            embla init olmadan) hiçbir şey basılmaz — boş duyuru üretmemek için.
          */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {slideState.total > 0
              ? `Slide ${slideState.current} of ${slideState.total}`
              : ""}
          </div>
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

/* -------------------------------------------------------------------------------------------------
 * CarouselContent
 * -----------------------------------------------------------------------------------------------*/
const carouselContentVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "-ml-4",
      vertical: "-mt-4 flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface CarouselContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof carouselContentVariants>, "orientation"> {}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(carouselContentVariants({ orientation }), className)}
          {...props}
        />
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

/* -------------------------------------------------------------------------------------------------
 * CarouselItem
 * -----------------------------------------------------------------------------------------------*/
const carouselItemVariants = cva("min-w-0 shrink-0 grow-0 basis-full", {
  variants: {
    orientation: {
      horizontal: "pl-4",
      vertical: "pt-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface CarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof carouselItemVariants>, "orientation"> {}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(carouselItemVariants({ orientation }), className)}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = "CarouselItem";

/* -------------------------------------------------------------------------------------------------
 * CarouselPrevious
 * -----------------------------------------------------------------------------------------------*/
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon-sm", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      rounded="full"
      className={cn(
        "absolute",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

/* -------------------------------------------------------------------------------------------------
 * CarouselNext
 * -----------------------------------------------------------------------------------------------*/
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon-sm", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      rounded="full"
      className={cn(
        "absolute",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  type CarouselOptions,
  type CarouselPlugin,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
  carouselContentVariants,
  carouselItemVariants,
};
