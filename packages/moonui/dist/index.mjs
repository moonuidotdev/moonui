'use client';

import * as t from 'react';
import t__default, { useState, useCallback, useEffect } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, Info, AlertCircle, AlertTriangle, Check, X, MoreHorizontal, Loader2, CreditCard, Minus, Search, ChevronRight, Circle, Upload, ChevronUp, Phone, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Quote, Code, Link, Image, Palette, Undo, Redo, Edit, Eye, ChevronLeft, Copy, ArrowDown, ArrowUp, ArrowUpDown, Calendar as Calendar$1, Clock, CheckCircle, Star, GitFork, ExternalLink, Crown, Lock, Zap, Video, Music, FileText, File } from 'lucide-react';
export { Palette, Pipette } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation, useInView, animate } from 'framer-motion';
import { format, isSameMonth, isToday, isValid, subMonths, addMonths, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay, startOfWeek, endOfWeek } from 'date-fns';
export { format } from 'date-fns';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import 'react-dom';
import { createSlot } from '@radix-ui/react-slot';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as ToastPrimitives from '@radix-ui/react-toast';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var Accordion = AccordionPrimitive.Root;
var AccordionItem = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("moonui-theme", "border-b border-gray-200 dark:border-gray-800", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = t.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all dark:text-gray-100",
      "hover:underline hover:text-primary dark:hover:text-primary-400",
      "[&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200 opacity-70 group-hover:opacity-100" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = t.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: cn(
      "overflow-hidden text-sm text-gray-700 dark:text-gray-300 transition-all",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: "pb-4 pt-0", children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
var alertVariants = cva(
  "relative w-full flex items-center gap-3 p-4 border text-foreground [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        primary: "bg-primary/10 text-primary border-primary/30",
        success: "bg-success/10 text-success border-success/30",
        warning: "bg-warning/10 text-warning border-warning/30",
        error: "bg-destructive/10 text-destructive border-destructive/30",
        info: "bg-blue-500/10 text-blue-500 border-blue-500/30"
      },
      size: {
        sm: "py-2 text-xs",
        default: "py-3 text-sm",
        lg: "py-4 text-base"
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
      },
      withClose: {
        true: "pr-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
      withClose: false
    }
  }
);
var Alert = t.forwardRef(
  ({
    className,
    variant = "default",
    size,
    radius,
    hideIcon = false,
    closable = false,
    onClose,
    children,
    ...props
  }, ref) => {
    const Icon2 = t.useMemo(() => {
      switch (variant) {
        case "success":
          return Check;
        case "warning":
          return AlertTriangle;
        case "error":
          return AlertCircle;
        case "info":
          return Info;
        default:
          return Info;
      }
    }, [variant]);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        role: "alert",
        className: cn(
          "moonui-theme",
          alertVariants({
            variant,
            size,
            radius,
            withClose: closable
          }),
          className
        ),
        ...props,
        children: [
          !hideIcon && /* @__PURE__ */ jsx(Icon2, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsx("div", { className: "flex-1", children }),
          closable && onClose && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100",
              "aria-label": "Kapat",
              children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
            }
          )
        ]
      }
    );
  }
);
Alert.displayName = "Alert";
var AlertTitle = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn(
      "moonui-theme",
      "font-semibold leading-tight tracking-tight mb-1",
      className
    ),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "moonui-theme",
      "text-sm leading-5 text-muted-foreground",
      className
    ),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
var aspectRatioVariants = cva(
  "relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "rounded-md bg-muted/10",
        ghost: "bg-transparent",
        outline: "rounded-md border border-border",
        card: "rounded-md bg-card shadow-sm"
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var AspectRatio = t.forwardRef(({ className, variant, radius, ratio = 16 / 9, style, children, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("moonui-theme", aspectRatioVariants({ variant, radius }), className),
    style: {
      position: "relative",
      paddingBottom: `${1 / ratio * 100}%`,
      ...style
    },
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children })
  }
));
AspectRatio.displayName = "AspectRatio";
var avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20"
      },
      radius: {
        default: "rounded-full",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none"
      },
      variant: {
        default: "",
        ring: "ring-2 ring-border",
        ringOffset: "ring-2 ring-border ring-offset-2 ring-offset-background",
        border: "border-2 border-border"
      }
    },
    defaultVariants: {
      size: "default",
      radius: "default",
      variant: "default"
    }
  }
);
var Avatar = t.forwardRef(({ className, size, radius, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn("moonui-theme", avatarVariants({ size, radius, variant }), className),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("moonui-theme", "aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
var AvatarGroup = t.forwardRef(
  ({ className, limit, avatars, overlapOffset = -8, ...props }, ref) => {
    const visibleAvatars = limit ? avatars.slice(0, limit) : avatars;
    const remainingCount = limit ? Math.max(0, avatars.length - limit) : 0;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("moonui-theme", "flex items-center", className),
        ...props,
        children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          visibleAvatars.map((avatar, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "relative",
              style: {
                marginLeft: index === 0 ? 0 : `${overlapOffset}px`,
                zIndex: visibleAvatars.length - index
              },
              children: avatar
            },
            index
          )),
          remainingCount > 0 && /* @__PURE__ */ jsx(
            "div",
            {
              className: "relative z-0",
              style: { marginLeft: `${overlapOffset}px` },
              children: /* @__PURE__ */ jsx(Avatar, { variant: "border", children: /* @__PURE__ */ jsxs(AvatarFallback, { children: [
                "+",
                remainingCount
              ] }) })
            }
          )
        ] })
      }
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";
var badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "font-medium transition-colors duration-200",
    "border focus:outline-none",
    "focus-visible:ring-2 focus-visible:ring-offset-1",
    // Auto spacing between badges
    "mr-2 mb-2 last:mr-0"
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-transparent bg-gray-900 text-white",
          "hover:bg-gray-800 dark:hover:bg-gray-700",
          "focus-visible:ring-gray-500/30 dark:focus-visible:ring-gray-400/40",
          "dark:bg-gray-700 dark:text-gray-50 dark:shadow-inner dark:shadow-gray-950/10"
        ],
        secondary: [
          "border-transparent bg-secondary text-secondary-foreground",
          "hover:bg-gray-200 dark:hover:bg-gray-600",
          "focus-visible:ring-gray-400/30 dark:focus-visible:ring-gray-500/40",
          "dark:bg-gray-700/50 dark:text-gray-50 dark:shadow-inner dark:shadow-gray-950/10"
        ],
        outline: [
          "border-gray-200 dark:border-gray-600",
          "bg-transparent text-foreground",
          "hover:border-gray-300 dark:hover:border-gray-500",
          "focus-visible:ring-gray-400/30 dark:focus-visible:ring-gray-500/40",
          "dark:text-gray-100 dark:bg-transparent dark:backdrop-blur-sm"
        ],
        destructive: [
          "border-transparent bg-error text-white",
          "hover:bg-error/90 dark:hover:bg-error/80",
          "focus-visible:ring-error/30 dark:focus-visible:ring-error/25",
          "dark:bg-error/90 dark:text-white dark:shadow-inner dark:shadow-error/10"
        ],
        success: [
          "border-transparent bg-success text-white",
          "hover:bg-success/90 dark:hover:bg-success/80",
          "focus-visible:ring-success/30 dark:focus-visible:ring-success/25",
          "dark:bg-success/90 dark:text-white dark:shadow-inner dark:shadow-success/10"
        ],
        warning: [
          "border-transparent bg-warning text-white",
          "hover:bg-warning/90 dark:hover:bg-warning/80",
          "focus-visible:ring-warning/30 dark:focus-visible:ring-warning/25",
          "dark:bg-warning/90 dark:text-gray-900 dark:shadow-inner dark:shadow-warning/10"
        ],
        ghost: [
          "border border-gray-200 bg-gray-50/50 text-gray-700",
          "hover:bg-gray-100 dark:hover:bg-gray-800/60",
          "focus-visible:ring-gray-400/30 dark:focus-visible:ring-gray-500/40",
          "dark:border-gray-700 dark:bg-gray-800/30 dark:text-gray-300",
          "transition-all duration-200"
        ],
        pro: [
          "border-transparent bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          "hover:from-purple-700 hover:to-pink-700",
          "focus-visible:ring-purple-400/30 dark:focus-visible:ring-purple-500/40",
          "shadow-md dark:shadow-lg dark:shadow-purple-500/10"
        ],
        admin: [
          "border-transparent bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          "hover:from-purple-700 hover:to-pink-700",
          "focus-visible:ring-purple-400/30 dark:focus-visible:ring-purple-500/40",
          "shadow-md dark:shadow-lg dark:shadow-purple-500/10"
        ]
      },
      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-3 text-sm",
        lg: "h-8 px-4 text-base"
      },
      radius: {
        default: "rounded-full",
        sm: "rounded-md",
        lg: "rounded-xl",
        none: "rounded-none"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      radius: "default"
    }
  }
);
function Badge({
  className,
  variant,
  size,
  radius,
  withDot,
  dotColor,
  removable,
  onRemove,
  leftIcon,
  rightIcon,
  noAutoSpacing,
  children,
  ...props
}) {
  let autoLeftIcon = leftIcon;
  let autoChildren = children;
  if (variant === "pro") {
    autoLeftIcon = leftIcon || /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-3 h-3", children: [
      /* @__PURE__ */ jsx("path", { d: "M12 0L13.09 8.26L22 9L13.09 9.74L12 18L10.91 9.74L2 9L10.91 8.26L12 0Z", fill: "currentColor" }),
      /* @__PURE__ */ jsx("path", { d: "M19 5L19.5 7L21 7.5L19.5 8L19 10L18.5 8L17 7.5L18.5 7L19 5Z", fill: "currentColor" }),
      /* @__PURE__ */ jsx("path", { d: "M19 15L19.5 17L21 17.5L19.5 18L19 20L18.5 18L17 17.5L18.5 17L19 15Z", fill: "currentColor" })
    ] });
    autoChildren = children || "Pro";
  }
  if (variant === "admin") {
    autoLeftIcon = leftIcon || /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-3 h-3", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", fill: "currentColor" }) });
    autoChildren = children || "Admin Pro";
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "moonui-theme",
        badgeVariants({ variant, size, radius }),
        // Remove auto-spacing if noAutoSpacing is true
        noAutoSpacing && "mr-0 mb-0",
        className
      ),
      "data-removable": removable ? "" : void 0,
      ...props,
      children: [
        withDot && /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "h-2 w-2 rounded-full",
              dotColor || (variant === "destructive" ? "bg-white" : variant === "success" ? "bg-white" : variant === "warning" ? "bg-white" : variant === "secondary" ? "bg-secondary-foreground" : variant === "outline" ? "bg-foreground" : variant === "ghost" ? "bg-foreground" : variant === "pro" ? "bg-white" : variant === "admin" ? "bg-white" : "bg-primary-foreground")
            ),
            "aria-hidden": "true"
          }
        ),
        autoLeftIcon && /* @__PURE__ */ jsx("span", { className: "inline-flex shrink-0 items-center", children: autoLeftIcon }),
        /* @__PURE__ */ jsx("span", { className: "inline-flex items-center", children: autoChildren }),
        rightIcon && /* @__PURE__ */ jsx("span", { className: "inline-flex shrink-0 items-center", children: rightIcon }),
        removable && onRemove && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "ml-1 -mr-1 h-3.5 w-3.5 rounded-full inline-flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10",
            onClick: (e) => {
              e.stopPropagation();
              onRemove();
            },
            "aria-label": "Remove badge",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                width: "8",
                height: "8",
                viewBox: "0 0 8 8",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "opacity-70",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx("path", { d: "M0.799988 7.19999L7.19999 0.799988M0.799988 0.799988L7.19999 7.19999", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
              }
            )
          }
        )
      ]
    }
  );
}
var breadcrumbVariants = cva(
  "flex items-center gap-1.5 text-sm",
  {
    variants: {
      variant: {
        default: "text-foreground transition-colors",
        muted: "text-muted-foreground transition-colors",
        ghost: "text-foreground/60 transition-colors"
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Breadcrumb = t.forwardRef(
  ({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx(
    "nav",
    {
      ref,
      className: cn("moonui-theme", breadcrumbVariants({ variant, size }), className),
      "aria-label": "breadcrumb",
      ...props
    }
  )
);
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = t.forwardRef(
  ({ className, collapsed, collapsedWidth = 3, ...props }, ref) => {
    const childrenArray = t.Children.toArray(props.children).filter(Boolean);
    const childCount = childrenArray.length;
    if (collapsed && childCount > collapsedWidth) {
      const firstItem = childrenArray[0];
      const lastTwoItems = childrenArray.slice(-2);
      return /* @__PURE__ */ jsxs(
        "ol",
        {
          ref,
          className: cn(
            "flex flex-wrap items-center gap-1.5 sm:gap-2.5",
            className
          ),
          ...props,
          children: [
            firstItem,
            /* @__PURE__ */ jsx(BreadcrumbEllipsis, {}),
            lastTwoItems
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "ol",
      {
        ref,
        className: cn(
          "flex flex-wrap items-center gap-1.5 sm:gap-2.5",
          className
        ),
        ...props
      }
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = t.forwardRef(
  ({ className, isCurrent, href, asChild = false, ...props }, ref) => {
    const Comp = asChild ? t.Fragment : href ? "a" : "span";
    const itemProps = asChild ? {} : href ? { href } : {};
    return /* @__PURE__ */ jsx(
      "li",
      {
        ref,
        className: cn("moonui-theme", "inline-flex items-center gap-1.5", className),
        "aria-current": isCurrent ? "page" : void 0,
        ...props,
        children: /* @__PURE__ */ jsx(
          Comp,
          {
            className: cn(
              "transition-colors duration-200 hover:text-foreground",
              isCurrent ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground hover:underline hover:underline-offset-4 hover:decoration-muted-foreground/30"
            ),
            ...itemProps,
            children: props.children
          }
        )
      }
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("moonui-theme", "text-muted-foreground opacity-70", className),
    ...props,
    children: children || /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5" })
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("moonui-theme", "flex items-center text-muted-foreground hover:text-foreground/80 transition-colors duration-200", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
    ]
  }
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
var BreadcrumbLink = t.forwardRef(
  ({ className, href, ...props }, ref) => /* @__PURE__ */ jsx(
    "a",
    {
      ref,
      href,
      className: cn(
        "transition-colors duration-200 hover:text-foreground text-muted-foreground hover:underline hover:underline-offset-4 hover:decoration-muted-foreground/30",
        className
      ),
      ...props
    }
  )
);
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = t.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cn(
        "font-medium text-foreground dark:text-white dark:text-opacity-95",
        className
      ),
      ...props
    }
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";
var buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium relative",
    "transition-all duration-200 ease-out",
    "transform active:scale-[0.98]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none"
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "dark:bg-primary dark:text-primary-foreground",
          "hover:bg-primary/90 dark:hover:bg-primary/90",
          "active:bg-primary/80 dark:active:bg-primary/80",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200"
        ],
        secondary: [
          "bg-gray-100 text-gray-900",
          "dark:bg-gray-800 dark:text-gray-100",
          "hover:bg-gray-200 dark:hover:bg-gray-700",
          "active:bg-gray-300 dark:active:bg-gray-600",
          "border border-gray-200 dark:border-gray-700",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "shadow-sm hover:shadow-md"
        ],
        outline: [
          "bg-background text-foreground",
          "dark:bg-background dark:text-foreground",
          "border border-input dark:border-input",
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
          "active:bg-accent/80 dark:active:bg-accent/80",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200"
        ],
        ghost: [
          "text-gray-700",
          "dark:text-gray-300",
          "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
          "active:bg-gray-200 dark:active:bg-gray-700",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200"
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "dark:bg-destructive dark:text-destructive-foreground",
          "hover:bg-destructive/90 dark:hover:bg-destructive/90",
          "active:bg-destructive/80 dark:active:bg-destructive/80",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200"
        ],
        success: [
          "bg-success text-success-foreground",
          "dark:bg-success dark:text-success-foreground",
          "hover:bg-success/90 dark:hover:bg-success/90",
          "active:bg-success/80 dark:active:bg-success/80",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200"
        ],
        link: [
          "text-primary bg-transparent",
          "underline-offset-4 hover:underline",
          "hover:text-primary/80 active:text-primary/70",
          "p-0 h-auto",
          "transition-colors duration-200"
        ],
        gradient: [
          "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
          "hover:from-purple-600 hover:to-pink-600",
          "active:from-purple-700 active:to-pink-700",
          "shadow-xl shadow-purple-500/40",
          "hover:shadow-2xl hover:shadow-purple-500/50",
          "focus-visible:ring-purple-500/50",
          "transition-all duration-300"
        ],
        glow: [
          "bg-blue-500 text-white",
          "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
          "hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]",
          "active:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
          "hover:bg-blue-600",
          "focus-visible:ring-blue-500/50",
          "transition-all duration-300"
        ],
        soft: [
          "bg-primary/10 text-primary",
          "hover:bg-primary/20",
          "active:bg-primary/30",
          "focus-visible:ring-primary/50",
          "dark:bg-primary/20 dark:text-primary-foreground",
          "dark:hover:bg-primary/30 dark:active:bg-primary/40",
          "transition-colors duration-200"
        ],
        glass: [
          "bg-white/10 backdrop-blur-md text-foreground",
          "border border-white/20",
          "hover:bg-white/20 hover:border-white/30",
          "active:bg-white/30",
          "shadow-lg",
          "focus-visible:ring-white/50",
          "dark:bg-gray-800/10 dark:border-gray-700/20",
          "dark:hover:bg-gray-800/20 dark:hover:border-gray-700/30",
          "transition-all duration-200"
        ],
        neon: [
          "bg-transparent text-green-400",
          "border-2 border-green-400",
          "hover:bg-green-400 hover:text-gray-900",
          "hover:shadow-[0_0_30px_rgba(74,222,128,0.6)]",
          "active:shadow-[0_0_15px_rgba(74,222,128,0.4)]",
          "focus-visible:ring-green-400/50",
          "transition-all duration-300"
        ]
      },
      size: {
        xs: "h-7 px-2.5 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
        icon: "h-10 w-10 p-2",
        "icon-sm": "h-8 w-8 p-1.5",
        "icon-lg": "h-12 w-12 p-3"
      },
      rounded: {
        default: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
        sm: "rounded-lg",
        lg: "rounded-2xl"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "default",
      fullWidth: false
    }
  }
);
var Button = t.forwardRef(
  ({
    className,
    variant,
    size,
    rounded,
    fullWidth,
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? "button" : "button";
    return /* @__PURE__ */ jsxs(
      Comp,
      {
        className: cn("moonui-theme", buttonVariants({ variant, size, rounded, fullWidth, className })),
        ref,
        disabled: disabled || loading,
        "data-loading": loading ? "" : void 0,
        ...props,
        children: [
          loading && /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin", "aria-hidden": "true" }),
          !loading && leftIcon,
          children,
          !loading && rightIcon
        ]
      }
    );
  }
);
Button.displayName = "Button";
cva("", {
  variants: {
    hover: {
      lift: [
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5",
        "hover:shadow-md"
      ],
      glow: [
        "transition-all duration-300 ease-out",
        "hover:shadow-lg",
        "hover:shadow-primary/20"
      ],
      scale: [
        "transition-transform duration-200 ease-out",
        "hover:scale-105",
        "active:scale-95"
      ],
      brightness: [
        "transition-all duration-200 ease-out",
        "hover:brightness-110",
        "active:brightness-95"
      ],
      border: [
        "transition-all duration-200 ease-out",
        "hover:border-primary/50"
      ]
    },
    focus: {
      ring: [
        "focus:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-primary/50",
        "focus-visible:ring-offset-2"
      ],
      glow: [
        "focus:outline-none",
        "focus-visible:shadow-lg",
        "focus-visible:shadow-primary/30"
      ],
      border: [
        "focus:outline-none",
        "focus-visible:border-primary",
        "focus-visible:border-2"
      ]
    },
    active: {
      scale: [
        "active:scale-95",
        "transition-transform duration-100"
      ],
      darken: [
        "active:brightness-90",
        "transition-all duration-100"
      ],
      depress: [
        "active:translate-y-0.5",
        "active:shadow-sm",
        "transition-all duration-100"
      ]
    },
    cursor: {
      pointer: "cursor-pointer",
      grab: "cursor-grab active:cursor-grabbing",
      text: "cursor-text",
      wait: "cursor-wait",
      help: "cursor-help",
      notAllowed: "cursor-not-allowed"
    }
  },
  defaultVariants: {
    hover: "lift",
    focus: "ring",
    active: "scale",
    cursor: "pointer"
  }
});
var springAnimations = {
  // Smooth spring for general use
  smooth: {
    type: "spring",
    stiffness: 260,
    damping: 20
  },
  // Bouncy spring for playful interactions
  bouncy: {
    type: "spring",
    stiffness: 300,
    damping: 15
  },
  // Stiff spring for quick responses
  stiff: {
    type: "spring",
    stiffness: 400,
    damping: 25
  },
  // Gentle spring for subtle movements
  gentle: {
    type: "spring",
    stiffness: 150,
    damping: 15
  }
};
var hoverAnimations = {
  lift: {
    y: -2,
    transition: springAnimations.smooth
  },
  scale: {
    scale: 1.05,
    transition: springAnimations.smooth
  },
  glow: {
    boxShadow: "0 0 20px rgba(var(--primary), 0.3)",
    transition: springAnimations.smooth
  },
  rotate: {
    rotate: 2,
    transition: springAnimations.bouncy
  }
};
var tapAnimations = {
  scale: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  depress: {
    y: 1,
    transition: { duration: 0.1 }
  }
};
var skeletonAnimation = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
var cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm dark:shadow-gray-900/20 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-border shadow-none bg-transparent dark:border-gray-700 dark:bg-transparent dark:text-gray-200",
        filled: "border-none bg-secondary dark:bg-gray-800 dark:text-gray-100 dark:shadow-inner dark:shadow-gray-950/10",
        elevated: "border-none shadow-md dark:shadow-lg dark:shadow-gray-900/30 dark:bg-gray-850 dark:text-gray-100",
        gradient: "border-none bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20",
        glass: "border border-white/20 bg-white/10 backdrop-blur-md dark:border-gray-700/30 dark:bg-gray-800/10"
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        xl: ""
      },
      radius: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-3xl",
        none: "rounded-none"
      },
      interactive: {
        true: "cursor-pointer hover:shadow-lg hover:border-primary/20 dark:hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default"
    }
  }
);
var Card = t.forwardRef(
  ({ className, variant, size, radius, interactive, microInteraction = "lift", ...props }, ref) => {
    if (interactive && microInteraction !== "none") {
      const interactionProps = {
        whileHover: microInteraction === "scale" ? hoverAnimations.scale : microInteraction === "glow" ? hoverAnimations.glow : hoverAnimations.lift,
        whileTap: tapAnimations.scale
      };
      return /* @__PURE__ */ jsx(
        motion.div,
        {
          ref,
          className: cn("moonui-theme", cardVariants({ variant, size, radius, interactive, className })),
          ...interactionProps,
          ...props
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("moonui-theme", cardVariants({ variant, size, radius, interactive, className })),
        ...props
      }
    );
  }
);
Card.displayName = "Card";
var CardHeader = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("moonui-theme", "flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn("moonui-theme", "text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("moonui-theme", "text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("moonui-theme", "p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("moonui-theme", "flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function Calendar({
  mode = "single",
  selected,
  onSelect,
  disabled,
  showOutsideDays = false,
  className,
  classNames,
  numberOfMonths = 1,
  defaultMonth,
  ...props
}) {
  const [currentMonth, setCurrentMonth] = t.useState(
    defaultMonth || selected && selected || /* @__PURE__ */ new Date()
  );
  const weekDays = [
    { short: "S", full: "Sunday" },
    { short: "M", full: "Monday" },
    { short: "T", full: "Tuesday" },
    { short: "W", full: "Wednesday" },
    { short: "T", full: "Thursday" },
    { short: "F", full: "Friday" },
    { short: "S", full: "Saturday" }
  ];
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const handleDateClick = (date) => {
    if (disabled?.(date))
      return;
    if (mode === "single") {
      onSelect?.(date);
    } else if (mode === "range") {
      const currentSelection = selected;
      if (!currentSelection?.from || currentSelection.from && currentSelection.to) {
        onSelect?.({ from: date, to: void 0 });
      } else {
        if (date < currentSelection.from) {
          onSelect?.({ from: date, to: currentSelection.from });
        } else {
          onSelect?.({ from: currentSelection.from, to: date });
        }
      }
    }
  };
  const isDateSelected = (date) => {
    if (!selected)
      return false;
    if (mode === "single") {
      return isSameDay(date, selected);
    } else if (mode === "range") {
      const range = selected;
      if (range.from && range.to) {
        return date >= range.from && date <= range.to;
      }
      return range.from ? isSameDay(date, range.from) : false;
    }
    return false;
  };
  const isRangeStart = (date) => {
    if (mode !== "range" || !selected)
      return false;
    const range = selected;
    return range.from ? isSameDay(date, range.from) : false;
  };
  const isRangeEnd = (date) => {
    if (mode !== "range" || !selected)
      return false;
    const range = selected;
    return range.to ? isSameDay(date, range.to) : false;
  };
  const isRangeMiddle = (date) => {
    if (mode !== "range" || !selected)
      return false;
    const range = selected;
    if (!range.from || !range.to)
      return false;
    return date > range.from && date < range.to;
  };
  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days2 = eachDayOfInterval({ start, end });
    const firstDayOfWeek = getDay(start);
    const previousMonthDays = [];
    if (firstDayOfWeek > 0 && showOutsideDays) {
      const previousMonthStart = startOfWeek(start);
      const previousMonthEnd = new Date(start);
      previousMonthEnd.setDate(previousMonthEnd.getDate() - 1);
      previousMonthDays.push(...eachDayOfInterval({
        start: previousMonthStart,
        end: previousMonthEnd
      }));
    }
    const lastDayOfWeek = getDay(end);
    const nextMonthDays = [];
    if (lastDayOfWeek < 6 && showOutsideDays) {
      const nextMonthStart = new Date(end);
      nextMonthStart.setDate(nextMonthStart.getDate() + 1);
      const nextMonthEnd = endOfWeek(end);
      nextMonthDays.push(...eachDayOfInterval({
        start: nextMonthStart,
        end: nextMonthEnd
      }));
    }
    const emptyCells = [];
    if (!showOutsideDays && firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        emptyCells.push(null);
      }
    }
    return [...previousMonthDays, ...emptyCells, ...days2, ...nextMonthDays];
  };
  const days = getDaysInMonth();
  return /* @__PURE__ */ jsxs("div", { className: cn("moonui-theme", "p-0", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border/50 dark:border-gray-700/50", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handlePreviousMonth,
          className: cn(
            "h-10 w-10 bg-transparent p-0 rounded-lg",
            "hover:bg-muted transition-colors",
            "inline-flex items-center justify-center"
          ),
          type: "button",
          children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsx("h2", { className: "text-base font-medium", children: format(currentMonth, "MMMM yyyy") }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleNextMonth,
          className: cn(
            "h-10 w-10 bg-transparent p-0 rounded-lg",
            "hover:bg-muted transition-colors",
            "inline-flex items-center justify-center"
          ),
          type: "button",
          children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 pb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 mb-2", children: weekDays.map((day, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "text-muted-foreground text-xs font-medium h-10 flex items-center justify-center",
          title: day.full,
          children: day.short
        },
        `weekday-${index}`
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1", children: days.map((date, index) => {
        if (!date) {
          return /* @__PURE__ */ jsx("div", { className: "h-10 w-10" }, `empty-${index}`);
        }
        const isOutsideMonth = !isSameMonth(date, currentMonth);
        const isDisabled = disabled?.(date) || false;
        const isSelected = isDateSelected(date);
        const isTodayDate = isToday(date);
        const rangeStart = isRangeStart(date);
        const rangeEnd = isRangeEnd(date);
        const rangeMiddle = isRangeMiddle(date);
        return /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDateClick(date),
            disabled: isDisabled,
            className: cn(
              "h-10 w-10 p-0 font-normal",
              "inline-flex items-center justify-center rounded-lg",
              "hover:bg-muted transition-colors text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isOutsideMonth && "text-muted-foreground/50",
              isDisabled && "text-muted-foreground/30 cursor-not-allowed hover:bg-transparent",
              isSelected && !rangeMiddle && "bg-primary text-primary-foreground font-medium hover:bg-primary hover:text-primary-foreground",
              isTodayDate && "font-semibold relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary",
              rangeMiddle && "bg-accent/30 text-accent-foreground rounded-none",
              rangeStart && "rounded-r-none",
              rangeEnd && "rounded-l-none"
            ),
            type: "button",
            children: format(date, "d")
          },
          date.toISOString()
        );
      }) })
    ] })
  ] });
}
Calendar.displayName = "Calendar";
var getCardType = (number) => {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    diners: /^3(?:0[0-5]|[68])/,
    jcb: /^35/
  };
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(number))
      return type;
  }
  return "unknown";
};
var formatCardNumber = (value, cardType) => {
  const cleaned = value.replace(/\s+/g, "");
  const groups = cardType === "amex" ? [4, 6, 5] : [4, 4, 4, 4];
  let formatted = "";
  let position = 0;
  for (const group of groups) {
    if (position >= cleaned.length)
      break;
    if (formatted)
      formatted += " ";
    formatted += cleaned.slice(position, position + group);
    position += group;
  }
  return formatted;
};
var CardNumberInput = t.forwardRef(
  ({ className, value = "", onChange, showIcon = true, size, ...props }, ref) => {
    const [cardType, setCardType] = t.useState("unknown");
    const handleChange = (e) => {
      const rawValue = e.target.value.replace(/\D/g, "");
      const detectedType = getCardType(rawValue);
      setCardType(detectedType);
      const maxLength = detectedType === "amex" ? 15 : 16;
      const truncated = rawValue.slice(0, maxLength);
      const formatted = formatCardNumber(truncated, detectedType);
      onChange?.(truncated, detectedType);
      e.target.value = formatted;
    };
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          ref,
          type: "text",
          inputMode: "numeric",
          autoComplete: "cc-number",
          placeholder: "1234 5678 9012 3456",
          value: formatCardNumber(value, cardType),
          onChange: handleChange,
          className: cn(showIcon && "pl-10", className),
          ...props
        }
      ),
      showIcon && /* @__PURE__ */ jsx(CreditCard, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" })
    ] });
  }
);
CardNumberInput.displayName = "CardNumberInput";
var CardExpiryInput = t.forwardRef(
  ({ className, value = "", onChange, size, ...props }, ref) => {
    const handleChange = (e) => {
      let rawValue = e.target.value.replace(/\D/g, "");
      if (rawValue.length >= 2) {
        const month = parseInt(rawValue.slice(0, 2));
        if (month > 12) {
          rawValue = "12" + rawValue.slice(2);
        } else if (month === 0) {
          rawValue = "01" + rawValue.slice(2);
        }
      }
      rawValue = rawValue.slice(0, 4);
      let formatted = rawValue;
      if (rawValue.length >= 2) {
        formatted = rawValue.slice(0, 2) + "/" + rawValue.slice(2);
      }
      onChange?.(rawValue);
      e.target.value = formatted;
    };
    const formattedValue = value.length >= 2 ? value.slice(0, 2) + "/" + value.slice(2) : value;
    return /* @__PURE__ */ jsx(
      Input,
      {
        ref,
        type: "text",
        inputMode: "numeric",
        autoComplete: "cc-exp",
        placeholder: "MM/YY",
        value: formattedValue,
        onChange: handleChange,
        className,
        ...props
      }
    );
  }
);
CardExpiryInput.displayName = "CardExpiryInput";
var CardCVCInput = t.forwardRef(
  ({ className, value = "", onChange, cardType = "unknown", size, ...props }, ref) => {
    const maxLength = cardType === "amex" ? 4 : 3;
    const handleChange = (e) => {
      const rawValue = e.target.value.replace(/\D/g, "").slice(0, maxLength);
      onChange?.(rawValue);
    };
    return /* @__PURE__ */ jsx(
      Input,
      {
        ref,
        type: "text",
        inputMode: "numeric",
        autoComplete: "cc-csc",
        placeholder: cardType === "amex" ? "1234" : "123",
        value,
        onChange: handleChange,
        maxLength,
        className,
        ...props
      }
    );
  }
);
CardCVCInput.displayName = "CardCVCInput";
var CardZipInput = t.forwardRef(
  ({ className, value = "", onChange, format: format4 = "US", size, ...props }, ref) => {
    const handleChange = (e) => {
      let rawValue = e.target.value;
      switch (format4) {
        case "US":
          rawValue = rawValue.replace(/\D/g, "").slice(0, 5);
          break;
        case "CA":
          rawValue = rawValue.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
          if (rawValue.length >= 3) {
            rawValue = rawValue.slice(0, 3) + " " + rawValue.slice(3);
          }
          break;
        case "UK":
          rawValue = rawValue.toUpperCase().replace(/[^A-Z0-9\s]/g, "").slice(0, 8);
          break;
        default:
          rawValue = rawValue.slice(0, 10);
      }
      onChange?.(rawValue.replace(/\s/g, ""));
      e.target.value = rawValue;
    };
    const getPlaceholder = () => {
      switch (format4) {
        case "US":
          return "12345";
        case "CA":
          return "K1A 0B1";
        case "UK":
          return "SW1A 1AA";
        default:
          return "Postal Code";
      }
    };
    return /* @__PURE__ */ jsx(
      Input,
      {
        ref,
        type: "text",
        autoComplete: "postal-code",
        placeholder: getPlaceholder(),
        value,
        onChange: handleChange,
        className,
        ...props
      }
    );
  }
);
CardZipInput.displayName = "CardZipInput";
var checkboxVariants = cva(
  "peer shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "border-border bg-background data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        outline: "border-border bg-transparent data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        muted: "border-border bg-accent data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        ghost: "border-transparent bg-transparent hover:bg-accent data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      },
      size: {
        sm: "h-3.5 w-3.5",
        default: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-sm",
        md: "rounded-md",
        full: "rounded-full"
      },
      animation: {
        none: "",
        subtle: "transition-all duration-200",
        default: "transition-all duration-200",
        bounce: "transition-all duration-200"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
      animation: "default"
    }
  }
);
var Checkbox = t.forwardRef(({
  className,
  variant,
  size,
  radius,
  animation,
  indeterminate = false,
  icon,
  checked,
  ...props
}, ref) => {
  const [isIndeterminate, setIsIndeterminate] = t.useState(indeterminate);
  t.useEffect(() => {
    setIsIndeterminate(indeterminate);
  }, [indeterminate]);
  const effectiveChecked = isIndeterminate ? false : checked;
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      ref,
      checked: effectiveChecked,
      className: cn("moonui-theme", checkboxVariants({ variant, size, radius, animation }), className),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          className: cn(
            "flex items-center justify-center text-current",
            animation === "bounce" && "data-[state=checked]:animate-bounce"
          ),
          children: isIndeterminate ? /* @__PURE__ */ jsx(Minus, { className: "h-[65%] w-[65%]" }) : icon ? icon : /* @__PURE__ */ jsx(Check, { className: "h-[65%] w-[65%]" })
        }
      )
    }
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
var CheckboxGroup = t.forwardRef(
  ({ className, orientation = "vertical", spacing = "1rem", children, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className
        ),
        style: { gap: spacing },
        role: "group",
        ...props,
        children
      }
    );
  }
);
CheckboxGroup.displayName = "CheckboxGroup";
var CheckboxLabel = t.forwardRef(
  ({ className, htmlFor, children, position = "end", disabled = false, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "label",
      {
        ref,
        htmlFor,
        className: cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          position === "start" ? "mr-2" : "ml-2",
          disabled && "cursor-not-allowed opacity-70",
          className
        ),
        ...props,
        children
      }
    );
  }
);
CheckboxLabel.displayName = "CheckboxLabel";
var CheckboxWithLabel = t.forwardRef(({
  id,
  label,
  labelPosition = "end",
  labelClassName,
  ...checkboxProps
}, ref) => {
  const generatedId = t.useId();
  const checkboxId = id || generatedId;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    labelPosition === "start" && /* @__PURE__ */ jsx(
      CheckboxLabel,
      {
        htmlFor: checkboxId,
        position: "start",
        disabled: checkboxProps.disabled,
        className: labelClassName,
        children: label
      }
    ),
    /* @__PURE__ */ jsx(Checkbox, { ref, id: checkboxId, ...checkboxProps }),
    labelPosition === "end" && /* @__PURE__ */ jsx(
      CheckboxLabel,
      {
        htmlFor: checkboxId,
        position: "end",
        disabled: checkboxProps.disabled,
        className: labelClassName,
        children: label
      }
    )
  ] });
});
CheckboxWithLabel.displayName = "CheckboxWithLabel";
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext32(rootComponentName, defaultContext) {
    const BaseContext = t.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider3 = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = t.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx(Context.Provider, { value, children });
    };
    Provider3.displayName = rootComponentName + "Provider";
    function useContext22(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = t.useContext(Context);
      if (context)
        return context;
      if (defaultContext !== void 0)
        return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider3, useContext22];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return t.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return t.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext32, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1)
    return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return t.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var useLayoutEffect2 = globalThis?.document ? t.useLayoutEffect : () => {
};
var useInsertionEffect = t[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  },
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  {
    const isControlledRef = t.useRef(prop !== void 0);
    t.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = t.useCallback(
    (nextValue) => {
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = t.useState(defaultProp);
  const prevValueRef = t.useRef(value);
  const onChangeRef = t.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  t.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction(value) {
  return typeof value === "function";
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return t.useCallback(composeRefs(...refs), refs);
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = t.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
function useStateMachine(initialState, machine) {
  return t.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : t.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? t.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = t.useState();
  const stylesRef = t.useRef(null);
  const prevPresentRef = t.useRef(present);
  const prevAnimationNameRef = t.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  t.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: t.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return styles?.animationName || "none";
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var useReactId = t[" useId ".trim().toString()] || (() => void 0);
var count = 0;
function useId2(deterministicId) {
  const [id, setId] = t.useState(useReactId());
  useLayoutEffect2(() => {
    if (!deterministicId)
      setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = t.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: COLLAPSIBLE_NAME
    });
    return /* @__PURE__ */ jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId2(),
        open,
        onOpenToggle: t.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsx(
          Primitive.div,
          {
            "data-state": getState(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME = "CollapsibleTrigger";
var CollapsibleTrigger = t.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME, __scopeCollapsible);
    return /* @__PURE__ */ jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger.displayName = TRIGGER_NAME;
var CONTENT_NAME = "CollapsibleContent";
var CollapsibleContent = t.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME, props.__scopeCollapsible);
    return /* @__PURE__ */ jsx(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent.displayName = CONTENT_NAME;
var CollapsibleContentImpl = t.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME, __scopeCollapsible);
  const [isPresent, setIsPresent] = t.useState(present);
  const ref = t.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = t.useRef(0);
  const height = heightRef.current;
  const widthRef = t.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = t.useRef(isOpen);
  const originalStylesRef = t.useRef(void 0);
  t.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsx(
    Primitive.div,
    {
      "data-state": getState(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState(open) {
  return open ? "open" : "closed";
}
var Root4 = Collapsible;
var Trigger2 = CollapsibleTrigger;
var Content2 = CollapsibleContent;
var Collapsible2 = Root4;
var collapsibleTriggerVariants = cva(
  "flex w-full items-center justify-between transition-all",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-primary",
        ghost: "text-foreground hover:bg-accent/10 rounded",
        outline: "text-foreground border border-border rounded-t-md hover:bg-accent/5"
      },
      size: {
        sm: "text-xs py-2 px-3",
        default: "text-sm py-3 px-4",
        md: "text-base py-4 px-4",
        lg: "text-lg py-5 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var CollapsibleTrigger2 = t.forwardRef(({ className, children, variant, size, asChild, ...props }, ref) => {
  if (asChild) {
    return /* @__PURE__ */ jsx(
      Trigger2,
      {
        ref,
        className: cn("moonui-theme", collapsibleTriggerVariants({ variant, size }), className),
        asChild,
        ...props,
        children
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    Trigger2,
    {
      ref,
      className: cn("moonui-theme", collapsibleTriggerVariants({ variant, size }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 ml-auto transition-transform duration-200 [&[data-state=open]]:rotate-180" })
      ]
    }
  );
});
CollapsibleTrigger2.displayName = Trigger2.displayName;
var collapsibleContentVariants = cva(
  "overflow-hidden transition-all data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        ghost: "text-muted-foreground rounded-b",
        outline: "text-muted-foreground border border-t-0 border-border rounded-b-md"
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        md: "text-base",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var CollapsibleContent2 = t.forwardRef(({ className, children, variant, size, ...props }, ref) => /* @__PURE__ */ jsx(
  Content2,
  {
    ref,
    className: cn("moonui-theme", collapsibleContentVariants({ variant, size }), className),
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: "p-4", children })
  }
));
CollapsibleContent2.displayName = Content2.displayName;
var inputWrapperVariants = cva(
  "group relative flex items-center w-full transition-colors",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: ""
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var inputVariants = cva(
  [
    "w-full bg-background transition-all duration-200",
    "text-foreground placeholder:text-muted-foreground dark:placeholder:text-gray-500",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:font-medium",
    "focus-visible:outline-none dark:text-gray-200"
  ],
  {
    variants: {
      variant: {
        standard: "border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 hover:border-gray-400 dark:hover:border-gray-600 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/20 focus-visible:border-primary dark:focus-visible:border-primary/80 dark:bg-gray-800/80 dark:shadow-inner dark:shadow-gray-950/10",
        filled: "border border-transparent bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/20 dark:shadow-inner dark:shadow-gray-950/10",
        ghost: "border-none bg-transparent shadow-none px-1 dark:text-gray-300 dark:placeholder:text-gray-500 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 focus-visible:bg-transparent",
        underline: "border-t-0 border-l-0 border-r-0 border-b border-gray-300 dark:border-gray-600 rounded-none px-0 py-2 hover:border-gray-400 dark:hover:border-gray-500 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary dark:focus-visible:border-primary/80 dark:text-gray-300 dark:bg-transparent"
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base"
      },
      hasLeftIcon: {
        true: "pl-10",
        false: ""
      },
      hasRightIcon: {
        true: "pr-10",
        false: ""
      },
      hasRightButton: {
        true: "pr-10",
        false: ""
      },
      isError: {
        true: "border-error focus-visible:ring-error/30 focus-visible:border-error hover:border-error/80 dark:hover:border-error/80",
        false: ""
      },
      isSuccess: {
        true: "border-success focus-visible:ring-success/30 focus-visible:border-success hover:border-success/80 dark:hover:border-success/80",
        false: ""
      },
      isDisabled: {
        true: "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800/50 pointer-events-none",
        false: ""
      }
    },
    defaultVariants: {
      variant: "standard",
      size: "md",
      isError: false,
      isSuccess: false,
      isDisabled: false,
      hasLeftIcon: false,
      hasRightIcon: false,
      hasRightButton: false
    }
  }
);
var Input = t.forwardRef(
  ({
    className,
    wrapperClassName,
    messageClassName,
    variant,
    size,
    isError,
    disabled,
    error,
    success,
    loading,
    leftIcon,
    rightIcon,
    rightButton,
    alwaysShowMessage = false,
    label,
    floatingLabel = false,
    floatingLabelClassName,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = t.useState(false);
    const [internalValue, setInternalValue] = t.useState(value || defaultValue || "");
    const hasValue = internalValue !== "" && internalValue !== null && internalValue !== void 0;
    const isLabelActive = isFocused || hasValue;
    const handleFocus = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    const handleBlur = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    const handleChange = (e) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };
    t.useEffect(() => {
      if (value !== void 0) {
        setInternalValue(value);
      }
    }, [value]);
    const showMessage = alwaysShowMessage || error || success;
    const messageType = error ? "error" : success ? "success" : "normal";
    return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: cn("moonui-theme", inputWrapperVariants({ size }), wrapperClassName), children: [
        floatingLabel && label && /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: props.id,
            className: cn(
              "absolute transition-all duration-200 pointer-events-none",
              leftIcon || loading ? "left-10" : "left-3",
              "text-gray-500 dark:text-gray-400",
              isLabelActive ? "top-0 -translate-y-1/2 text-xs bg-background dark:bg-gray-800 px-1" : "top-1/2 -translate-y-1/2 text-sm",
              isFocused && "text-primary dark:text-primary",
              !!error && "text-error",
              disabled && "opacity-50",
              floatingLabelClassName
            ),
            children: label
          }
        ),
        leftIcon && /* @__PURE__ */ jsx("div", { className: "absolute left-3 text-gray-500 flex items-center justify-center pointer-events-none", children: loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : leftIcon }),
        /* @__PURE__ */ jsx(
          "input",
          {
            className: cn(
              inputVariants({
                variant,
                size,
                isError: !!error || isError,
                isSuccess: !!success,
                isDisabled: disabled || loading,
                hasLeftIcon: !!leftIcon || loading,
                hasRightIcon: !!rightIcon,
                hasRightButton: !!rightButton
              }),
              className
            ),
            ref,
            disabled: disabled || loading,
            "data-loading": loading ? "" : void 0,
            "data-error": !!error ? "" : void 0,
            "data-success": !!success ? "" : void 0,
            "aria-invalid": !!error || !!isError || void 0,
            "aria-describedby": error ? `${props.id || ""}-error` : success ? `${props.id || ""}-success` : void 0,
            value,
            defaultValue,
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            placeholder: floatingLabel ? isLabelActive ? placeholder : "" : placeholder,
            ...props
          }
        ),
        rightIcon && !loading && /* @__PURE__ */ jsx("div", { className: "absolute right-3 text-gray-500 flex items-center justify-center pointer-events-none", children: rightIcon }),
        rightButton && /* @__PURE__ */ jsx("div", { className: "absolute right-3", children: rightButton }),
        loading && !leftIcon && /* @__PURE__ */ jsx("div", { className: "absolute left-3 text-gray-500 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin", "aria-hidden": "true" }) })
      ] }),
      showMessage && /* @__PURE__ */ jsx(
        "p",
        {
          className: cn(
            "text-xs transition-all",
            messageType === "error" && "text-error",
            messageType === "success" && "text-success",
            messageType === "normal" && "text-muted-foreground",
            messageClassName
          ),
          id: error ? `${props.id || ""}-error` : success ? `${props.id || ""}-success` : void 0,
          children: error || success || ""
        }
      )
    ] });
  }
);
Input.displayName = "Input";
var labelVariants = cva(
  "text-sm font-medium leading-none text-gray-900 dark:text-gray-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:peer-disabled:opacity-60 transition-colors duration-200"
);
var Label = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
var popoverContentVariants = cva(
  "z-50 w-72 rounded-md border border-border bg-background p-4 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-destructive bg-destructive/5",
        outline: "border-border bg-transparent",
        subtle: "border-transparent bg-muted/50"
      },
      size: {
        sm: "w-48 p-3",
        default: "w-72 p-4",
        lg: "w-96 p-5"
      },
      side: {
        top: "data-[side=top]:slide-in-from-bottom-2",
        right: "data-[side=right]:slide-in-from-left-2",
        bottom: "data-[side=bottom]:slide-in-from-top-2",
        left: "data-[side=left]:slide-in-from-right-2"
      },
      position: {
        pointerEventsNone: "pointer-events-none",
        default: ""
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        default: "shadow-md",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
      shadow: "default"
    }
  }
);
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverContent = t.forwardRef(({
  className,
  variant,
  size,
  side,
  position,
  radius,
  shadow,
  backdrop = false,
  closeOnInteractOutside = true,
  overlayBackdrop = false,
  sideOffset = 4,
  ...props
}, ref) => /* @__PURE__ */ jsxs(Fragment, { children: [
  overlayBackdrop && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40 bg-overlay opacity-30" }),
  /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      ref,
      sideOffset,
      collisionPadding: 8,
      onInteractOutside: (e) => {
        if (!closeOnInteractOutside) {
          e.preventDefault();
        }
      },
      className: cn(
        popoverContentVariants({
          variant,
          size,
          side,
          position,
          radius,
          shadow
        }),
        backdrop && "backdrop-blur-md bg-opacity-80",
        className
      ),
      ...props
    }
  )
] }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
var PopoverClose = PopoverPrimitive.Close;
var PopoverSeparator = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("moonui-theme", "my-2 h-px bg-border", className),
    ...props
  }
);
PopoverSeparator.displayName = "PopoverSeparator";
var PopoverHeader = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("moonui-theme", "-mx-4 -mt-4 mb-3 px-4 pt-4 pb-3 border-b border-border", className),
    ...props
  }
);
PopoverHeader.displayName = "PopoverHeader";
var PopoverFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("moonui-theme", "-mx-4 -mb-4 mt-3 px-4 pt-3 pb-4 border-t border-border", className),
    ...props
  }
);
PopoverFooter.displayName = "PopoverFooter";
var Tabs = t.forwardRef(({ vertical = false, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Root,
  {
    ref,
    className: cn("moonui-theme", props.className),
    orientation: vertical ? "vertical" : "horizontal",
    ...props
  }
));
Tabs.displayName = TabsPrimitive.Root.displayName;
var tabsListVariants = cva(
  "flex items-center justify-start transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-muted rounded-md p-1 text-muted-foreground dark:bg-gray-800/80 dark:text-gray-400",
        pills: "bg-transparent gap-2 p-0 dark:text-gray-400",
        underline: "bg-transparent border-b border-border dark:border-gray-700 gap-4 dark:text-gray-400",
        cards: "bg-transparent gap-2 p-0 dark:text-gray-400",
        minimal: "bg-transparent gap-1 p-0 dark:text-gray-400"
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col items-start gap-1"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      fullWidth: false
    }
  }
);
var TabsList = t.forwardRef(({ className, variant, orientation, fullWidth, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn("moonui-theme", tabsListVariants({ variant, orientation, fullWidth, className })),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-gray-100 dark:data-[state=active]:shadow-gray-950/10",
        underline: "rounded-none border-b-2 border-transparent pb-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground dark:data-[state=active]:border-primary/80 dark:data-[state=active]:text-gray-100",
        pills: "rounded-full bg-muted hover:bg-muted/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:bg-gray-800 dark:hover:bg-gray-700 dark:data-[state=active]:bg-primary/90 dark:data-[state=active]:text-white",
        cards: "rounded-md bg-muted/50 hover:bg-muted data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md dark:bg-gray-800/50 dark:hover:bg-gray-700/50 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-gray-100 dark:data-[state=active]:shadow-gray-950/20",
        minimal: "rounded-sm bg-transparent hover:bg-muted/30 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:underline data-[state=active]:underline-offset-4 dark:hover:bg-gray-800/30 dark:data-[state=active]:text-gray-200"
      },
      size: {
        sm: "h-7 px-2 text-xs",
        md: "h-9 px-3 py-1.5 text-sm",
        lg: "h-10 px-4 py-2 text-base"
      },
      orientation: {
        horizontal: "",
        vertical: "justify-start w-full text-left"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      orientation: "horizontal",
      fullWidth: false
    }
  }
);
var TabsTrigger = t.forwardRef(({
  className,
  variant,
  size,
  icon,
  iconPosition = "left",
  badge,
  fadeTabs = false,
  orientation,
  fullWidth,
  children,
  ...props
}, ref) => /* @__PURE__ */ jsxs(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "moonui-theme",
      tabsTriggerVariants({ variant, size, orientation, fullWidth }),
      fadeTabs && "data-[state=inactive]:opacity-60",
      className
    ),
    ...props,
    children: [
      icon && iconPosition === "left" && /* @__PURE__ */ jsx("span", { className: "mr-2", children: icon }),
      children,
      icon && iconPosition === "right" && /* @__PURE__ */ jsx("span", { className: "ml-2", children: icon }),
      badge && /* @__PURE__ */ jsx("span", { className: "ml-2", children: badge })
    ]
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = t.forwardRef(({ className, animated = false, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "moonui-theme",
      "mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      animated && "data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
var sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      size: {
        sm: "h-5",
        default: "h-6",
        md: "h-8",
        lg: "h-10"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
var sliderTrackVariants = cva(
  "relative h-1.5 w-full grow overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/20",
        secondary: "bg-secondary/20",
        accent: "bg-accent/20",
        success: "bg-success/20",
        warning: "bg-warning/20",
        error: "bg-error/20"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var sliderRangeVariants = cva(
  "absolute h-full",
  {
    variants: {
      variant: {
        default: "bg-foreground",
        primary: "bg-primary",
        secondary: "bg-secondary",
        accent: "bg-accent",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);
var sliderThumbVariants = cva(
  "block rounded-full border-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-foreground bg-background",
        primary: "border-primary bg-background",
        secondary: "border-secondary bg-background",
        accent: "border-accent bg-background",
        success: "border-success bg-background",
        warning: "border-warning bg-background",
        error: "border-error bg-background"
      },
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);
var Slider = t.forwardRef(({
  className,
  size,
  trackVariant,
  rangeVariant,
  thumbVariant,
  thumbSize,
  showValueLabel = false,
  valueLabelFormat,
  valueLabelClassName,
  value,
  defaultValue = [0],
  onValueChange,
  disabled,
  ...props
}, ref) => {
  const [sliderValue, setSliderValue] = t.useState(
    value || defaultValue || [0]
  );
  t.useEffect(() => {
    if (value !== void 0) {
      setSliderValue(value);
    }
  }, [value]);
  const formatValue = (val) => {
    if (valueLabelFormat) {
      return valueLabelFormat(val);
    }
    const roundedValue = Math.round(val * 100) / 100;
    return `${roundedValue}`;
  };
  const calculateThumbPercent = (value2, min3, max3) => {
    return (value2 - min3) / (max3 - min3) * 100;
  };
  const trackRef = t.useRef(null);
  const min2 = props.min || 0;
  const max2 = props.max || 100;
  const step = props.step || 1;
  const handleValueChange = (newValues) => {
    const roundedValues = newValues.map((val) => {
      if (step < 1) {
        const decimals = step.toString().split(".")[1]?.length || 0;
        return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);
      }
      return Math.round(val);
    });
    setSliderValue(roundedValues);
    if (onValueChange) {
      onValueChange(roundedValues);
    }
  };
  const handleTrackClick = (event) => {
    if (disabled)
      return;
    const track = trackRef.current;
    if (!track)
      return;
    const rect = track.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const rawValue = min2 + percent * (max2 - min2);
    const steppedValue = Math.round(rawValue / step) * step;
    const boundedValue = Math.max(min2, Math.min(max2, steppedValue));
    const newValues = [...sliderValue];
    newValues[0] = boundedValue;
    handleValueChange(newValues);
  };
  const handleThumbMouseDown = (index) => (event) => {
    if (disabled)
      return;
    event.preventDefault();
    const handleMouseMove = (moveEvent) => {
      const track = trackRef.current;
      if (!track)
        return;
      const rect = track.getBoundingClientRect();
      const percent = (moveEvent.clientX - rect.left) / rect.width;
      const rawValue = min2 + percent * (max2 - min2);
      const steppedValue = Math.round(rawValue / step) * step;
      const boundedValue = Math.max(min2, Math.min(max2, steppedValue));
      const newValues = [...sliderValue];
      newValues[index] = boundedValue;
      handleValueChange(newValues);
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", ref, ...props, children: [
    showValueLabel && /* @__PURE__ */ jsx("div", { className: cn(
      "flex justify-end mb-1 text-sm text-muted-foreground",
      valueLabelClassName
    ), children: sliderValue.length === 1 ? /* @__PURE__ */ jsx("span", { children: formatValue(sliderValue[0]) }) : /* @__PURE__ */ jsxs("span", { children: [
      formatValue(sliderValue[0]),
      " - ",
      formatValue(sliderValue[sliderValue.length - 1])
    ] }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn("moonui-theme", sliderVariants({ size }), className),
        "data-disabled": disabled ? true : void 0,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: trackRef,
              className: cn(sliderTrackVariants({ variant: trackVariant || thumbVariant || "default" })),
              onClick: handleTrackClick,
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(sliderRangeVariants({ variant: rangeVariant || thumbVariant || "primary" })),
                  style: {
                    left: "0%",
                    width: `${calculateThumbPercent(sliderValue[0], min2, max2)}%`
                  }
                }
              )
            }
          ),
          sliderValue.map((value2, i) => /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(sliderThumbVariants({
                variant: thumbVariant || "primary",
                size: thumbSize
              })),
              style: {
                left: `${calculateThumbPercent(value2, min2, max2)}%`,
                transform: "translateX(-50%)",
                position: "absolute",
                top: "50%",
                marginTop: thumbSize === "sm" ? "-6px" : thumbSize === "lg" ? "-12px" : "-8px",
                cursor: disabled ? "not-allowed" : "pointer"
              },
              onMouseDown: handleThumbMouseDown(i),
              "aria-label": `Thumb ${i + 1}`,
              tabIndex: disabled ? -1 : 0,
              role: "slider",
              "aria-valuemin": min2,
              "aria-valuemax": max2,
              "aria-valuenow": value2,
              "aria-disabled": disabled
            },
            i
          ))
        ]
      }
    )
  ] });
});
Slider.displayName = "Slider";
var colorPickerVariants = cva(
  "relative inline-flex items-center justify-center",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16"
      },
      shape: {
        square: "rounded-md",
        circle: "rounded-full",
        rounded: "rounded-lg"
      }
    },
    defaultVariants: {
      size: "default",
      shape: "square"
    }
  }
);
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function hexToHsl(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb)
    return null;
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max2 = Math.max(r, g, b);
  const min2 = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max2 + min2) / 2;
  if (max2 !== min2) {
    const d = max2 - min2;
    s = l > 0.5 ? d / (2 - max2 - min2) : d / (max2 + min2);
    switch (max2) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}
