"use client"

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
        /** @deprecated `md` kullanın — #319 kanonik skala; aynı çıktıyı üretir. */
        default: "h-10 w-10",
      },
      radius: {
        default: "rounded-full",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      },
      variant: {
        default: "",
        ring: "ring-2 ring-border",
        ringOffset: "ring-2 ring-border ring-offset-2 ring-offset-background",
        border: "border-2 border-border"
      }
    },
    defaultVariants: {
      size: "md",
      radius: "default",
      variant: "default"
    },
  }
);

export interface AvatarProps 
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, radius, variant, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("moonui-theme", avatarVariants({ size, radius, variant }), className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/**
 * #345: `alt` verilmezse BOŞ STRING basılır — yani görsel "dekoratif" işaretlenir.
 *
 * Bu, `alt` özniteliğini tamamen atlamaktan farklıdır: öznitelik yokken axe
 * `image-alt` (critical) ihlali sayar ve ekran okuyucu dosya adını okumaya kalkar.
 *
 * Neden ADIN kendisi varsayılan yapılmadı: avatar neredeyse her zaman kişinin adının
 * YANINDA durur (kanban aktivite akışı, timeline, activity-feed hepsi böyle). Adı
 * `alt`a da koymak aynı bilgiyi iki kez duyurur — axe bunu ayrı bir kural olarak
 * (`image-redundant-alt`) ihlal sayar. Doğru varsayılan "dekoratif"tir.
 *
 * Avatar TEK BAŞINA kimlik taşıyorsa (yanında ad metni yoksa — ör. bir avatar grubu)
 * tüketici `alt={name}` vermelidir; aşağıdaki varsayılan onu ezmez.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, alt = "", ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    alt={alt}
    className={cn("moonui-theme", "aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Avatar Group Component for displaying multiple avatars
//
// KIRICI (issue #260): prop sözleşmesi `limit`/`avatars: ReactNode[]` idi;
// pro paketteki kardeşi (`MoonUIAvatarGroupPro`) ise `max`/`children` kullanıyordu
// — aynı bileşen ailesi için iki farklı API. Standart React deseni (children)
// kanonik kabul edilip free tarafı pro'ya hizalandı.
//
// Geçiş:  <AvatarGroup limit={3} avatars={[<Avatar/>, <Avatar/>]} />
//     →   <AvatarGroup max={3}><Avatar/><Avatar/></AvatarGroup>
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gösterilecek en fazla avatar sayısı; kalanlar "+N" olarak özetlenir. */
  max?: number;
  /** Avatar bileşenleri. */
  children?: React.ReactNode;
  /** Avatar'lar arası üst üste binme miktarı (px, negatif). */
  overlapOffset?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, children, overlapOffset = -8, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max ? Math.max(0, childrenArray.length - max) : 0;

    return (
      <div
        ref={ref}
        className={cn("moonui-theme", "flex items-center", className)}
        {...props}
      >
        <div className="flex">
          {visibleAvatars.map((avatar, index) => (
            <div 
              key={index} 
              className="relative"
              style={{ 
                marginLeft: index === 0 ? 0 : `${overlapOffset}px`,
                zIndex: visibleAvatars.length - index 
              }}
            >
              {avatar}
            </div>
          ))}
          {remainingCount > 0 && (
            <div 
              className="relative z-0"
              style={{ marginLeft: `${overlapOffset}px` }}
            >
              <Avatar variant="border">
                <AvatarFallback>
                  +{remainingCount}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
