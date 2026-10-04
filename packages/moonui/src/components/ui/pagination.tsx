"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "../../lib/utils"
import { ButtonProps, buttonVariants } from "./button"

const Pagination = React.forwardRef<HTMLElement, React.ComponentProps<"nav">>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="pagination"
      className={cn("moonui-theme", "mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("moonui-theme", "flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("moonui-theme", "", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Partial<Pick<ButtonProps, "size">> &
  React.ComponentProps<"a">

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, size = "icon", ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
)
PaginationLink.displayName = "PaginationLink"

/**
 * #315: "Previous"/"Next" etiketleri KOŞULSUZ render ediliyordu ve component'te hiçbir
 * responsive affordance yoktu. 375px'te ölçüm: nav clientWidth=229 / scrollWidth=317
 * (88px iç taşma) → ata zincirindeki `overflow-hidden` etiketi kırpıyor, kullanıcı
 * "Previous" yerine "vious" görüyordu. Etiket artık `sm` altında gizleniyor; erişilebilir
 * ad `aria-label` ile korunduğu için ekran-okuyucu deneyimi DEĞİŞMİYOR.
 */
const paginationLabelClass = "hidden sm:inline"

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof PaginationLink>
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    size="md"
    className={cn("moonui-theme", "gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className={paginationLabelClass}>Previous</span>
  </PaginationLink>
))
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof PaginationLink>
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to next page"
    size="md"
    className={cn("moonui-theme", "gap-1 pr-2.5", className)}
    {...props}
  >
    <span className={paginationLabelClass}>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
))
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(({ className, ...props }, ref) => (
  // #315: `aria-hidden` ESKİDEN BU ELEMANDAYDI → içindeki `sr-only` "More pages" metni
  // erişilebilirlik ağacından düşüyor, hiç duyurulmuyordu. Gizleme artık yalnız dekoratif
  // ikonda. (breadcrumb.tsx'te birebir aynı çakışma vardı — aynı PR'da düzeltildi.)
  <span
    ref={ref}
    className={cn("moonui-theme", "flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <span aria-hidden="true" className="flex items-center">
      <MoreHorizontal className="h-4 w-4" />
    </span>
    <span className="sr-only">More pages</span>
  </span>
))
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

// #315: Props tiplerinin hiçbiri export edilmiyordu.
export type { PaginationLinkProps }