function hslToHex(h, s, l) {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p3, q2, t2) => {
      if (t2 < 0)
        t2 += 1;
      if (t2 > 1)
        t2 -= 1;
      if (t2 < 1 / 6)
        return p3 + (q2 - p3) * 6 * t2;
      if (t2 < 1 / 2)
        return q2;
      if (t2 < 2 / 3)
        return p3 + (q2 - p3) * (2 / 3 - t2) * 6;
      return p3;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p2 = 2 * l - q;
    r = hue2rgb(p2, q, h + 1 / 3);
    g = hue2rgb(p2, q, h);
    b = hue2rgb(p2, q, h - 1 / 3);
  }
  return rgbToHex(
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  );
}
var defaultPresets = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ff8800",
  "#8800ff",
  "#88ff00",
  "#0088ff",
  "#ff0088",
  "#00ff88",
  "#888888",
  "#f87171",
  "#fb923c",
  "#fbbf24",
  "#facc15",
  "#a3e635",
  "#4ade80",
  "#34d399",
  "#2dd4bf",
  "#22d3ee",
  "#38bdf8",
  "#60a5fa",
  "#818cf8",
  "#a78bfa",
  "#c084fc",
  "#e879f9",
  "#f472b6",
  "#fb7185",
  "#f43f5e",
  "#ef4444",
  "#dc2626"
];
function ColorPicker({
  className,
  size,
  shape,
  value = "#000000",
  onChange,
  showInput = true,
  showPresets = true,
  presets = defaultPresets,
  allowOpacity = false,
  format: format4 = "hex",
  disableCopy = false,
  triggerMode = "click",
  disabled,
  ...props
}) {
  const [open, setOpen] = t.useState(false);
  const [color, setColor] = t.useState(value);
  const [opacity, setOpacity] = t.useState(100);
  const [copied, setCopied] = t.useState(false);
  const [inputValue, setInputValue] = t.useState(value);
  const hsl = t.useMemo(() => hexToHsl(color) || { h: 0, s: 0, l: 0 }, [color]);
  const rgb = t.useMemo(() => hexToRgb(color) || { r: 0, g: 0, b: 0 }, [color]);
  t.useEffect(() => {
    setColor(value);
    setInputValue(value);
  }, [value]);
  const handleColorChange = (newColor) => {
    setColor(newColor);
    setInputValue(newColor);
    onChange?.(newColor);
  };
  const handleHslChange = (component, value2) => {
    const newHsl = { ...hsl, [component]: value2 };
    const newColor = hslToHex(newHsl.h, newHsl.s, newHsl.l);
    handleColorChange(newColor);
  };
  const handleRgbChange = (component, value2) => {
    const newRgb = { ...rgb, [component]: value2 };
    const newColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    handleColorChange(newColor);
  };
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
      handleColorChange(newValue);
    }
  };
  const copyToClipboard = async () => {
    try {
      let textToCopy = color;
      if (format4 === "rgb") {
        textToCopy = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      } else if (format4 === "hsl") {
        textToCopy = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      }
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  const formatDisplay = () => {
    if (format4 === "rgb")
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    if (format4 === "hsl")
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    return color;
  };
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        className: cn(
          colorPickerVariants({ size, shape }),
          "p-0 border-2",
          className
        ),
        style: { backgroundColor: color },
        disabled,
        ...props,
        children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Pick a color" })
      }
    ) }),
    /* @__PURE__ */ jsxs(PopoverContent, { className: "w-80", align: "start", sideOffset: 8, children: [
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "picker", className: "w-full", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "picker", children: "Picker" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "sliders", children: "Sliders" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "input", children: "Input" })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "picker", className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-48 rounded-md overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  background: `linear-gradient(to right, #fff, hsl(${hsl.h}, 100%, 50%))`
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  background: "linear-gradient(to bottom, transparent, #000)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute w-4 h-4 border-2 border-white rounded-full shadow-md cursor-pointer",
                drag: true,
                dragConstraints: {
                  left: -8,
                  right: 280,
                  top: -8,
                  bottom: 184
                },
                dragElastic: 0,
                style: {
                  backgroundColor: color,
                  left: `${hsl.s / 100 * 280 - 8}px`,
                  top: `${(1 - hsl.l / 100) * 192 - 8}px`
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Hue" }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "relative h-3 rounded-full",
                style: {
                  background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
                },
                children: /* @__PURE__ */ jsx(
                  Slider,
                  {
                    value: [hsl.h],
                    onValueChange: ([value2]) => handleHslChange("h", value2),
                    max: 360,
                    step: 1,
                    className: "absolute inset-0"
                  }
                )
              }
            )
          ] }),
          allowOpacity && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Opacity" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                Slider,
                {
                  value: [opacity],
                  onValueChange: ([value2]) => setOpacity(value2),
                  max: 100,
                  step: 1,
                  className: "flex-1"
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-sm w-10 text-right", children: [
                opacity,
                "%"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "sliders", className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx(Label, { children: "Red" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: rgb.r })
              ] }),
              /* @__PURE__ */ jsx(
                Slider,
                {
                  value: [rgb.r],
                  onValueChange: ([value2]) => handleRgbChange("r", value2),
                  max: 255,
                  step: 1,
                  className: "[&_[role=slider]]:bg-red-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx(Label, { children: "Green" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: rgb.g })
              ] }),
              /* @__PURE__ */ jsx(
                Slider,
                {
                  value: [rgb.g],
                  onValueChange: ([value2]) => handleRgbChange("g", value2),
                  max: 255,
                  step: 1,
                  className: "[&_[role=slider]]:bg-green-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx(Label, { children: "Blue" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: rgb.b })
              ] }),
              /* @__PURE__ */ jsx(
                Slider,
                {
                  value: [rgb.b],
                  onValueChange: ([value2]) => handleRgbChange("b", value2),
                  max: 255,
                  step: 1,
                  className: "[&_[role=slider]]:bg-blue-500"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-2 border-t", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "H" }),
              /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
                hsl.h,
                "\xB0"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "S" }),
              /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
                hsl.s,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "L" }),
              /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
                hsl.l,
                "%"
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "input", className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Hex Color" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: inputValue,
                  onChange: handleInputChange,
                  placeholder: "#000000",
                  className: "font-mono"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "icon",
                  variant: "outline",
                  onClick: () => handleColorChange(inputValue),
                  children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "RGB Values" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  value: rgb.r,
                  onChange: (e) => handleRgbChange("r", parseInt(e.target.value) || 0),
                  min: 0,
                  max: 255,
                  className: "text-center"
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  value: rgb.g,
                  onChange: (e) => handleRgbChange("g", parseInt(e.target.value) || 0),
                  min: 0,
                  max: 255,
                  className: "text-center"
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  value: rgb.b,
                  onChange: (e) => handleRgbChange("b", parseInt(e.target.value) || 0),
                  min: 0,
                  max: 255,
                  className: "text-center"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between p-3 border rounded-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "h-10 w-10 rounded border-2",
                colorPickerVariants({ shape })
              ),
              style: { backgroundColor: color }
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: formatDisplay() }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Current color" })
          ] })
        ] }),
        !disableCopy && /* @__PURE__ */ jsx(
          Button,
          {
            size: "icon",
            variant: "ghost",
            onClick: copyToClipboard,
            className: "h-8 w-8",
            children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: copied ? /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                exit: { scale: 0 },
                children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-green-600" })
              },
              "check"
            ) : /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                exit: { scale: 0 },
                children: /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
              },
              "copy"
            ) })
          }
        )
      ] }),
      showPresets && presets.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { children: "Preset Colors" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-10 gap-1", children: presets.map((presetColor) => /* @__PURE__ */ jsx(
          "button",
          {
            className: cn(
              "h-7 w-7 rounded border-2 transition-all hover:scale-110",
              color === presetColor ? "border-primary" : "border-transparent"
            ),
            style: { backgroundColor: presetColor },
            onClick: () => handleColorChange(presetColor)
          },
          presetColor
        )) })
      ] })
    ] })
  ] });
}
function SimpleColorPicker({
  value = "#000000",
  onChange,
  colors = defaultPresets.slice(0, 10),
  className,
  size = "default"
}) {
  const sizeClasses = {
    sm: "h-6 w-6",
    default: "h-8 w-8",
    lg: "h-10 w-10"
  };
  return /* @__PURE__ */ jsx("div", { className: cn("moonui-theme", "flex flex-wrap gap-2", className), children: colors.map((color) => /* @__PURE__ */ jsx(
    "button",
    {
      className: cn(
        "rounded-full border-2 transition-all hover:scale-110",
        sizeClasses[size],
        value === color ? "border-primary ring-2 ring-primary/20" : "border-transparent"
      ),
      style: { backgroundColor: color },
      onClick: () => onChange?.(color)
    },
    color
  )) });
}
function GradientPicker({
  value = { start: "#ff0000", end: "#0000ff", angle: 90 },
  onChange,
  className
}) {
  const [gradient, setGradient] = t.useState(value);
  const handleChange = (field, newValue) => {
    const newGradient = { ...gradient, [field]: newValue };
    setGradient(newGradient);
    onChange?.(newGradient);
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("moonui-theme", "space-y-4", className), children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-20 rounded-lg border-2",
        style: {
          background: `linear-gradient(${gradient.angle}deg, ${gradient.start}, ${gradient.end})`
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { children: "Start Color" }),
        /* @__PURE__ */ jsx(
          ColorPicker,
          {
            value: gradient.start,
            onChange: (color) => handleChange("start", color),
            size: "sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { children: "End Color" }),
        /* @__PURE__ */ jsx(
          ColorPicker,
          {
            value: gradient.end,
            onChange: (color) => handleChange("end", color),
            size: "sm"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Label, { children: "Angle" }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
          gradient.angle,
          "\xB0"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Slider,
        {
          value: [gradient.angle || 90],
          onValueChange: ([value2]) => handleChange("angle", value2),
          max: 360,
          step: 1
        }
      )
    ] })
  ] });
}

// ../../node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var U = 1;
var Y = 0.9;
var H = 0.8;
var J = 0.17;
var p = 0.1;
var u = 0.999;
var $ = 0.9999;
var k = 0.99;
var m = /[\\\/_+.#"@\[\(\{&]/;
var B = /[\\\/_+.#"@\[\(\{&]/g;
var K = /[\s-]/;
var X2 = /[\s-]/g;
function G(_, C, h, P2, A, f, O) {
  if (f === C.length)
    return A === _.length ? U : k;
  var T2 = `${A},${f}`;
  if (O[T2] !== void 0)
    return O[T2];
  for (var L2 = P2.charAt(f), c = h.indexOf(L2, A), S = 0, E, N2, R, M; c >= 0; )
    E = G(_, C, h, P2, c + 1, f + 1, O), E > S && (c === A ? E *= U : m.test(_.charAt(c - 1)) ? (E *= H, R = _.slice(A, c - 1).match(B), R && A > 0 && (E *= Math.pow(u, R.length))) : K.test(_.charAt(c - 1)) ? (E *= Y, M = _.slice(A, c - 1).match(X2), M && A > 0 && (E *= Math.pow(u, M.length))) : (E *= J, A > 0 && (E *= Math.pow(u, c - A))), _.charAt(c) !== C.charAt(f) && (E *= $)), (E < p && h.charAt(c - 1) === P2.charAt(f + 1) || P2.charAt(f + 1) === P2.charAt(f) && h.charAt(c - 1) !== P2.charAt(f)) && (N2 = G(_, C, h, P2, c + 1, f + 2, O), N2 * p > E && (E = N2 * p)), E > S && (S = E), c = h.indexOf(L2, c + 1);
  return O[T2] = S, S;
}
function D(_) {
  return _.toLowerCase().replace(X2, " ");
}
function W(_, C, h) {
  return _ = h && h.length > 0 ? `${_ + " " + h.join(" ")}` : _, G(_, C, D(_), D(C), 0, 0, {});
}
var NODES2 = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive2 = NODES2.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = t.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var useLayoutEffect22 = globalThis?.document ? t.useLayoutEffect : () => {
};

// ../../node_modules/@radix-ui/react-id/dist/index.mjs
var useReactId2 = t[" useId ".trim().toString()] || (() => void 0);
var count2 = 0;
function useId3(deterministicId) {
  const [id, setId] = t.useState(useReactId2());
  useLayoutEffect22(() => {
    if (!deterministicId)
      setId((reactId) => reactId ?? String(count2++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}
function setRef2(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs2(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef2(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef2(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs2(...refs) {
  return t.useCallback(composeRefs2(...refs), refs);
}

// ../../node_modules/cmdk/dist/index.mjs
var N = '[cmdk-group=""]';
var Y2 = '[cmdk-group-items=""]';
var be = '[cmdk-group-heading=""]';
var le = '[cmdk-item=""]';
var ce = `${le}:not([aria-disabled="true"])`;
var Z = "cmdk-item-select";
var T = "data-value";
var Re = (r, o, n) => W(r, o, n);
var ue = t.createContext(void 0);
var K2 = () => t.useContext(ue);
var de = t.createContext(void 0);
var ee = () => t.useContext(de);
var fe = t.createContext(void 0);
var me = t.forwardRef((r, o) => {
  let n = L(() => {
    var e, a;
    return { search: "", value: (a = (e = r.value) != null ? e : r.defaultValue) != null ? a : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), u2 = L(() => /* @__PURE__ */ new Set()), c = L(() => /* @__PURE__ */ new Map()), d = L(() => /* @__PURE__ */ new Map()), f = L(() => /* @__PURE__ */ new Set()), p2 = pe(r), { label: b, children: m2, value: R, onValueChange: x, filter: C, shouldFilter: S, loop: A, disablePointerSelection: ge = false, vimBindings: j = true, ...O } = r, $2 = useId3(), q = useId3(), _ = useId3(), I = t.useRef(null), v = ke();
  k2(() => {
    if (R !== void 0) {
      let e = R.trim();
      n.current.value = e, E.emit();
    }
  }, [R]), k2(() => {
    v(6, ne);
  }, []);
  let E = t.useMemo(() => ({ subscribe: (e) => (f.current.add(e), () => f.current.delete(e)), snapshot: () => n.current, setState: (e, a, s) => {
    var i, l, g, y;
    if (!Object.is(n.current[e], a)) {
      if (n.current[e] = a, e === "search")
        J2(), z(), v(1, W2);
      else if (e === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let h = document.getElementById(_);
          h ? h.focus() : (i = document.getElementById($2)) == null || i.focus();
        }
        if (v(7, () => {
          var h;
          n.current.selectedItemId = (h = M()) == null ? void 0 : h.id, E.emit();
        }), s || v(5, ne), ((l = p2.current) == null ? void 0 : l.value) !== void 0) {
          let h = a != null ? a : "";
          (y = (g = p2.current).onValueChange) == null || y.call(g, h);
          return;
        }
      }
      E.emit();
    }
  }, emit: () => {
    f.current.forEach((e) => e());
  } }), []), U2 = t.useMemo(() => ({ value: (e, a, s) => {
    var i;
    a !== ((i = d.current.get(e)) == null ? void 0 : i.value) && (d.current.set(e, { value: a, keywords: s }), n.current.filtered.items.set(e, te(a, s)), v(2, () => {
      z(), E.emit();
    }));
  }, item: (e, a) => (u2.current.add(e), a && (c.current.has(a) ? c.current.get(a).add(e) : c.current.set(a, /* @__PURE__ */ new Set([e]))), v(3, () => {
    J2(), z(), n.current.value || W2(), E.emit();
  }), () => {
    d.current.delete(e), u2.current.delete(e), n.current.filtered.items.delete(e);
    let s = M();
    v(4, () => {
      J2(), (s == null ? void 0 : s.getAttribute("id")) === e && W2(), E.emit();
    });
  }), group: (e) => (c.current.has(e) || c.current.set(e, /* @__PURE__ */ new Set()), () => {
    d.current.delete(e), c.current.delete(e);
  }), filter: () => p2.current.shouldFilter, label: b || r["aria-label"], getDisablePointerSelection: () => p2.current.disablePointerSelection, listId: $2, inputId: _, labelId: q, listInnerRef: I }), []);
  function te(e, a) {
    var i, l;
    let s = (l = (i = p2.current) == null ? void 0 : i.filter) != null ? l : Re;
    return e ? s(e, n.current.search, a) : 0;
  }
  function z() {
    if (!n.current.search || p2.current.shouldFilter === false)
      return;
    let e = n.current.filtered.items, a = [];
    n.current.filtered.groups.forEach((i) => {
      let l = c.current.get(i), g = 0;
      l.forEach((y) => {
        let h = e.get(y);
        g = Math.max(h, g);
      }), a.push([i, g]);
    });
    let s = I.current;
    V().sort((i, l) => {
      var h, F;
      let g = i.getAttribute("id"), y = l.getAttribute("id");
      return ((h = e.get(y)) != null ? h : 0) - ((F = e.get(g)) != null ? F : 0);
    }).forEach((i) => {
      let l = i.closest(Y2);
      l ? l.appendChild(i.parentElement === l ? i : i.closest(`${Y2} > *`)) : s.appendChild(i.parentElement === s ? i : i.closest(`${Y2} > *`));
    }), a.sort((i, l) => l[1] - i[1]).forEach((i) => {
      var g;
      let l = (g = I.current) == null ? void 0 : g.querySelector(`${N}[${T}="${encodeURIComponent(i[0])}"]`);
      l == null || l.parentElement.appendChild(l);
    });
  }
  function W2() {
    let e = V().find((s) => s.getAttribute("aria-disabled") !== "true"), a = e == null ? void 0 : e.getAttribute(T);
    E.setState("value", a || void 0);
  }
  function J2() {
    var a, s, i, l;
    if (!n.current.search || p2.current.shouldFilter === false) {
      n.current.filtered.count = u2.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let e = 0;
    for (let g of u2.current) {
      let y = (s = (a = d.current.get(g)) == null ? void 0 : a.value) != null ? s : "", h = (l = (i = d.current.get(g)) == null ? void 0 : i.keywords) != null ? l : [], F = te(y, h);
      n.current.filtered.items.set(g, F), F > 0 && e++;
    }
    for (let [g, y] of c.current)
      for (let h of y)
        if (n.current.filtered.items.get(h) > 0) {
          n.current.filtered.groups.add(g);
          break;
        }
    n.current.filtered.count = e;
  }
  function ne() {
    var a, s, i;
    let e = M();
    e && (((a = e.parentElement) == null ? void 0 : a.firstChild) === e && ((i = (s = e.closest(N)) == null ? void 0 : s.querySelector(be)) == null || i.scrollIntoView({ block: "nearest" })), e.scrollIntoView({ block: "nearest" }));
  }
  function M() {
    var e;
    return (e = I.current) == null ? void 0 : e.querySelector(`${le}[aria-selected="true"]`);
  }
  function V() {
    var e;
    return Array.from(((e = I.current) == null ? void 0 : e.querySelectorAll(ce)) || []);
  }
  function X7(e) {
    let s = V()[e];
    s && E.setState("value", s.getAttribute(T));
  }
  function Q(e) {
    var g;
    let a = M(), s = V(), i = s.findIndex((y) => y === a), l = s[i + e];
    (g = p2.current) != null && g.loop && (l = i + e < 0 ? s[s.length - 1] : i + e === s.length ? s[0] : s[i + e]), l && E.setState("value", l.getAttribute(T));
  }
  function re(e) {
    let a = M(), s = a == null ? void 0 : a.closest(N), i;
    for (; s && !i; )
      s = e > 0 ? we(s, N) : De(s, N), i = s == null ? void 0 : s.querySelector(ce);
    i ? E.setState("value", i.getAttribute(T)) : Q(e);
  }
  let oe = () => X7(V().length - 1), ie = (e) => {
    e.preventDefault(), e.metaKey ? oe() : e.altKey ? re(1) : Q(1);
  }, se = (e) => {
    e.preventDefault(), e.metaKey ? X7(0) : e.altKey ? re(-1) : Q(-1);
  };
  return t.createElement(Primitive2.div, { ref: o, tabIndex: -1, ...O, "cmdk-root": "", onKeyDown: (e) => {
    var s;
    (s = O.onKeyDown) == null || s.call(O, e);
    let a = e.nativeEvent.isComposing || e.keyCode === 229;
    if (!(e.defaultPrevented || a))
      switch (e.key) {
        case "n":
        case "j": {
          j && e.ctrlKey && ie(e);
          break;
        }
        case "ArrowDown": {
          ie(e);
          break;
        }
        case "p":
        case "k": {
          j && e.ctrlKey && se(e);
          break;
        }
        case "ArrowUp": {
          se(e);
          break;
        }
        case "Home": {
          e.preventDefault(), X7(0);
          break;
        }
        case "End": {
          e.preventDefault(), oe();
          break;
        }
        case "Enter": {
          e.preventDefault();
          let i = M();
          if (i) {
            let l = new Event(Z);
            i.dispatchEvent(l);
          }
        }
      }
  } }, t.createElement("label", { "cmdk-label": "", htmlFor: U2.inputId, id: U2.labelId, style: Te }, b), B2(r, (e) => t.createElement(de.Provider, { value: E }, t.createElement(ue.Provider, { value: U2 }, e))));
});
var he = t.forwardRef((r, o) => {
  var _, I;
  let n = useId3(), u2 = t.useRef(null), c = t.useContext(fe), d = K2(), f = pe(r), p2 = (I = (_ = f.current) == null ? void 0 : _.forceMount) != null ? I : c == null ? void 0 : c.forceMount;
  k2(() => {
    if (!p2)
      return d.item(n, c == null ? void 0 : c.id);
  }, [p2]);
  let b = ve(n, u2, [r.value, r.children, u2], r.keywords), m2 = ee(), R = P((v) => v.value && v.value === b.current), x = P((v) => p2 || d.filter() === false ? true : v.search ? v.filtered.items.get(n) > 0 : true);
  t.useEffect(() => {
    let v = u2.current;
    if (!(!v || r.disabled))
      return v.addEventListener(Z, C), () => v.removeEventListener(Z, C);
  }, [x, r.onSelect, r.disabled]);
  function C() {
    var v, E;
    S(), (E = (v = f.current).onSelect) == null || E.call(v, b.current);
  }
  function S() {
    m2.setState("value", b.current, true);
  }
  if (!x)
    return null;
  let { disabled: A, value: ge, onSelect: j, forceMount: O, keywords: $2, ...q } = r;
  return t.createElement(Primitive2.div, { ref: composeRefs2(u2, o), ...q, id: n, "cmdk-item": "", role: "option", "aria-disabled": !!A, "aria-selected": !!R, "data-disabled": !!A, "data-selected": !!R, onPointerMove: A || d.getDisablePointerSelection() ? void 0 : S, onClick: A ? void 0 : C }, r.children);
});
var Ee = t.forwardRef((r, o) => {
  let { heading: n, children: u2, forceMount: c, ...d } = r, f = useId3(), p2 = t.useRef(null), b = t.useRef(null), m2 = useId3(), R = K2(), x = P((S) => c || R.filter() === false ? true : S.search ? S.filtered.groups.has(f) : true);
  k2(() => R.group(f), []), ve(f, p2, [r.value, r.heading, b]);
  let C = t.useMemo(() => ({ id: f, forceMount: c }), [c]);
  return t.createElement(Primitive2.div, { ref: composeRefs2(p2, o), ...d, "cmdk-group": "", role: "presentation", hidden: x ? void 0 : true }, n && t.createElement("div", { ref: b, "cmdk-group-heading": "", "aria-hidden": true, id: m2 }, n), B2(r, (S) => t.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? m2 : void 0 }, t.createElement(fe.Provider, { value: C }, S))));
});
var ye = t.forwardRef((r, o) => {
  let { alwaysRender: n, ...u2 } = r, c = t.useRef(null), d = P((f) => !f.search);
  return !n && !d ? null : t.createElement(Primitive2.div, { ref: composeRefs2(c, o), ...u2, "cmdk-separator": "", role: "separator" });
});
var Se = t.forwardRef((r, o) => {
  let { onValueChange: n, ...u2 } = r, c = r.value != null, d = ee(), f = P((m2) => m2.search), p2 = P((m2) => m2.selectedItemId), b = K2();
  return t.useEffect(() => {
    r.value != null && d.setState("search", r.value);
  }, [r.value]), t.createElement(Primitive2.input, { ref: o, ...u2, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: false, "aria-autocomplete": "list", role: "combobox", "aria-expanded": true, "aria-controls": b.listId, "aria-labelledby": b.labelId, "aria-activedescendant": p2, id: b.inputId, type: "text", value: c ? r.value : f, onChange: (m2) => {
    c || d.setState("search", m2.target.value), n == null || n(m2.target.value);
  } });
});
var Ce = t.forwardRef((r, o) => {
  let { children: n, label: u2 = "Suggestions", ...c } = r, d = t.useRef(null), f = t.useRef(null), p2 = P((m2) => m2.selectedItemId), b = K2();
  return t.useEffect(() => {
    if (f.current && d.current) {
      let m2 = f.current, R = d.current, x, C = new ResizeObserver(() => {
        x = requestAnimationFrame(() => {
          let S = m2.offsetHeight;
          R.style.setProperty("--cmdk-list-height", S.toFixed(1) + "px");
        });
      });
      return C.observe(m2), () => {
        cancelAnimationFrame(x), C.unobserve(m2);
      };
    }
  }, []), t.createElement(Primitive2.div, { ref: composeRefs2(d, o), ...c, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": p2, "aria-label": u2, id: b.listId }, B2(r, (m2) => t.createElement("div", { ref: composeRefs2(f, b.listInnerRef), "cmdk-list-sizer": "" }, m2)));
});
var xe = t.forwardRef((r, o) => {
  let { open: n, onOpenChange: u2, overlayClassName: c, contentClassName: d, container: f, ...p2 } = r;
  return t.createElement(DialogPrimitive.Root, { open: n, onOpenChange: u2 }, t.createElement(DialogPrimitive.Portal, { container: f }, t.createElement(DialogPrimitive.Overlay, { "cmdk-overlay": "", className: c }), t.createElement(DialogPrimitive.Content, { "aria-label": r.label, "cmdk-dialog": "", className: d }, t.createElement(me, { ref: o, ...p2 }))));
});
var Ie = t.forwardRef((r, o) => P((u2) => u2.filtered.count === 0) ? t.createElement(Primitive2.div, { ref: o, ...r, "cmdk-empty": "", role: "presentation" }) : null);
var Pe = t.forwardRef((r, o) => {
  let { progress: n, children: u2, label: c = "Loading...", ...d } = r;
  return t.createElement(Primitive2.div, { ref: o, ...d, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": c }, B2(r, (f) => t.createElement("div", { "aria-hidden": true }, f)));
});
var _e = Object.assign(me, { List: Ce, Item: he, Input: Se, Group: Ee, Separator: ye, Dialog: xe, Empty: Ie, Loading: Pe });
function we(r, o) {
  let n = r.nextElementSibling;
  for (; n; ) {
    if (n.matches(o))
      return n;
    n = n.nextElementSibling;
  }
}
function De(r, o) {
  let n = r.previousElementSibling;
  for (; n; ) {
    if (n.matches(o))
      return n;
    n = n.previousElementSibling;
  }
}
function pe(r) {
  let o = t.useRef(r);
  return k2(() => {
    o.current = r;
  }), o;
}
var k2 = typeof window == "undefined" ? t.useEffect : t.useLayoutEffect;
function L(r) {
  let o = t.useRef();
  return o.current === void 0 && (o.current = r()), o;
}
function P(r) {
  let o = ee(), n = () => r(o.snapshot());
  return t.useSyncExternalStore(o.subscribe, n, n);
}
function ve(r, o, n, u2 = []) {
  let c = t.useRef(), d = K2();
  return k2(() => {
    var b;
    let f = (() => {
      var m2;
      for (let R of n) {
        if (typeof R == "string")
          return R.trim();
        if (typeof R == "object" && "current" in R)
          return R.current ? (m2 = R.current.textContent) == null ? void 0 : m2.trim() : c.current;
      }
    })(), p2 = u2.map((m2) => m2.trim());
    d.value(r, f, p2), (b = o.current) == null || b.setAttribute(T, f), c.current = f;
  }), c;
}
var ke = () => {
  let [r, o] = t.useState(), n = L(() => /* @__PURE__ */ new Map());
  return k2(() => {
    n.current.forEach((u2) => u2()), n.current = /* @__PURE__ */ new Map();
  }, [r]), (u2, c) => {
    n.current.set(u2, c), o({});
  };
};
function Me(r) {
  let o = r.type;
  return typeof o == "function" ? o(r.props) : "render" in o ? o.render(r.props) : r;
}
function B2({ asChild: r, children: o }, n) {
  return r && t.isValidElement(o) ? t.cloneElement(Me(o), { ref: o.ref }, n(o.props.children)) : n(o);
}
var Te = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var overlayVariants = cva(
  "fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default: "bg-black/80",
        subtle: "bg-black/60",
        blur: "bg-black/40 backdrop-blur-md",
        minimal: "bg-black/20 backdrop-blur-sm"
      },
      animation: {
        default: "duration-200",
        slow: "duration-300",
        fast: "duration-100"
      }
    },
    defaultVariants: {
      variant: "default",
      animation: "default"
    }
  }
);
var DialogOverlay = t.forwardRef(({ className, variant, animation, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn("moonui-theme", overlayVariants({ variant, animation }), className),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var dialogContentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg",
  {
    variants: {
      variant: {
        default: "border-gray-200 dark:border-gray-700",
        primary: "border-primary/20 dark:border-primary/30",
        secondary: "border-gray-300 dark:border-gray-600",
        ghost: "border-transparent shadow-xl",
        destructive: "border-error/20 dark:border-error/30"
      },
      size: {
        xs: "max-w-xs p-4",
        sm: "max-w-sm p-5",
        default: "max-w-lg p-6",
        md: "max-w-md p-6",
        lg: "max-w-2xl p-7",
        xl: "max-w-4xl p-8",
        full: "max-w-[95vw] max-h-[95vh] p-6"
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        default: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-3xl"
      },
      animation: {
        default: "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        fade: "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        zoom: "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        slide: "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        none: ""
      },
      position: {
        default: "top-[50%]",
        top: "top-[5%]",
        bottom: "bottom-[5%] top-auto translate-y-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
      animation: "default",
      position: "default"
    }
  }
);
var DialogContent = t.forwardRef(
  ({
    className,
    children,
    variant,
    size,
    radius,
    animation,
    position,
    overlayVariant = "default",
    overlayAnimation = "default",
    hideCloseButton = false,
    title,
    description,
    icon,
    loading = false,
    success = false,
    onClose,
    ...props
  }, ref) => {
    const handleClose = () => {
      if (onClose) {
        onClose();
      }
    };
    return /* @__PURE__ */ jsxs(DialogPortal, { children: [
      /* @__PURE__ */ jsx(
        DialogOverlay,
        {
          variant: overlayVariant,
          animation: overlayAnimation,
          onClick: hideCloseButton ? void 0 : handleClose
        }
      ),
      /* @__PURE__ */ jsxs(
        DialogPrimitive.Content,
        {
          ref,
          onEscapeKeyDown: hideCloseButton ? void 0 : handleClose,
          onInteractOutside: hideCloseButton ? void 0 : handleClose,
          className: cn(
            dialogContentVariants({
              variant,
              size,
              radius,
              animation,
              position
            }),
            "outline-none",
            loading && "pointer-events-none",
            success && "border-success/40",
            className
          ),
          ...props,
          children: [
            (title || description || icon) && /* @__PURE__ */ jsxs(DialogHeader, { className: "flex gap-4", children: [
              (icon || loading || success) && /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center justify-center", children: [
                loading && /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-primary" }),
                success && /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-success" }),
                !loading && !success && icon && /* @__PURE__ */ jsx("span", { className: "text-primary", children: icon })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                title && /* @__PURE__ */ jsx(DialogTitle, { children: title }),
                description && /* @__PURE__ */ jsx(DialogDescription, { children: description })
              ] })
            ] }),
            children,
            !hideCloseButton && /* @__PURE__ */ jsxs(
              DialogPrimitive.Close,
              {
                onClick: handleClose,
                className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 disabled:pointer-events-none dark:text-gray-300 dark:hover:text-white",
                children: [
                  /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
                ]
              }
            )
          ]
        }
      )
    ] });
  }
);
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2 mt-6",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-xl font-semibold leading-snug tracking-tight dark:text-white",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn(
      "text-sm text-muted-foreground leading-normal dark:text-gray-400",
      className
    ),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
var DialogForm = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "form",
  {
    ref,
    className: cn("moonui-theme", "flex flex-col gap-4", className),
    ...props
  }
));
DialogForm.displayName = "DialogForm";
var commandVariants = cva(
  "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground",
        glass: "bg-background/80 text-foreground backdrop-blur-sm",
        bordered: "bg-popover text-popover-foreground border border-border"
      },
      size: {
        sm: "min-h-[200px]",
        default: "min-h-[300px]",
        lg: "min-h-[400px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Command = t.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx(
  _e,
  {
    ref,
    className: cn("moonui-theme", commandVariants({ variant, size }), className),
    ...props
  }
));
Command.displayName = _e.displayName;
var CommandDialog = ({
  children,
  commandClassName,
  ...props
}) => {
  return /* @__PURE__ */ jsx(Dialog, { ...props, children: /* @__PURE__ */ jsxs(DialogContent, { className: "overflow-hidden p-0 shadow-lg", hideCloseButton: true, children: [
    /* @__PURE__ */ jsx(DialogTitle, { className: "sr-only", children: "Command Menu" }),
    /* @__PURE__ */ jsx(Command, { className: cn(
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
      commandClassName
    ), children })
  ] }) });
};
var CommandInput = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(
    _e.Input,
    {
      ref,
      className: cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = _e.Input.displayName;
var CommandList = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  _e.List,
  {
    ref,
    className: cn("moonui-theme", "max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = _e.List.displayName;
var CommandEmpty = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  _e.Empty,
  {
    ref,
    className: cn("moonui-theme", "py-6 text-center text-sm text-muted-foreground", className),
    ...props
  }
));
CommandEmpty.displayName = _e.Empty.displayName;
var CommandGroup = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  _e.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = _e.Group.displayName;
var CommandSeparator = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  _e.Separator,
  {
    ref,
    className: cn("moonui-theme", "-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = _e.Separator.displayName;
var CommandItem = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  _e.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = _e.Item.displayName;
var CommandShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      ),
      ...props
    }
  );
};
CommandShortcut.displayName = "CommandShortcut";

// ../../node_modules/@tanstack/table-core/build/lib/index.mjs
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function makeStateUpdater(key, instance) {
  return (updater) => {
    instance.setState((old) => {
      return {
        ...old,
        [key]: functionalUpdate(updater, old[key])
      };
    });
  };
}
function isFunction2(d) {
  return d instanceof Function;
}
function isNumberArray(d) {
  return Array.isArray(d) && d.every((val) => typeof val === "number");
}
function flattenBy(arr, getChildren) {
  const flat = [];
  const recurse = (subArr) => {
    subArr.forEach((item) => {
      flat.push(item);
      const children = getChildren(item);
      if (children != null && children.length) {
        recurse(children);
      }
    });
  };
  recurse(arr);
  return flat;
}
function memo(getDeps, fn, opts) {
  let deps = [];
  let result;
  return (depArgs) => {
    let depTime;
    if (opts.key && opts.debug)
      depTime = Date.now();
    const newDeps = getDeps(depArgs);
    const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep);
    if (!depsChanged) {
      return result;
    }
    deps = newDeps;
    let resultTime;
    if (opts.key && opts.debug)
      resultTime = Date.now();
    result = fn(...newDeps);
    opts == null || opts.onChange == null || opts.onChange(result);
    if (opts.key && opts.debug) {
      if (opts != null && opts.debug()) {
        const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
        const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
        const resultFpsPercentage = resultEndTime / 16;
        const pad = (str, num) => {
          str = String(str);
          while (str.length < num) {
            str = " " + str;
          }
          return str;
        };
        console.info(`%c\u23F1 ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120))}deg 100% 31%);`, opts == null ? void 0 : opts.key);
      }
    }
    return result;
  };
}
function getMemoOptions(tableOptions, debugLevel, key, onChange) {
  return {
    debug: () => {
      var _tableOptions$debugAl;
      return (_tableOptions$debugAl = tableOptions == null ? void 0 : tableOptions.debugAll) != null ? _tableOptions$debugAl : tableOptions[debugLevel];
    },
    key: process.env.NODE_ENV === "development" && key,
    onChange
  };
}
function createCell(table, row, column, columnId) {
  const getRenderValue = () => {
    var _cell$getValue;
    return (_cell$getValue = cell.getValue()) != null ? _cell$getValue : table.options.renderFallbackValue;
  };
  const cell = {
    id: `${row.id}_${column.id}`,
    row,
    column,
    getValue: () => row.getValue(columnId),
    renderValue: getRenderValue,
    getContext: memo(() => [table, column, row, cell], (table2, column2, row2, cell2) => ({
      table: table2,
      column: column2,
      row: row2,
      cell: cell2,
      getValue: cell2.getValue,
      renderValue: cell2.renderValue
    }), getMemoOptions(table.options, "debugCells", "cell.getContext"))
  };
  table._features.forEach((feature) => {
    feature.createCell == null || feature.createCell(cell, column, row, table);
  }, {});
  return cell;
}
function createColumn(table, columnDef, depth, parent) {
  var _ref, _resolvedColumnDef$id;
  const defaultColumn = table._getDefaultColumnDef();
  const resolvedColumnDef = {
    ...defaultColumn,
    ...columnDef
  };
  const accessorKey = resolvedColumnDef.accessorKey;
  let id = (_ref = (_resolvedColumnDef$id = resolvedColumnDef.id) != null ? _resolvedColumnDef$id : accessorKey ? typeof String.prototype.replaceAll === "function" ? accessorKey.replaceAll(".", "_") : accessorKey.replace(/\./g, "_") : void 0) != null ? _ref : typeof resolvedColumnDef.header === "string" ? resolvedColumnDef.header : void 0;
  let accessorFn;
  if (resolvedColumnDef.accessorFn) {
    accessorFn = resolvedColumnDef.accessorFn;
  } else if (accessorKey) {
    if (accessorKey.includes(".")) {
      accessorFn = (originalRow) => {
        let result = originalRow;
        for (const key of accessorKey.split(".")) {
          var _result;
          result = (_result = result) == null ? void 0 : _result[key];
          if (process.env.NODE_ENV !== "production" && result === void 0) {
            console.warn(`"${key}" in deeply nested key "${accessorKey}" returned undefined.`);
          }
        }
        return result;
      };
    } else {
      accessorFn = (originalRow) => originalRow[resolvedColumnDef.accessorKey];
    }
  }
  if (!id) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(resolvedColumnDef.accessorFn ? `Columns require an id when using an accessorFn` : `Columns require an id when using a non-string header`);
    }
    throw new Error();
  }
  let column = {
    id: `${String(id)}`,
    accessorFn,
    parent,
    depth,
    columnDef: resolvedColumnDef,
    columns: [],
    getFlatColumns: memo(() => [true], () => {
      var _column$columns;
      return [column, ...(_column$columns = column.columns) == null ? void 0 : _column$columns.flatMap((d) => d.getFlatColumns())];
    }, getMemoOptions(table.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: memo(() => [table._getOrderColumnsFn()], (orderColumns2) => {
      var _column$columns2;
      if ((_column$columns2 = column.columns) != null && _column$columns2.length) {
        let leafColumns = column.columns.flatMap((column2) => column2.getLeafColumns());
        return orderColumns2(leafColumns);
      }
      return [column];
    }, getMemoOptions(table.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const feature of table._features) {
    feature.createColumn == null || feature.createColumn(column, table);
  }
  return column;
}
var debug = "debugHeaders";
function createHeader(table, column, options) {
  var _options$id;
  const id = (_options$id = options.id) != null ? _options$id : column.id;
  let header = {
    id,
    column,
    index: options.index,
    isPlaceholder: !!options.isPlaceholder,
    placeholderId: options.placeholderId,
    depth: options.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const leafHeaders = [];
      const recurseHeader = (h) => {
        if (h.subHeaders && h.subHeaders.length) {
          h.subHeaders.map(recurseHeader);
        }
        leafHeaders.push(h);
      };
      recurseHeader(header);
      return leafHeaders;
    },
    getContext: () => ({
      table,
      header,
      column
    })
  };
  table._features.forEach((feature) => {
    feature.createHeader == null || feature.createHeader(header, table);
  });
  return header;
}
var Headers = {
  createTable: (table) => {
    table.getHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, leafColumns, left, right) => {
      var _left$map$filter, _right$map$filter;
      const leftColumns = (_left$map$filter = left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter : [];
      const rightColumns = (_right$map$filter = right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter : [];
      const centerColumns = leafColumns.filter((column) => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
      const headerGroups = buildHeaderGroups(allColumns, [...leftColumns, ...centerColumns, ...rightColumns], table);
      return headerGroups;
    }, getMemoOptions(table.options, debug, "getHeaderGroups"));
    table.getCenterHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, leafColumns, left, right) => {
      leafColumns = leafColumns.filter((column) => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
      return buildHeaderGroups(allColumns, leafColumns, table, "center");
    }, getMemoOptions(table.options, debug, "getCenterHeaderGroups"));
    table.getLeftHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left], (allColumns, leafColumns, left) => {
      var _left$map$filter2;
      const orderedLeafColumns = (_left$map$filter2 = left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter2 : [];
      return buildHeaderGroups(allColumns, orderedLeafColumns, table, "left");
    }, getMemoOptions(table.options, debug, "getLeftHeaderGroups"));
    table.getRightHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.right], (allColumns, leafColumns, right) => {
      var _right$map$filter2;
      const orderedLeafColumns = (_right$map$filter2 = right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter2 : [];
      return buildHeaderGroups(allColumns, orderedLeafColumns, table, "right");
    }, getMemoOptions(table.options, debug, "getRightHeaderGroups"));
    table.getFooterGroups = memo(() => [table.getHeaderGroups()], (headerGroups) => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, "getFooterGroups"));
    table.getLeftFooterGroups = memo(() => [table.getLeftHeaderGroups()], (headerGroups) => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, "getLeftFooterGroups"));
    table.getCenterFooterGroups = memo(() => [table.getCenterHeaderGroups()], (headerGroups) => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, "getCenterFooterGroups"));
    table.getRightFooterGroups = memo(() => [table.getRightHeaderGroups()], (headerGroups) => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, "getRightFooterGroups"));
    table.getFlatHeaders = memo(() => [table.getHeaderGroups()], (headerGroups) => {
      return headerGroups.map((headerGroup) => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, "getFlatHeaders"));
    table.getLeftFlatHeaders = memo(() => [table.getLeftHeaderGroups()], (left) => {
      return left.map((headerGroup) => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, "getLeftFlatHeaders"));
    table.getCenterFlatHeaders = memo(() => [table.getCenterHeaderGroups()], (left) => {
      return left.map((headerGroup) => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, "getCenterFlatHeaders"));
    table.getRightFlatHeaders = memo(() => [table.getRightHeaderGroups()], (left) => {
      return left.map((headerGroup) => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, "getRightFlatHeaders"));
    table.getCenterLeafHeaders = memo(() => [table.getCenterFlatHeaders()], (flatHeaders) => {
      return flatHeaders.filter((header) => {
        var _header$subHeaders;
        return !((_header$subHeaders = header.subHeaders) != null && _header$subHeaders.length);
      });
    }, getMemoOptions(table.options, debug, "getCenterLeafHeaders"));
    table.getLeftLeafHeaders = memo(() => [table.getLeftFlatHeaders()], (flatHeaders) => {
      return flatHeaders.filter((header) => {
        var _header$subHeaders2;
        return !((_header$subHeaders2 = header.subHeaders) != null && _header$subHeaders2.length);
      });
    }, getMemoOptions(table.options, debug, "getLeftLeafHeaders"));
    table.getRightLeafHeaders = memo(() => [table.getRightFlatHeaders()], (flatHeaders) => {
      return flatHeaders.filter((header) => {
        var _header$subHeaders3;
        return !((_header$subHeaders3 = header.subHeaders) != null && _header$subHeaders3.length);
      });
    }, getMemoOptions(table.options, debug, "getRightLeafHeaders"));
    table.getLeafHeaders = memo(() => [table.getLeftHeaderGroups(), table.getCenterHeaderGroups(), table.getRightHeaderGroups()], (left, center, right) => {
      var _left$0$headers, _left$, _center$0$headers, _center$, _right$0$headers, _right$;
      return [...(_left$0$headers = (_left$ = left[0]) == null ? void 0 : _left$.headers) != null ? _left$0$headers : [], ...(_center$0$headers = (_center$ = center[0]) == null ? void 0 : _center$.headers) != null ? _center$0$headers : [], ...(_right$0$headers = (_right$ = right[0]) == null ? void 0 : _right$.headers) != null ? _right$0$headers : []].map((header) => {
        return header.getLeafHeaders();
      }).flat();
    }, getMemoOptions(table.options, debug, "getLeafHeaders"));
  }
};
function buildHeaderGroups(allColumns, columnsToGroup, table, headerFamily) {
  var _headerGroups$0$heade, _headerGroups$;
  let maxDepth = 0;
  const findMaxDepth = function(columns, depth) {
    if (depth === void 0) {
      depth = 1;
    }
    maxDepth = Math.max(maxDepth, depth);
    columns.filter((column) => column.getIsVisible()).forEach((column) => {
      var _column$columns;
      if ((_column$columns = column.columns) != null && _column$columns.length) {
        findMaxDepth(column.columns, depth + 1);
      }
    }, 0);
  };
  findMaxDepth(allColumns);
  let headerGroups = [];
  const createHeaderGroup = (headersToGroup, depth) => {
    const headerGroup = {
      depth,
      id: [headerFamily, `${depth}`].filter(Boolean).join("_"),
      headers: []
    };
    const pendingParentHeaders = [];
    headersToGroup.forEach((headerToGroup) => {
      const latestPendingParentHeader = [...pendingParentHeaders].reverse()[0];
      const isLeafHeader = headerToGroup.column.depth === headerGroup.depth;
      let column;
      let isPlaceholder = false;
      if (isLeafHeader && headerToGroup.column.parent) {
        column = headerToGroup.column.parent;
      } else {
        column = headerToGroup.column;
        isPlaceholder = true;
      }
      if (latestPendingParentHeader && (latestPendingParentHeader == null ? void 0 : latestPendingParentHeader.column) === column) {
        latestPendingParentHeader.subHeaders.push(headerToGroup);
      } else {
        const header = createHeader(table, column, {
          id: [headerFamily, depth, column.id, headerToGroup == null ? void 0 : headerToGroup.id].filter(Boolean).join("_"),
          isPlaceholder,
          placeholderId: isPlaceholder ? `${pendingParentHeaders.filter((d) => d.column === column).length}` : void 0,
          depth,
          index: pendingParentHeaders.length
        });
        header.subHeaders.push(headerToGroup);
        pendingParentHeaders.push(header);
      }
      headerGroup.headers.push(headerToGroup);
      headerToGroup.headerGroup = headerGroup;
    });
    headerGroups.push(headerGroup);
    if (depth > 0) {
      createHeaderGroup(pendingParentHeaders, depth - 1);
    }
  };
  const bottomHeaders = columnsToGroup.map((column, index) => createHeader(table, column, {
    depth: maxDepth,
    index
  }));
  createHeaderGroup(bottomHeaders, maxDepth - 1);
  headerGroups.reverse();
  const recurseHeadersForSpans = (headers) => {
    const filteredHeaders = headers.filter((header) => header.column.getIsVisible());
    return filteredHeaders.map((header) => {
      let colSpan = 0;
      let rowSpan = 0;
      let childRowSpans = [0];
      if (header.subHeaders && header.subHeaders.length) {
        childRowSpans = [];
        recurseHeadersForSpans(header.subHeaders).forEach((_ref) => {
          let {
            colSpan: childColSpan,
            rowSpan: childRowSpan
          } = _ref;
          colSpan += childColSpan;
          childRowSpans.push(childRowSpan);
        });
      } else {
        colSpan = 1;
      }
      const minChildRowSpan = Math.min(...childRowSpans);
      rowSpan = rowSpan + minChildRowSpan;
      header.colSpan = colSpan;
      header.rowSpan = rowSpan;
      return {
        colSpan,
        rowSpan
      };
    });
  };
  recurseHeadersForSpans((_headerGroups$0$heade = (_headerGroups$ = headerGroups[0]) == null ? void 0 : _headerGroups$.headers) != null ? _headerGroups$0$heade : []);
  return headerGroups;
}
var createRow = (table, id, original, rowIndex, depth, subRows, parentId) => {
  let row = {
    id,
    index: rowIndex,
    original,
    depth,
    parentId,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (columnId) => {
      if (row._valuesCache.hasOwnProperty(columnId)) {
        return row._valuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column != null && column.accessorFn)) {
        return void 0;
      }
      row._valuesCache[columnId] = column.accessorFn(row.original, rowIndex);
      return row._valuesCache[columnId];
    },
    getUniqueValues: (columnId) => {
      if (row._uniqueValuesCache.hasOwnProperty(columnId)) {
        return row._uniqueValuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column != null && column.accessorFn)) {
        return void 0;
      }
      if (!column.columnDef.getUniqueValues) {
        row._uniqueValuesCache[columnId] = [row.getValue(columnId)];
        return row._uniqueValuesCache[columnId];
      }
      row._uniqueValuesCache[columnId] = column.columnDef.getUniqueValues(row.original, rowIndex);
      return row._uniqueValuesCache[columnId];
    },
    renderValue: (columnId) => {
      var _row$getValue;
      return (_row$getValue = row.getValue(columnId)) != null ? _row$getValue : table.options.renderFallbackValue;
    },
    subRows: subRows != null ? subRows : [],
    getLeafRows: () => flattenBy(row.subRows, (d) => d.subRows),
    getParentRow: () => row.parentId ? table.getRow(row.parentId, true) : void 0,
    getParentRows: () => {
      let parentRows = [];
      let currentRow = row;
      while (true) {
        const parentRow = currentRow.getParentRow();
        if (!parentRow)
          break;
        parentRows.push(parentRow);
        currentRow = parentRow;
      }
      return parentRows.reverse();
    },
    getAllCells: memo(() => [table.getAllLeafColumns()], (leafColumns) => {
      return leafColumns.map((column) => {
        return createCell(table, row, column, column.id);
      });
    }, getMemoOptions(table.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: memo(() => [row.getAllCells()], (allCells) => {
      return allCells.reduce((acc, cell) => {
        acc[cell.column.id] = cell;
        return acc;
      }, {});
    }, getMemoOptions(table.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let i = 0; i < table._features.length; i++) {
    const feature = table._features[i];
    feature == null || feature.createRow == null || feature.createRow(row, table);
  }
  return row;
};
var ColumnFaceting = {
  createColumn: (column, table) => {
    column._getFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, column.id);
    column.getFacetedRowModel = () => {
      if (!column._getFacetedRowModel) {
        return table.getPreFilteredRowModel();
      }
      return column._getFacetedRowModel();
    };
    column._getFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, column.id);
    column.getFacetedUniqueValues = () => {
      if (!column._getFacetedUniqueValues) {
        return /* @__PURE__ */ new Map();
      }
      return column._getFacetedUniqueValues();
    };
    column._getFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, column.id);
    column.getFacetedMinMaxValues = () => {
      if (!column._getFacetedMinMaxValues) {
        return void 0;
      }
      return column._getFacetedMinMaxValues();
    };
  }
};
var includesString = (row, columnId, filterValue) => {
  var _filterValue$toString, _row$getValue;
  const search = filterValue == null || (_filterValue$toString = filterValue.toString()) == null ? void 0 : _filterValue$toString.toLowerCase();
  return Boolean((_row$getValue = row.getValue(columnId)) == null || (_row$getValue = _row$getValue.toString()) == null || (_row$getValue = _row$getValue.toLowerCase()) == null ? void 0 : _row$getValue.includes(search));
};
includesString.autoRemove = (val) => testFalsey(val);
var includesStringSensitive = (row, columnId, filterValue) => {
  var _row$getValue2;
  return Boolean((_row$getValue2 = row.getValue(columnId)) == null || (_row$getValue2 = _row$getValue2.toString()) == null ? void 0 : _row$getValue2.includes(filterValue));
};
includesStringSensitive.autoRemove = (val) => testFalsey(val);
var equalsString = (row, columnId, filterValue) => {
  var _row$getValue3;
  return ((_row$getValue3 = row.getValue(columnId)) == null || (_row$getValue3 = _row$getValue3.toString()) == null ? void 0 : _row$getValue3.toLowerCase()) === (filterValue == null ? void 0 : filterValue.toLowerCase());
};
equalsString.autoRemove = (val) => testFalsey(val);
var arrIncludes = (row, columnId, filterValue) => {
  var _row$getValue4;
  return (_row$getValue4 = row.getValue(columnId)) == null ? void 0 : _row$getValue4.includes(filterValue);
};
arrIncludes.autoRemove = (val) => testFalsey(val);
var arrIncludesAll = (row, columnId, filterValue) => {
  return !filterValue.some((val) => {
    var _row$getValue5;
    return !((_row$getValue5 = row.getValue(columnId)) != null && _row$getValue5.includes(val));
  });
};
arrIncludesAll.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
var arrIncludesSome = (row, columnId, filterValue) => {
  return filterValue.some((val) => {
    var _row$getValue6;
    return (_row$getValue6 = row.getValue(columnId)) == null ? void 0 : _row$getValue6.includes(val);
  });
};
arrIncludesSome.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
var equals = (row, columnId, filterValue) => {
  return row.getValue(columnId) === filterValue;
};
equals.autoRemove = (val) => testFalsey(val);
var weakEquals = (row, columnId, filterValue) => {
  return row.getValue(columnId) == filterValue;
};
weakEquals.autoRemove = (val) => testFalsey(val);
var inNumberRange = (row, columnId, filterValue) => {
  let [min2, max2] = filterValue;
  const rowValue = row.getValue(columnId);
  return rowValue >= min2 && rowValue <= max2;
};
inNumberRange.resolveFilterValue = (val) => {
  let [unsafeMin, unsafeMax] = val;
  let parsedMin = typeof unsafeMin !== "number" ? parseFloat(unsafeMin) : unsafeMin;
  let parsedMax = typeof unsafeMax !== "number" ? parseFloat(unsafeMax) : unsafeMax;
  let min2 = unsafeMin === null || Number.isNaN(parsedMin) ? -Infinity : parsedMin;
  let max2 = unsafeMax === null || Number.isNaN(parsedMax) ? Infinity : parsedMax;
  if (min2 > max2) {
    const temp = min2;
    min2 = max2;
    max2 = temp;
  }
  return [min2, max2];
};
inNumberRange.autoRemove = (val) => testFalsey(val) || testFalsey(val[0]) && testFalsey(val[1]);
var filterFns = {
  includesString,
  includesStringSensitive,
  equalsString,
  arrIncludes,
  arrIncludesAll,
  arrIncludesSome,
  equals,
  weakEquals,
  inNumberRange
};
function testFalsey(val) {
  return val === void 0 || val === null || val === "";
}
var ColumnFiltering = {
  getDefaultColumnDef: () => {
    return {
      filterFn: "auto"
    };
  },
  getInitialState: (state) => {
    return {
      columnFilters: [],
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onColumnFiltersChange: makeStateUpdater("columnFilters", table),
      filterFromLeafRows: false,
      maxLeafRowFilterDepth: 100
    };
  },
  createColumn: (column, table) => {
    column.getAutoFilterFn = () => {
      const firstRow = table.getCoreRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === "string") {
        return filterFns.includesString;
      }
      if (typeof value === "number") {
        return filterFns.inNumberRange;
      }
      if (typeof value === "boolean") {
        return filterFns.equals;
      }
      if (value !== null && typeof value === "object") {
        return filterFns.equals;
      }
      if (Array.isArray(value)) {
        return filterFns.arrIncludes;
      }
      return filterFns.weakEquals;
    };
    column.getFilterFn = () => {
      var _table$options$filter, _table$options$filter2;
      return isFunction2(column.columnDef.filterFn) ? column.columnDef.filterFn : column.columnDef.filterFn === "auto" ? column.getAutoFilterFn() : (
        // @ts-ignore
        (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[column.columnDef.filterFn]) != null ? _table$options$filter : filterFns[column.columnDef.filterFn]
      );
    };
    column.getCanFilter = () => {
      var _column$columnDef$ena, _table$options$enable, _table$options$enable2;
      return ((_column$columnDef$ena = column.columnDef.enableColumnFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnFilters) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && !!column.accessorFn;
    };
    column.getIsFiltered = () => column.getFilterIndex() > -1;
    column.getFilterValue = () => {
      var _table$getState$colum;
      return (_table$getState$colum = table.getState().columnFilters) == null || (_table$getState$colum = _table$getState$colum.find((d) => d.id === column.id)) == null ? void 0 : _table$getState$colum.value;
    };
    column.getFilterIndex = () => {
      var _table$getState$colum2, _table$getState$colum3;
      return (_table$getState$colum2 = (_table$getState$colum3 = table.getState().columnFilters) == null ? void 0 : _table$getState$colum3.findIndex((d) => d.id === column.id)) != null ? _table$getState$colum2 : -1;
    };
    column.setFilterValue = (value) => {
      table.setColumnFilters((old) => {
        const filterFn = column.getFilterFn();
        const previousFilter = old == null ? void 0 : old.find((d) => d.id === column.id);
        const newFilter = functionalUpdate(value, previousFilter ? previousFilter.value : void 0);
        if (shouldAutoRemoveFilter(filterFn, newFilter, column)) {
          var _old$filter;
          return (_old$filter = old == null ? void 0 : old.filter((d) => d.id !== column.id)) != null ? _old$filter : [];
        }
        const newFilterObj = {
          id: column.id,
          value: newFilter
        };
        if (previousFilter) {
          var _old$map;
          return (_old$map = old == null ? void 0 : old.map((d) => {
            if (d.id === column.id) {
              return newFilterObj;
            }
            return d;
          })) != null ? _old$map : [];
        }
        if (old != null && old.length) {
          return [...old, newFilterObj];
        }
        return [newFilterObj];
      });
    };
  },
  createRow: (row, _table) => {
    row.columnFilters = {};
    row.columnFiltersMeta = {};
  },
  createTable: (table) => {
    table.setColumnFilters = (updater) => {
      const leafColumns = table.getAllLeafColumns();
      const updateFn = (old) => {
        var _functionalUpdate;
        return (_functionalUpdate = functionalUpdate(updater, old)) == null ? void 0 : _functionalUpdate.filter((filter) => {
          const column = leafColumns.find((d) => d.id === filter.id);
          if (column) {
            const filterFn = column.getFilterFn();
            if (shouldAutoRemoveFilter(filterFn, filter.value, column)) {
              return false;
            }
          }
          return true;
        });
      };
      table.options.onColumnFiltersChange == null || table.options.onColumnFiltersChange(updateFn);
    };
    table.resetColumnFilters = (defaultState) => {
      var _table$initialState$c, _table$initialState;
      table.setColumnFilters(defaultState ? [] : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnFilters) != null ? _table$initialState$c : []);
    };
    table.getPreFilteredRowModel = () => table.getCoreRowModel();
    table.getFilteredRowModel = () => {
      if (!table._getFilteredRowModel && table.options.getFilteredRowModel) {
        table._getFilteredRowModel = table.options.getFilteredRowModel(table);
      }
      if (table.options.manualFiltering || !table._getFilteredRowModel) {
        return table.getPreFilteredRowModel();
      }
      return table._getFilteredRowModel();
    };
  }
};
function shouldAutoRemoveFilter(filterFn, value, column) {
  return (filterFn && filterFn.autoRemove ? filterFn.autoRemove(value, column) : false) || typeof value === "undefined" || typeof value === "string" && !value;
}
var sum = (columnId, _leafRows, childRows) => {
  return childRows.reduce((sum2, next) => {
    const nextValue = next.getValue(columnId);
    return sum2 + (typeof nextValue === "number" ? nextValue : 0);
  }, 0);
};
var min = (columnId, _leafRows, childRows) => {
  let min2;
  childRows.forEach((row) => {
    const value = row.getValue(columnId);
    if (value != null && (min2 > value || min2 === void 0 && value >= value)) {
      min2 = value;
    }
  });
  return min2;
};
var max = (columnId, _leafRows, childRows) => {
  let max2;
  childRows.forEach((row) => {
    const value = row.getValue(columnId);
    if (value != null && (max2 < value || max2 === void 0 && value >= value)) {
      max2 = value;
    }
  });
  return max2;
};
var extent = (columnId, _leafRows, childRows) => {
  let min2;
  let max2;
  childRows.forEach((row) => {
    const value = row.getValue(columnId);
    if (value != null) {
      if (min2 === void 0) {
        if (value >= value)
          min2 = max2 = value;
      } else {
        if (min2 > value)
          min2 = value;
        if (max2 < value)
          max2 = value;
      }
    }
  });
  return [min2, max2];
};
var mean = (columnId, leafRows) => {
  let count4 = 0;
  let sum2 = 0;
  leafRows.forEach((row) => {
    let value = row.getValue(columnId);
    if (value != null && (value = +value) >= value) {
      ++count4, sum2 += value;
    }
  });
  if (count4)
    return sum2 / count4;
  return;
};
var median = (columnId, leafRows) => {
  if (!leafRows.length) {
    return;
  }
  const values = leafRows.map((row) => row.getValue(columnId));
  if (!isNumberArray(values)) {
    return;
  }
  if (values.length === 1) {
    return values[0];
  }
  const mid = Math.floor(values.length / 2);
  const nums = values.sort((a, b) => a - b);
  return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
var unique = (columnId, leafRows) => {
  return Array.from(new Set(leafRows.map((d) => d.getValue(columnId))).values());
};
var uniqueCount = (columnId, leafRows) => {
  return new Set(leafRows.map((d) => d.getValue(columnId))).size;
};
var count3 = (_columnId, leafRows) => {
  return leafRows.length;
};
var aggregationFns = {
  sum,
  min,
  max,
  extent,
  mean,
  median,
  unique,
  uniqueCount,
  count: count3
};
var ColumnGrouping = {
  getDefaultColumnDef: () => {
    return {
      aggregatedCell: (props) => {
        var _toString, _props$getValue;
        return (_toString = (_props$getValue = props.getValue()) == null || _props$getValue.toString == null ? void 0 : _props$getValue.toString()) != null ? _toString : null;
      },
      aggregationFn: "auto"
    };
  },
  getInitialState: (state) => {
    return {
      grouping: [],
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onGroupingChange: makeStateUpdater("grouping", table),
      groupedColumnMode: "reorder"
    };
  },
  createColumn: (column, table) => {
    column.toggleGrouping = () => {
      table.setGrouping((old) => {
        if (old != null && old.includes(column.id)) {
          return old.filter((d) => d !== column.id);
        }
        return [...old != null ? old : [], column.id];
      });
    };
    column.getCanGroup = () => {
      var _column$columnDef$ena, _table$options$enable;
      return ((_column$columnDef$ena = column.columnDef.enableGrouping) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableGrouping) != null ? _table$options$enable : true) && (!!column.accessorFn || !!column.columnDef.getGroupingValue);
    };
    column.getIsGrouped = () => {
      var _table$getState$group;
      return (_table$getState$group = table.getState().grouping) == null ? void 0 : _table$getState$group.includes(column.id);
    };
    column.getGroupedIndex = () => {
      var _table$getState$group2;
      return (_table$getState$group2 = table.getState().grouping) == null ? void 0 : _table$getState$group2.indexOf(column.id);
    };
    column.getToggleGroupingHandler = () => {
      const canGroup = column.getCanGroup();
      return () => {
        if (!canGroup)
          return;
        column.toggleGrouping();
      };
    };
    column.getAutoAggregationFn = () => {
      const firstRow = table.getCoreRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === "number") {
        return aggregationFns.sum;
      }
      if (Object.prototype.toString.call(value) === "[object Date]") {
        return aggregationFns.extent;
      }
    };
    column.getAggregationFn = () => {
      var _table$options$aggreg, _table$options$aggreg2;
      if (!column) {
        throw new Error();
      }
      return isFunction2(column.columnDef.aggregationFn) ? column.columnDef.aggregationFn : column.columnDef.aggregationFn === "auto" ? column.getAutoAggregationFn() : (_table$options$aggreg = (_table$options$aggreg2 = table.options.aggregationFns) == null ? void 0 : _table$options$aggreg2[column.columnDef.aggregationFn]) != null ? _table$options$aggreg : aggregationFns[column.columnDef.aggregationFn];
    };
  },
  createTable: (table) => {
    table.setGrouping = (updater) => table.options.onGroupingChange == null ? void 0 : table.options.onGroupingChange(updater);
    table.resetGrouping = (defaultState) => {
      var _table$initialState$g, _table$initialState;
      table.setGrouping(defaultState ? [] : (_table$initialState$g = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.grouping) != null ? _table$initialState$g : []);
    };
    table.getPreGroupedRowModel = () => table.getFilteredRowModel();
    table.getGroupedRowModel = () => {
      if (!table._getGroupedRowModel && table.options.getGroupedRowModel) {
        table._getGroupedRowModel = table.options.getGroupedRowModel(table);
      }
      if (table.options.manualGrouping || !table._getGroupedRowModel) {
        return table.getPreGroupedRowModel();
      }
      return table._getGroupedRowModel();
    };
  },
  createRow: (row, table) => {
    row.getIsGrouped = () => !!row.groupingColumnId;
    row.getGroupingValue = (columnId) => {
      if (row._groupingValuesCache.hasOwnProperty(columnId)) {
        return row._groupingValuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column != null && column.columnDef.getGroupingValue)) {
        return row.getValue(columnId);
      }
      row._groupingValuesCache[columnId] = column.columnDef.getGroupingValue(row.original);
      return row._groupingValuesCache[columnId];
    };
    row._groupingValuesCache = {};
  },
  createCell: (cell, column, row, table) => {
    cell.getIsGrouped = () => column.getIsGrouped() && column.id === row.groupingColumnId;
    cell.getIsPlaceholder = () => !cell.getIsGrouped() && column.getIsGrouped();
    cell.getIsAggregated = () => {
      var _row$subRows;
      return !cell.getIsGrouped() && !cell.getIsPlaceholder() && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
    };
  }
};
function orderColumns(leafColumns, grouping, groupedColumnMode) {
  if (!(grouping != null && grouping.length) || !groupedColumnMode) {
    return leafColumns;
  }
  const nonGroupingColumns = leafColumns.filter((col) => !grouping.includes(col.id));
  if (groupedColumnMode === "remove") {
    return nonGroupingColumns;
  }
  const groupingColumns = grouping.map((g) => leafColumns.find((col) => col.id === g)).filter(Boolean);
  return [...groupingColumns, ...nonGroupingColumns];
}
var ColumnOrdering = {
  getInitialState: (state) => {
    return {
      columnOrder: [],
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onColumnOrderChange: makeStateUpdater("columnOrder", table)
    };
  },
  createColumn: (column, table) => {
    column.getIndex = memo((position) => [_getVisibleLeafColumns(table, position)], (columns) => columns.findIndex((d) => d.id === column.id), getMemoOptions(table.options, "debugColumns", "getIndex"));
    column.getIsFirstColumn = (position) => {
      var _columns$;
      const columns = _getVisibleLeafColumns(table, position);
      return ((_columns$ = columns[0]) == null ? void 0 : _columns$.id) === column.id;
    };
    column.getIsLastColumn = (position) => {
      var _columns;
      const columns = _getVisibleLeafColumns(table, position);
      return ((_columns = columns[columns.length - 1]) == null ? void 0 : _columns.id) === column.id;
    };
  },
  createTable: (table) => {
    table.setColumnOrder = (updater) => table.options.onColumnOrderChange == null ? void 0 : table.options.onColumnOrderChange(updater);
    table.resetColumnOrder = (defaultState) => {
      var _table$initialState$c;
      table.setColumnOrder(defaultState ? [] : (_table$initialState$c = table.initialState.columnOrder) != null ? _table$initialState$c : []);
    };
    table._getOrderColumnsFn = memo(() => [table.getState().columnOrder, table.getState().grouping, table.options.groupedColumnMode], (columnOrder, grouping, groupedColumnMode) => (columns) => {
      let orderedColumns = [];
      if (!(columnOrder != null && columnOrder.length)) {
        orderedColumns = columns;
      } else {
        const columnOrderCopy = [...columnOrder];
        const columnsCopy = [...columns];
        while (columnsCopy.length && columnOrderCopy.length) {
          const targetColumnId = columnOrderCopy.shift();
          const foundIndex = columnsCopy.findIndex((d) => d.id === targetColumnId);
          if (foundIndex > -1) {
            orderedColumns.push(columnsCopy.splice(foundIndex, 1)[0]);
          }
        }
        orderedColumns = [...orderedColumns, ...columnsCopy];
      }
      return orderColumns(orderedColumns, grouping, groupedColumnMode);
    }, getMemoOptions(table.options, "debugTable", "_getOrderColumnsFn"));
  }
};
var getDefaultColumnPinningState = () => ({
  left: [],
  right: []
});
var ColumnPinning = {
  getInitialState: (state) => {
    return {
      columnPinning: getDefaultColumnPinningState(),
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onColumnPinningChange: makeStateUpdater("columnPinning", table)
    };
  },
  createColumn: (column, table) => {
    column.pin = (position) => {
      const columnIds = column.getLeafColumns().map((d) => d.id).filter(Boolean);
      table.setColumnPinning((old) => {
        var _old$left3, _old$right3;
        if (position === "right") {
          var _old$left, _old$right;
          return {
            left: ((_old$left = old == null ? void 0 : old.left) != null ? _old$left : []).filter((d) => !(columnIds != null && columnIds.includes(d))),
            right: [...((_old$right = old == null ? void 0 : old.right) != null ? _old$right : []).filter((d) => !(columnIds != null && columnIds.includes(d))), ...columnIds]
          };
        }
        if (position === "left") {
          var _old$left2, _old$right2;
          return {
            left: [...((_old$left2 = old == null ? void 0 : old.left) != null ? _old$left2 : []).filter((d) => !(columnIds != null && columnIds.includes(d))), ...columnIds],
            right: ((_old$right2 = old == null ? void 0 : old.right) != null ? _old$right2 : []).filter((d) => !(columnIds != null && columnIds.includes(d)))
          };
        }
        return {
          left: ((_old$left3 = old == null ? void 0 : old.left) != null ? _old$left3 : []).filter((d) => !(columnIds != null && columnIds.includes(d))),
          right: ((_old$right3 = old == null ? void 0 : old.right) != null ? _old$right3 : []).filter((d) => !(columnIds != null && columnIds.includes(d)))
        };
      });
    };
    column.getCanPin = () => {
      const leafColumns = column.getLeafColumns();
      return leafColumns.some((d) => {
        var _d$columnDef$enablePi, _ref, _table$options$enable;
        return ((_d$columnDef$enablePi = d.columnDef.enablePinning) != null ? _d$columnDef$enablePi : true) && ((_ref = (_table$options$enable = table.options.enableColumnPinning) != null ? _table$options$enable : table.options.enablePinning) != null ? _ref : true);
      });
    };
    column.getIsPinned = () => {
      const leafColumnIds = column.getLeafColumns().map((d) => d.id);
      const {
        left,
        right
      } = table.getState().columnPinning;
      const isLeft = leafColumnIds.some((d) => left == null ? void 0 : left.includes(d));
      const isRight = leafColumnIds.some((d) => right == null ? void 0 : right.includes(d));
      return isLeft ? "left" : isRight ? "right" : false;
    };
    column.getPinnedIndex = () => {
      var _table$getState$colum, _table$getState$colum2;
      const position = column.getIsPinned();
      return position ? (_table$getState$colum = (_table$getState$colum2 = table.getState().columnPinning) == null || (_table$getState$colum2 = _table$getState$colum2[position]) == null ? void 0 : _table$getState$colum2.indexOf(column.id)) != null ? _table$getState$colum : -1 : 0;
    };
  },
  createRow: (row, table) => {
    row.getCenterVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allCells, left, right) => {
      const leftAndRight = [...left != null ? left : [], ...right != null ? right : []];
      return allCells.filter((d) => !leftAndRight.includes(d.column.id));
    }, getMemoOptions(table.options, "debugRows", "getCenterVisibleCells"));
    row.getLeftVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.left], (allCells, left) => {
      const cells = (left != null ? left : []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({
        ...d,
        position: "left"
      }));
      return cells;
    }, getMemoOptions(table.options, "debugRows", "getLeftVisibleCells"));
    row.getRightVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.right], (allCells, right) => {
      const cells = (right != null ? right : []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({
        ...d,
        position: "right"
      }));
      return cells;
    }, getMemoOptions(table.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (table) => {
    table.setColumnPinning = (updater) => table.options.onColumnPinningChange == null ? void 0 : table.options.onColumnPinningChange(updater);
    table.resetColumnPinning = (defaultState) => {
      var _table$initialState$c, _table$initialState;
      return table.setColumnPinning(defaultState ? getDefaultColumnPinningState() : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnPinning) != null ? _table$initialState$c : getDefaultColumnPinningState());
    };
    table.getIsSomeColumnsPinned = (position) => {
      var _pinningState$positio;
      const pinningState = table.getState().columnPinning;
      if (!position) {
        var _pinningState$left, _pinningState$right;
        return Boolean(((_pinningState$left = pinningState.left) == null ? void 0 : _pinningState$left.length) || ((_pinningState$right = pinningState.right) == null ? void 0 : _pinningState$right.length));
      }
      return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
    };
    table.getLeftLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.left], (allColumns, left) => {
      return (left != null ? left : []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
    }, getMemoOptions(table.options, "debugColumns", "getLeftLeafColumns"));
    table.getRightLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.right], (allColumns, right) => {
      return (right != null ? right : []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
    }, getMemoOptions(table.options, "debugColumns", "getRightLeafColumns"));
    table.getCenterLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, left, right) => {
      const leftAndRight = [...left != null ? left : [], ...right != null ? right : []];
      return allColumns.filter((d) => !leftAndRight.includes(d.id));
    }, getMemoOptions(table.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function safelyAccessDocument(_document) {
  return _document || (typeof document !== "undefined" ? document : null);
}
var defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
};
var getDefaultColumnSizingInfoState = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: false,
  columnSizingStart: []
});
var ColumnSizing = {
  getDefaultColumnDef: () => {
    return defaultColumnSizing;
  },
  getInitialState: (state) => {
    return {
      columnSizing: {},
      columnSizingInfo: getDefaultColumnSizingInfoState(),
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      columnResizeMode: "onEnd",
      columnResizeDirection: "ltr",
      onColumnSizingChange: makeStateUpdater("columnSizing", table),
      onColumnSizingInfoChange: makeStateUpdater("columnSizingInfo", table)
    };
  },
  createColumn: (column, table) => {
    column.getSize = () => {
      var _column$columnDef$min, _ref, _column$columnDef$max;
      const columnSize = table.getState().columnSizing[column.id];
      return Math.min(Math.max((_column$columnDef$min = column.columnDef.minSize) != null ? _column$columnDef$min : defaultColumnSizing.minSize, (_ref = columnSize != null ? columnSize : column.columnDef.size) != null ? _ref : defaultColumnSizing.size), (_column$columnDef$max = column.columnDef.maxSize) != null ? _column$columnDef$max : defaultColumnSizing.maxSize);
    };
    column.getStart = memo((position) => [position, _getVisibleLeafColumns(table, position), table.getState().columnSizing], (position, columns) => columns.slice(0, column.getIndex(position)).reduce((sum2, column2) => sum2 + column2.getSize(), 0), getMemoOptions(table.options, "debugColumns", "getStart"));
    column.getAfter = memo((position) => [position, _getVisibleLeafColumns(table, position), table.getState().columnSizing], (position, columns) => columns.slice(column.getIndex(position) + 1).reduce((sum2, column2) => sum2 + column2.getSize(), 0), getMemoOptions(table.options, "debugColumns", "getAfter"));
    column.resetSize = () => {
      table.setColumnSizing((_ref2) => {
        let {
          [column.id]: _,
          ...rest
        } = _ref2;
        return rest;
      });
    };
    column.getCanResize = () => {
      var _column$columnDef$ena, _table$options$enable;
      return ((_column$columnDef$ena = column.columnDef.enableResizing) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnResizing) != null ? _table$options$enable : true);
    };
    column.getIsResizing = () => {
      return table.getState().columnSizingInfo.isResizingColumn === column.id;
    };
  },
  createHeader: (header, table) => {
    header.getSize = () => {
      let sum2 = 0;
      const recurse = (header2) => {
        if (header2.subHeaders.length) {
          header2.subHeaders.forEach(recurse);
        } else {
          var _header$column$getSiz;
          sum2 += (_header$column$getSiz = header2.column.getSize()) != null ? _header$column$getSiz : 0;
        }
      };
      recurse(header);
      return sum2;
    };
    header.getStart = () => {
      if (header.index > 0) {
        const prevSiblingHeader = header.headerGroup.headers[header.index - 1];
        return prevSiblingHeader.getStart() + prevSiblingHeader.getSize();
      }
      return 0;
    };
    header.getResizeHandler = (_contextDocument) => {
      const column = table.getColumn(header.column.id);
      const canResize = column == null ? void 0 : column.getCanResize();
      return (e) => {
        if (!column || !canResize) {
          return;
        }
        e.persist == null || e.persist();
        if (isTouchStartEvent(e)) {
          if (e.touches && e.touches.length > 1) {
            return;
          }
        }
        const startSize = header.getSize();
        const columnSizingStart = header ? header.getLeafHeaders().map((d) => [d.column.id, d.column.getSize()]) : [[column.id, column.getSize()]];
        const clientX = isTouchStartEvent(e) ? Math.round(e.touches[0].clientX) : e.clientX;
        const newColumnSizing = {};
        const updateOffset = (eventType, clientXPos) => {
          if (typeof clientXPos !== "number") {
            return;
          }
          table.setColumnSizingInfo((old) => {
            var _old$startOffset, _old$startSize;
            const deltaDirection = table.options.columnResizeDirection === "rtl" ? -1 : 1;
            const deltaOffset = (clientXPos - ((_old$startOffset = old == null ? void 0 : old.startOffset) != null ? _old$startOffset : 0)) * deltaDirection;
            const deltaPercentage = Math.max(deltaOffset / ((_old$startSize = old == null ? void 0 : old.startSize) != null ? _old$startSize : 0), -0.999999);
            old.columnSizingStart.forEach((_ref3) => {
              let [columnId, headerSize] = _ref3;
              newColumnSizing[columnId] = Math.round(Math.max(headerSize + headerSize * deltaPercentage, 0) * 100) / 100;
            });
            return {
              ...old,
              deltaOffset,
              deltaPercentage
            };
          });
          if (table.options.columnResizeMode === "onChange" || eventType === "end") {
            table.setColumnSizing((old) => ({
              ...old,
              ...newColumnSizing
            }));
          }
        };
        const onMove = (clientXPos) => updateOffset("move", clientXPos);
        const onEnd = (clientXPos) => {
          updateOffset("end", clientXPos);
          table.setColumnSizingInfo((old) => ({
            ...old,
            isResizingColumn: false,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        };
        const contextDocument = safelyAccessDocument(_contextDocument);
        const mouseEvents = {
          moveHandler: (e2) => onMove(e2.clientX),
          upHandler: (e2) => {
            contextDocument == null || contextDocument.removeEventListener("mousemove", mouseEvents.moveHandler);
            contextDocument == null || contextDocument.removeEventListener("mouseup", mouseEvents.upHandler);
            onEnd(e2.clientX);
          }
        };
        const touchEvents = {
          moveHandler: (e2) => {
            if (e2.cancelable) {
              e2.preventDefault();
              e2.stopPropagation();
            }
            onMove(e2.touches[0].clientX);
            return false;
          },
          upHandler: (e2) => {
            var _e$touches$;
            contextDocument == null || contextDocument.removeEventListener("touchmove", touchEvents.moveHandler);
            contextDocument == null || contextDocument.removeEventListener("touchend", touchEvents.upHandler);
            if (e2.cancelable) {
              e2.preventDefault();
              e2.stopPropagation();
            }
            onEnd((_e$touches$ = e2.touches[0]) == null ? void 0 : _e$touches$.clientX);
          }
        };
        const passiveIfSupported = passiveEventSupported() ? {
          passive: false
        } : false;
        if (isTouchStartEvent(e)) {
          contextDocument == null || contextDocument.addEventListener("touchmove", touchEvents.moveHandler, passiveIfSupported);
          contextDocument == null || contextDocument.addEventListener("touchend", touchEvents.upHandler, passiveIfSupported);
        } else {
          contextDocument == null || contextDocument.addEventListener("mousemove", mouseEvents.moveHandler, passiveIfSupported);
          contextDocument == null || contextDocument.addEventListener("mouseup", mouseEvents.upHandler, passiveIfSupported);
        }
        table.setColumnSizingInfo((old) => ({
          ...old,
          startOffset: clientX,
          startSize,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart,
          isResizingColumn: column.id
        }));
      };
    };
  },
  createTable: (table) => {
    table.setColumnSizing = (updater) => table.options.onColumnSizingChange == null ? void 0 : table.options.onColumnSizingChange(updater);
    table.setColumnSizingInfo = (updater) => table.options.onColumnSizingInfoChange == null ? void 0 : table.options.onColumnSizingInfoChange(updater);
    table.resetColumnSizing = (defaultState) => {
      var _table$initialState$c;
      table.setColumnSizing(defaultState ? {} : (_table$initialState$c = table.initialState.columnSizing) != null ? _table$initialState$c : {});
    };
    table.resetHeaderSizeInfo = (defaultState) => {
      var _table$initialState$c2;
      table.setColumnSizingInfo(defaultState ? getDefaultColumnSizingInfoState() : (_table$initialState$c2 = table.initialState.columnSizingInfo) != null ? _table$initialState$c2 : getDefaultColumnSizingInfoState());
    };
    table.getTotalSize = () => {
      var _table$getHeaderGroup, _table$getHeaderGroup2;
      return (_table$getHeaderGroup = (_table$getHeaderGroup2 = table.getHeaderGroups()[0]) == null ? void 0 : _table$getHeaderGroup2.headers.reduce((sum2, header) => {
        return sum2 + header.getSize();
      }, 0)) != null ? _table$getHeaderGroup : 0;
    };
    table.getLeftTotalSize = () => {
      var _table$getLeftHeaderG, _table$getLeftHeaderG2;
      return (_table$getLeftHeaderG = (_table$getLeftHeaderG2 = table.getLeftHeaderGroups()[0]) == null ? void 0 : _table$getLeftHeaderG2.headers.reduce((sum2, header) => {
        return sum2 + header.getSize();
      }, 0)) != null ? _table$getLeftHeaderG : 0;
    };
    table.getCenterTotalSize = () => {
      var _table$getCenterHeade, _table$getCenterHeade2;
      return (_table$getCenterHeade = (_table$getCenterHeade2 = table.getCenterHeaderGroups()[0]) == null ? void 0 : _table$getCenterHeade2.headers.reduce((sum2, header) => {
        return sum2 + header.getSize();
      }, 0)) != null ? _table$getCenterHeade : 0;
    };
    table.getRightTotalSize = () => {
      var _table$getRightHeader, _table$getRightHeader2;
      return (_table$getRightHeader = (_table$getRightHeader2 = table.getRightHeaderGroups()[0]) == null ? void 0 : _table$getRightHeader2.headers.reduce((sum2, header) => {
        return sum2 + header.getSize();
      }, 0)) != null ? _table$getRightHeader : 0;
    };
  }
};
var passiveSupported = null;
function passiveEventSupported() {
  if (typeof passiveSupported === "boolean")
    return passiveSupported;
  let supported = false;
  try {
    const options = {
      get passive() {
        supported = true;
        return false;
      }
    };
    const noop = () => {
    };
    window.addEventListener("test", noop, options);
    window.removeEventListener("test", noop);
  } catch (err) {
    supported = false;
  }
  passiveSupported = supported;
  return passiveSupported;
}
function isTouchStartEvent(e) {
  return e.type === "touchstart";
}
var ColumnVisibility = {
  getInitialState: (state) => {
    return {
      columnVisibility: {},
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onColumnVisibilityChange: makeStateUpdater("columnVisibility", table)
    };
  },
  createColumn: (column, table) => {
    column.toggleVisibility = (value) => {
      if (column.getCanHide()) {
        table.setColumnVisibility((old) => ({
          ...old,
          [column.id]: value != null ? value : !column.getIsVisible()
        }));
      }
    };
    column.getIsVisible = () => {
      var _ref, _table$getState$colum;
      const childColumns = column.columns;
      return (_ref = childColumns.length ? childColumns.some((c) => c.getIsVisible()) : (_table$getState$colum = table.getState().columnVisibility) == null ? void 0 : _table$getState$colum[column.id]) != null ? _ref : true;
    };
    column.getCanHide = () => {
      var _column$columnDef$ena, _table$options$enable;
      return ((_column$columnDef$ena = column.columnDef.enableHiding) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableHiding) != null ? _table$options$enable : true);
    };
    column.getToggleVisibilityHandler = () => {
      return (e) => {
        column.toggleVisibility == null || column.toggleVisibility(e.target.checked);
      };
    };
  },
  createRow: (row, table) => {
    row._getAllVisibleCells = memo(() => [row.getAllCells(), table.getState().columnVisibility], (cells) => {
      return cells.filter((cell) => cell.column.getIsVisible());
    }, getMemoOptions(table.options, "debugRows", "_getAllVisibleCells"));
    row.getVisibleCells = memo(() => [row.getLeftVisibleCells(), row.getCenterVisibleCells(), row.getRightVisibleCells()], (left, center, right) => [...left, ...center, ...right], getMemoOptions(table.options, "debugRows", "getVisibleCells"));
  },
  createTable: (table) => {
    const makeVisibleColumnsMethod = (key, getColumns) => {
      return memo(() => [getColumns(), getColumns().filter((d) => d.getIsVisible()).map((d) => d.id).join("_")], (columns) => {
        return columns.filter((d) => d.getIsVisible == null ? void 0 : d.getIsVisible());
      }, getMemoOptions(table.options, "debugColumns", key));
    };
    table.getVisibleFlatColumns = makeVisibleColumnsMethod("getVisibleFlatColumns", () => table.getAllFlatColumns());
    table.getVisibleLeafColumns = makeVisibleColumnsMethod("getVisibleLeafColumns", () => table.getAllLeafColumns());
    table.getLeftVisibleLeafColumns = makeVisibleColumnsMethod("getLeftVisibleLeafColumns", () => table.getLeftLeafColumns());
    table.getRightVisibleLeafColumns = makeVisibleColumnsMethod("getRightVisibleLeafColumns", () => table.getRightLeafColumns());
    table.getCenterVisibleLeafColumns = makeVisibleColumnsMethod("getCenterVisibleLeafColumns", () => table.getCenterLeafColumns());
    table.setColumnVisibility = (updater) => table.options.onColumnVisibilityChange == null ? void 0 : table.options.onColumnVisibilityChange(updater);
    table.resetColumnVisibility = (defaultState) => {
      var _table$initialState$c;
      table.setColumnVisibility(defaultState ? {} : (_table$initialState$c = table.initialState.columnVisibility) != null ? _table$initialState$c : {});
    };
    table.toggleAllColumnsVisible = (value) => {
      var _value;
      value = (_value = value) != null ? _value : !table.getIsAllColumnsVisible();
      table.setColumnVisibility(table.getAllLeafColumns().reduce((obj, column) => ({
        ...obj,
        [column.id]: !value ? !(column.getCanHide != null && column.getCanHide()) : value
      }), {}));
    };
    table.getIsAllColumnsVisible = () => !table.getAllLeafColumns().some((column) => !(column.getIsVisible != null && column.getIsVisible()));
    table.getIsSomeColumnsVisible = () => table.getAllLeafColumns().some((column) => column.getIsVisible == null ? void 0 : column.getIsVisible());
    table.getToggleAllColumnsVisibilityHandler = () => {
      return (e) => {
        var _target;
        table.toggleAllColumnsVisible((_target = e.target) == null ? void 0 : _target.checked);
      };
    };
  }
};
function _getVisibleLeafColumns(table, position) {
  return !position ? table.getVisibleLeafColumns() : position === "center" ? table.getCenterVisibleLeafColumns() : position === "left" ? table.getLeftVisibleLeafColumns() : table.getRightVisibleLeafColumns();
}
var GlobalFaceting = {
  createTable: (table) => {
    table._getGlobalFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, "__global__");
    table.getGlobalFacetedRowModel = () => {
      if (table.options.manualFiltering || !table._getGlobalFacetedRowModel) {
        return table.getPreFilteredRowModel();
      }
      return table._getGlobalFacetedRowModel();
    };
    table._getGlobalFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, "__global__");
    table.getGlobalFacetedUniqueValues = () => {
      if (!table._getGlobalFacetedUniqueValues) {
        return /* @__PURE__ */ new Map();
      }
      return table._getGlobalFacetedUniqueValues();
    };
    table._getGlobalFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, "__global__");
    table.getGlobalFacetedMinMaxValues = () => {
      if (!table._getGlobalFacetedMinMaxValues) {
        return;
      }
      return table._getGlobalFacetedMinMaxValues();
    };
  }
};
var GlobalFiltering = {
  getInitialState: (state) => {
    return {
      globalFilter: void 0,
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onGlobalFilterChange: makeStateUpdater("globalFilter", table),
      globalFilterFn: "auto",
      getColumnCanGlobalFilter: (column) => {
        var _table$getCoreRowMode;
        const value = (_table$getCoreRowMode = table.getCoreRowModel().flatRows[0]) == null || (_table$getCoreRowMode = _table$getCoreRowMode._getAllCellsByColumnId()[column.id]) == null ? void 0 : _table$getCoreRowMode.getValue();
        return typeof value === "string" || typeof value === "number";
      }
    };
  },
  createColumn: (column, table) => {
    column.getCanGlobalFilter = () => {
      var _column$columnDef$ena, _table$options$enable, _table$options$enable2, _table$options$getCol;
      return ((_column$columnDef$ena = column.columnDef.enableGlobalFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableGlobalFilter) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && ((_table$options$getCol = table.options.getColumnCanGlobalFilter == null ? void 0 : table.options.getColumnCanGlobalFilter(column)) != null ? _table$options$getCol : true) && !!column.accessorFn;
    };
  },
  createTable: (table) => {
    table.getGlobalAutoFilterFn = () => {
      return filterFns.includesString;
    };
    table.getGlobalFilterFn = () => {
      var _table$options$filter, _table$options$filter2;
      const {
        globalFilterFn
      } = table.options;
      return isFunction2(globalFilterFn) ? globalFilterFn : globalFilterFn === "auto" ? table.getGlobalAutoFilterFn() : (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[globalFilterFn]) != null ? _table$options$filter : filterFns[globalFilterFn];
    };
    table.setGlobalFilter = (updater) => {
      table.options.onGlobalFilterChange == null || table.options.onGlobalFilterChange(updater);
    };
    table.resetGlobalFilter = (defaultState) => {
      table.setGlobalFilter(defaultState ? void 0 : table.initialState.globalFilter);
    };
  }
};
var RowExpanding = {
  getInitialState: (state) => {
    return {
      expanded: {},
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onExpandedChange: makeStateUpdater("expanded", table),
      paginateExpandedRows: true
    };
  },
  createTable: (table) => {
    let registered = false;
    let queued = false;
    table._autoResetExpanded = () => {
      var _ref, _table$options$autoRe;
      if (!registered) {
        table._queue(() => {
          registered = true;
        });
        return;
      }
      if ((_ref = (_table$options$autoRe = table.options.autoResetAll) != null ? _table$options$autoRe : table.options.autoResetExpanded) != null ? _ref : !table.options.manualExpanding) {
        if (queued)
          return;
        queued = true;
        table._queue(() => {
          table.resetExpanded();
          queued = false;
        });
      }
    };
    table.setExpanded = (updater) => table.options.onExpandedChange == null ? void 0 : table.options.onExpandedChange(updater);
    table.toggleAllRowsExpanded = (expanded) => {
      if (expanded != null ? expanded : !table.getIsAllRowsExpanded()) {
        table.setExpanded(true);
      } else {
        table.setExpanded({});
      }
    };
    table.resetExpanded = (defaultState) => {
      var _table$initialState$e, _table$initialState;
      table.setExpanded(defaultState ? {} : (_table$initialState$e = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.expanded) != null ? _table$initialState$e : {});
    };
    table.getCanSomeRowsExpand = () => {
      return table.getPrePaginationRowModel().flatRows.some((row) => row.getCanExpand());
    };
    table.getToggleAllRowsExpandedHandler = () => {
      return (e) => {
        e.persist == null || e.persist();
        table.toggleAllRowsExpanded();
      };
    };
    table.getIsSomeRowsExpanded = () => {
      const expanded = table.getState().expanded;
      return expanded === true || Object.values(expanded).some(Boolean);
    };
    table.getIsAllRowsExpanded = () => {
      const expanded = table.getState().expanded;
      if (typeof expanded === "boolean") {
        return expanded === true;
      }
      if (!Object.keys(expanded).length) {
        return false;
      }
      if (table.getRowModel().flatRows.some((row) => !row.getIsExpanded())) {
        return false;
      }
      return true;
    };
    table.getExpandedDepth = () => {
      let maxDepth = 0;
      const rowIds = table.getState().expanded === true ? Object.keys(table.getRowModel().rowsById) : Object.keys(table.getState().expanded);
      rowIds.forEach((id) => {
        const splitId = id.split(".");
        maxDepth = Math.max(maxDepth, splitId.length);
      });
      return maxDepth;
    };
    table.getPreExpandedRowModel = () => table.getSortedRowModel();
    table.getExpandedRowModel = () => {
      if (!table._getExpandedRowModel && table.options.getExpandedRowModel) {
        table._getExpandedRowModel = table.options.getExpandedRowModel(table);
      }
      if (table.options.manualExpanding || !table._getExpandedRowModel) {
        return table.getPreExpandedRowModel();
      }
      return table._getExpandedRowModel();
    };
  },
  createRow: (row, table) => {
    row.toggleExpanded = (expanded) => {
      table.setExpanded((old) => {
        var _expanded;
        const exists = old === true ? true : !!(old != null && old[row.id]);
        let oldExpanded = {};
        if (old === true) {
          Object.keys(table.getRowModel().rowsById).forEach((rowId) => {
            oldExpanded[rowId] = true;
          });
        } else {
          oldExpanded = old;
        }
        expanded = (_expanded = expanded) != null ? _expanded : !exists;
        if (!exists && expanded) {
          return {
            ...oldExpanded,
            [row.id]: true
          };
        }
        if (exists && !expanded) {
          const {
            [row.id]: _,
            ...rest
          } = oldExpanded;
          return rest;
        }
        return old;
      });
    };
    row.getIsExpanded = () => {
      var _table$options$getIsR;
      const expanded = table.getState().expanded;
      return !!((_table$options$getIsR = table.options.getIsRowExpanded == null ? void 0 : table.options.getIsRowExpanded(row)) != null ? _table$options$getIsR : expanded === true || (expanded == null ? void 0 : expanded[row.id]));
    };
    row.getCanExpand = () => {
      var _table$options$getRow, _table$options$enable, _row$subRows;
      return (_table$options$getRow = table.options.getRowCanExpand == null ? void 0 : table.options.getRowCanExpand(row)) != null ? _table$options$getRow : ((_table$options$enable = table.options.enableExpanding) != null ? _table$options$enable : true) && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
    };
    row.getIsAllParentsExpanded = () => {
      let isFullyExpanded = true;
      let currentRow = row;
      while (isFullyExpanded && currentRow.parentId) {
        currentRow = table.getRow(currentRow.parentId, true);
        isFullyExpanded = currentRow.getIsExpanded();
      }
      return isFullyExpanded;
    };
    row.getToggleExpandedHandler = () => {
      const canExpand = row.getCanExpand();
      return () => {
        if (!canExpand)
          return;
        row.toggleExpanded();
      };
    };
  }
};
var defaultPageIndex = 0;
var defaultPageSize = 10;
var getDefaultPaginationState = () => ({
  pageIndex: defaultPageIndex,
  pageSize: defaultPageSize
});
var RowPagination = {
  getInitialState: (state) => {
    return {
      ...state,
      pagination: {
        ...getDefaultPaginationState(),
        ...state == null ? void 0 : state.pagination
      }
    };
  },
  getDefaultOptions: (table) => {
    return {
      onPaginationChange: makeStateUpdater("pagination", table)
    };
  },
  createTable: (table) => {
    let registered = false;
    let queued = false;
    table._autoResetPageIndex = () => {
      var _ref, _table$options$autoRe;
      if (!registered) {
        table._queue(() => {
          registered = true;
        });
        return;
      }
      if ((_ref = (_table$options$autoRe = table.options.autoResetAll) != null ? _table$options$autoRe : table.options.autoResetPageIndex) != null ? _ref : !table.options.manualPagination) {
        if (queued)
          return;
        queued = true;
        table._queue(() => {
          table.resetPageIndex();
          queued = false;
        });
      }
    };
    table.setPagination = (updater) => {
      const safeUpdater = (old) => {
        let newState = functionalUpdate(updater, old);
        return newState;
      };
      return table.options.onPaginationChange == null ? void 0 : table.options.onPaginationChange(safeUpdater);
    };
    table.resetPagination = (defaultState) => {
      var _table$initialState$p;
      table.setPagination(defaultState ? getDefaultPaginationState() : (_table$initialState$p = table.initialState.pagination) != null ? _table$initialState$p : getDefaultPaginationState());
    };
    table.setPageIndex = (updater) => {
      table.setPagination((old) => {
        let pageIndex = functionalUpdate(updater, old.pageIndex);
        const maxPageIndex = typeof table.options.pageCount === "undefined" || table.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : table.options.pageCount - 1;
        pageIndex = Math.max(0, Math.min(pageIndex, maxPageIndex));
        return {
          ...old,
          pageIndex
        };
      });
    };
    table.resetPageIndex = (defaultState) => {
      var _table$initialState$p2, _table$initialState;
      table.setPageIndex(defaultState ? defaultPageIndex : (_table$initialState$p2 = (_table$initialState = table.initialState) == null || (_table$initialState = _table$initialState.pagination) == null ? void 0 : _table$initialState.pageIndex) != null ? _table$initialState$p2 : defaultPageIndex);
    };
    table.resetPageSize = (defaultState) => {
      var _table$initialState$p3, _table$initialState2;
      table.setPageSize(defaultState ? defaultPageSize : (_table$initialState$p3 = (_table$initialState2 = table.initialState) == null || (_table$initialState2 = _table$initialState2.pagination) == null ? void 0 : _table$initialState2.pageSize) != null ? _table$initialState$p3 : defaultPageSize);
    };
    table.setPageSize = (updater) => {
      table.setPagination((old) => {
        const pageSize = Math.max(1, functionalUpdate(updater, old.pageSize));
        const topRowIndex = old.pageSize * old.pageIndex;
        const pageIndex = Math.floor(topRowIndex / pageSize);
        return {
          ...old,
          pageIndex,
          pageSize
        };
      });
    };
    table.setPageCount = (updater) => table.setPagination((old) => {
      var _table$options$pageCo;
      let newPageCount = functionalUpdate(updater, (_table$options$pageCo = table.options.pageCount) != null ? _table$options$pageCo : -1);
      if (typeof newPageCount === "number") {
        newPageCount = Math.max(-1, newPageCount);
      }
      return {
        ...old,
        pageCount: newPageCount
      };
    });
    table.getPageOptions = memo(() => [table.getPageCount()], (pageCount) => {
      let pageOptions = [];
      if (pageCount && pageCount > 0) {
        pageOptions = [...new Array(pageCount)].fill(null).map((_, i) => i);
      }
      return pageOptions;
    }, getMemoOptions(table.options, "debugTable", "getPageOptions"));
    table.getCanPreviousPage = () => table.getState().pagination.pageIndex > 0;
    table.getCanNextPage = () => {
      const {
        pageIndex
      } = table.getState().pagination;
      const pageCount = table.getPageCount();
      if (pageCount === -1) {
        return true;
      }
      if (pageCount === 0) {
        return false;
      }
      return pageIndex < pageCount - 1;
    };
    table.previousPage = () => {
      return table.setPageIndex((old) => old - 1);
    };
    table.nextPage = () => {
      return table.setPageIndex((old) => {
        return old + 1;
      });
    };
    table.firstPage = () => {
      return table.setPageIndex(0);
    };
    table.lastPage = () => {
      return table.setPageIndex(table.getPageCount() - 1);
    };
    table.getPrePaginationRowModel = () => table.getExpandedRowModel();
    table.getPaginationRowModel = () => {
      if (!table._getPaginationRowModel && table.options.getPaginationRowModel) {
        table._getPaginationRowModel = table.options.getPaginationRowModel(table);
      }
      if (table.options.manualPagination || !table._getPaginationRowModel) {
        return table.getPrePaginationRowModel();
      }
      return table._getPaginationRowModel();
    };
    table.getPageCount = () => {
      var _table$options$pageCo2;
      return (_table$options$pageCo2 = table.options.pageCount) != null ? _table$options$pageCo2 : Math.ceil(table.getRowCount() / table.getState().pagination.pageSize);
    };
    table.getRowCount = () => {
      var _table$options$rowCou;
      return (_table$options$rowCou = table.options.rowCount) != null ? _table$options$rowCou : table.getPrePaginationRowModel().rows.length;
    };
  }
};
var getDefaultRowPinningState = () => ({
  top: [],
  bottom: []
});
var RowPinning = {
  getInitialState: (state) => {
    return {
      rowPinning: getDefaultRowPinningState(),
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onRowPinningChange: makeStateUpdater("rowPinning", table)
    };
  },
  createRow: (row, table) => {
    row.pin = (position, includeLeafRows, includeParentRows) => {
      const leafRowIds = includeLeafRows ? row.getLeafRows().map((_ref) => {
        let {
          id
        } = _ref;
        return id;
      }) : [];
      const parentRowIds = includeParentRows ? row.getParentRows().map((_ref2) => {
        let {
          id
        } = _ref2;
        return id;
      }) : [];
      const rowIds = /* @__PURE__ */ new Set([...parentRowIds, row.id, ...leafRowIds]);
      table.setRowPinning((old) => {
        var _old$top3, _old$bottom3;
        if (position === "bottom") {
          var _old$top, _old$bottom;
          return {
            top: ((_old$top = old == null ? void 0 : old.top) != null ? _old$top : []).filter((d) => !(rowIds != null && rowIds.has(d))),
            bottom: [...((_old$bottom = old == null ? void 0 : old.bottom) != null ? _old$bottom : []).filter((d) => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)]
          };
        }
        if (position === "top") {
          var _old$top2, _old$bottom2;
          return {
            top: [...((_old$top2 = old == null ? void 0 : old.top) != null ? _old$top2 : []).filter((d) => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)],
            bottom: ((_old$bottom2 = old == null ? void 0 : old.bottom) != null ? _old$bottom2 : []).filter((d) => !(rowIds != null && rowIds.has(d)))
          };
        }
        return {
          top: ((_old$top3 = old == null ? void 0 : old.top) != null ? _old$top3 : []).filter((d) => !(rowIds != null && rowIds.has(d))),
          bottom: ((_old$bottom3 = old == null ? void 0 : old.bottom) != null ? _old$bottom3 : []).filter((d) => !(rowIds != null && rowIds.has(d)))
        };
      });
    };
    row.getCanPin = () => {
      var _ref3;
      const {
        enableRowPinning,
        enablePinning
      } = table.options;
      if (typeof enableRowPinning === "function") {
        return enableRowPinning(row);
      }
      return (_ref3 = enableRowPinning != null ? enableRowPinning : enablePinning) != null ? _ref3 : true;
    };
    row.getIsPinned = () => {
      const rowIds = [row.id];
      const {
        top,
        bottom
      } = table.getState().rowPinning;
      const isTop = rowIds.some((d) => top == null ? void 0 : top.includes(d));
      const isBottom = rowIds.some((d) => bottom == null ? void 0 : bottom.includes(d));
      return isTop ? "top" : isBottom ? "bottom" : false;
    };
    row.getPinnedIndex = () => {
      var _ref4, _visiblePinnedRowIds$;
      const position = row.getIsPinned();
      if (!position)
        return -1;
      const visiblePinnedRowIds = (_ref4 = position === "top" ? table.getTopRows() : table.getBottomRows()) == null ? void 0 : _ref4.map((_ref5) => {
        let {
          id
        } = _ref5;
        return id;
      });
      return (_visiblePinnedRowIds$ = visiblePinnedRowIds == null ? void 0 : visiblePinnedRowIds.indexOf(row.id)) != null ? _visiblePinnedRowIds$ : -1;
    };
  },
  createTable: (table) => {
    table.setRowPinning = (updater) => table.options.onRowPinningChange == null ? void 0 : table.options.onRowPinningChange(updater);
    table.resetRowPinning = (defaultState) => {
      var _table$initialState$r, _table$initialState;
      return table.setRowPinning(defaultState ? getDefaultRowPinningState() : (_table$initialState$r = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.rowPinning) != null ? _table$initialState$r : getDefaultRowPinningState());
    };
    table.getIsSomeRowsPinned = (position) => {
      var _pinningState$positio;
      const pinningState = table.getState().rowPinning;
      if (!position) {
        var _pinningState$top, _pinningState$bottom;
        return Boolean(((_pinningState$top = pinningState.top) == null ? void 0 : _pinningState$top.length) || ((_pinningState$bottom = pinningState.bottom) == null ? void 0 : _pinningState$bottom.length));
      }
      return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
    };
    table._getPinnedRows = (visibleRows, pinnedRowIds, position) => {
      var _table$options$keepPi;
      const rows = ((_table$options$keepPi = table.options.keepPinnedRows) != null ? _table$options$keepPi : true) ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (pinnedRowIds != null ? pinnedRowIds : []).map((rowId) => {
          const row = table.getRow(rowId, true);
          return row.getIsAllParentsExpanded() ? row : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (pinnedRowIds != null ? pinnedRowIds : []).map((rowId) => visibleRows.find((row) => row.id === rowId))
      );
      return rows.filter(Boolean).map((d) => ({
        ...d,
        position
      }));
    };
    table.getTopRows = memo(() => [table.getRowModel().rows, table.getState().rowPinning.top], (allRows, topPinnedRowIds) => table._getPinnedRows(allRows, topPinnedRowIds, "top"), getMemoOptions(table.options, "debugRows", "getTopRows"));
    table.getBottomRows = memo(() => [table.getRowModel().rows, table.getState().rowPinning.bottom], (allRows, bottomPinnedRowIds) => table._getPinnedRows(allRows, bottomPinnedRowIds, "bottom"), getMemoOptions(table.options, "debugRows", "getBottomRows"));
    table.getCenterRows = memo(() => [table.getRowModel().rows, table.getState().rowPinning.top, table.getState().rowPinning.bottom], (allRows, top, bottom) => {
      const topAndBottom = /* @__PURE__ */ new Set([...top != null ? top : [], ...bottom != null ? bottom : []]);
      return allRows.filter((d) => !topAndBottom.has(d.id));
    }, getMemoOptions(table.options, "debugRows", "getCenterRows"));
  }
};
var RowSelection = {
  getInitialState: (state) => {
    return {
      rowSelection: {},
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onRowSelectionChange: makeStateUpdater("rowSelection", table),
      enableRowSelection: true,
      enableMultiRowSelection: true,
      enableSubRowSelection: true
      // enableGroupingRowSelection: false,
      // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
      // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
    };
  },
  createTable: (table) => {
    table.setRowSelection = (updater) => table.options.onRowSelectionChange == null ? void 0 : table.options.onRowSelectionChange(updater);
    table.resetRowSelection = (defaultState) => {
      var _table$initialState$r;
      return table.setRowSelection(defaultState ? {} : (_table$initialState$r = table.initialState.rowSelection) != null ? _table$initialState$r : {});
    };
    table.toggleAllRowsSelected = (value) => {
      table.setRowSelection((old) => {
        value = typeof value !== "undefined" ? value : !table.getIsAllRowsSelected();
        const rowSelection = {
          ...old
        };
        const preGroupedFlatRows = table.getPreGroupedRowModel().flatRows;
        if (value) {
          preGroupedFlatRows.forEach((row) => {
            if (!row.getCanSelect()) {
              return;
            }
            rowSelection[row.id] = true;
          });
        } else {
          preGroupedFlatRows.forEach((row) => {
            delete rowSelection[row.id];
          });
        }
        return rowSelection;
      });
    };
    table.toggleAllPageRowsSelected = (value) => table.setRowSelection((old) => {
      const resolvedValue = typeof value !== "undefined" ? value : !table.getIsAllPageRowsSelected();
      const rowSelection = {
        ...old
      };
      table.getRowModel().rows.forEach((row) => {
        mutateRowIsSelected(rowSelection, row.id, resolvedValue, true, table);
      });
      return rowSelection;
    });
    table.getPreSelectedRowModel = () => table.getCoreRowModel();
    table.getSelectedRowModel = memo(() => [table.getState().rowSelection, table.getCoreRowModel()], (rowSelection, rowModel) => {
      if (!Object.keys(rowSelection).length) {
        return {
          rows: [],
          flatRows: [],
          rowsById: {}
        };
      }
      return selectRowsFn(table, rowModel);
    }, getMemoOptions(table.options, "debugTable", "getSelectedRowModel"));
    table.getFilteredSelectedRowModel = memo(() => [table.getState().rowSelection, table.getFilteredRowModel()], (rowSelection, rowModel) => {
      if (!Object.keys(rowSelection).length) {
        return {
          rows: [],
          flatRows: [],
          rowsById: {}
        };
      }
      return selectRowsFn(table, rowModel);
    }, getMemoOptions(table.options, "debugTable", "getFilteredSelectedRowModel"));
    table.getGroupedSelectedRowModel = memo(() => [table.getState().rowSelection, table.getSortedRowModel()], (rowSelection, rowModel) => {
      if (!Object.keys(rowSelection).length) {
        return {
          rows: [],
          flatRows: [],
          rowsById: {}
        };
      }
      return selectRowsFn(table, rowModel);
    }, getMemoOptions(table.options, "debugTable", "getGroupedSelectedRowModel"));
    table.getIsAllRowsSelected = () => {
      const preGroupedFlatRows = table.getFilteredRowModel().flatRows;
      const {
        rowSelection
      } = table.getState();
      let isAllRowsSelected = Boolean(preGroupedFlatRows.length && Object.keys(rowSelection).length);
      if (isAllRowsSelected) {
        if (preGroupedFlatRows.some((row) => row.getCanSelect() && !rowSelection[row.id])) {
          isAllRowsSelected = false;
        }
      }
      return isAllRowsSelected;
    };
    table.getIsAllPageRowsSelected = () => {
      const paginationFlatRows = table.getPaginationRowModel().flatRows.filter((row) => row.getCanSelect());
      const {
        rowSelection
      } = table.getState();
      let isAllPageRowsSelected = !!paginationFlatRows.length;
      if (isAllPageRowsSelected && paginationFlatRows.some((row) => !rowSelection[row.id])) {
        isAllPageRowsSelected = false;
      }
      return isAllPageRowsSelected;
    };
    table.getIsSomeRowsSelected = () => {
      var _table$getState$rowSe;
      const totalSelected = Object.keys((_table$getState$rowSe = table.getState().rowSelection) != null ? _table$getState$rowSe : {}).length;
      return totalSelected > 0 && totalSelected < table.getFilteredRowModel().flatRows.length;
    };
    table.getIsSomePageRowsSelected = () => {
      const paginationFlatRows = table.getPaginationRowModel().flatRows;
      return table.getIsAllPageRowsSelected() ? false : paginationFlatRows.filter((row) => row.getCanSelect()).some((d) => d.getIsSelected() || d.getIsSomeSelected());
    };
    table.getToggleAllRowsSelectedHandler = () => {
      return (e) => {
        table.toggleAllRowsSelected(e.target.checked);
      };
    };
    table.getToggleAllPageRowsSelectedHandler = () => {
      return (e) => {
        table.toggleAllPageRowsSelected(e.target.checked);
      };
    };
  },
  createRow: (row, table) => {
    row.toggleSelected = (value, opts) => {
      const isSelected = row.getIsSelected();
      table.setRowSelection((old) => {
        var _opts$selectChildren;
        value = typeof value !== "undefined" ? value : !isSelected;
        if (row.getCanSelect() && isSelected === value) {
          return old;
        }
        const selectedRowIds = {
          ...old
        };
        mutateRowIsSelected(selectedRowIds, row.id, value, (_opts$selectChildren = opts == null ? void 0 : opts.selectChildren) != null ? _opts$selectChildren : true, table);
        return selectedRowIds;
      });
    };
    row.getIsSelected = () => {
      const {
        rowSelection
      } = table.getState();
      return isRowSelected(row, rowSelection);
    };
    row.getIsSomeSelected = () => {
      const {
        rowSelection
      } = table.getState();
      return isSubRowSelected(row, rowSelection) === "some";
    };
    row.getIsAllSubRowsSelected = () => {
      const {
        rowSelection
      } = table.getState();
      return isSubRowSelected(row, rowSelection) === "all";
    };
    row.getCanSelect = () => {
      var _table$options$enable;
      if (typeof table.options.enableRowSelection === "function") {
        return table.options.enableRowSelection(row);
      }
      return (_table$options$enable = table.options.enableRowSelection) != null ? _table$options$enable : true;
    };
    row.getCanSelectSubRows = () => {
      var _table$options$enable2;
      if (typeof table.options.enableSubRowSelection === "function") {
        return table.options.enableSubRowSelection(row);
      }
      return (_table$options$enable2 = table.options.enableSubRowSelection) != null ? _table$options$enable2 : true;
    };
    row.getCanMultiSelect = () => {
      var _table$options$enable3;
      if (typeof table.options.enableMultiRowSelection === "function") {
        return table.options.enableMultiRowSelection(row);
      }
      return (_table$options$enable3 = table.options.enableMultiRowSelection) != null ? _table$options$enable3 : true;
    };
    row.getToggleSelectedHandler = () => {
      const canSelect = row.getCanSelect();
      return (e) => {
        var _target;
        if (!canSelect)
          return;
        row.toggleSelected((_target = e.target) == null ? void 0 : _target.checked);
      };
    };
  }
};
var mutateRowIsSelected = (selectedRowIds, id, value, includeChildren, table) => {
  var _row$subRows;
  const row = table.getRow(id, true);
  if (value) {
    if (!row.getCanMultiSelect()) {
      Object.keys(selectedRowIds).forEach((key) => delete selectedRowIds[key]);
    }
    if (row.getCanSelect()) {
      selectedRowIds[id] = true;
    }
  } else {
    delete selectedRowIds[id];
  }
  if (includeChildren && (_row$subRows = row.subRows) != null && _row$subRows.length && row.getCanSelectSubRows()) {
    row.subRows.forEach((row2) => mutateRowIsSelected(selectedRowIds, row2.id, value, includeChildren, table));
  }
};
function selectRowsFn(table, rowModel) {
  const rowSelection = table.getState().rowSelection;
  const newSelectedFlatRows = [];
  const newSelectedRowsById = {};
  const recurseRows = function(rows, depth) {
    return rows.map((row) => {
      var _row$subRows2;
      const isSelected = isRowSelected(row, rowSelection);
      if (isSelected) {
        newSelectedFlatRows.push(row);
        newSelectedRowsById[row.id] = row;
      }
      if ((_row$subRows2 = row.subRows) != null && _row$subRows2.length) {
        row = {
          ...row,
          subRows: recurseRows(row.subRows)
        };
      }
      if (isSelected) {
        return row;
      }
    }).filter(Boolean);
  };
  return {
    rows: recurseRows(rowModel.rows),
    flatRows: newSelectedFlatRows,
    rowsById: newSelectedRowsById
  };
}
function isRowSelected(row, selection) {
  var _selection$row$id;
  return (_selection$row$id = selection[row.id]) != null ? _selection$row$id : false;
}
function isSubRowSelected(row, selection, table) {
  var _row$subRows3;
  if (!((_row$subRows3 = row.subRows) != null && _row$subRows3.length))
    return false;
  let allChildrenSelected = true;
  let someSelected = false;
  row.subRows.forEach((subRow) => {
    if (someSelected && !allChildrenSelected) {
      return;
    }
    if (subRow.getCanSelect()) {
      if (isRowSelected(subRow, selection)) {
        someSelected = true;
      } else {
        allChildrenSelected = false;
      }
    }
    if (subRow.subRows && subRow.subRows.length) {
      const subRowChildrenSelected = isSubRowSelected(subRow, selection);
      if (subRowChildrenSelected === "all") {
        someSelected = true;
      } else if (subRowChildrenSelected === "some") {
        someSelected = true;
        allChildrenSelected = false;
      } else {
        allChildrenSelected = false;
      }
    }
  });
  return allChildrenSelected ? "all" : someSelected ? "some" : false;
}
var reSplitAlphaNumeric = /([0-9]+)/gm;
var alphanumeric = (rowA, rowB, columnId) => {
  return compareAlphanumeric(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
};
var alphanumericCaseSensitive = (rowA, rowB, columnId) => {
  return compareAlphanumeric(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
};
var text = (rowA, rowB, columnId) => {
  return compareBasic(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
};
var textCaseSensitive = (rowA, rowB, columnId) => {
  return compareBasic(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
};
var datetime = (rowA, rowB, columnId) => {
  const a = rowA.getValue(columnId);
  const b = rowB.getValue(columnId);
  return a > b ? 1 : a < b ? -1 : 0;
};
var basic = (rowA, rowB, columnId) => {
  return compareBasic(rowA.getValue(columnId), rowB.getValue(columnId));
};
function compareBasic(a, b) {
  return a === b ? 0 : a > b ? 1 : -1;
}
function toString(a) {
  if (typeof a === "number") {
    if (isNaN(a) || a === Infinity || a === -Infinity) {
      return "";
    }
    return String(a);
  }
  if (typeof a === "string") {
    return a;
  }
  return "";
}
function compareAlphanumeric(aStr, bStr) {
  const a = aStr.split(reSplitAlphaNumeric).filter(Boolean);
  const b = bStr.split(reSplitAlphaNumeric).filter(Boolean);
  while (a.length && b.length) {
    const aa = a.shift();
    const bb = b.shift();
    const an = parseInt(aa, 10);
    const bn = parseInt(bb, 10);
    const combo = [an, bn].sort();
    if (isNaN(combo[0])) {
      if (aa > bb) {
        return 1;
      }
      if (bb > aa) {
        return -1;
      }
      continue;
    }
    if (isNaN(combo[1])) {
      return isNaN(an) ? -1 : 1;
    }
    if (an > bn) {
      return 1;
    }
    if (bn > an) {
      return -1;
    }
  }
  return a.length - b.length;
}
var sortingFns = {
  alphanumeric,
  alphanumericCaseSensitive,
  text,
  textCaseSensitive,
  datetime,
  basic
};
var RowSorting = {
  getInitialState: (state) => {
    return {
      sorting: [],
      ...state
    };
  },
  getDefaultColumnDef: () => {
    return {
      sortingFn: "auto",
      sortUndefined: 1
    };
  },
  getDefaultOptions: (table) => {
    return {
      onSortingChange: makeStateUpdater("sorting", table),
      isMultiSortEvent: (e) => {
        return e.shiftKey;
      }
    };
  },
  createColumn: (column, table) => {
    column.getAutoSortingFn = () => {
      const firstRows = table.getFilteredRowModel().flatRows.slice(10);
      let isString = false;
      for (const row of firstRows) {
        const value = row == null ? void 0 : row.getValue(column.id);
        if (Object.prototype.toString.call(value) === "[object Date]") {
          return sortingFns.datetime;
        }
        if (typeof value === "string") {
          isString = true;
          if (value.split(reSplitAlphaNumeric).length > 1) {
            return sortingFns.alphanumeric;
          }
        }
      }
      if (isString) {
        return sortingFns.text;
      }
      return sortingFns.basic;
    };
    column.getAutoSortDir = () => {
      const firstRow = table.getFilteredRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === "string") {
        return "asc";
      }
      return "desc";
    };
    column.getSortingFn = () => {
      var _table$options$sortin, _table$options$sortin2;
      if (!column) {
        throw new Error();
      }
      return isFunction2(column.columnDef.sortingFn) ? column.columnDef.sortingFn : column.columnDef.sortingFn === "auto" ? column.getAutoSortingFn() : (_table$options$sortin = (_table$options$sortin2 = table.options.sortingFns) == null ? void 0 : _table$options$sortin2[column.columnDef.sortingFn]) != null ? _table$options$sortin : sortingFns[column.columnDef.sortingFn];
    };
    column.toggleSorting = (desc, multi) => {
      const nextSortingOrder = column.getNextSortingOrder();
      const hasManualValue = typeof desc !== "undefined" && desc !== null;
      table.setSorting((old) => {
        const existingSorting = old == null ? void 0 : old.find((d) => d.id === column.id);
        const existingIndex = old == null ? void 0 : old.findIndex((d) => d.id === column.id);
        let newSorting = [];
        let sortAction;
        let nextDesc = hasManualValue ? desc : nextSortingOrder === "desc";
        if (old != null && old.length && column.getCanMultiSort() && multi) {
          if (existingSorting) {
            sortAction = "toggle";
          } else {
            sortAction = "add";
          }
        } else {
          if (old != null && old.length && existingIndex !== old.length - 1) {
            sortAction = "replace";
          } else if (existingSorting) {
            sortAction = "toggle";
          } else {
            sortAction = "replace";
          }
        }
        if (sortAction === "toggle") {
          if (!hasManualValue) {
            if (!nextSortingOrder) {
              sortAction = "remove";
            }
          }
        }
        if (sortAction === "add") {
          var _table$options$maxMul;
          newSorting = [...old, {
            id: column.id,
            desc: nextDesc
          }];
          newSorting.splice(0, newSorting.length - ((_table$options$maxMul = table.options.maxMultiSortColCount) != null ? _table$options$maxMul : Number.MAX_SAFE_INTEGER));
        } else if (sortAction === "toggle") {
          newSorting = old.map((d) => {
            if (d.id === column.id) {
              return {
                ...d,
                desc: nextDesc
              };
            }
            return d;
          });
        } else if (sortAction === "remove") {
          newSorting = old.filter((d) => d.id !== column.id);
        } else {
          newSorting = [{
            id: column.id,
            desc: nextDesc
          }];
        }
        return newSorting;
      });
    };
    column.getFirstSortDir = () => {
      var _ref, _column$columnDef$sor;
      const sortDescFirst = (_ref = (_column$columnDef$sor = column.columnDef.sortDescFirst) != null ? _column$columnDef$sor : table.options.sortDescFirst) != null ? _ref : column.getAutoSortDir() === "desc";
      return sortDescFirst ? "desc" : "asc";
    };
    column.getNextSortingOrder = (multi) => {
      var _table$options$enable, _table$options$enable2;
      const firstSortDirection = column.getFirstSortDir();
      const isSorted = column.getIsSorted();
      if (!isSorted) {
        return firstSortDirection;
      }
      if (isSorted !== firstSortDirection && ((_table$options$enable = table.options.enableSortingRemoval) != null ? _table$options$enable : true) && // If enableSortRemove, enable in general
      (multi ? (_table$options$enable2 = table.options.enableMultiRemove) != null ? _table$options$enable2 : true : true)) {
        return false;
      }
      return isSorted === "desc" ? "asc" : "desc";
    };
    column.getCanSort = () => {
      var _column$columnDef$ena, _table$options$enable3;
      return ((_column$columnDef$ena = column.columnDef.enableSorting) != null ? _column$columnDef$ena : true) && ((_table$options$enable3 = table.options.enableSorting) != null ? _table$options$enable3 : true) && !!column.accessorFn;
    };
    column.getCanMultiSort = () => {
      var _ref2, _column$columnDef$ena2;
      return (_ref2 = (_column$columnDef$ena2 = column.columnDef.enableMultiSort) != null ? _column$columnDef$ena2 : table.options.enableMultiSort) != null ? _ref2 : !!column.accessorFn;
    };
    column.getIsSorted = () => {
      var _table$getState$sorti;
      const columnSort = (_table$getState$sorti = table.getState().sorting) == null ? void 0 : _table$getState$sorti.find((d) => d.id === column.id);
      return !columnSort ? false : columnSort.desc ? "desc" : "asc";
    };
    column.getSortIndex = () => {
      var _table$getState$sorti2, _table$getState$sorti3;
      return (_table$getState$sorti2 = (_table$getState$sorti3 = table.getState().sorting) == null ? void 0 : _table$getState$sorti3.findIndex((d) => d.id === column.id)) != null ? _table$getState$sorti2 : -1;
    };
    column.clearSorting = () => {
      table.setSorting((old) => old != null && old.length ? old.filter((d) => d.id !== column.id) : []);
    };
    column.getToggleSortingHandler = () => {
      const canSort = column.getCanSort();
      return (e) => {
        if (!canSort)
          return;
        e.persist == null || e.persist();
        column.toggleSorting == null || column.toggleSorting(void 0, column.getCanMultiSort() ? table.options.isMultiSortEvent == null ? void 0 : table.options.isMultiSortEvent(e) : false);
      };
    };
  },
  createTable: (table) => {
    table.setSorting = (updater) => table.options.onSortingChange == null ? void 0 : table.options.onSortingChange(updater);
    table.resetSorting = (defaultState) => {
      var _table$initialState$s, _table$initialState;
      table.setSorting(defaultState ? [] : (_table$initialState$s = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.sorting) != null ? _table$initialState$s : []);
    };
    table.getPreSortedRowModel = () => table.getGroupedRowModel();
    table.getSortedRowModel = () => {
      if (!table._getSortedRowModel && table.options.getSortedRowModel) {
        table._getSortedRowModel = table.options.getSortedRowModel(table);
      }
      if (table.options.manualSorting || !table._getSortedRowModel) {
        return table.getPreSortedRowModel();
      }
      return table._getSortedRowModel();
    };
  }
};
var builtInFeatures = [
  Headers,
  ColumnVisibility,
  ColumnOrdering,
  ColumnPinning,
  ColumnFaceting,
  ColumnFiltering,
  GlobalFaceting,
  //depends on ColumnFaceting
  GlobalFiltering,
  //depends on ColumnFiltering
  RowSorting,
  ColumnGrouping,
  //depends on RowSorting
  RowExpanding,
  RowPagination,
  RowPinning,
  RowSelection,
  ColumnSizing
];
function createTable(options) {
  var _options$_features, _options$initialState;
  if (process.env.NODE_ENV !== "production" && (options.debugAll || options.debugTable)) {
    console.info("Creating Table Instance...");
  }
  const _features = [...builtInFeatures, ...(_options$_features = options._features) != null ? _options$_features : []];
  let table = {
    _features
  };
  const defaultOptions = table._features.reduce((obj, feature) => {
    return Object.assign(obj, feature.getDefaultOptions == null ? void 0 : feature.getDefaultOptions(table));
  }, {});
  const mergeOptions = (options2) => {
    if (table.options.mergeOptions) {
      return table.options.mergeOptions(defaultOptions, options2);
    }
    return {
      ...defaultOptions,
      ...options2
    };
  };
  const coreInitialState = {};
  let initialState = {
    ...coreInitialState,
    ...(_options$initialState = options.initialState) != null ? _options$initialState : {}
  };
  table._features.forEach((feature) => {
    var _feature$getInitialSt;
    initialState = (_feature$getInitialSt = feature.getInitialState == null ? void 0 : feature.getInitialState(initialState)) != null ? _feature$getInitialSt : initialState;
  });
  const queued = [];
  let queuedTimeout = false;
  const coreInstance = {
    _features,
    options: {
      ...defaultOptions,
      ...options
    },
    initialState,
    _queue: (cb) => {
      queued.push(cb);
      if (!queuedTimeout) {
        queuedTimeout = true;
        Promise.resolve().then(() => {
          while (queued.length) {
            queued.shift()();
          }
          queuedTimeout = false;
        }).catch((error) => setTimeout(() => {
          throw error;
        }));
      }
    },
    reset: () => {
      table.setState(table.initialState);
    },
    setOptions: (updater) => {
      const newOptions = functionalUpdate(updater, table.options);
      table.options = mergeOptions(newOptions);
    },
    getState: () => {
      return table.options.state;
    },
    setState: (updater) => {
      table.options.onStateChange == null || table.options.onStateChange(updater);
    },
    _getRowId: (row, index, parent) => {
      var _table$options$getRow;
      return (_table$options$getRow = table.options.getRowId == null ? void 0 : table.options.getRowId(row, index, parent)) != null ? _table$options$getRow : `${parent ? [parent.id, index].join(".") : index}`;
    },
    getCoreRowModel: () => {
      if (!table._getCoreRowModel) {
        table._getCoreRowModel = table.options.getCoreRowModel(table);
      }
      return table._getCoreRowModel();
    },
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => {
      return table.getPaginationRowModel();
    },
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (id, searchAll) => {
      let row = (searchAll ? table.getPrePaginationRowModel() : table.getRowModel()).rowsById[id];
      if (!row) {
        row = table.getCoreRowModel().rowsById[id];
        if (!row) {
          if (process.env.NODE_ENV !== "production") {
            throw new Error(`getRow could not find row with ID: ${id}`);
          }
          throw new Error();
        }
      }
      return row;
    },
    _getDefaultColumnDef: memo(() => [table.options.defaultColumn], (defaultColumn) => {
      var _defaultColumn;
      defaultColumn = (_defaultColumn = defaultColumn) != null ? _defaultColumn : {};
      return {
        header: (props) => {
          const resolvedColumnDef = props.header.column.columnDef;
          if (resolvedColumnDef.accessorKey) {
            return resolvedColumnDef.accessorKey;
          }
          if (resolvedColumnDef.accessorFn) {
            return resolvedColumnDef.id;
          }
          return null;
        },
        // footer: props => props.header.column.id,
        cell: (props) => {
          var _props$renderValue$to, _props$renderValue;
          return (_props$renderValue$to = (_props$renderValue = props.renderValue()) == null || _props$renderValue.toString == null ? void 0 : _props$renderValue.toString()) != null ? _props$renderValue$to : null;
        },
        ...table._features.reduce((obj, feature) => {
          return Object.assign(obj, feature.getDefaultColumnDef == null ? void 0 : feature.getDefaultColumnDef());
        }, {}),
        ...defaultColumn
      };
    }, getMemoOptions(options, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => table.options.columns,
    getAllColumns: memo(() => [table._getColumnDefs()], (columnDefs) => {
      const recurseColumns = function(columnDefs2, parent, depth) {
        if (depth === void 0) {
          depth = 0;
        }
        return columnDefs2.map((columnDef) => {
          const column = createColumn(table, columnDef, depth, parent);
          const groupingColumnDef = columnDef;
          column.columns = groupingColumnDef.columns ? recurseColumns(groupingColumnDef.columns, column, depth + 1) : [];
          return column;
        });
      };
      return recurseColumns(columnDefs);
    }, getMemoOptions(options, "debugColumns", "getAllColumns")),
    getAllFlatColumns: memo(() => [table.getAllColumns()], (allColumns) => {
      return allColumns.flatMap((column) => {
        return column.getFlatColumns();
      });
    }, getMemoOptions(options, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: memo(() => [table.getAllFlatColumns()], (flatColumns) => {
      return flatColumns.reduce((acc, column) => {
        acc[column.id] = column;
        return acc;
      }, {});
    }, getMemoOptions(options, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: memo(() => [table.getAllColumns(), table._getOrderColumnsFn()], (allColumns, orderColumns2) => {
      let leafColumns = allColumns.flatMap((column) => column.getLeafColumns());
      return orderColumns2(leafColumns);
    }, getMemoOptions(options, "debugColumns", "getAllLeafColumns")),
    getColumn: (columnId) => {
      const column = table._getAllFlatColumnsById()[columnId];
      if (process.env.NODE_ENV !== "production" && !column) {
        console.error(`[Table] Column with id '${columnId}' does not exist.`);
      }
      return column;
    }
  };
  Object.assign(table, coreInstance);
  for (let index = 0; index < table._features.length; index++) {
    const feature = table._features[index];
    feature == null || feature.createTable == null || feature.createTable(table);
  }
  return table;
}
function getCoreRowModel() {
  return (table) => memo(() => [table.options.data], (data) => {
    const rowModel = {
      rows: [],
      flatRows: [],
      rowsById: {}
    };
    const accessRows = function(originalRows, depth, parentRow) {
      if (depth === void 0) {
        depth = 0;
      }
      const rows = [];
      for (let i = 0; i < originalRows.length; i++) {
        const row = createRow(table, table._getRowId(originalRows[i], i, parentRow), originalRows[i], i, depth, void 0, parentRow == null ? void 0 : parentRow.id);
        rowModel.flatRows.push(row);
        rowModel.rowsById[row.id] = row;
        rows.push(row);
        if (table.options.getSubRows) {
          var _row$originalSubRows;
          row.originalSubRows = table.options.getSubRows(originalRows[i], i);
          if ((_row$originalSubRows = row.originalSubRows) != null && _row$originalSubRows.length) {
            row.subRows = accessRows(row.originalSubRows, depth + 1, row);
          }
        }
      }
      return rows;
    };
    rowModel.rows = accessRows(data);
    return rowModel;
  }, getMemoOptions(table.options, "debugTable", "getRowModel", () => table._autoResetPageIndex()));
}
function expandRows(rowModel) {
  const expandedRows = [];
  const handleRow = (row) => {
    var _row$subRows;
    expandedRows.push(row);
    if ((_row$subRows = row.subRows) != null && _row$subRows.length && row.getIsExpanded()) {
      row.subRows.forEach(handleRow);
    }
  };
  rowModel.rows.forEach(handleRow);
  return {
    rows: expandedRows,
    flatRows: rowModel.flatRows,
    rowsById: rowModel.rowsById
  };
}
function filterRows(rows, filterRowImpl, table) {
  if (table.options.filterFromLeafRows) {
    return filterRowModelFromLeafs(rows, filterRowImpl, table);
  }
  return filterRowModelFromRoot(rows, filterRowImpl, table);
}
function filterRowModelFromLeafs(rowsToFilter, filterRow, table) {
  var _table$options$maxLea;
  const newFilteredFlatRows = [];
  const newFilteredRowsById = {};
  const maxDepth = (_table$options$maxLea = table.options.maxLeafRowFilterDepth) != null ? _table$options$maxLea : 100;
  const recurseFilterRows = function(rowsToFilter2, depth) {
    if (depth === void 0) {
      depth = 0;
    }
    const rows = [];
    for (let i = 0; i < rowsToFilter2.length; i++) {
      var _row$subRows;
      let row = rowsToFilter2[i];
      const newRow = createRow(table, row.id, row.original, row.index, row.depth, void 0, row.parentId);
      newRow.columnFilters = row.columnFilters;
      if ((_row$subRows = row.subRows) != null && _row$subRows.length && depth < maxDepth) {
        newRow.subRows = recurseFilterRows(row.subRows, depth + 1);
        row = newRow;
        if (filterRow(row) && !newRow.subRows.length) {
          rows.push(row);
          newFilteredRowsById[row.id] = row;
          newFilteredFlatRows.push(row);
          continue;
        }
        if (filterRow(row) || newRow.subRows.length) {
          rows.push(row);
          newFilteredRowsById[row.id] = row;
          newFilteredFlatRows.push(row);
          continue;
        }
      } else {
        row = newRow;
        if (filterRow(row)) {
          rows.push(row);
          newFilteredRowsById[row.id] = row;
          newFilteredFlatRows.push(row);
        }
      }
    }
    return rows;
  };
  return {
    rows: recurseFilterRows(rowsToFilter),
    flatRows: newFilteredFlatRows,
    rowsById: newFilteredRowsById
  };
}
function filterRowModelFromRoot(rowsToFilter, filterRow, table) {
  var _table$options$maxLea2;
  const newFilteredFlatRows = [];
  const newFilteredRowsById = {};
  const maxDepth = (_table$options$maxLea2 = table.options.maxLeafRowFilterDepth) != null ? _table$options$maxLea2 : 100;
  const recurseFilterRows = function(rowsToFilter2, depth) {
    if (depth === void 0) {
      depth = 0;
    }
    const rows = [];
    for (let i = 0; i < rowsToFilter2.length; i++) {
      let row = rowsToFilter2[i];
      const pass = filterRow(row);
      if (pass) {
        var _row$subRows2;
        if ((_row$subRows2 = row.subRows) != null && _row$subRows2.length && depth < maxDepth) {
          const newRow = createRow(table, row.id, row.original, row.index, row.depth, void 0, row.parentId);
          newRow.subRows = recurseFilterRows(row.subRows, depth + 1);
          row = newRow;
        }
        rows.push(row);
        newFilteredFlatRows.push(row);
        newFilteredRowsById[row.id] = row;
      }
    }
    return rows;
  };
  return {
    rows: recurseFilterRows(rowsToFilter),
    flatRows: newFilteredFlatRows,
    rowsById: newFilteredRowsById
  };
}
function getFilteredRowModel() {
  return (table) => memo(() => [table.getPreFilteredRowModel(), table.getState().columnFilters, table.getState().globalFilter], (rowModel, columnFilters, globalFilter) => {
    if (!rowModel.rows.length || !(columnFilters != null && columnFilters.length) && !globalFilter) {
      for (let i = 0; i < rowModel.flatRows.length; i++) {
        rowModel.flatRows[i].columnFilters = {};
        rowModel.flatRows[i].columnFiltersMeta = {};
      }
      return rowModel;
    }
    const resolvedColumnFilters = [];
    const resolvedGlobalFilters = [];
    (columnFilters != null ? columnFilters : []).forEach((d) => {
      var _filterFn$resolveFilt;
      const column = table.getColumn(d.id);
      if (!column) {
        return;
      }
      const filterFn = column.getFilterFn();
      if (!filterFn) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${column.id}.`);
        }
        return;
      }
      resolvedColumnFilters.push({
        id: d.id,
        filterFn,
        resolvedValue: (_filterFn$resolveFilt = filterFn.resolveFilterValue == null ? void 0 : filterFn.resolveFilterValue(d.value)) != null ? _filterFn$resolveFilt : d.value
      });
    });
    const filterableIds = (columnFilters != null ? columnFilters : []).map((d) => d.id);
    const globalFilterFn = table.getGlobalFilterFn();
    const globallyFilterableColumns = table.getAllLeafColumns().filter((column) => column.getCanGlobalFilter());
    if (globalFilter && globalFilterFn && globallyFilterableColumns.length) {
      filterableIds.push("__global__");
      globallyFilterableColumns.forEach((column) => {
        var _globalFilterFn$resol;
        resolvedGlobalFilters.push({
          id: column.id,
          filterFn: globalFilterFn,
          resolvedValue: (_globalFilterFn$resol = globalFilterFn.resolveFilterValue == null ? void 0 : globalFilterFn.resolveFilterValue(globalFilter)) != null ? _globalFilterFn$resol : globalFilter
        });
      });
    }
    let currentColumnFilter;
    let currentGlobalFilter;
    for (let j = 0; j < rowModel.flatRows.length; j++) {
      const row = rowModel.flatRows[j];
      row.columnFilters = {};
      if (resolvedColumnFilters.length) {
        for (let i = 0; i < resolvedColumnFilters.length; i++) {
          currentColumnFilter = resolvedColumnFilters[i];
          const id = currentColumnFilter.id;
          row.columnFilters[id] = currentColumnFilter.filterFn(row, id, currentColumnFilter.resolvedValue, (filterMeta) => {
            row.columnFiltersMeta[id] = filterMeta;
          });
        }
      }
      if (resolvedGlobalFilters.length) {
        for (let i = 0; i < resolvedGlobalFilters.length; i++) {
          currentGlobalFilter = resolvedGlobalFilters[i];
          const id = currentGlobalFilter.id;
          if (currentGlobalFilter.filterFn(row, id, currentGlobalFilter.resolvedValue, (filterMeta) => {
            row.columnFiltersMeta[id] = filterMeta;
          })) {
            row.columnFilters.__global__ = true;
            break;
          }
        }
        if (row.columnFilters.__global__ !== true) {
          row.columnFilters.__global__ = false;
        }
      }
    }
    const filterRowsImpl = (row) => {
      for (let i = 0; i < filterableIds.length; i++) {
        if (row.columnFilters[filterableIds[i]] === false) {
          return false;
        }
      }
      return true;
    };
    return filterRows(rowModel.rows, filterRowsImpl, table);
  }, getMemoOptions(table.options, "debugTable", "getFilteredRowModel", () => table._autoResetPageIndex()));
}
function getPaginationRowModel(opts) {
  return (table) => memo(() => [table.getState().pagination, table.getPrePaginationRowModel(), table.options.paginateExpandedRows ? void 0 : table.getState().expanded], (pagination, rowModel) => {
    if (!rowModel.rows.length) {
      return rowModel;
    }
    const {
      pageSize,
      pageIndex
    } = pagination;
    let {
      rows,
      flatRows,
      rowsById
    } = rowModel;
    const pageStart = pageSize * pageIndex;
    const pageEnd = pageStart + pageSize;
    rows = rows.slice(pageStart, pageEnd);
    let paginatedRowModel;
    if (!table.options.paginateExpandedRows) {
      paginatedRowModel = expandRows({
        rows,
        flatRows,
        rowsById
      });
    } else {
      paginatedRowModel = {
        rows,
        flatRows,
        rowsById
      };
    }
    paginatedRowModel.flatRows = [];
    const handleRow = (row) => {
      paginatedRowModel.flatRows.push(row);
      if (row.subRows.length) {
        row.subRows.forEach(handleRow);
      }
    };
    paginatedRowModel.rows.forEach(handleRow);
    return paginatedRowModel;
  }, getMemoOptions(table.options, "debugTable", "getPaginationRowModel"));
}
function getSortedRowModel() {
  return (table) => memo(() => [table.getState().sorting, table.getPreSortedRowModel()], (sorting, rowModel) => {
    if (!rowModel.rows.length || !(sorting != null && sorting.length)) {
      return rowModel;
    }
    const sortingState = table.getState().sorting;
    const sortedFlatRows = [];
    const availableSorting = sortingState.filter((sort) => {
      var _table$getColumn;
      return (_table$getColumn = table.getColumn(sort.id)) == null ? void 0 : _table$getColumn.getCanSort();
    });
    const columnInfoById = {};
    availableSorting.forEach((sortEntry) => {
      const column = table.getColumn(sortEntry.id);
      if (!column)
        return;
      columnInfoById[sortEntry.id] = {
        sortUndefined: column.columnDef.sortUndefined,
        invertSorting: column.columnDef.invertSorting,
        sortingFn: column.getSortingFn()
      };
    });
    const sortData = (rows) => {
      const sortedData = rows.map((row) => ({
        ...row
      }));
      sortedData.sort((rowA, rowB) => {
        for (let i = 0; i < availableSorting.length; i += 1) {
          var _sortEntry$desc;
          const sortEntry = availableSorting[i];
          const columnInfo = columnInfoById[sortEntry.id];
          const sortUndefined = columnInfo.sortUndefined;
          const isDesc = (_sortEntry$desc = sortEntry == null ? void 0 : sortEntry.desc) != null ? _sortEntry$desc : false;
          let sortInt = 0;
          if (sortUndefined) {
            const aValue = rowA.getValue(sortEntry.id);
            const bValue = rowB.getValue(sortEntry.id);
            const aUndefined = aValue === void 0;
            const bUndefined = bValue === void 0;
            if (aUndefined || bUndefined) {
              if (sortUndefined === "first")
                return aUndefined ? -1 : 1;
              if (sortUndefined === "last")
                return aUndefined ? 1 : -1;
              sortInt = aUndefined && bUndefined ? 0 : aUndefined ? sortUndefined : -sortUndefined;
            }
          }
          if (sortInt === 0) {
            sortInt = columnInfo.sortingFn(rowA, rowB, sortEntry.id);
          }
          if (sortInt !== 0) {
            if (isDesc) {
              sortInt *= -1;
            }
            if (columnInfo.invertSorting) {
              sortInt *= -1;
            }
            return sortInt;
          }
        }
        return rowA.index - rowB.index;
      });
      sortedData.forEach((row) => {
        var _row$subRows;
        sortedFlatRows.push(row);
        if ((_row$subRows = row.subRows) != null && _row$subRows.length) {
          row.subRows = sortData(row.subRows);
        }
      });
      return sortedData;
    };
    return {
      rows: sortData(rowModel.rows),
      flatRows: sortedFlatRows,
      rowsById: rowModel.rowsById
    };
  }, getMemoOptions(table.options, "debugTable", "getSortedRowModel", () => table._autoResetPageIndex()));
}

// ../../node_modules/@tanstack/react-table/build/lib/index.mjs
function flexRender(Comp, props) {
  return !Comp ? null : isReactComponent(Comp) ? /* @__PURE__ */ t.createElement(Comp, props) : Comp;
}
function isReactComponent(component) {
  return isClassComponent(component) || typeof component === "function" || isExoticComponent(component);
}
function isClassComponent(component) {
  return typeof component === "function" && (() => {
    const proto = Object.getPrototypeOf(component);
    return proto.prototype && proto.prototype.isReactComponent;
  })();
}
function isExoticComponent(component) {
  return typeof component === "object" && typeof component.$$typeof === "symbol" && ["react.memo", "react.forward_ref"].includes(component.$$typeof.description);
}
function useReactTable(options) {
  const resolvedOptions = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...options
  };
  const [tableRef] = t.useState(() => ({
    current: createTable(resolvedOptions)
  }));
  const [state, setState] = t.useState(() => tableRef.current.initialState);
  tableRef.current.setOptions((prev) => ({
    ...prev,
    ...options,
    state: {
      ...state,
      ...options.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (updater) => {
      setState(updater);
      options.onStateChange == null || options.onStateChange(updater);
    }
  }));
  return tableRef.current;
}
var tableVariants = cva(
  "w-full caption-bottom text-sm",
  {
    variants: {
      variant: {
        default: "dark:text-gray-200",
        bordered: "border border-border dark:border-gray-700",
        striped: "dark:text-gray-200",
        card: "border border-border dark:border-gray-700 rounded-md shadow-sm dark:shadow-gray-900/20",
        minimal: "border-none dark:text-gray-200"
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Table = t.forwardRef(({
  className,
  variant,
  size,
  loading,
  emptyContent,
  // Kullanılmayan özellikleri yoruma alarak lint uyarılarını önlüyoruz
  // sortColumn,
  // sortDirection,
  // onSortChange,
  // selectedRowIds,
  // onRowSelectionChange,
  // disableRowSelection,
  // getRowId,
  ...props
}, ref) => {
  const striped = variant === "striped";
  const childrenWithProps = t.Children.map(props.children, (child) => {
    if (t.isValidElement(child)) {
      if (child.type === "tbody") {
        const tbodyProps = child.props;
        return t.cloneElement(child, {
          className: cn(tbodyProps.className, striped && "even:[&>tr]:bg-muted/50")
        });
      }
    }
    return child;
  });
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full overflow-auto", children: [
    loading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }),
    /* @__PURE__ */ jsx(
      "table",
      {
        ref,
        className: cn(
          tableVariants({ variant, size }),
          loading && "opacity-70",
          className
        ),
        ...props,
        children: childrenWithProps
      }
    )
  ] });
});
Table.displayName = "Table";
var TableHeader = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("moonui-theme", "[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = t.forwardRef(({ className, emptyContent, emptyMessage = "No data available", children, ...props }, ref) => {
  const hasChildren = t.Children.count(children) > 0;
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      ref,
      className: cn("moonui-theme", "[&_tr:last-child]:border-0", className),
      ...props,
      children: hasChildren ? children : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 100, className: "h-24 text-center", children: emptyContent || /* @__PURE__ */ jsx("div", { className: "py-6 text-muted-foreground", children: /* @__PURE__ */ jsx("div", { className: "text-sm", children: emptyMessage }) }) }) })
    }
  );
});
TableBody.displayName = "TableBody";
var TableFooter = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn("moonui-theme", "bg-primary text-primary-foreground font-medium", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
var TableHead = t.forwardRef(
  ({ className, sortable, sorted, onSort, align = "left", children, ...props }, ref) => {
    const renderSortIcon = () => {
      if (!sortable)
        return null;
      if (sorted === "asc") {
        return /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "ml-1 h-4 w-4 inline-block",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                clipRule: "evenodd"
              }
            )
          }
        );
      }
      if (sorted === "desc") {
        return /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "ml-1 h-4 w-4 inline-block",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                clipRule: "evenodd"
              }
            )
          }
        );
      }
      return /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "ml-1 h-4 w-4 inline-block opacity-30",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
              clipRule: "evenodd"
            }
          )
        }
      );
    };
    const alignmentClasses = {
      left: "text-left justify-start",
      center: "text-center justify-center",
      right: "text-right justify-end"
    };
    return /* @__PURE__ */ jsx(
      "th",
      {
        ref,
        className: cn(
          "h-10 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
          alignmentClasses[align].split(" ")[0],
          // text alignment
          sortable && "cursor-pointer hover:text-foreground select-none",
          className
        ),
        onClick: sortable ? onSort : void 0,
        ...props,
        children: sortable || align !== "left" ? /* @__PURE__ */ jsxs("div", { className: cn("flex items-center", alignmentClasses[align].split(" ")[1]), children: [
          children,
          sortable && renderSortIcon()
        ] }) : children
      }
    );
  }
);
TableHead.displayName = "TableHead";
var TableCell = t.forwardRef(({ className, align = "left", ...props }, ref) => {
  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  }[align];
  return /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      className: cn("moonui-theme", "p-4 align-middle [&:has([role=checkbox])]:pr-0", alignmentClass, className),
      ...props
    }
  );
});
TableCell.displayName = "TableCell";
var TableCaption = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("moonui-theme", "mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function DataTableBasic({
  columns,
  data,
  enableSorting = true,
  enablePagination = true,
  enableSearch = true,
  pageSize = 10,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className
}) {
  const [sorting, setSorting] = t.useState([]);
  const [globalFilter, setGlobalFilter] = t.useState("");
  const table = useReactTable({
    data,
    columns,
    onSortingChange: enableSorting ? setSorting : void 0,
    onGlobalFilterChange: enableSearch ? setGlobalFilter : void 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : void 0,
    getSortedRowModel: enableSorting ? getSortedRowModel() : void 0,
    getFilteredRowModel: enableSearch ? getFilteredRowModel() : void 0,
    state: {
      sorting,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize
      }
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-4", className), children: [
    enableSearch && /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-sm", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: searchPlaceholder,
          value: globalFilter,
          onChange: (event) => setGlobalFilter(event.target.value),
          className: "pl-8"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
        return /* @__PURE__ */ jsx(TableHead, { children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "flex items-center gap-2",
              header.column.getCanSort() && "cursor-pointer select-none"
            ),
            onClick: header.column.getToggleSortingHandler(),
            children: [
              flexRender(
                header.column.columnDef.header,
                header.getContext()
              ),
              enableSorting && header.column.getCanSort() && /* @__PURE__ */ jsx("div", { className: "ml-auto", children: header.column.getIsSorted() === "desc" ? /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }) : header.column.getIsSorted() === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowUpDown, { className: "h-4 w-4 opacity-50" }) })
            ]
          }
        ) }, header.id);
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: emptyMessage
        }
      ) }) })
    ] }) }),
    enablePagination && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm text-muted-foreground", children: [
        table.getFilteredRowModel().rows.length,
        " row(s)"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-x-2", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            children: [
              /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
              "Previous"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
          "Page ",
          table.getState().pagination.pageIndex + 1,
          " of",
          " ",
          table.getPageCount()
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            children: [
              "Next",
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
function createSortableHeader(label) {
  return ({ column }) => /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "ghost",
      className: "-ml-3 h-8 data-[state=open]:bg-accent",
      onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      children: [
        label,
        column.getIsSorted() === "desc" ? /* @__PURE__ */ jsx(ArrowDown, { className: "ml-2 h-4 w-4" }) : column.getIsSorted() === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "ml-2 h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
      ]
    }
  );
}
var pageTransitions2 = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};
var datePickerVariants = cva(
  "w-full justify-start text-left font-normal",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
        ghost: "hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10"
      },
      state: {
        default: "",
        error: "border-destructive focus:ring-destructive",
        success: "border-success focus:ring-success",
        warning: "border-warning focus:ring-warning"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default"
    }
  }
);
function DatePicker({
  className,
  variant,
  size,
  state,
  value,
  onChange,
  placeholder = "Pick a date",
  formatString = "PPP",
  minDate,
  maxDate,
  disabledDates,
  disabledDaysOfWeek,
  showWeekNumbers,
  iconPosition = "left",
  icon,
  allowClear = true,
  readOnly = false,
  showTodayButton = true,
  calendarProps,
  disabled,
  ...props
}) {
  const [open, setOpen] = t.useState(false);
  const [internalDate, setInternalDate] = t.useState(value);
  t.useEffect(() => {
    setInternalDate(value);
  }, [value]);
  const handleSelect = (date) => {
    const singleDate = Array.isArray(date) ? date[0] : date && typeof date === "object" && "from" in date ? date.from : date;
    setInternalDate(singleDate);
    onChange?.(singleDate);
    if (singleDate) {
      setOpen(false);
    }
  };
  const handleClear = (e) => {
    e.stopPropagation();
    handleSelect(void 0);
  };
  const handleToday = () => {
    const today = /* @__PURE__ */ new Date();
    handleSelect(today);
  };
  const isDateDisabled = (date) => {
    if (minDate && date < minDate)
      return true;
    if (maxDate && date > maxDate)
      return true;
    if (disabledDates?.some((d) => d.toDateString() === date.toDateString()))
      return true;
    if (disabledDaysOfWeek?.includes(date.getDay()))
      return true;
    return false;
  };
  const displayValue = internalDate && isValid(internalDate) ? format(internalDate, formatString) : null;
  const iconElement = icon || /* @__PURE__ */ jsx(Calendar$1, { className: "h-4 w-4" });
  return /* @__PURE__ */ jsx("div", { className: "moonui-theme", children: /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: variant === "ghost" ? "ghost" : "outline",
        className: cn(
          datePickerVariants({ variant, size, state }),
          !displayValue && "text-muted-foreground",
          className
        ),
        disabled: disabled || readOnly,
        ...props,
        children: [
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -2 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 2 },
              transition: { duration: 0.15 },
              className: "flex items-center gap-2 flex-1",
              children: [
                iconPosition === "left" && iconElement,
                /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: displayValue || placeholder }),
                iconPosition === "right" && iconElement
              ]
            },
            displayValue || "placeholder"
          ) }),
          allowClear && displayValue && !readOnly && !disabled && /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.8 },
              whileHover: { scale: 1.1 },
              whileTap: { scale: 0.9 },
              className: "ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100 transition-opacity cursor-pointer",
              onClick: handleClear,
              role: "button",
              tabIndex: 0,
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClear(e);
                }
              },
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Clear date" }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    width: "15",
                    height: "15",
                    viewBox: "0 0 15 15",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
                        fill: "currentColor",
                        fillRule: "evenodd",
                        clipRule: "evenodd"
                      }
                    )
                  }
                )
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        className: "w-[360px] p-0 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-background/95 backdrop-blur-sm !z-[9999]",
        align: "start",
        sideOffset: 12,
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            ...pageTransitions2,
            className: "rounded-2xl bg-background overflow-hidden",
            children: [
              /* @__PURE__ */ jsx(
                Calendar,
                {
                  mode: "single",
                  selected: internalDate,
                  onSelect: handleSelect,
                  disabled: isDateDisabled,
                  showOutsideDays: false,
                  className: cn("rounded-2xl", calendarProps?.className),
                  ...calendarProps
                }
              ),
              showTodayButton && /* @__PURE__ */ jsx("div", { className: "border-t px-4 py-3", children: /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: handleToday,
                  className: "w-full justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                  children: "Today"
                }
              ) })
            ]
          }
        )
      }
    )
  ] }) });
}
function DateRangePicker({
  className,
  value,
  onChange,
  placeholder = "Pick a date range",
  formatString = "LLL dd, y",
  separator = " - ",
  ...props
}) {
  const [open, setOpen] = t.useState(false);
  const [internalRange, setInternalRange] = t.useState(value);
  t.useEffect(() => {
    setInternalRange(value);
  }, [value]);
  const handleSelect = (range) => {
    setInternalRange(range);
    onChange?.(range);
    if (range?.from && range?.to) {
      setOpen(false);
    }
  };
  const displayValue = t.useMemo(() => {
    if (!internalRange?.from)
      return null;
    if (!internalRange?.to) {
      return format(internalRange.from, formatString);
    }
    return `${format(internalRange.from, formatString)}${separator}${format(
      internalRange.to,
      formatString
    )}`;
  }, [internalRange, formatString, separator]);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: props.variant === "ghost" ? "ghost" : "outline",
        className: cn(
          datePickerVariants({
            variant: props.variant,
            size: props.size,
            state: props.state
          }),
          !displayValue && "text-muted-foreground",
          className
        ),
        disabled: props.disabled || props.readOnly,
        children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "flex-1 truncate text-left", children: displayValue || placeholder })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-background/95 backdrop-blur-sm !z-[9999]", align: "start", sideOffset: 12, children: /* @__PURE__ */ jsx(
      Calendar,
      {
        mode: "range",
        defaultMonth: internalRange?.from,
        selected: internalRange,
        onSelect: handleSelect,
        showOutsideDays: false,
        ...props.calendarProps,
        className: "rounded-2xl"
      }
    ) })
  ] });
}
function DateTimePicker({
  value,
  onChange,
  formatString = "PPP p",
  showTimePicker = true,
  timeFormat = "24",
  timeInterval = 15,
  ...props
}) {
  const [date, setDate] = t.useState(value);
  const [time, setTime] = t.useState(
    value ? format(value, timeFormat === "24" ? "HH:mm" : "hh:mm a") : "00:00"
  );
  const handleDateChange = (newDate) => {
    if (!newDate) {
      setDate(void 0);
      onChange?.(void 0);
      return;
    }
    const [hours, minutes] = time.split(":").map(Number);
    newDate.setHours(hours, minutes);
    setDate(newDate);
    onChange?.(newDate);
  };
  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setTime(newTime);
    if (date) {
      const [hours, minutes] = newTime.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes);
      setDate(newDate);
      onChange?.(newDate);
    }
  };
  const timeOptions = t.useMemo(() => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m2 = 0; m2 < 60; m2 += timeInterval) {
        const hour24 = h.toString().padStart(2, "0");
        const minute = m2.toString().padStart(2, "0");
        const time24 = `${hour24}:${minute}`;
        if (timeFormat === "12") {
          const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
          const ampm = h < 12 ? "AM" : "PM";
          const time12 = `${hour12}:${minute} ${ampm}`;
          options.push({ value: time24, label: time12 });
        } else {
          options.push({ value: time24, label: time24 });
        }
      }
    }
    return options;
  }, [timeFormat, timeInterval]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx(
      DatePicker,
      {
        ...props,
        value: date,
        onChange: handleDateChange,
        formatString: "PPP",
        showTodayButton: false
      }
    ),
    showTimePicker && date && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        className: "flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: time,
              onChange: handleTimeChange,
              className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              children: timeOptions.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
            }
          )
        ]
      }
    )
  ] });
}
function MonthPicker({
  value,
  onChange,
  placeholder = "Pick a month",
  formatString = "MMMM yyyy",
  ...props
}) {
  const [open, setOpen] = t.useState(false);
  const [viewDate, setViewDate] = t.useState(value || /* @__PURE__ */ new Date());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(monthIndex);
    onChange?.(newDate);
    setOpen(false);
  };
  const handleYearChange = (increment) => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(newDate.getFullYear() + increment);
    setViewDate(newDate);
  };
  const displayValue = value ? format(value, formatString) : null;
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: props.variant === "default" ? "outline" : props.variant || "outline",
        className: cn(
          datePickerVariants({
            variant: props.variant,
            size: props.size,
            state: props.state
          }),
          !displayValue && "text-muted-foreground",
          props.className
        ),
        disabled: props.disabled || props.readOnly,
        children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "mr-2 h-4 w-4" }),
          displayValue || placeholder
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-64 p-0 shadow-2xl border border-gray-200 dark:border-gray-700 bg-background !z-[9999]", align: "start", children: /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            onClick: () => handleYearChange(-1),
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: viewDate.getFullYear() }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            onClick: () => handleYearChange(1),
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: months.map((month, index) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: value && value.getMonth() === index ? "primary" : "outline",
          size: "sm",
          onClick: () => handleMonthSelect(index),
          className: "h-8 text-xs",
          children: month.slice(0, 3)
        },
        month
      )) })
    ] }) })
  ] });
}
function DraggableList({
  items,
  onReorder,
  renderItem,
  keyExtractor,
  className,
  disabled = false
}) {
  const [draggedIndex, setDraggedIndex] = t.useState(null);
  const handleDragStart = (e, index) => {
    if (disabled)
      return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (disabled || draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    onReorder(newItems);
    setDraggedIndex(null);
  };
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  return /* @__PURE__ */ jsx("div", { className: cn("moonui-theme", "space-y-2", className), children: items.map((item, index) => /* @__PURE__ */ jsx(
    "div",
    {
      draggable: !disabled,
      onDragStart: (e) => handleDragStart(e, index),
      onDragOver: handleDragOver,
      onDrop: (e) => handleDrop(e, index),
      onDragEnd: handleDragEnd,
      className: cn(
        "transition-opacity duration-200",
        !disabled && "cursor-move hover:opacity-80",
        draggedIndex === index && "opacity-50",
        disabled && "cursor-not-allowed"
      ),
      children: renderItem(item, index)
    },
    keyExtractor(item)
  )) });
}
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuSubTrigger = t.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = t.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = t.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = t.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = t.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = t.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("moonui-theme", "-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("moonui-theme", "ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var progressVariants = cva(
  "relative overflow-hidden bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/20",
        secondary: "bg-secondary/20",
        success: "bg-success/20",
        warning: "bg-warning/20",
        error: "bg-error/20"
      },
      size: {
        xs: "h-1",
        sm: "h-1.5",
        default: "h-2",
        md: "h-2.5",
        lg: "h-3",
        xl: "h-4"
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
      },
      animation: {
        default: "[&>div]:transition-all [&>div]:duration-500",
        smooth: "[&>div]:transition-all [&>div]:duration-700",
        fast: "[&>div]:transition-all [&>div]:duration-300",
        none: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "full",
      animation: "default"
    }
  }
);
var progressIndicatorVariants = cva(
  "h-full w-full flex-1",
  {
    variants: {
      variant: {
        default: "bg-foreground",
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error"
      },
      animation: {
        default: "transition-all duration-500",
        smooth: "transition-all duration-700",
        fast: "transition-all duration-300",
        none: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      animation: "default"
    }
  }
);
var Progress = t.forwardRef(({
  className,
  value = 0,
  variant,
  size,
  radius,
  animation,
  indicatorVariant,
  showValueLabel = false,
  valueLabel,
  labelClassName,
  indeterminate = false,
  max: max2 = 100,
  ...props
}, ref) => {
  const normalizedValue = Math.max(0, Math.min(value, max2));
  const percentage = max2 > 0 ? normalizedValue / max2 * 100 : 0;
  const label = valueLabel || `${Math.round(percentage)}%`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    showValueLabel && /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-1", children: /* @__PURE__ */ jsx(
      "span",
      {
        className: cn(
          "text-sm font-medium text-muted-foreground",
          labelClassName
        ),
        children: label
      }
    ) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("moonui-theme", progressVariants({ variant, size, radius, animation }), className),
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": max2,
        "aria-valuenow": indeterminate ? void 0 : normalizedValue,
        ...props,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              progressIndicatorVariants({ variant: indicatorVariant || "primary", animation }),
              indeterminate && "animate-indeterminate-progress"
            ),
            style: indeterminate ? {} : { transform: `translateX(-${100 - percentage}%)` }
          }
        )
      }
    )
  ] });
});
Progress.displayName = "Progress";
var getFileIcon = (type) => {
  if (type.startsWith("image/"))
    return /* @__PURE__ */ jsx(Image, { className: "h-4 w-4" });
  if (type.startsWith("video/"))
    return /* @__PURE__ */ jsx(Video, { className: "h-4 w-4" });
  if (type.startsWith("audio/"))
    return /* @__PURE__ */ jsx(Music, { className: "h-4 w-4" });
  if (type.includes("text") || type.includes("document"))
    return /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" });
  return /* @__PURE__ */ jsx(File, { className: "h-4 w-4" });
};
var formatFileSize = (bytes) => {
  if (bytes === 0)
    return "0 Bytes";
  const k3 = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k3));
  return parseFloat((bytes / Math.pow(k3, i)).toFixed(2)) + " " + sizes[i];
};
var FileItem = ({
  uploadedFile,
  onRemove
}) => {
  const { id, file, progress, status, preview } = uploadedFile;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      className: "flex items-center space-x-3 p-3 border rounded-lg bg-background",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: preview ? /* @__PURE__ */ jsx(
          "img",
          {
            src: preview,
            alt: file.name,
            className: "h-10 w-10 object-cover rounded"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded bg-muted flex items-center justify-center", children: getFileIcon(file.type) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium truncate", children: file.name }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-6 w-6 p-0",
                onClick: () => onRemove(id),
                children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mt-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatFileSize(file.size) }),
            status === "uploading" && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "h-5", children: [
              /* @__PURE__ */ jsx(Loader2, { className: "h-3 w-3 mr-1 animate-spin" }),
              "Uploading"
            ] }),
            status === "success" && /* @__PURE__ */ jsxs(Badge, { variant: "success", className: "h-5", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-3 w-3 mr-1" }),
              "Done"
            ] }),
            status === "error" && /* @__PURE__ */ jsxs(Badge, { variant: "destructive", className: "h-5", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "h-3 w-3 mr-1" }),
              "Error"
            ] })
          ] }),
          status === "uploading" && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(Progress, { value: progress, className: "h-1" }) })
        ] })
      ]
    }
  );
};
var FileUpload = t__default.forwardRef(
  ({
    accept = "*",
    multiple = true,
    maxSize = 10 * 1024 * 1024,
    // 10MB
    maxFiles = 5,
    disabled = false,
    className,
    onUpload,
    onRemove,
    children,
    ...props
  }, ref) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState(null);
    const validateFile = (file) => {
      if (file.size > maxSize) {
        return `File size exceeds ${formatFileSize(maxSize)}`;
      }
      if (accept !== "*" && !accept.split(",").some((type) => {
        const cleanType = type.trim();
        if (cleanType.includes("*")) {
          return file.type.startsWith(cleanType.replace("*", ""));
        }
        return file.type === cleanType;
      })) {
        return `File type not supported`;
      }
      return null;
    };
    const processFiles = useCallback(async (files) => {
      const fileArray = Array.from(files);
      setError(null);
      if (uploadedFiles.length + fileArray.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }
      const validFiles = [];
      const errors = [];
      fileArray.forEach((file) => {
        const validationError = validateFile(file);
        if (validationError) {
          errors.push(`${file.name}: ${validationError}`);
        } else {
          validFiles.push(file);
        }
      });
      if (errors.length > 0) {
        setError(errors.join(", "));
        return;
      }
      const newUploadedFiles = validFiles.map((file, index) => ({
        id: `${Date.now()}-${index}-${file.name.replace(/[^a-zA-Z0-9]/g, "")}`,
        file,
        progress: 0,
        status: "uploading",
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : void 0
      }));
      setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
      for (const uploadedFile of newUploadedFiles) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 15 + uploadedFile.file.size % 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setUploadedFiles(
              (prev) => prev.map(
                (f) => f.id === uploadedFile.id ? { ...f, progress: 100, status: "success" } : f
              )
            );
          } else {
            setUploadedFiles(
              (prev) => prev.map(
                (f) => f.id === uploadedFile.id ? { ...f, progress } : f
              )
            );
          }
        }, 200);
      }
      if (onUpload) {
        try {
          await onUpload(validFiles);
        } catch (error2) {
          console.error("Upload failed:", error2);
          setUploadedFiles(
            (prev) => prev.map(
              (f) => newUploadedFiles.some((nf) => nf.id === f.id) ? { ...f, status: "error" } : f
            )
          );
        }
      }
    }, [uploadedFiles.length, maxFiles, maxSize, accept, onUpload]);
    const handleDrop = useCallback((e) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled)
        return;
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFiles(files);
      }
    }, [processFiles, disabled]);
    const handleDragOver = useCallback((e) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragOver(true);
      }
    }, [disabled]);
    const handleDragLeave = useCallback((e) => {
      e.preventDefault();
      setIsDragOver(false);
    }, []);
    const handleFileSelect = useCallback((e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
      e.target.value = "";
    }, [processFiles]);
    const removeFile = useCallback((fileId) => {
      setUploadedFiles((prev) => {
        const fileToRemove = prev.find((f) => f.id === fileId);
        if (fileToRemove?.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        return prev.filter((f) => f.id !== fileId);
      });
      if (onRemove) {
        onRemove(fileId);
      }
    }, [onRemove]);
    return /* @__PURE__ */ jsxs("div", { ref, className: cn("moonui-theme", "space-y-4", className), ...props, children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragOver && "border-primary bg-primary/5",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled && "hover:border-primary/50 cursor-pointer"
          ),
          onDrop: handleDrop,
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          animate: {
            scale: isDragOver ? 1.02 : 1,
            borderColor: isDragOver ? "hsl(var(--primary))" : "hsl(var(--border))"
          },
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept,
                multiple,
                disabled,
                onChange: handleFileSelect,
                className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              }
            ),
            children || /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "mx-auto h-12 w-12 text-muted-foreground", children: /* @__PURE__ */ jsx(Upload, { className: "h-full w-full" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: isDragOver ? "Drop files here" : "Upload files" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Drag & drop files here, or click to select" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
                  "Max ",
                  maxFiles,
                  " files, ",
                  formatFileSize(maxSize),
                  " each"
                ] })
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", disabled, children: "Select Files" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { children: error && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          className: "flex items-center space-x-2 text-sm text-destructive",
          children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: error })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: uploadedFiles.length > 0 && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 },
          className: "space-y-2",
          children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-sm font-medium", children: [
              "Uploaded Files (",
              uploadedFiles.length,
              ")"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx(AnimatePresence, { children: uploadedFiles.map((uploadedFile) => /* @__PURE__ */ jsx(
              FileItem,
              {
                uploadedFile,
                onRemove: removeFile
              },
              uploadedFile.id
            )) }) })
          ]
        }
      ) })
    ] });
  }
);
FileUpload.displayName = "FileUpload";
var GestureDrawer = t__default.forwardRef(
  ({
    children,
    isOpen,
    onOpenChange,
    direction = "up",
    threshold = 50,
    className,
    overlayClassName,
    enableSwipeToClose = true,
    ...props
  }, ref) => {
    const y = useMotionValue(0);
    const x = useMotionValue(0);
    const isVertical = direction === "up" || direction === "down";
    const motionValue = isVertical ? y : x;
    const opacity = useTransform(motionValue, [0, threshold], [1, 0.5]);
    const handleDragEnd = (event, info) => {
      if (!enableSwipeToClose)
        return;
      const offset = isVertical ? info.offset.y : info.offset.x;
      const velocity = isVertical ? info.velocity.y : info.velocity.x;
      let shouldClose = false;
      switch (direction) {
        case "up":
          shouldClose = offset > threshold || velocity > 500;
          break;
        case "down":
          shouldClose = offset < -threshold || velocity < -500;
          break;
        case "left":
          shouldClose = offset > threshold || velocity > 500;
          break;
        case "right":
          shouldClose = offset < -threshold || velocity < -500;
          break;
      }
      if (shouldClose) {
        onOpenChange(false);
      } else {
        animate(motionValue, 0, { type: "spring", stiffness: 300, damping: 20 });
      }
    };
    const getInitialPosition = () => {
      switch (direction) {
        case "up":
          return { y: "100%" };
        case "down":
          return { y: "-100%" };
        case "left":
          return { x: "100%" };
        case "right":
          return { x: "-100%" };
        default:
          return { y: "100%" };
      }
    };
    const getAnimatePosition = () => {
      return isVertical ? { y: 0 } : { x: 0 };
    };
    if (!isOpen)
      return null;
    return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => onOpenChange(false),
          className: cn("absolute inset-0 bg-black/50", overlayClassName)
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          ref,
          drag: enableSwipeToClose ? isVertical ? "y" : "x" : false,
          dragConstraints: {
            top: direction === "up" ? 0 : void 0,
            bottom: direction === "down" ? 0 : void 0,
            left: direction === "left" ? 0 : void 0,
            right: direction === "right" ? 0 : void 0
          },
          dragElastic: 0.2,
          onDragEnd: handleDragEnd,
          style: {
            [isVertical ? "y" : "x"]: motionValue,
            opacity
          },
          initial: getInitialPosition(),
          animate: getAnimatePosition(),
          exit: getInitialPosition(),
          transition: { type: "spring", damping: 30, stiffness: 300 },
          className: cn(
            "absolute bg-background border shadow-lg",
            {
              "bottom-0 left-0 right-0 rounded-t-lg": direction === "up",
              "top-0 left-0 right-0 rounded-b-lg": direction === "down",
              "top-0 bottom-0 right-0 rounded-l-lg": direction === "left",
              "top-0 bottom-0 left-0 rounded-r-lg": direction === "right"
            },
            className
          ),
          ...props,
          children: [
            (direction === "up" || direction === "down") && /* @__PURE__ */ jsx("div", { className: "flex justify-center p-2", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-1 bg-muted rounded-full" }) }),
            children
          ]
        }
      )
    ] });
  }
);
GestureDrawer.displayName = "GestureDrawer";
function GitHubStars({
  className,
  size = "md",
  showForks = true,
  showWatchers = false,
  repoUrl = "https://github.com/moonui/moonui"
}) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/github-stars");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        setStats({
          stars: 1240,
          forks: 89,
          watchers: 156,
          isLive: false
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);
  const formatNumber = (num) => {
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "k";
    }
    return num.toString();
  };
  const sizeClasses = {
    sm: "text-sm gap-2",
    md: "text-base gap-3",
    lg: "text-lg gap-4"
  };
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center animate-pulse", sizeClasses[size], className), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded" }),
        /* @__PURE__ */ jsx("div", { className: "w-8 h-4 bg-gray-300 dark:bg-gray-700 rounded" })
      ] }),
      showForks && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded" }),
        /* @__PURE__ */ jsx("div", { className: "w-6 h-4 bg-gray-300 dark:bg-gray-700 rounded" })
      ] })
    ] });
  }
  if (!stats) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center", sizeClasses[size], className), children: [
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: repoUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors",
        children: [
          /* @__PURE__ */ jsx(Star, { className: "fill-current text-yellow-500", size: iconSizes[size] }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatNumber(stats.stars) })
        ]
      }
    ),
    showForks && /* @__PURE__ */ jsxs(
      "a",
      {
        href: `${repoUrl}/network/members`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors",
        children: [
          /* @__PURE__ */ jsx(GitFork, { size: iconSizes[size] }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatNumber(stats.forks) })
        ]
      }
    ),
    showWatchers && /* @__PURE__ */ jsxs(
      "a",
      {
        href: `${repoUrl}/watchers`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors",
        children: [
          /* @__PURE__ */ jsx(Eye, { size: iconSizes[size] }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatNumber(stats.watchers) })
        ]
      }
    ),
    !stats.isLive && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 dark:text-gray-500 ml-2", children: "(demo)" })
  ] });
}
function GitHubStarButton({
  className,
  size = "md",
  repoUrl = "https://github.com/moonui/moonui"
}) {
  const [stars, setStars] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/github-stars");
        const data = await response.json();
        setStars(data.stars);
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        setStars(1240);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);
  const formatNumber = (num) => {
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "k";
    }
    return num.toString();
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      size,
      className: cn("moonui-theme", "group", className),
      asChild: true,
      children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: repoUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx(Star, { className: "fill-current text-yellow-500 group-hover:scale-110 transition-transform", size: 16 }),
            /* @__PURE__ */ jsx("span", { children: "Star on GitHub" }),
            !isLoading && stars && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium", children: formatNumber(stars) }),
            /* @__PURE__ */ jsx(ExternalLink, { size: 14, className: "opacity-50 group-hover:opacity-100 transition-opacity" })
          ]
        }
      )
    }
  );
}
function LockedComponent({
  children,
  componentName,
  className,
  showPreview = true,
  previewDuration = 2e3
}) {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [previewTimeout, setPreviewTimeout] = useState(null);
  const handleMouseEnter = () => {
    if (!showPreview)
      return;
    setIsPreviewActive(true);
    if (previewTimeout) {
      clearTimeout(previewTimeout);
    }
    const timeout = setTimeout(() => {
      setIsPreviewActive(false);
    }, previewDuration);
    setPreviewTimeout(timeout);
  };
  const handleMouseLeave = () => {
    if (previewTimeout) {
      clearTimeout(previewTimeout);
      setPreviewTimeout(null);
    }
    setIsPreviewActive(false);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative group cursor-pointer transition-all duration-300",
        className
      ),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "transition-all duration-300",
              !isPreviewActive && "blur-sm grayscale-[0.3] opacity-60"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10",
              "border-2 border-dashed border-amber-400/30 rounded-lg",
              "flex items-center justify-center",
              "transition-all duration-300",
              isPreviewActive ? "opacity-0" : "opacity-100"
            ),
            children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-3 p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1",
                  children: [
                    /* @__PURE__ */ jsx(Crown, { className: "w-3 h-3 mr-1" }),
                    "PRO ONLY"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "p-3 rounded-full bg-amber-100 dark:bg-amber-900/30", children: /* @__PURE__ */ jsx(Lock, { className: "w-6 h-6 text-amber-600 dark:text-amber-400" }) }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-gray-100", children: componentName }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 max-w-xs", children: "This premium component is available with Pro subscription" }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  className: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0",
                  onClick: () => {
                    if (typeof window !== "undefined") {
                      window.location.href = "/pricing";
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 mr-2" }),
                    "Upgrade to Pro"
                  ]
                }
              )
            ] })
          }
        ),
        showPreview && !isPreviewActive && /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: /* @__PURE__ */ jsx("div", { className: "bg-black/80 text-white text-xs px-2 py-1 rounded", children: "Hover to preview" }) })
      ]
    }
  );
}
function ProComponentWrapper({
  children,
  componentId,
  componentName,
  className,
  fallback,
  requireCLI = true
}) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    deviceValid: false,
    hasProAccess: false,
    loading: true
  });
  useEffect(() => {
    const isDevelopment2 = () => {
      const checks = {
        nodeEnv: process.env.NODE_ENV === "development",
        nextPublicEnv: process.env.NEXT_PUBLIC_VERCEL_ENV === "development",
        localhost: typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.includes(".local")),
        port: typeof window !== "undefined" && (window.location.port === "3000" || window.location.port === "3001" || window.location.port === "8080"),
        vercelEnv: !process.env.VERCEL,
        ciEnv: !process.env.CI,
        deploymentEnv: !process.env.DEPLOYMENT_ENV
      };
      if (process.env.VERCEL || process.env.NETLIFY || process.env.RENDER || process.env.RAILWAY_ENVIRONMENT || process.env.FLY_APP_NAME || process.env.DEPLOYMENT_ENV === "production") {
        return false;
      }
      return checks.nodeEnv && checks.localhost && !checks.vercelEnv && !checks.ciEnv;
    };
    if (!isDevelopment2() || !requireCLI) {
      setAuthState({
        isAuthenticated: true,
        deviceValid: true,
        hasProAccess: true,
        loading: false
      });
      return;
    }
    async function checkAuth() {
      try {
        const cliToken = localStorage.getItem("moonui_cli_token");
        const deviceId = localStorage.getItem("moonui_device_id");
        if (!cliToken || !deviceId) {
          setAuthState({
            isAuthenticated: false,
            deviceValid: false,
            hasProAccess: false,
            loading: false
          });
          return;
        }
        const response = await fetch("/api/device/validate", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${cliToken}`,
            "X-Device-ID": deviceId,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            environment: {
              nodeEnv: process.env.NODE_ENV,
              hostname: window.location.hostname,
              port: window.location.port,
              protocol: window.location.protocol
            }
          })
        });
        if (response.ok) {
          const data = await response.json();
          setAuthState({
            isAuthenticated: true,
            deviceValid: data.valid,
            hasProAccess: data.hasProAccess,
            loading: false
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            deviceValid: false,
            hasProAccess: false,
            loading: false
          });
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          deviceValid: false,
          hasProAccess: false,
          loading: false
        });
      }
    }
    checkAuth();
  }, [requireCLI]);
  if (authState.loading) {
    return /* @__PURE__ */ jsx("div", { className: cn("animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg h-32", className), children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: "Loading..." }) }) });
  }
  const isDevelopment = () => {
    const checks = {
      nodeEnv: process.env.NODE_ENV === "development",
      localhost: typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.includes(".local")),
      port: typeof window !== "undefined" && (window.location.port === "3000" || window.location.port === "3001" || window.location.port === "8080")
    };
    if (process.env.VERCEL || process.env.NETLIFY || process.env.RENDER || process.env.RAILWAY_ENVIRONMENT || process.env.FLY_APP_NAME) {
      return false;
    }
    return checks.nodeEnv && checks.localhost;
  };
  if (isDevelopment() && requireCLI) {
    if (!authState.isAuthenticated) {
      return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
        /* @__PURE__ */ jsx("div", { className: "blur-sm grayscale-[0.3] opacity-60 pointer-events-none", children: fallback || children }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10 border-2 border-dashed border-red-400/30 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-3 p-6", children: [
          /* @__PURE__ */ jsxs(Badge, { variant: "destructive", className: "mb-2", children: [
            /* @__PURE__ */ jsx(Lock, { className: "w-3 h-3 mr-1" }),
            "CLI AUTH REQUIRED"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-gray-100", children: "CLI Authentication Required" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 max-w-xs", children: "Run the following command to authenticate:" }),
          /* @__PURE__ */ jsx("code", { className: "block bg-black/80 text-green-400 p-2 rounded text-xs", children: "npx moonui auth login" })
        ] }) })
      ] });
    }
    if (!authState.deviceValid) {
      return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
        /* @__PURE__ */ jsx("div", { className: "blur-sm grayscale-[0.3] opacity-60 pointer-events-none", children: fallback || children }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10 border-2 border-dashed border-yellow-400/30 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-3 p-6", children: [
          /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "bg-yellow-500 text-white mb-2", children: [
            /* @__PURE__ */ jsx(Zap, { className: "w-3 h-3 mr-1" }),
            "DEVICE LIMIT"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-gray-100", children: "Device Limit Exceeded" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 max-w-xs", children: "This device is not registered or you've reached your device limit" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              className: "bg-gradient-to-r from-yellow-500 to-orange-500",
              onClick: () => window.open("/dashboard/devices", "_blank"),
              children: "Manage Devices"
            }
          )
        ] }) })
      ] });
    }
    if (!authState.hasProAccess) {
      return /* @__PURE__ */ jsx(
        LockedComponent,
        {
          componentName: componentName || componentId,
          className,
          children: fallback || children
        }
      );
    }
  }
  return /* @__PURE__ */ jsx("div", { className, children });
}
function ProBadge({ className }) {
  return /* @__PURE__ */ jsxs(
    Badge,
    {
      variant: "secondary",
      className: cn(
        "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(Crown, { className: "w-3 h-3 mr-1" }),
        "PRO"
      ]
    }
  );
}
function FreeBadge({ className }) {
  return /* @__PURE__ */ jsx(
    Badge,
    {
      variant: "outline",
      className: cn("border-green-500 text-green-600 dark:text-green-400 text-xs", className),
      children: "FREE"
    }
  );
}
function MoonLogo({
  className,
  variant = "default",
  showText = true,
  ...props
}) {
  const logoId = t.useId();
  const gradientId = `moon-gradient-${logoId}`;
  const maskId = `moon-mask-${logoId}`;
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsxs(
      "svg",
      {
        width: "32",
        height: "32",
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: "flex-shrink-0",
        ...props,
        children: [
          /* @__PURE__ */ jsxs("defs", { children: [
            variant === "gradient" && /* @__PURE__ */ jsxs("linearGradient", { id: gradientId, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#3B82F6" }),
              /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#8B5CF6" }),
              /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#EC4899" })
            ] }),
            /* @__PURE__ */ jsxs("mask", { id: maskId, children: [
              /* @__PURE__ */ jsx("rect", { width: "32", height: "32", fill: "white" }),
              /* @__PURE__ */ jsx("circle", { cx: "22", cy: "10", r: "10", fill: "black" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "16",
              cy: "16",
              r: "14",
              fill: variant === "gradient" ? `url(#${gradientId})` : "currentColor",
              className: variant === "default" ? "fill-primary" : "",
              mask: `url(#${maskId})`
            }
          )
        ]
      }
    ),
    showText && /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold", children: [
      /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "Moon" }),
      /* @__PURE__ */ jsx("span", { className: "text-primary", children: "UI" })
    ] })
  ] });
}
function MoonLogoIcon({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(MoonLogo, { showText: false, className, variant, ...props });
}
function MoonLogoAnimated({
  className,
  variant = "default",
  showText = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    MoonLogo,
    {
      className: cn(
        "transition-all duration-300 hover:scale-105",
        className
      ),
      variant,
      showText,
      ...props
    }
  );
}
var Pagination = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("moonui-theme", "mx-auto flex w-full justify-center", className),
    ...props
  }
);
Pagination.displayName = "Pagination";
var PaginationContent = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ul",
  {
    ref,
    className: cn("moonui-theme", "flex flex-row items-center gap-1", className),
    ...props
  }
));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, className: cn("moonui-theme", "", className), ...props }));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => /* @__PURE__ */ jsx(
  "a",
  {
    "aria-current": isActive ? "page" : void 0,
    className: cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size
      }),
      className
    ),
    ...props
  }
);
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs(
  PaginationLink,
  {
    "aria-label": "Go to previous page",
    size: "md",
    className: cn("moonui-theme", "gap-1 pl-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { children: "Previous" })
    ]
  }
);
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs(
  PaginationLink,
  {
    "aria-label": "Go to next page",
    size: "md",
    className: cn("moonui-theme", "gap-1 pr-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { children: "Next" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
    ]
  }
);
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs(
  "span",
  {
    "aria-hidden": true,
    className: cn("moonui-theme", "flex h-9 w-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
    ]
  }
);
PaginationEllipsis.displayName = "PaginationEllipsis";
var Select = SelectPrimitive.Root;
Select.displayName = "Select";
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = t.forwardRef(({ className, children, variant = "standard", size = "md", error, success, loading, leftIcon, rightIcon, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      /* Base styles */
      "flex w-full items-center justify-between gap-1 rounded-md transition-all duration-200",
      "disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      "focus-visible:outline-none",
      /* Error state */
      error && "border-error focus-visible:ring-error/30 focus-visible:border-error",
      /* Success state */
      success && "border-success focus-visible:ring-success/30 focus-visible:border-success",
      /* Size variants */
      size === "sm" && "h-8 text-xs px-2",
      size === "md" && "h-10 text-sm px-3",
      size === "lg" && "h-12 text-base px-4",
      /* Visual variants */
      variant === "standard" && "border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-800/80 dark:shadow-inner dark:shadow-gray-950/10 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-600 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/20 focus-visible:border-primary dark:focus-visible:border-primary/80",
      variant === "outline" && "border border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-600 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/20 focus-visible:border-primary dark:focus-visible:border-primary/80",
      variant === "ghost" && "border-none bg-gray-100 dark:bg-gray-800 dark:shadow-inner dark:shadow-gray-950/10 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/20",
      variant === "underline" && "border-t-0 border-l-0 border-r-0 border-b border-gray-300 dark:border-gray-600 rounded-none px-0 dark:text-gray-200 dark:bg-transparent hover:border-gray-400 dark:hover:border-gray-500 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary dark:focus-visible:border-primary/80",
      className
    ),
    ...props,
    disabled: props.disabled || loading,
    "data-error": error ? true : void 0,
    "data-success": success ? true : void 0,
    "data-loading": loading ? true : void 0,
    children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-1 gap-2", children: [
        leftIcon && /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center text-gray-500 dark:text-gray-400", children: leftIcon }),
        loading ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin text-muted-foreground dark:text-gray-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground dark:text-gray-400", children: "Loading..." })
        ] }) : children
      ] }),
      !loading && /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: rightIcon ? /* @__PURE__ */ jsx("span", { className: "opacity-60", children: rightIcon }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-60 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground hover:text-foreground transition-colors",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground hover:text-foreground transition-colors",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = t.forwardRef(({ className, children, position = "popper", side = "bottom", sideOffset = 4, align = "start", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    side,
    sideOffset,
    align,
    avoidCollisions: false,
    className: cn(
      [
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden",
        "rounded-md border border-gray-200 dark:border-gray-700",
        "bg-background dark:bg-gray-800/80 backdrop-blur-sm text-foreground dark:text-gray-200",
        "shadow-lg dark:shadow-gray-900/20",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=open]:duration-150"
      ],
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("moonui-theme", "py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = t.forwardRef(({ className, children, variant = "default", size = "md", rightIcon, customIndicator, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "moonui-theme",
      "relative flex w-full cursor-default select-none items-center rounded-sm outline-none",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "transition-colors duration-150",
      /* Size variants */
      size === "sm" && "py-1 pl-7 pr-2 text-xs",
      size === "md" && "py-1.5 pl-8 pr-2 text-sm",
      size === "lg" && "py-2 pl-9 pr-3 text-base",
      /* Color variants */
      variant === "default" && "focus:bg-accent focus:text-accent-foreground dark:focus:bg-gray-700 dark:focus:text-gray-100",
      variant === "subtle" && "focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-foreground dark:focus:text-gray-200",
      variant === "destructive" && "text-error dark:text-red-400 focus:bg-error/10 dark:focus:bg-red-900/20 focus:text-error dark:focus:text-red-300",
      variant === "success" && "text-success dark:text-green-400 focus:bg-success/10 dark:focus:bg-green-900/20 focus:text-success dark:focus:text-green-300",
      variant === "warning" && "text-warning dark:text-yellow-400 focus:bg-warning/10 dark:focus:bg-yellow-900/20 focus:text-warning dark:focus:text-yellow-300",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: customIndicator || /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children }),
      rightIcon && /* @__PURE__ */ jsx("span", { className: "ml-auto pl-2 opacity-70", children: rightIcon })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("moonui-theme", "-mx-1 my-1 h-px bg-muted dark:bg-gray-700", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
var countryCodes = [
  { code: "+1", country: "US", flag: "\u{1F1FA}\u{1F1F8}", name: "United States" },
  { code: "+44", country: "GB", flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom" },
  { code: "+49", country: "DE", flag: "\u{1F1E9}\u{1F1EA}", name: "Germany" },
  { code: "+33", country: "FR", flag: "\u{1F1EB}\u{1F1F7}", name: "France" },
  { code: "+39", country: "IT", flag: "\u{1F1EE}\u{1F1F9}", name: "Italy" },
  { code: "+34", country: "ES", flag: "\u{1F1EA}\u{1F1F8}", name: "Spain" },
  { code: "+31", country: "NL", flag: "\u{1F1F3}\u{1F1F1}", name: "Netherlands" },
  { code: "+46", country: "SE", flag: "\u{1F1F8}\u{1F1EA}", name: "Sweden" },
  { code: "+47", country: "NO", flag: "\u{1F1F3}\u{1F1F4}", name: "Norway" },
  { code: "+45", country: "DK", flag: "\u{1F1E9}\u{1F1F0}", name: "Denmark" },
  { code: "+358", country: "FI", flag: "\u{1F1EB}\u{1F1EE}", name: "Finland" },
  { code: "+48", country: "PL", flag: "\u{1F1F5}\u{1F1F1}", name: "Poland" },
  { code: "+90", country: "TR", flag: "\u{1F1F9}\u{1F1F7}", name: "Turkey" },
  { code: "+86", country: "CN", flag: "\u{1F1E8}\u{1F1F3}", name: "China" },
  { code: "+81", country: "JP", flag: "\u{1F1EF}\u{1F1F5}", name: "Japan" },
  { code: "+82", country: "KR", flag: "\u{1F1F0}\u{1F1F7}", name: "South Korea" },
  { code: "+91", country: "IN", flag: "\u{1F1EE}\u{1F1F3}", name: "India" },
  { code: "+61", country: "AU", flag: "\u{1F1E6}\u{1F1FA}", name: "Australia" },
  { code: "+64", country: "NZ", flag: "\u{1F1F3}\u{1F1FF}", name: "New Zealand" },
  { code: "+27", country: "ZA", flag: "\u{1F1FF}\u{1F1E6}", name: "South Africa" },
  { code: "+55", country: "BR", flag: "\u{1F1E7}\u{1F1F7}", name: "Brazil" },
  { code: "+52", country: "MX", flag: "\u{1F1F2}\u{1F1FD}", name: "Mexico" },
  { code: "+54", country: "AR", flag: "\u{1F1E6}\u{1F1F7}", name: "Argentina" },
  { code: "+20", country: "EG", flag: "\u{1F1EA}\u{1F1EC}", name: "Egypt" },
  { code: "+966", country: "SA", flag: "\u{1F1F8}\u{1F1E6}", name: "Saudi Arabia" },
  { code: "+971", country: "AE", flag: "\u{1F1E6}\u{1F1EA}", name: "UAE" }
];
var formatPhoneNumber = (value, countryCode) => {
  const cleaned = value.replace(/\D/g, "");
  switch (countryCode) {
    case "+1":
      if (cleaned.length <= 3)
        return cleaned;
      if (cleaned.length <= 6)
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    case "+44":
      if (cleaned.length <= 4)
        return cleaned;
      if (cleaned.length <= 7)
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 11)}`;
    case "+90":
      if (cleaned.length <= 3)
        return cleaned;
      if (cleaned.length <= 6)
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      if (cleaned.length <= 9)
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    default:
      let formatted = "";
      for (let i = 0; i < cleaned.length; i++) {
        if (i > 0 && i % 3 === 0)
          formatted += " ";
        formatted += cleaned[i];
      }
      return formatted;
  }
};
var getMaxLength = (countryCode) => {
  switch (countryCode) {
    case "+1":
      return 10;
    case "+44":
      return 11;
    case "+90":
      return 10;
    default:
      return 15;
  }
};
var PhoneInput = t.forwardRef(
  ({
    className,
    value = "",
    onChange,
    defaultCountry = "+1",
    showIcon = true,
    showCountrySelect = true,
    countries = countryCodes,
    size,
    ...props
  }, ref) => {
    const [countryCode, setCountryCode] = t.useState(defaultCountry);
    const [phoneNumber, setPhoneNumber] = t.useState(value);
    const selectedCountry = countries.find((c) => c.code === countryCode) || countries[0];
    const handlePhoneChange = (e) => {
      const rawValue = e.target.value.replace(/\D/g, "");
      const maxLength = getMaxLength(countryCode);
      const truncated = rawValue.slice(0, maxLength);
      const formatted = formatPhoneNumber(truncated, countryCode);
      setPhoneNumber(truncated);
      onChange?.(truncated, countryCode);
      e.target.value = formatted;
    };
    const handleCountryChange = (newCountryCode) => {
      setCountryCode(newCountryCode);
      onChange?.(phoneNumber, newCountryCode);
    };
    const formattedValue = formatPhoneNumber(phoneNumber, countryCode);
    return /* @__PURE__ */ jsxs("div", { className: cn("relative flex gap-2", className), children: [
      showCountrySelect && /* @__PURE__ */ jsxs(Select, { value: countryCode, onValueChange: handleCountryChange, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[120px]", children: /* @__PURE__ */ jsx(SelectValue, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: selectedCountry.flag }),
          /* @__PURE__ */ jsx("span", { children: selectedCountry.code })
        ] }) }) }),
        /* @__PURE__ */ jsx(SelectContent, { children: countries.map((country) => /* @__PURE__ */ jsx(SelectItem, { value: country.code, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: country.flag }),
          /* @__PURE__ */ jsx("span", { children: country.code }),
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: country.name })
        ] }) }, country.code)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            ref,
            type: "tel",
            inputMode: "numeric",
            autoComplete: "tel",
            placeholder: countryCode === "+1" ? "(555) 123-4567" : "123 456 789",
            value: formattedValue,
            onChange: handlePhoneChange,
            className: cn(showIcon && "pl-10", className),
            ...props
          }
        ),
        showIcon && /* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" })
      ] })
    ] });
  }
);
PhoneInput.displayName = "PhoneInput";
var radioGroupItemVariants = cva(
  "aspect-square border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-primary",
        outline: "border-border bg-transparent text-primary",
        filled: "border-primary bg-primary/10 text-primary"
      },
      size: {
        sm: "h-3.5 w-3.5",
        default: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var RadioGroupContext = t.createContext({});
var RadioGroup2 = t.forwardRef(
  ({ className, value, onValueChange, disabled, name, ...props }, ref) => {
    return /* @__PURE__ */ jsx(RadioGroupContext.Provider, { value: { value, onValueChange, disabled, name }, children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "radiogroup",
        className: cn("moonui-theme", "grid gap-2", className),
        ...props
      }
    ) });
  }
);
RadioGroup2.displayName = "RadioGroup";
var RadioGroupItem = t.forwardRef(({ className, variant, size, indicator, id, value, disabled, ...props }, ref) => {
  const radioGroup = t.useContext(RadioGroupContext);
  const generatedId = t.useId();
  const radioId = id || generatedId;
  const isChecked = radioGroup.value === value;
  const handleChange = (e) => {
    if (radioGroup.onValueChange) {
      radioGroup.onValueChange(e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "radio",
        id: radioId,
        ref,
        value,
        checked: isChecked,
        disabled: disabled || radioGroup.disabled,
        name: radioGroup.name,
        onChange: handleChange,
        className: "sr-only",
        ...props
      }
    ),
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: radioId,
        className: cn(
          radioGroupItemVariants({ variant, size }),
          "rounded-full",
          "focus-visible:ring-primary/50",
          "relative inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden",
          disabled && "cursor-not-allowed opacity-50",
          className
        ),
        children: /* @__PURE__ */ jsx("span", { className: cn(
          "absolute inset-0 pointer-events-none",
          isChecked && "flex items-center justify-center"
        ), children: isChecked && (indicator || /* @__PURE__ */ jsx(Circle, { className: "h-[60%] w-[60%] fill-current text-current" })) })
      }
    )
  ] });
});
RadioGroupItem.displayName = "RadioGroupItem";
var RadioLabel = t.forwardRef(
  ({ className, htmlFor, children, disabled = false, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "label",
      {
        ref,
        htmlFor,
        className: cn(
          "text-sm font-medium leading-none ml-2 text-foreground",
          disabled && "cursor-not-allowed opacity-70",
          className
        ),
        ...props,
        children
      }
    );
  }
);
RadioLabel.displayName = "RadioLabel";
var RadioItemWithLabel = t.forwardRef(({
  id,
  label,
  labelClassName,
  ...radioProps
}, ref) => {
  const generatedId = t.useId();
  const radioId = id || generatedId;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsx(RadioGroupItem, { ref, id: radioId, ...radioProps }),
    /* @__PURE__ */ jsx(
      RadioLabel,
      {
        htmlFor: radioId,
        disabled: radioProps.disabled,
        className: labelClassName,
        children: label
      }
    )
  ] });
});
RadioItemWithLabel.displayName = "RadioItemWithLabel";
function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className,
  disabled = false
}) {
  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e.target.value);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("border border-input rounded-md", className), children: [
    /* @__PURE__ */ jsx("div", { className: "border-b border-border p-2 bg-muted/50", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "px-2 py-1 text-sm rounded hover:bg-background disabled:opacity-50",
          disabled,
          title: "Bold (Pro feature)",
          children: "B"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "px-2 py-1 text-sm rounded hover:bg-background disabled:opacity-50",
          disabled,
          title: "Italic (Pro feature)",
          children: "I"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "px-2 py-1 text-sm rounded hover:bg-background disabled:opacity-50",
          disabled,
          title: "Underline (Pro feature)",
          children: "U"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        value,
        onChange: handleChange,
        placeholder,
        disabled,
        className: cn(
          "w-full min-h-[200px] p-3 resize-none border-0 bg-transparent",
          "focus:outline-none focus:ring-0",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )
      }
    )
  ] });
}
function useStateMachine2(initialState, machine) {
  return t.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence2 = (props) => {
  const { present, children } = props;
  const presence = usePresence2(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : t.Children.only(children);
  const ref = useComposedRefs2(presence.ref, getElementRef2(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? t.cloneElement(child, { ref }) : null;
};
Presence2.displayName = "Presence";
function usePresence2(present) {
  const [node, setNode] = t.useState();
  const stylesRef = t.useRef(null);
  const prevPresentRef = t.useRef(present);
  const prevAnimationNameRef = t.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine2(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  t.useEffect(() => {
    const currentAnimationName = getAnimationName2(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect22(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName2(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect22(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName2(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName2(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: t.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName2(styles) {
  return styles?.animationName || "none";
}
function getElementRef2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
function createContextScope2(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext32(rootComponentName, defaultContext) {
    const BaseContext = t.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider3 = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = t.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx(Context.Provider, { value, children });
    };
    Provider3.displayName = rootComponentName + "Provider";
    function useContext22(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = t.useContext(Context);
      if (context)
        return context;
      if (defaultContext !== void 0)
        return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider3, useContext22];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return t.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return t.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext32, composeContextScopes2(createScope, ...createContextScopeDeps)];
}
function composeContextScopes2(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1)
    return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return t.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
function useCallbackRef(callback) {
  const callbackRef = t.useRef(callback);
  t.useEffect(() => {
    callbackRef.current = callback;
  });
  return t.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
var DirectionContext = t.createContext(void 0);
function useDirection(localDir) {
  const globalDir = t.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}

// ../../node_modules/@radix-ui/number/dist/index.mjs
function clamp(value, [min2, max2]) {
  return Math.min(max2, Math.max(min2, value));
}
function composeEventHandlers2(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
function useStateMachine3(initialState, machine) {
  return t.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext, createScrollAreaScope] = createContextScope2(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea = t.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = t.useState(null);
    const [viewport, setViewport] = t.useState(null);
    const [content, setContent] = t.useState(null);
    const [scrollbarX, setScrollbarX] = t.useState(null);
    const [scrollbarY, setScrollbarY] = t.useState(null);
    const [cornerWidth, setCornerWidth] = t.useState(0);
    const [cornerHeight, setCornerHeight] = t.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = t.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = t.useState(false);
    const composedRefs = useComposedRefs2(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsx(
          Primitive2.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = t.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = t.useRef(null);
    const composedRefs = useComposedRefs2(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsx(
        Primitive2.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = t.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    t.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = t.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = t.useState(false);
  t.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsx(Presence2, { present: forceMount || visible, children: /* @__PURE__ */ jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = t.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine3("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  t.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  t.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsx(Presence2, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers2(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers2(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = t.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = t.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsx(Presence2, { present: forceMount || visible, children: /* @__PURE__ */ jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = t.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = t.useRef(null);
  const pointerOffsetRef = t.useRef(0);
  const [sizes, setSizes] = t.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport)
            context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport)
            context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport)
            context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = t.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = t.useState();
  const ref = t.useRef(null);
  const composeRefs3 = useComposedRefs2(forwardedRef, ref, context.onScrollbarXChange);
  t.useEffect(() => {
    if (ref.current)
      setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs3,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = t.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = t.useState();
  const ref = t.useRef(null);
  const composeRefs3 = useComposedRefs2(forwardedRef, ref, context.onScrollbarYChange);
  t.useEffect(() => {
    if (ref.current)
      setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs3,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = t.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = t.useState(null);
  const composeRefs3 = useComposedRefs2(forwardedRef, (node) => setScrollbar(node));
  const rectRef = t.useRef(null);
  const prevWebkitUserSelectRef = t.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  t.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar?.contains(element);
      if (isScrollbarWheel)
        handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  t.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsx(
        Primitive2.div,
        {
          ...scrollbarProps,
          ref: composeRefs3,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers2(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport)
                context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers2(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers2(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport)
              context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = t.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsx(Presence2, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = t.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs2(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = t.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    t.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsx(
      Primitive2.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers2(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers2(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = t.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = t.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = t.useState(0);
  const [height, setHeight] = t.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    const height2 = context.scrollbarX?.offsetHeight || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    const width2 = context.scrollbarY?.offsetWidth || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsx(
    Primitive2.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll)
      handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = t.useRef(0);
  t.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return t.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect22(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root12 = ScrollArea;
var Viewport2 = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
var ScrollArea2 = t.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  Root12,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(Viewport2, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(Corner, {})
    ]
  }
));
ScrollArea2.displayName = Root12.displayName;
var ScrollBar = t.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
var defaultVariants = {
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
};
var ScrollReveal = t.forwardRef(
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
    animate: animate2 = true,
    style,
    id
  }, ref) => {
    const controls = useAnimation();
    const elementRef = t.useRef(null);
    const isInView = useInView(elementRef, {
      amount: threshold,
      once: triggerOnce
    });
    const customVariants = t.useMemo(() => {
      if (variants)
        return variants;
      const baseVariants = defaultVariants[direction] || defaultVariants.up;
      return {
        hidden: {
          ...baseVariants.hidden,
          ...direction === "up" && { y: distance },
          ...direction === "down" && { y: -distance },
          ...direction === "left" && { x: distance },
          ...direction === "right" && { x: -distance }
        },
        visible: baseVariants.visible
      };
    }, [direction, distance, variants]);
    t.useEffect(() => {
      if (!animate2)
        return;
      if (isInView) {
        controls.start("visible");
      } else if (!triggerOnce) {
        controls.start("hidden");
      }
    }, [isInView, controls, triggerOnce, animate2]);
    t.useImperativeHandle(ref, () => elementRef.current);
    if (!animate2) {
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref: elementRef,
          className,
          style,
          id,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref: elementRef,
        variants: customVariants,
        initial: "hidden",
        animate: controls,
        transition: {
          duration,
          delay: delay + stagger,
          ease: "easeOut"
        },
        className: cn(className),
        style,
        id,
        children
      }
    );
  }
);
ScrollReveal.displayName = "ScrollReveal";
var ScrollRevealContainer = t.forwardRef(
  ({ children, stagger = 0.1, className, style, id }, ref) => {
    const containerRef = t.useRef(null);
    const isInView = useInView(containerRef, { amount: 0.1, once: true });
    t.useImperativeHandle(ref, () => containerRef.current);
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref: containerRef,
        initial: "hidden",
        animate: isInView ? "visible" : "hidden",
        variants: {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger
            }
          }
        },
        className: cn(className),
        style,
        id,
        children
      }
    );
  }
);
ScrollRevealContainer.displayName = "ScrollRevealContainer";
var ScrollRevealItem = t.forwardRef(
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
    const customVariants = t.useMemo(() => {
      if (variants)
        return variants;
      const baseVariants = defaultVariants[direction] || defaultVariants.up;
      return {
        hidden: {
          ...baseVariants.hidden,
          ...direction === "up" && { y: distance },
          ...direction === "down" && { y: -distance },
          ...direction === "left" && { x: distance },
          ...direction === "right" && { x: -distance }
        },
        visible: baseVariants.visible
      };
    }, [direction, distance, variants]);
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref,
        variants: customVariants,
        transition: {
          duration,
          ease: "easeOut"
        },
        className: cn(className),
        style,
        id,
        children
      }
    );
  }
);
ScrollRevealItem.displayName = "ScrollRevealItem";
var separatorVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      orientation: {
        horizontal: "h-[1px] w-full",
        vertical: "h-full w-[1px]"
      },
      variant: {
        default: "bg-border",
        dashed: "border-dashed border-border bg-transparent",
        dotted: "border-dotted border-border bg-transparent",
        gradient: "bg-gradient-to-r from-transparent via-border to-transparent"
      },
      size: {
        sm: "",
        md: "",
        lg: ""
      }
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        variant: "dashed",
        className: "border-t h-0"
      },
      {
        orientation: "vertical",
        variant: "dashed",
        className: "border-l w-0"
      },
      {
        orientation: "horizontal",
        variant: "dotted",
        className: "border-t h-0"
      },
      {
        orientation: "vertical",
        variant: "dotted",
        className: "border-l w-0"
      },
      {
        orientation: "horizontal",
        size: "sm",
        variant: ["dashed", "dotted"],
        className: "border-t-[0.5px]"
      },
      {
        orientation: "horizontal",
        size: "lg",
        variant: ["dashed", "dotted"],
        className: "border-t-2"
      },
      {
        orientation: "vertical",
        size: "sm",
        variant: ["dashed", "dotted"],
        className: "border-l-[0.5px]"
      },
      {
        orientation: "vertical",
        size: "lg",
        variant: ["dashed", "dotted"],
        className: "border-l-2"
      },
      {
        orientation: "horizontal",
        size: "sm",
        variant: ["default", "gradient"],
        className: "h-[0.5px]"
      },
      {
        orientation: "horizontal",
        size: "lg",
        variant: ["default", "gradient"],
        className: "h-[2px]"
      },
      {
        orientation: "vertical",
        size: "sm",
        variant: ["default", "gradient"],
        className: "w-[0.5px]"
      },
      {
        orientation: "vertical",
        size: "lg",
        variant: ["default", "gradient"],
        className: "w-[2px]"
      }
    ],
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
      size: "md"
    }
  }
);
var Separator3 = t.forwardRef(
  ({
    className,
    orientation = "horizontal",
    variant = "default",
    size = "md",
    decorative = true,
    ...props
  }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation: orientation || void 0,
      className: cn(
        separatorVariants({ orientation, variant, size }),
        className
      ),
      ...props
    }
  )
);
Separator3.displayName = SeparatorPrimitive.Root.displayName;
var useInsertionEffect2 = t[" useInsertionEffect ".trim().toString()] || useLayoutEffect22;
function useControllableState2({
  prop,
  defaultProp,
  onChange = () => {
  },
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState2({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  {
    const isControlledRef = t.useRef(prop !== void 0);
    t.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = t.useCallback(
    (nextValue) => {
      if (isControlled) {
        const value2 = isFunction3(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
function useUncontrolledState2({
  defaultProp,
  onChange
}) {
  const [value, setValue] = t.useState(defaultProp);
  const prevValueRef = t.useRef(value);
  const onChangeRef = t.useRef(onChange);
  useInsertionEffect2(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  t.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction3(value) {
  return typeof value === "function";
}
var NAME = "Toggle";
var Toggle = t.forwardRef((props, forwardedRef) => {
  const { pressed: pressedProp, defaultPressed, onPressedChange, ...buttonProps } = props;
  const [pressed, setPressed] = useControllableState2({
    prop: pressedProp,
    onChange: onPressedChange,
    defaultProp: defaultPressed ?? false,
    caller: NAME
  });
  return /* @__PURE__ */ jsx(
    Primitive2.button,
    {
      type: "button",
      "aria-pressed": pressed,
      "data-state": pressed ? "on" : "off",
      "data-disabled": props.disabled ? "" : void 0,
      ...buttonProps,
      ref: forwardedRef,
      onClick: composeEventHandlers2(props.onClick, () => {
        if (!props.disabled) {
          setPressed(!pressed);
        }
      })
    }
  );
});
Toggle.displayName = NAME;
var Root14 = Toggle;
var toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Toggle2 = t.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx(
  Root14,
  {
    ref,
    className: cn("moonui-theme", toggleVariants({ variant, size, className })),
    ...props
  }
));
Toggle2.displayName = Root14.displayName;
var TooltipProvider = TooltipPrimitive.Provider;
var tooltipVariants = cva(
  "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-green-500 text-white border-green-600",
        warning: "bg-yellow-500 text-white border-yellow-600",
        destructive: "bg-destructive text-destructive-foreground",
        info: "bg-blue-500 text-white border-blue-600"
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipArrow = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Arrow,
  {
    ref,
    className: cn("moonui-theme", "fill-current", className),
    ...props
  }
));
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;
var TooltipContent = t.forwardRef(({ className, variant, size, showArrow = false, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxs(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn("moonui-theme", tooltipVariants({ variant, size }), className),
    ...props,
    children: [
      props.children,
      showArrow && /* @__PURE__ */ jsx(TooltipArrow, {})
    ]
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
var SimpleTooltip = t.forwardRef(
  ({
    children,
    content,
    variant = "default",
    size = "md",
    side = "top",
    align = "center",
    delayDuration = 400,
    sideOffset = 4,
    showArrow = false,
    className,
    open,
    defaultOpen,
    onOpenChange,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs(
      Tooltip,
      {
        open,
        defaultOpen,
        onOpenChange,
        delayDuration,
        children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children }),
          /* @__PURE__ */ jsx(
            TooltipContent,
            {
              ref,
              side,
              align,
              variant,
              size,
              sideOffset,
              showArrow,
              className,
              ...props,
              children: content
            }
          )
        ]
      }
    );
  }
);
SimpleTooltip.displayName = "SimpleTooltip";
var ToolbarButton = ({ icon, tooltip, active, onClick, disabled }) => /* @__PURE__ */ jsxs(Tooltip, { children: [
  /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
    Toggle2,
    {
      pressed: active,
      onPressedChange: () => onClick(),
      disabled,
      className: "h-8 w-8 p-0",
      children: icon
    }
  ) }),
  /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: tooltip }) })
] });
var ColorPicker2 = ({ onColorSelect }) => {
  const colors = [
    "#000000",
    "#374151",
    "#6B7280",
    "#9CA3AF",
    "#EF4444",
    "#F59E0B",
    "#EAB308",
    "#22C55E",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#EC4899"
  ];
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-1 p-2", children: colors.map((color) => /* @__PURE__ */ jsx(
    "button",
    {
      className: "w-6 h-6 rounded border-2 border-gray-200 hover:border-gray-400",
      style: { backgroundColor: color },
      onClick: () => onColorSelect(color)
    },
    color
  )) });
};
var SimpleEditor = t__default.forwardRef(
  ({
    value = "",
    onChange,
    placeholder = "Start writing...",
    disabled = false,
    className,
    minHeight = 200,
    maxHeight = 500,
    showToolbar = true,
    showPreview = true,
    ...props
  }, ref) => {
    const [content, setContent] = useState(value);
    const [isPreview, setIsPreview] = useState(false);
    const [sourceContent, setSourceContent] = useState(value);
    useState(null);
    const editorRef = t__default.useRef(null);
    const sourceRef = t__default.useRef(null);
    const [formatState, setFormatState] = useState({
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      alignLeft: true,
      alignCenter: false,
      alignRight: false,
      alignJustify: false,
      orderedList: false,
      unorderedList: false,
      quote: false,
      code: false
    });
    const updateContent = useCallback((newContent) => {
      setContent(newContent);
      onChange?.(newContent);
    }, [onChange]);
    const saveSelection = useCallback(() => {
      const selection2 = window.getSelection();
      if (selection2 && selection2.rangeCount > 0) {
        return selection2.getRangeAt(0);
      }
      return null;
    }, []);
    useCallback((range) => {
      if (!range)
        return;
      const selection2 = window.getSelection();
      if (selection2) {
        selection2.removeAllRanges();
        selection2.addRange(range);
      }
    }, []);
    const executeCommand = useCallback((command, value2) => {
      if (disabled)
        return;
      if (editorRef.current) {
        editorRef.current.focus();
      }
      saveSelection();
      const result = document.execCommand(command, false, value2);
      if (!result) {
        console.warn(`Command '${command}' failed to execute`);
      }
      if (editorRef.current) {
        const newContent = editorRef.current.innerHTML;
        updateContent(newContent);
      }
      setFormatState({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikethrough: document.queryCommandState("strikeThrough"),
        alignLeft: document.queryCommandState("justifyLeft"),
        alignCenter: document.queryCommandState("justifyCenter"),
        alignRight: document.queryCommandState("justifyRight"),
        alignJustify: document.queryCommandState("justifyFull"),
        orderedList: document.queryCommandState("insertOrderedList"),
        unorderedList: document.queryCommandState("insertUnorderedList"),
        quote: document.queryCommandState("formatBlock"),
        code: document.queryCommandState("formatBlock")
      });
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, [disabled, saveSelection, updateContent]);
    const handleInput = useCallback((e) => {
      const newContent = e.currentTarget.innerHTML;
      updateContent(newContent);
    }, [updateContent]);
    const handleKeyDown = useCallback((e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            executeCommand("bold");
            break;
          case "i":
            e.preventDefault();
            executeCommand("italic");
            break;
          case "u":
            e.preventDefault();
            executeCommand("underline");
            break;
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              executeCommand("redo");
            } else {
              executeCommand("undo");
            }
            break;
        }
      }
      if (e.key === "Tab") {
        e.preventDefault();
        executeCommand("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
      }
    }, [executeCommand]);
    const insertLink = useCallback(() => {
      const url = prompt("Enter URL:");
      if (url) {
        executeCommand("createLink", url);
      }
    }, [executeCommand]);
    const insertImage = useCallback(() => {
      const url = prompt("Enter image URL:");
      if (url) {
        executeCommand("insertImage", url);
      }
    }, [executeCommand]);
    const formatHeading = useCallback((level) => {
      executeCommand("formatBlock", `<h${level}>`);
    }, [executeCommand]);
    const setTextColor = useCallback((color) => {
      const selection2 = window.getSelection();
      if (selection2 && selection2.rangeCount > 0) {
        const range = selection2.getRangeAt(0);
        const span = document.createElement("span");
        span.style.color = color;
        try {
          range.surroundContents(span);
        } catch (e) {
          executeCommand("foreColor", color);
        }
        if (editorRef.current) {
          const newContent = editorRef.current.innerHTML;
          updateContent(newContent);
        }
      }
    }, [executeCommand, updateContent]);
    t__default.useEffect(() => {
      if (editorRef.current && content && content !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = content;
      }
    }, [content]);
    t__default.useEffect(() => {
      if (value !== void 0 && value !== content) {
        setContent(value);
        setSourceContent(value);
      }
    }, [value, content]);
    const toolbar = showToolbar && /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "flex items-center gap-1 p-2 border-b bg-gray-50/50 dark:bg-zinc-800/50 backdrop-blur-sm",
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        children: [
          !isPreview && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(Bold, { className: "h-3 w-3" }),
                  tooltip: "Bold (Ctrl+B)",
                  active: formatState.bold,
                  onClick: () => executeCommand("bold"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(Italic, { className: "h-3 w-3" }),
                  tooltip: "Italic (Ctrl+I)",
                  active: formatState.italic,
                  onClick: () => executeCommand("italic"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(Underline, { className: "h-3 w-3" }),
                  tooltip: "Underline (Ctrl+U)",
                  active: formatState.underline,
                  onClick: () => executeCommand("underline"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(Strikethrough, { className: "h-3 w-3" }),
                  tooltip: "Strikethrough",
                  active: formatState.strikethrough,
                  onClick: () => executeCommand("strikeThrough"),
                  disabled
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Separator3, { orientation: "vertical", className: "h-6 bg-gray-300 dark:bg-zinc-600" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                onValueChange: (value2) => {
                  if (value2.startsWith("h")) {
                    formatHeading(value2.substring(1));
                  } else if (value2 === "normal") {
                    executeCommand("formatBlock", "p");
                  } else {
                    executeCommand("fontSize", value2);
                  }
                },
                disabled,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-24 h-8", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Size" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "Small" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "3", children: "Normal" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "5", children: "Large" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "7", children: "X-Large" }),
                    /* @__PURE__ */ jsx(Separator3, { className: "my-1" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "h1", children: "Heading 1" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "h2", children: "Heading 2" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "h3", children: "Heading 3" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "h4", children: "Heading 4" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "h5", children: "Heading 5" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "h6", children: "Heading 6" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(Separator3, { orientation: "vertical", className: "h-6 bg-gray-300 dark:bg-zinc-600" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(AlignLeft, { className: "h-3 w-3" }),
                  tooltip: "Align Left",
                  active: formatState.alignLeft,
                  onClick: () => executeCommand("justifyLeft"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(AlignCenter, { className: "h-3 w-3" }),
                  tooltip: "Align Center",
                  active: formatState.alignCenter,
                  onClick: () => executeCommand("justifyCenter"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(AlignRight, { className: "h-3 w-3" }),
                  tooltip: "Align Right",
                  active: formatState.alignRight,
                  onClick: () => executeCommand("justifyRight"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(AlignJustify, { className: "h-3 w-3" }),
                  tooltip: "Justify",
                  active: formatState.alignJustify,
                  onClick: () => executeCommand("justifyFull"),
                  disabled
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Separator3, { orientation: "vertical", className: "h-6 bg-gray-300 dark:bg-zinc-600" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(List, { className: "h-3 w-3" }),
                  tooltip: "Bullet List",
                  active: formatState.unorderedList,
                  onClick: () => executeCommand("insertUnorderedList"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(ListOrdered, { className: "h-3 w-3" }),
                  tooltip: "Numbered List",
                  active: formatState.orderedList,
                  onClick: () => executeCommand("insertOrderedList"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(Quote, { className: "h-3 w-3" }),
                  tooltip: "Quote",
                  active: formatState.quote,
                  onClick: () => executeCommand("formatBlock", "blockquote"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(Code, { className: "h-3 w-3" }),
                  tooltip: "Code Block",
                  active: formatState.code,
                  onClick: () => executeCommand("formatBlock", "pre"),
                  disabled
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Separator3, { orientation: "vertical", className: "h-6 bg-gray-300 dark:bg-zinc-600" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx("span", { className: "text-xs font-mono", children: "\u2190" }),
                  tooltip: "Decrease Indent",
                  onClick: () => executeCommand("outdent"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx("span", { className: "text-xs font-mono", children: "\u2192" }),
                  tooltip: "Increase Indent",
                  onClick: () => executeCommand("indent"),
                  disabled
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Separator3, { orientation: "vertical", className: "h-6 bg-gray-300 dark:bg-zinc-600" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(Link, { className: "h-3 w-3" }),
                  tooltip: "Insert Link",
                  onClick: insertLink,
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(Image, { className: "h-3 w-3" }),
                  tooltip: "Insert Image",
                  onClick: insertImage,
                  disabled
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Separator3, { orientation: "vertical", className: "h-6 bg-gray-300 dark:bg-zinc-600" }),
            /* @__PURE__ */ jsxs(Popover, { children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-8 w-8 p-0",
                  disabled,
                  title: "Text Color",
                  children: /* @__PURE__ */ jsx(Palette, { className: "h-3 w-3" })
                }
              ) }),
              /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", children: /* @__PURE__ */ jsx(ColorPicker2, { onColorSelect: setTextColor }) })
            ] }),
            /* @__PURE__ */ jsx(Separator3, { orientation: "vertical", className: "h-6 bg-gray-300 dark:bg-zinc-600" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(Undo, { className: "h-3 w-3" }),
                  tooltip: "Undo (Ctrl+Z)",
                  onClick: () => executeCommand("undo"),
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  icon: /* @__PURE__ */ jsx(Redo, { className: "h-3 w-3" }),
                  tooltip: "Redo (Ctrl+Shift+Z)",
                  onClick: () => executeCommand("redo"),
                  disabled
                }
              )
            ] })
          ] }),
          showPreview && /* @__PURE__ */ jsxs(Fragment, { children: [
            !isPreview && /* @__PURE__ */ jsx(Separator3, { orientation: "vertical", className: "h-6 bg-gray-300 dark:bg-zinc-600" }),
            /* @__PURE__ */ jsx(
              ToolbarButton,
              {
                icon: isPreview ? /* @__PURE__ */ jsx(Edit, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(Eye, { className: "h-3 w-3" }),
                tooltip: isPreview ? "Edit Mode" : "View Source Code",
                active: isPreview,
                onClick: () => {
                  if (isPreview) {
                    updateContent(sourceContent);
                  } else {
                    setSourceContent(content);
                  }
                  setIsPreview(!isPreview);
                },
                disabled
              }
            )
          ] })
        ]
      }
    ) });
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent",
          disabled && "opacity-50 cursor-not-allowed",
          className
        ),
        ...props,
        children: [
          toolbar,
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            isPreview ? /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "bg-slate-50 dark:bg-zinc-900/95",
                style: { minHeight, maxHeight, overflow: "auto" },
                children: /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    ref: sourceRef,
                    value: sourceContent,
                    onChange: (e) => setSourceContent(e.target.value),
                    className: "w-full h-full bg-transparent p-4 font-mono text-sm text-gray-900 dark:text-gray-100 resize-none focus:outline-none",
                    style: { minHeight: minHeight - 32 },
                    disabled,
                    placeholder: "HTML source code..."
                  }
                )
              }
            ) : /* @__PURE__ */ jsx(
              motion.div,
              {
                ref: editorRef,
                contentEditable: !disabled,
                suppressContentEditableWarning: true,
                className: cn(
                  "p-4 outline-none prose prose-sm dark:prose-invert max-w-none overflow-y-auto",
                  "bg-slate-50 dark:bg-zinc-900/95",
                  "text-gray-900 dark:text-gray-100",
                  "focus:ring-0",
                  "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4",
                  "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3",
                  "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2",
                  "[&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-2",
                  "[&_h5]:text-base [&_h5]:font-bold [&_h5]:mb-1",
                  "[&_h6]:text-sm [&_h6]:font-bold [&_h6]:mb-1",
                  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4",
                  "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4",
                  "[&_li]:mb-1",
                  "[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic",
                  "[&_pre]:bg-gray-100 [&_pre]:dark:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto"
                ),
                style: { minHeight, maxHeight },
                onInput: handleInput,
                onKeyDown: handleKeyDown,
                "data-placeholder": placeholder,
                initial: { opacity: 0 },
                animate: { opacity: 1 }
              }
            ),
            !content && !isPreview && /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute top-4 left-4 text-muted-foreground pointer-events-none",
                style: { fontSize: "16px" },
                children: placeholder
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-4 py-2 border-t bg-gray-50/50 dark:bg-zinc-800/50 backdrop-blur-sm text-xs text-gray-600 dark:text-gray-400", children: /* @__PURE__ */ jsx(CharacterCount, { content }) })
        ]
      }
    );
  }
);
SimpleEditor.displayName = "SimpleEditor";
var CharacterCount = ({ content }) => {
  const [count4, setCount] = useState(0);
  useEffect(() => {
    const getPlainText = (html) => {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent || div.innerText || "";
    };
    setCount(getPlainText(content).length);
  }, [content]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    count4,
    " characters"
  ] });
};
var skeletonVariants = cva(
  "animate-pulse rounded-md",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/10",
        secondary: "bg-secondary/10",
        accent: "bg-accent"
      },
      size: {
        default: "",
        sm: "scale-90",
        lg: "scale-110"
      },
      shape: {
        rect: "rounded-md",
        circle: "rounded-full",
        pill: "rounded-full"
      },
      animation: {
        pulse: "animate-pulse",
        wave: "overflow-hidden relative after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent dark:after:via-white/5",
        none: "animate-none"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rect",
      animation: "pulse"
    }
  }
);
var Skeleton = t.forwardRef(
  ({
    className,
    variant,
    size,
    shape,
    animation,
    height,
    width,
    isLoaded = false,
    children,
    fadeInDuration = 400,
    motion: useMotion = false,
    style,
    ...props
  }, ref) => {
    const {
      onDrag,
      onDragEnd,
      onDragStart,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      ...filteredProps
    } = props;
    if (isLoaded && children) {
      if (useMotion) {
        return /* @__PURE__ */ jsx(
          motion.div,
          {
            ref,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: fadeInDuration / 1e3 },
            className: cn("moonui-theme", className),
            style: {
              height,
              width,
              ...style
            },
            ...filteredProps,
            children
          }
        );
      }
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          className: cn("moonui-theme", "animate-fade-in", className),
          style: {
            animationDuration: `${fadeInDuration}ms`,
            height,
            width,
            ...style
          },
          ...props,
          children
        }
      );
    }
    const SkeletonElement = useMotion ? motion.div : "div";
    return /* @__PURE__ */ jsx(
      SkeletonElement,
      {
        ref,
        className: cn(
          "moonui-theme",
          skeletonVariants({ variant, size, shape, animation }),
          "relative isolate",
          className
        ),
        style: {
          height,
          width,
          ...style
        },
        ...useMotion ? skeletonAnimation : {},
        ...filteredProps
      }
    );
  }
);
Skeleton.displayName = "Skeleton";
var SkeletonText = t.forwardRef(
  ({
    className,
    lines = 3,
    lineHeight = "0.85rem",
    spacing = "0.5rem",
    lastLineWidth = 80,
    randomWidths = false,
    variant = "default",
    animation = "pulse",
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("moonui-theme", "flex flex-col", className),
        style: { gap: spacing },
        ...props,
        children: Array.from({ length: lines }).map((_, i) => {
          const isLastLine = i === lines - 1;
          const widthPercentage = isLastLine ? lastLineWidth : randomWidths ? 85 + i % 3 * 5 : 100;
          return /* @__PURE__ */ jsx(
            Skeleton,
            {
              variant,
              animation,
              className: "w-full",
              style: {
                height: lineHeight,
                width: `${widthPercentage}%`
              }
            },
            i
          );
        })
      }
    );
  }
);
SkeletonText.displayName = "SkeletonText";
var SkeletonAvatar = t.forwardRef(
  ({
    className,
    size = "2.5rem",
    variant = "default",
    animation = "pulse",
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx(
      Skeleton,
      {
        ref,
        variant,
        animation,
        shape: "circle",
        className: cn("moonui-theme", "shrink-0", className),
        style: {
          height: size,
          width: size
        },
        ...props
      }
    );
  }
);
SkeletonAvatar.displayName = "SkeletonAvatar";
var SkeletonCard = t.forwardRef(
  ({
    className,
    showHeader = true,
    contentLines = 3,
    showFooter = true,
    variant = "default",
    animation = "pulse",
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "overflow-hidden rounded-md border border-border bg-background p-4",
          className
        ),
        ...props,
        children: [
          showHeader && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(SkeletonAvatar, { size: "2.5rem", variant, animation }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx(
                Skeleton,
                {
                  variant,
                  animation,
                  className: "mb-2 h-4 w-1/3"
                }
              ),
              /* @__PURE__ */ jsx(
                Skeleton,
                {
                  variant,
                  animation,
                  className: "h-3 w-1/4"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            SkeletonText,
            {
              lines: contentLines,
              variant,
              animation,
              className: "mb-4"
            }
          ),
          showFooter && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-4 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsx(
              Skeleton,
              {
                variant,
                animation,
                className: "h-4 w-1/4"
              }
            ),
            /* @__PURE__ */ jsx(
              Skeleton,
              {
                variant,
                animation,
                className: "h-4 w-1/5"
              }
            )
          ] })
        ]
      }
    );
  }
);
SkeletonCard.displayName = "SkeletonCard";
var SwipeableCard = t.forwardRef(
  ({ className, children, onSwipeLeft, onSwipeRight, threshold = 100, disabled = false, ...props }, ref) => {
    const [startX, setStartX] = t.useState(0);
    const [currentX, setCurrentX] = t.useState(0);
    const [isSwiping, setIsSwiping] = t.useState(false);
    const handleTouchStart = (e) => {
      if (disabled)
        return;
      setStartX(e.touches[0].clientX);
      setIsSwiping(true);
    };
    const handleTouchMove = (e) => {
      if (disabled || !isSwiping)
        return;
      setCurrentX(e.touches[0].clientX);
    };
    const handleTouchEnd = () => {
      if (disabled || !isSwiping)
        return;
      const deltaX = currentX - startX;
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
      setIsSwiping(false);
      setCurrentX(0);
      setStartX(0);
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "touch-pan-y select-none transition-transform duration-200",
          isSwiping && "cursor-grabbing",
          className
        ),
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        ...props,
        children
      }
    );
  }
);
SwipeableCard.displayName = "SwipeableCard";
var Switch = t.forwardRef(({ className, size = "md", variant = "primary", loading, leftIcon, rightIcon, description, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "moonui-theme inline-flex items-center gap-2", children: [
  leftIcon && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: leftIcon }),
  /* @__PURE__ */ jsxs(
    SwitchPrimitives.Root,
    {
      className: cn(
        "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:data-[state=unchecked]:bg-gray-700/70 dark:focus-visible:ring-primary/40 dark:focus-visible:ring-offset-gray-950",
        // Boyutlar
        size === "sm" && "h-4 w-8",
        size === "md" && "h-6 w-11",
        size === "lg" && "h-7 w-14",
        // Varyantlar (checked durumunda)
        variant === "primary" && "data-[state=checked]:bg-primary",
        variant === "success" && "data-[state=checked]:bg-success",
        variant === "warning" && "data-[state=checked]:bg-warning",
        variant === "danger" && "data-[state=checked]:bg-error",
        variant === "secondary" && "data-[state=checked]:bg-accent",
        // Unchecked durumu
        "data-[state=unchecked]:bg-input",
        // Loading durumu
        loading && "opacity-80 cursor-wait",
        className
      ),
      disabled: loading || props.disabled,
      ...props,
      ref,
      children: [
        loading ? /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-primary" }) }) : null,
        /* @__PURE__ */ jsx(
          SwitchPrimitives.Thumb,
          {
            className: cn(
              "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
              // Boyuta göre thumb boyutları
              size === "sm" && "h-3 w-3 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
              size === "md" && "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
              size === "lg" && "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
            )
          }
        )
      ]
    }
  ),
  rightIcon && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: rightIcon }),
  description && /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: description })
] }));
Switch.displayName = SwitchPrimitives.Root.displayName;
var TagsInput = t.forwardRef(
  ({
    value = [],
    onChange,
    maxTags,
    variant = "primary",
    allowDuplicates = false,
    delimiter = ",",
    placeholder = "Add tag and press Enter",
    className,
    disabled,
    ...props
  }, ref) => {
    const [inputValue, setInputValue] = t.useState("");
    const [error, setError] = t.useState("");
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === delimiter) {
        e.preventDefault();
        addTag();
      } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
        removeTag(value.length - 1);
      }
    };
    const addTag = () => {
      const tag = inputValue.trim();
      if (!tag)
        return;
      if (!allowDuplicates && value.includes(tag)) {
        setError("This tag already exists");
        setTimeout(() => setError(""), 2e3);
        return;
      }
      if (maxTags && value.length >= maxTags) {
        setError(`Maximum ${maxTags} tags allowed`);
        setTimeout(() => setError(""), 2e3);
        return;
      }
      onChange([...value, tag]);
      setInputValue("");
      setError("");
    };
    const removeTag = (index) => {
      if (disabled)
        return;
      onChange(value.filter((_, i) => i !== index));
    };
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "flex min-h-[2.5rem] w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "dark:bg-zinc-950/50 dark:border-zinc-800",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            disabled && "cursor-not-allowed opacity-50",
            className
          ),
          children: [
            value.map((tag, index) => /* @__PURE__ */ jsxs(
              Badge,
              {
                variant,
                className: "gap-1 pr-1.5",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs", children: tag }),
                  !disabled && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeTag(index),
                      className: "ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" })
                    }
                  )
                ]
              },
              index
            )),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref,
                type: "text",
                value: inputValue,
                onChange: (e) => setInputValue(e.target.value),
                onKeyDown: handleKeyDown,
                onBlur: addTag,
                disabled,
                placeholder: value.length === 0 ? placeholder : "",
                className: cn(
                  "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
                  "dark:placeholder:text-zinc-500",
                  "min-w-[120px]",
                  disabled && "cursor-not-allowed"
                ),
                ...props
              }
            )
          ]
        }
      ),
      error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-destructive", children: error })
    ] });
  }
);
TagsInput.displayName = "TagsInput";
var textareaVariants = cva(
  [
    "flex w-full rounded-md px-3 py-2 text-sm transition-all duration-200",
    "text-foreground placeholder:text-muted-foreground dark:placeholder:text-gray-500",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none dark:text-gray-200",
    "resize-none"
    // Always disable manual resize, we control it
  ],
  {
    variants: {
      variant: {
        default: "border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-800/80 hover:border-gray-400 dark:hover:border-gray-600 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/20 focus-visible:border-primary dark:focus-visible:border-primary/80 dark:shadow-inner dark:shadow-gray-950/10",
        outline: "border-2 border-gray-300 dark:border-gray-700 bg-transparent hover:border-gray-400 dark:hover:border-gray-600 focus-visible:border-primary dark:focus-visible:border-primary/80",
        ghost: "border-none bg-transparent hover:bg-gray-100/50 dark:hover:bg-gray-800/30 focus-visible:bg-transparent",
        underline: "border-t-0 border-l-0 border-r-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none px-0 hover:border-gray-400 dark:hover:border-gray-500 focus-visible:ring-0 focus-visible:border-primary dark:focus-visible:border-primary/80 bg-transparent dark:bg-transparent"
      },
      size: {
        sm: "min-h-[60px] text-xs",
        md: "min-h-[80px] text-sm",
        lg: "min-h-[120px] text-base"
      },
      isError: {
        true: "border-error focus-visible:ring-error/30 focus-visible:border-error hover:border-error/80 dark:hover:border-error/80",
        false: ""
      },
      isSuccess: {
        true: "border-success focus-visible:ring-success/30 focus-visible:border-success hover:border-success/80 dark:hover:border-success/80",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      isError: false,
      isSuccess: false
    }
  }
);
var Textarea = t.forwardRef(
  ({
    className,
    wrapperClassName,
    messageClassName,
    variant,
    size,
    error,
    success,
    loading,
    autoResize = false,
    maxHeight,
    characterCount = false,
    disabled,
    maxLength,
    value,
    defaultValue,
    onChange,
    ...props
  }, ref) => {
    const textareaRef = t.useRef(null);
    const [internalValue, setInternalValue] = t.useState(value || defaultValue || "");
    t.useImperativeHandle(ref, () => textareaRef.current);
    const adjustHeight = t.useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize)
        return;
      textarea.style.height = "auto";
      const newHeight = textarea.scrollHeight;
      if (maxHeight && newHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.height = `${newHeight}px`;
        textarea.style.overflowY = "hidden";
      }
    }, [autoResize, maxHeight]);
    t.useEffect(() => {
      adjustHeight();
    }, [internalValue, adjustHeight]);
    t.useEffect(() => {
      if (value !== void 0) {
        setInternalValue(value);
      }
    }, [value]);
    const handleChange = (e) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };
    const currentLength = String(internalValue).length;
    const showCharCount = characterCount && (maxLength !== void 0 || currentLength > 0);
    const errorMessage = typeof error === "string" ? error : void 0;
    const successMessage = typeof success === "string" ? success : void 0;
    const showMessage = errorMessage || successMessage;
    return /* @__PURE__ */ jsxs("div", { className: cn("moonui-theme", "space-y-1.5 w-full", wrapperClassName), children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            ref: textareaRef,
            className: cn(
              textareaVariants({
                variant,
                size,
                isError: !!error,
                isSuccess: !!success
              }),
              loading && "pr-10",
              className
            ),
            disabled: disabled || loading,
            value,
            defaultValue,
            onChange: handleChange,
            maxLength,
            "aria-invalid": !!error || void 0,
            "aria-describedby": errorMessage ? `${props.id || ""}-error` : successMessage ? `${props.id || ""}-success` : void 0,
            ...props
          }
        ),
        loading && /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 text-gray-500", children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin", "aria-hidden": "true" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        showMessage && /* @__PURE__ */ jsx(
          "p",
          {
            className: cn(
              "text-xs transition-all",
              errorMessage && "text-error",
              successMessage && "text-success",
              messageClassName
            ),
            id: errorMessage ? `${props.id || ""}-error` : successMessage ? `${props.id || ""}-success` : void 0,
            children: errorMessage || successMessage
          }
        ),
        showCharCount && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground dark:text-gray-500 ml-auto", children: [
          currentLength,
          maxLength !== void 0 && ` / ${maxLength}`
        ] })
      ] })
    ] });
  }
);
Textarea.displayName = "Textarea";
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-8 shadow-sm transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100",
        warning: "border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-100",
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Toast = t.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn("moonui-theme", toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("moonui-theme", "text-sm font-semibold [&+div]:text-xs", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("moonui-theme", "text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
var TOAST_LIMIT = 5;
var TOAST_REMOVE_DELAY = 1e6;
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t2) => t2.id === action.toast.id ? { ...t2, ...action.toast } : t2
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t2) => t2.id === toastId || toastId === void 0 ? {
            ...t2,
            open: false
          } : t2
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t2) => t2.id !== action.toastId)
      };
    default:
      return state;
  }
};
var listeners = [];
var memoryState = { toasts: [] };
var toastCounter = 0;
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = `toast-${Date.now()}-${++toastCounter}`;
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open)
          dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = t.useState(memoryState);
  t.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, variant, open, onOpenChange, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { variant, open, onOpenChange, ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
/*! Bundled license information:

@tanstack/table-core/build/lib/index.mjs:
  (**
     * table-core
     *
     * Copyright (c) TanStack
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.md file in the root directory of this source tree.
     *
     * @license MIT
     *)

@tanstack/react-table/build/lib/index.mjs:
  (**
     * react-table
     *
     * Copyright (c) TanStack
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.md file in the root directory of this source tree.
     *
     * @license MIT
     *)
*/

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, AspectRatio, Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Card, CardCVCInput, CardContent, CardDescription, CardExpiryInput, CardFooter, CardHeader, CardNumberInput, CardTitle, CardZipInput, Checkbox, CheckboxGroup, CheckboxLabel, CheckboxWithLabel, Collapsible2 as Collapsible, CollapsibleContent2 as CollapsibleContent, CollapsibleTrigger2 as CollapsibleTrigger, ColorPicker, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, DatePicker, DateRangePicker, DateTimePicker, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogForm, DialogHeader, DialogTitle, DialogTrigger, DraggableList, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, FileUpload, FreeBadge, GestureDrawer, GitHubStarButton, GitHubStars, GradientPicker, Input, Label, LockedComponent, MonthPicker, MoonLogo, MoonLogoAnimated, MoonLogoIcon, Accordion as MoonUIAccordion, AccordionContent as MoonUIAccordionContent, AccordionItem as MoonUIAccordionItem, AccordionTrigger as MoonUIAccordionTrigger, Alert as MoonUIAlert, AlertDescription as MoonUIAlertDescription, AlertTitle as MoonUIAlertTitle, AspectRatio as MoonUIAspectRatio, Avatar as MoonUIAvatar, AvatarFallback as MoonUIAvatarFallback, AvatarGroup as MoonUIAvatarGroup, AvatarImage as MoonUIAvatarImage, Badge as MoonUIBadge, Breadcrumb as MoonUIBreadcrumb, BreadcrumbEllipsis as MoonUIBreadcrumbEllipsis, BreadcrumbItem as MoonUIBreadcrumbItem, BreadcrumbLink as MoonUIBreadcrumbLink, BreadcrumbList as MoonUIBreadcrumbList, BreadcrumbPage as MoonUIBreadcrumbPage, BreadcrumbSeparator as MoonUIBreadcrumbSeparator, Button as MoonUIButton, Calendar as MoonUICalendar, Card as MoonUICard, CardCVCInput as MoonUICardCVCInput, CardContent as MoonUICardContent, CardDescription as MoonUICardDescription, CardExpiryInput as MoonUICardExpiryInput, CardFooter as MoonUICardFooter, CardHeader as MoonUICardHeader, CardNumberInput as MoonUICardNumberInput, CardTitle as MoonUICardTitle, CardZipInput as MoonUICardZipInput, Checkbox as MoonUICheckbox, CheckboxGroup as MoonUICheckboxGroup, CheckboxLabel as MoonUICheckboxLabel, CheckboxWithLabel as MoonUICheckboxWithLabel, Collapsible2 as MoonUICollapsible, CollapsibleContent2 as MoonUICollapsibleContent, CollapsibleTrigger2 as MoonUICollapsibleTrigger, ColorPicker as MoonUIColorPicker, Command as MoonUICommand, CommandDialog as MoonUICommandDialog, CommandEmpty as MoonUICommandEmpty, CommandGroup as MoonUICommandGroup, CommandInput as MoonUICommandInput, CommandItem as MoonUICommandItem, CommandList as MoonUICommandList, CommandSeparator as MoonUICommandSeparator, CommandShortcut as MoonUICommandShortcut, DataTableBasic as MoonUIDataTableBasic, DatePicker as MoonUIDatePicker, DateRangePicker as MoonUIDateRangePicker, DateTimePicker as MoonUIDateTimePicker, Dialog as MoonUIDialog, DialogClose as MoonUIDialogClose, DialogContent as MoonUIDialogContent, DialogDescription as MoonUIDialogDescription, DialogFooter as MoonUIDialogFooter, DialogHeader as MoonUIDialogHeader, DialogTitle as MoonUIDialogTitle, DialogTrigger as MoonUIDialogTrigger, DraggableList as MoonUIDraggableList, DropdownMenu as MoonUIDropdownMenu, DropdownMenuCheckboxItem as MoonUIDropdownMenuCheckboxItem, DropdownMenuContent as MoonUIDropdownMenuContent, DropdownMenuGroup as MoonUIDropdownMenuGroup, DropdownMenuItem as MoonUIDropdownMenuItem, DropdownMenuLabel as MoonUIDropdownMenuLabel, DropdownMenuPortal as MoonUIDropdownMenuPortal, DropdownMenuRadioGroup as MoonUIDropdownMenuRadioGroup, DropdownMenuRadioItem as MoonUIDropdownMenuRadioItem, DropdownMenuSeparator as MoonUIDropdownMenuSeparator, DropdownMenuShortcut as MoonUIDropdownMenuShortcut, DropdownMenuSub as MoonUIDropdownMenuSub, DropdownMenuSubContent as MoonUIDropdownMenuSubContent, DropdownMenuSubTrigger as MoonUIDropdownMenuSubTrigger, DropdownMenuTrigger as MoonUIDropdownMenuTrigger, FileUpload as MoonUIFileUpload, FreeBadge as MoonUIFreeBadge, GestureDrawer as MoonUIGestureDrawer, GitHubStars as MoonUIGitHubStars, GradientPicker as MoonUIGradientPicker, Input as MoonUIInput, Label as MoonUILabel, LockedComponent as MoonUILockedComponent, MonthPicker as MoonUIMonthPicker, MoonLogo as MoonUIMoonLogo, Pagination as MoonUIPagination, PaginationContent as MoonUIPaginationContent, PaginationEllipsis as MoonUIPaginationEllipsis, PaginationItem as MoonUIPaginationItem, PaginationLink as MoonUIPaginationLink, PaginationNext as MoonUIPaginationNext, PaginationPrevious as MoonUIPaginationPrevious, PhoneInput as MoonUIPhoneInput, Popover as MoonUIPopover, PopoverContent as MoonUIPopoverContent, PopoverTrigger as MoonUIPopoverTrigger, ProBadge as MoonUIProBadge, ProComponentWrapper as MoonUIProComponentWrapper, Progress as MoonUIProgress, RadioGroup2 as MoonUIRadioGroup, RadioGroupItem as MoonUIRadioGroupItem, RadioItemWithLabel as MoonUIRadioItemWithLabel, RadioLabel as MoonUIRadioLabel, RichTextEditor as MoonUIRichTextEditor, ScrollArea2 as MoonUIScrollArea, ScrollBar as MoonUIScrollBar, ScrollReveal as MoonUIScrollReveal, ScrollRevealContainer as MoonUIScrollRevealContainer, ScrollRevealItem as MoonUIScrollRevealItem, Select as MoonUISelect, SelectContent as MoonUISelectContent, SelectGroup as MoonUISelectGroup, SelectItem as MoonUISelectItem, SelectLabel as MoonUISelectLabel, SelectScrollDownButton as MoonUISelectScrollDownButton, SelectScrollUpButton as MoonUISelectScrollUpButton, SelectSeparator as MoonUISelectSeparator, SelectTrigger as MoonUISelectTrigger, SelectValue as MoonUISelectValue, Separator3 as MoonUISeparator, SimpleColorPicker as MoonUISimpleColorPicker, SimpleEditor as MoonUISimpleEditor, Skeleton as MoonUISkeleton, SkeletonAvatar as MoonUISkeletonAvatar, SkeletonCard as MoonUISkeletonCard, SkeletonText as MoonUISkeletonText, Slider as MoonUISlider, SwipeableCard as MoonUISwipeableCard, Switch as MoonUISwitch, Table as MoonUITable, TableBody as MoonUITableBody, TableCaption as MoonUITableCaption, TableCell as MoonUITableCell, TableFooter as MoonUITableFooter, TableHead as MoonUITableHead, TableHeader as MoonUITableHeader, TableRow as MoonUITableRow, Tabs as MoonUITabs, TabsContent as MoonUITabsContent, TabsList as MoonUITabsList, TabsTrigger as MoonUITabsTrigger, TagsInput as MoonUITagsInput, Textarea as MoonUITextarea, Toast as MoonUIToast, ToastAction as MoonUIToastAction, ToastClose as MoonUIToastClose, ToastDescription as MoonUIToastDescription, ToastProvider as MoonUIToastProvider, ToastTitle as MoonUIToastTitle, ToastViewport as MoonUIToastViewport, Toaster as MoonUIToaster, Toggle2 as MoonUIToggle, Tooltip as MoonUITooltip, TooltipContent as MoonUITooltipContent, TooltipProvider as MoonUITooltipProvider, TooltipTrigger as MoonUITooltipTrigger, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PhoneInput, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverFooter, PopoverHeader, PopoverSeparator, PopoverTrigger, ProBadge, ProComponentWrapper, Progress, RadioGroup2 as RadioGroup, RadioGroupItem, RadioItemWithLabel, RadioLabel, RichTextEditor, ScrollArea2 as ScrollArea, ScrollBar, ScrollReveal, ScrollRevealContainer, ScrollRevealItem, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator3 as Separator, SimpleColorPicker, SimpleEditor, SimpleTooltip, Skeleton, SkeletonAvatar, SkeletonCard, SkeletonText, Slider, SwipeableCard, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, TagsInput, Textarea, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toaster, Toggle2 as Toggle, Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger, aspectRatioVariants, badgeVariants, buttonVariants, cn, collapsibleContentVariants, collapsibleTriggerVariants, badgeVariants as moonUIBadgeVariants, buttonVariants as moonUIButtonVariants, createSortableHeader as moonUICreateSortableHeader, skeletonVariants as moonUISkeletonVariants, toggleVariants as moonUIToggleVariants, popoverContentVariants, progressVariants, separatorVariants, skeletonVariants, toast, toggleVariants, tooltipVariants, useToast };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map