import * as React from 'react';
import React__default from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import { VariantProps } from 'class-variance-authority';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { Command as Command$1 } from 'cmdk';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ColumnDef } from '@tanstack/react-table';
export { ColumnDef as MoonUIColumnDef } from '@tanstack/react-table';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { Variants } from 'framer-motion';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as ToastPrimitives from '@radix-ui/react-toast';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ClassValue } from 'clsx';
export { Palette, Pipette } from 'lucide-react';
export { format } from 'date-fns';

declare const Accordion: React.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>>;
declare const AccordionItem: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const AccordionTrigger: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

/**
 * Alert Component
 *
 * Yüksek kaliteli, özelleştirilebilir ve erişilebilir alert bileşeni.
 * Bildirim, uyarı ve dikkat çekmek gereken içerikler için kullanılır.
 */
declare const alertVariants: (props?: {
    variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
    size?: "default" | "sm" | "lg";
    radius?: "none" | "default" | "sm" | "lg" | "full";
    withClose?: boolean;
} & class_variance_authority_dist_types.ClassProp) => string;
interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
    /** Alert ikonunu gizler */
    hideIcon?: boolean;
    /** Kapatma butonu ekler */
    closable?: boolean;
    /** Kapatma butonu tıklandığında çalışacak fonksiyon */
    onClose?: () => void;
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
declare const AlertTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const AlertDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;

/**
 * Aspect Ratio Component
 *
 * A component that maintains a specific aspect ratio for content.
 * Particularly useful for images, videos, and media content in responsive designs.
 * Fully integrated with the theme system, accessible and customizable.
 */
declare const aspectRatioVariants: (props?: {
    variant?: "default" | "ghost" | "outline" | "card";
    radius?: "none" | "sm" | "lg" | "full" | "md";
} & class_variance_authority_dist_types.ClassProp) => string;
interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof aspectRatioVariants> {
    /**
     * Aspect ratio (width/height). For example 16/9, 4/3, 1/1 etc.
     * @default 16/9
     */
    ratio?: number;
}
declare const AspectRatio: React.ForwardRefExoticComponent<AspectRatioProps & React.RefAttributes<HTMLDivElement>>;

declare const avatarVariants: (props?: {
    size?: "default" | "sm" | "lg" | "md" | "xs" | "xl" | "2xl";
    radius?: "none" | "default" | "sm" | "lg" | "full";
    variant?: "default" | "border" | "ring" | "ringOffset";
} & class_variance_authority_dist_types.ClassProp) => string;
interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, VariantProps<typeof avatarVariants> {
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    limit?: number;
    avatars: React.ReactNode[];
    overlapOffset?: number;
}
declare const AvatarGroup: React.ForwardRefExoticComponent<AvatarGroupProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Premium Badge Component
 *
 * Durum, kategori ve etiketleme için yüksek kaliteli badge bileşeni.
 * Dark ve light modda uyumlu, erişilebilir ve çeşitli varyantlar sunar.
 */
declare const badgeVariants: (props?: {
    variant?: "primary" | "success" | "warning" | "ghost" | "outline" | "secondary" | "destructive" | "pro" | "admin";
    size?: "sm" | "lg" | "md";
    radius?: "none" | "default" | "sm" | "lg";
} & class_variance_authority_dist_types.ClassProp) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, Omit<VariantProps<typeof badgeVariants>, 'variant'> {
    withDot?: boolean;
    dotColor?: string;
    removable?: boolean;
    onRemove?: () => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'ghost' | 'pro' | 'admin';
    /** Disable automatic spacing between badges */
    noAutoSpacing?: boolean;
}
/**
 * Premium Badge Component
 *
 * @param props - Badge bileşeni özellikleri
 * @param props.variant - Badgenin görsel varyantı
 * @param props.size - Badge boyutu
 * @param props.radius - Köşe yuvarlama stili
 * @param props.withDot - Başında nokta gösterimi
 * @param props.dotColor - Noktanın rengi (özel)
 * @param props.removable - Kaldırılabilir badge (X simgesi ile)
 * @param props.onRemove - Kaldırma işlevi
 * @param props.leftIcon - Badge'in solunda görüntülenecek ikon
 * @param props.rightIcon - Badge'in sağında görüntülenecek ikon
 * @param props.noAutoSpacing - Otomatik spacing'i devre dışı bırak
 */
declare function Badge({ className, variant, size, radius, withDot, dotColor, removable, onRemove, leftIcon, rightIcon, noAutoSpacing, children, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

declare const breadcrumbVariants: (props?: {
    variant?: "default" | "ghost" | "muted";
    size?: "default" | "sm" | "lg";
} & class_variance_authority_dist_types.ClassProp) => string;
interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof breadcrumbVariants> {
    separator?: React.ReactNode;
    showHomeIcon?: boolean;
}
interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {
    collapsed?: boolean;
    collapsedWidth?: number;
}
interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
    isCurrent?: boolean;
    href?: string;
    asChild?: boolean;
}
interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Custom separator icon or text */
    icon?: React.ReactNode;
}
interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Custom ellipsis icon */
    icon?: React.ReactNode;
}
declare const Breadcrumb: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>>;
declare const BreadcrumbList: React.ForwardRefExoticComponent<BreadcrumbListProps & React.RefAttributes<HTMLOListElement>>;
declare const BreadcrumbItem: React.ForwardRefExoticComponent<BreadcrumbItemProps & React.RefAttributes<HTMLLIElement>>;
declare const BreadcrumbSeparator: {
    ({ children, className, ...props }: BreadcrumbSeparatorProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const BreadcrumbEllipsis: {
    ({ className, ...props }: BreadcrumbEllipsisProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const BreadcrumbLink: React.ForwardRefExoticComponent<React.AnchorHTMLAttributes<HTMLAnchorElement> & React.RefAttributes<HTMLAnchorElement>>;
declare const BreadcrumbPage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;

/**
 * Premium Button Component
 *
 * A world-class, accessible, and versatile button component.
 * Pixel-perfect design with extensive variants and states.
 */
declare const buttonVariants: (props?: {
    variant?: "link" | "primary" | "success" | "ghost" | "outline" | "secondary" | "destructive" | "gradient" | "glow" | "soft" | "glass" | "neon";
    size?: "sm" | "lg" | "md" | "icon" | "xs" | "xl" | "icon-sm" | "icon-lg";
    rounded?: "none" | "default" | "sm" | "lg" | "full";
    fullWidth?: boolean;
} & class_variance_authority_dist_types.ClassProp) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
/**
 * Premium Button Component
 *
 * @param props - Button component properties
 * @param props.variant - Visual variant (primary, secondary, ghost, etc.)
 * @param props.size - Button size (xs, sm, md, lg, xl)
 * @param props.loading - Loading state display
 * @param props.leftIcon - Icon on the left side
 * @param props.rightIcon - Icon on the right side
 * @param props.fullWidth - Full width display
 * @param props.rounded - Corner rounding style (default, full, none)
 * @param props.asChild - For Radix UI polymorphic component
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const cardVariants: (props?: {
    variant?: "default" | "outline" | "filled" | "gradient" | "glass" | "elevated";
    size?: "default" | "sm" | "lg" | "xl";
    radius?: "none" | "default" | "sm" | "lg" | "full";
    interactive?: boolean;
} & class_variance_authority_dist_types.ClassProp) => string;
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
    asChild?: boolean;
    microInteraction?: "lift" | "glow" | "scale" | "none";
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

interface CalendarProps {
    mode?: "single" | "range" | "multiple";
    selected?: Date | Date[] | {
        from?: Date;
        to?: Date;
    } | undefined;
    onSelect?: (date: Date | Date[] | {
        from?: Date;
        to?: Date;
    } | undefined) => void;
    disabled?: (date: Date) => boolean;
    showOutsideDays?: boolean;
    className?: string;
    classNames?: Record<string, string>;
    numberOfMonths?: number;
    defaultMonth?: Date;
    initialFocus?: boolean;
}
declare function Calendar({ mode, selected, onSelect, disabled, showOutsideDays, className, classNames, numberOfMonths, defaultMonth, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;
declare namespace Calendar {
    var displayName: string;
}

interface CardNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value?: string;
    onChange?: (value: string, cardType: string) => void;
    showIcon?: boolean;
}
declare const CardNumberInput: React.ForwardRefExoticComponent<CardNumberInputProps & React.RefAttributes<HTMLInputElement>>;
interface CardExpiryInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value?: string;
    onChange?: (value: string) => void;
}
declare const CardExpiryInput: React.ForwardRefExoticComponent<CardExpiryInputProps & React.RefAttributes<HTMLInputElement>>;
interface CardCVCInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value?: string;
    onChange?: (value: string) => void;
    cardType?: string;
}
declare const CardCVCInput: React.ForwardRefExoticComponent<CardCVCInputProps & React.RefAttributes<HTMLInputElement>>;
interface CardZipInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value?: string;
    onChange?: (value: string) => void;
    format?: "US" | "CA" | "UK" | "other";
}
declare const CardZipInput: React.ForwardRefExoticComponent<CardZipInputProps & React.RefAttributes<HTMLInputElement>>;

/**
 * Checkbox Bileşeni
 *
 * Erişilebilir, özelleştirilebilir ve tema sistemiyle tam entegre checkbox bileşeni.
 * Form elemanları ve seçim listeleri için kullanılır.
 */
declare const checkboxVariants: (props?: {
    variant?: "default" | "ghost" | "outline" | "muted";
    size?: "default" | "sm" | "lg" | "md";
    radius?: "none" | "default" | "sm" | "full" | "md";
    animation?: "none" | "default" | "subtle" | "bounce";
} & class_variance_authority_dist_types.ClassProp) => string;
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, VariantProps<typeof checkboxVariants> {
    /**
     * İndeterminate durumu - grup seçimlerinde bazı öğeler seçilmişse kullanılır
     */
    indeterminate?: boolean;
    /**
     * Özel ikon komponenti
     */
    icon?: React.ReactNode;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Grup içi yerleşim - dikey veya yatay
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Öğeler arasındaki boşluk (piksel)
     */
    spacing?: number | string;
    /**
     * Alt bileşenler
     */
    children: React.ReactNode;
}
declare const CheckboxGroup: React.ForwardRefExoticComponent<CheckboxGroupProps & React.RefAttributes<HTMLDivElement>>;
interface CheckboxLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    /**
     * Checkbox bileşeni için HTML id
     */
    htmlFor?: string;
    /**
     * Label içeriği
     */
    children: React.ReactNode;
    /**
     * Checkbox öncesi veya sonrası
     */
    position?: "start" | "end";
    /**
     * Devre dışı durum stili
     */
    disabled?: boolean;
}
declare const CheckboxLabel: React.ForwardRefExoticComponent<CheckboxLabelProps & React.RefAttributes<HTMLLabelElement>>;
interface CheckboxWithLabelProps extends CheckboxProps {
    /**
     * Label içeriği
     */
    label: React.ReactNode;
    /**
     * Label pozisyonu
     */
    labelPosition?: "start" | "end";
    /**
     * Label için HTML sınıfları
     */
    labelClassName?: string;
}
declare const CheckboxWithLabel: React.ForwardRefExoticComponent<CheckboxWithLabelProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * Collapsible (Daraltılabilir) Bileşeni
 *
 * İçeriği genişletilip daraltılabilen hafif bir bileşendir.
 * Tema sistemiyle tam entegre, erişilebilir ve özelleştirilebilir.
 */
declare const Collapsible: React.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
declare const collapsibleTriggerVariants: (props?: {
    variant?: "default" | "ghost" | "outline";
    size?: "default" | "sm" | "lg" | "md";
} & class_variance_authority_dist_types.ClassProp) => string;
interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>, VariantProps<typeof collapsibleTriggerVariants> {
}
declare const CollapsibleTrigger: React.ForwardRefExoticComponent<CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const collapsibleContentVariants: (props?: {
    variant?: "default" | "ghost" | "outline";
    size?: "default" | "sm" | "lg" | "md";
} & class_variance_authority_dist_types.ClassProp) => string;
interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>, VariantProps<typeof collapsibleContentVariants> {
}
declare const CollapsibleContent: React.ForwardRefExoticComponent<CollapsibleContentProps & React.RefAttributes<HTMLDivElement>>;

/**
 * ColorPicker Component
 *
 * A comprehensive color picker with multiple input methods
 */
declare const colorPickerVariants: (props?: {
    size?: "default" | "sm" | "lg" | "xl";
    shape?: "circle" | "square" | "rounded";
} & class_variance_authority_dist_types.ClassProp) => string;
interface ColorPickerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value">, VariantProps<typeof colorPickerVariants> {
    /**
     * Current color value
     */
    value?: string;
    /**
     * Callback when color changes
     */
    onChange?: (color: string) => void;
    /**
     * Show color input
     */
    showInput?: boolean;
    /**
     * Show preset colors
     */
    showPresets?: boolean;
    /**
     * Preset colors
     */
    presets?: string[];
    /**
     * Allow opacity
     */
    allowOpacity?: boolean;
    /**
     * Color format
     */
    format?: "hex" | "rgb" | "hsl";
    /**
     * Disable copy button
     */
    disableCopy?: boolean;
    /**
     * Trigger mode
     */
    triggerMode?: "click" | "hover";
}
declare function ColorPicker({ className, size, shape, value, onChange, showInput, showPresets, presets, allowOpacity, format, disableCopy, triggerMode, disabled, ...props }: ColorPickerProps): react_jsx_runtime.JSX.Element;
/**
 * SimpleColorPicker Component
 *
 * A simplified color picker with preset colors only
 */
interface SimpleColorPickerProps {
    value?: string;
    onChange?: (color: string) => void;
    colors?: string[];
    className?: string;
    size?: "sm" | "default" | "lg";
}
declare function SimpleColorPicker({ value, onChange, colors, className, size, }: SimpleColorPickerProps): react_jsx_runtime.JSX.Element;
/**
 * GradientPicker Component
 *
 * Pick gradient colors
 */
interface GradientPickerProps {
    value?: {
        start: string;
        end: string;
        angle?: number;
    };
    onChange?: (gradient: {
        start: string;
        end: string;
        angle: number;
    }) => void;
    className?: string;
}
declare function GradientPicker({ value, onChange, className, }: GradientPickerProps): react_jsx_runtime.JSX.Element;

/**
 * Premium Dialog Component
 *
 * Modern, accessible and customizable modal dialog component.
 * Enhances user experience with variants, sizes and rich features.
 * Provides a premium appearance with dark and light mode compatibility and fluid animations.
 */
declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const overlayVariants: (props?: {
    variant?: "default" | "subtle" | "minimal" | "blur";
    animation?: "default" | "slow" | "fast";
} & class_variance_authority_dist_types.ClassProp) => string;
declare const dialogContentVariants: (props?: {
    variant?: "default" | "primary" | "ghost" | "secondary" | "destructive";
    size?: "default" | "sm" | "lg" | "full" | "md" | "xs" | "xl";
    radius?: "none" | "default" | "sm" | "lg" | "full" | "xl";
    animation?: "none" | "default" | "zoom" | "fade" | "slide";
    position?: "default" | "bottom" | "top";
} & class_variance_authority_dist_types.ClassProp) => string;
interface DialogContentProps extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, 'title'>, VariantProps<typeof dialogContentVariants> {
    /** X butonunu gizle */
    hideCloseButton?: boolean;
    /** Overlay varyantı */
    overlayVariant?: VariantProps<typeof overlayVariants>["variant"];
    /** Overlay animasyonu */
    overlayAnimation?: VariantProps<typeof overlayVariants>["animation"];
    /** İçerik başlığı (hızlı kullanım için) */
    title?: React.ReactNode;
    /** İçerik açıklaması (hızlı kullanım için) */
    description?: React.ReactNode;
    /** Başlık ikonu */
    icon?: React.ReactNode;
    /** Yükleniyor durumu */
    loading?: boolean;
    /** Success durumu */
    success?: boolean;
    /** Özel onClose handler */
    onClose?: () => void;
}
declare const DialogContent: React.ForwardRefExoticComponent<DialogContentProps & React.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
/**
 * Dialog-Form integration for use with form support
 * Used to integrate form submission processes into the modal
 */
declare const DialogForm: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLFormElement> & React.RefAttributes<HTMLFormElement>>;

/**
 * Command (Komut Paleti) Bileşeni
 *
 * Gerçek command palette işlevselliği ile klavye navigasyonu, arama ve filtreleme.
 * cmdk kütüphanesi üzerine inşa edilmiş, tam özellikli command interface.
 */
declare const commandVariants: (props?: {
    variant?: "default" | "glass" | "bordered";
    size?: "default" | "sm" | "lg";
} & class_variance_authority_dist_types.ClassProp) => string;
interface CommandProps extends React.ComponentProps<typeof Command$1>, VariantProps<typeof commandVariants> {
}
declare const Command: React.ForwardRefExoticComponent<Omit<CommandProps, "ref"> & React.RefAttributes<never>>;
interface CommandDialogProps extends React.ComponentProps<typeof Dialog> {
    commandClassName?: string;
    children?: React.ReactNode;
}
declare const CommandDialog: ({ children, commandClassName, ...props }: CommandDialogProps) => react_jsx_runtime.JSX.Element;
interface CommandInputProps extends React.ComponentProps<typeof Command$1.Input> {
}
declare const CommandInput: React.ForwardRefExoticComponent<Omit<CommandInputProps, "ref"> & React.RefAttributes<never>>;
interface CommandListProps extends React.ComponentProps<typeof Command$1.List> {
}
declare const CommandList: React.ForwardRefExoticComponent<Omit<CommandListProps, "ref"> & React.RefAttributes<never>>;
interface CommandEmptyProps extends React.ComponentProps<typeof Command$1.Empty> {
}
declare const CommandEmpty: React.ForwardRefExoticComponent<Omit<CommandEmptyProps, "ref"> & React.RefAttributes<never>>;
interface CommandGroupProps extends React.ComponentProps<typeof Command$1.Group> {
}
declare const CommandGroup: React.ForwardRefExoticComponent<Omit<CommandGroupProps, "ref"> & React.RefAttributes<never>>;
interface CommandSeparatorProps extends React.ComponentProps<typeof Command$1.Separator> {
}
declare const CommandSeparator: React.ForwardRefExoticComponent<Omit<CommandSeparatorProps, "ref"> & React.RefAttributes<never>>;
interface CommandItemProps extends React.ComponentProps<typeof Command$1.Item> {
}
declare const CommandItem: React.ForwardRefExoticComponent<Omit<CommandItemProps, "ref"> & React.RefAttributes<never>>;
declare const CommandShortcut: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

/**
 * Basic DataTable Component
 *
 * A simple data table with sorting, filtering, and pagination.
 * For advanced features, upgrade to MoonUI Pro.
 */
interface DataTableBasicProps<TData, TValue> {
    /**
     * The table columns definition
     */
    columns: ColumnDef<TData, TValue>[];
    /**
     * The data to display
     */
    data: TData[];
    /**
     * Enable/disable sorting
     */
    enableSorting?: boolean;
    /**
     * Enable/disable pagination
     */
    enablePagination?: boolean;
    /**
     * Enable/disable global search
     */
    enableSearch?: boolean;
    /**
     * Default page size
     */
    pageSize?: number;
    /**
     * Search placeholder text
     */
    searchPlaceholder?: string;
    /**
     * Empty state message
     */
    emptyMessage?: string;
    /**
     * Class name
     */
    className?: string;
}
declare function DataTableBasic<TData, TValue>({ columns, data, enableSorting, enablePagination, enableSearch, pageSize, searchPlaceholder, emptyMessage, className, }: DataTableBasicProps<TData, TValue>): react_jsx_runtime.JSX.Element;
/**
 * Simple sortable header helper
 */
declare function createSortableHeader(label: string): ({ column }: any) => react_jsx_runtime.JSX.Element;

/**
 * DatePicker Component
 *
 * A comprehensive date picker with calendar interface
 */
declare const datePickerVariants: (props?: {
    variant?: "default" | "ghost" | "outline";
    size?: "default" | "sm" | "lg" | "icon";
    state?: "default" | "success" | "warning" | "error";
} & class_variance_authority_dist_types.ClassProp) => string;
interface DatePickerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value">, VariantProps<typeof datePickerVariants> {
    /**
     * Selected date value
     */
    value?: Date;
    /**
     * Callback when date changes
     */
    onChange?: (date: Date | undefined) => void;
    /**
     * Placeholder text
     */
    placeholder?: string;
    /**
     * Date format string
     */
    formatString?: string;
    /**
     * Minimum selectable date
     */
    minDate?: Date;
    /**
     * Maximum selectable date
     */
    maxDate?: Date;
    /**
     * Disabled dates
     */
    disabledDates?: Date[];
    /**
     * Disabled days of week (0-6, Sunday is 0)
     */
    disabledDaysOfWeek?: number[];
    /**
     * Show week numbers
     */
    showWeekNumbers?: boolean;
    /**
     * Icon position
     */
    iconPosition?: "left" | "right";
    /**
     * Custom icon
     */
    icon?: React.ReactNode;
    /**
     * Allow clear
     */
    allowClear?: boolean;
    /**
     * Read only
     */
    readOnly?: boolean;
    /**
     * Show today button
     */
    showTodayButton?: boolean;
    /**
     * Calendar props
     */
    calendarProps?: React.ComponentProps<typeof Calendar>;
}
declare function DatePicker({ className, variant, size, state, value, onChange, placeholder, formatString, minDate, maxDate, disabledDates, disabledDaysOfWeek, showWeekNumbers, iconPosition, icon, allowClear, readOnly, showTodayButton, calendarProps, disabled, ...props }: DatePickerProps): react_jsx_runtime.JSX.Element;
/**
 * DateRangePicker Component
 *
 * Select a date range with start and end dates
 */
interface DateRangePickerProps extends Omit<DatePickerProps, "value" | "onChange"> {
    /**
     * Selected date range
     */
    value?: {
        from: Date | undefined;
        to: Date | undefined;
    };
    /**
     * Callback when date range changes
     */
    onChange?: (range: {
        from: Date | undefined;
        to: Date | undefined;
    } | undefined) => void;
    /**
     * Separator between dates
     */
    separator?: string;
}
declare function DateRangePicker({ className, value, onChange, placeholder, formatString, separator, ...props }: DateRangePickerProps): react_jsx_runtime.JSX.Element;
/**
 * DateTimePicker Component
 *
 * Combined date and time picker
 */
interface DateTimePickerProps extends DatePickerProps {
    /**
     * Show time picker
     */
    showTimePicker?: boolean;
    /**
     * Time format (12 or 24 hour)
     */
    timeFormat?: "12" | "24";
    /**
     * Time interval in minutes
     */
    timeInterval?: number;
}
declare function DateTimePicker({ value, onChange, formatString, showTimePicker, timeFormat, timeInterval, ...props }: DateTimePickerProps): react_jsx_runtime.JSX.Element;
/**
 * MonthPicker Component
 *
 * Select month and year
 */
interface MonthPickerProps extends Omit<DatePickerProps, "formatString"> {
    /**
     * Format for displaying the month
     */
    formatString?: string;
}
declare function MonthPicker({ value, onChange, placeholder, formatString, ...props }: MonthPickerProps): react_jsx_runtime.JSX.Element;

interface DraggableListProps<T> {
    items: T[];
    onReorder: (items: T[]) => void;
    renderItem: (item: T, index: number) => React.ReactNode;
    keyExtractor: (item: T) => string;
    className?: string;
    disabled?: boolean;
}
declare function DraggableList<T>({ items, onReorder, renderItem, keyExtractor, className, disabled }: DraggableListProps<T>): react_jsx_runtime.JSX.Element;

declare const DropdownMenu: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuShortcut: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

interface FileUploadProps {
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    maxFiles?: number;
    disabled?: boolean;
    className?: string;
    onUpload?: (files: File[]) => Promise<void>;
    onRemove?: (fileId: string) => void;
    children?: React__default.ReactNode;
}
declare const FileUpload: React__default.ForwardRefExoticComponent<FileUploadProps & React__default.RefAttributes<HTMLDivElement>>;

interface GestureDrawerProps {
    children: React__default.ReactNode;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    direction?: "up" | "down" | "left" | "right";
    threshold?: number;
    className?: string;
    overlayClassName?: string;
    enableSwipeToClose?: boolean;
}
declare const GestureDrawer: React__default.ForwardRefExoticComponent<GestureDrawerProps & React__default.RefAttributes<HTMLDivElement>>;

interface GitHubStarsProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    showForks?: boolean;
    showWatchers?: boolean;
    repoUrl?: string;
}
declare function GitHubStars({ className, size, showForks, showWatchers, repoUrl }: GitHubStarsProps): react_jsx_runtime.JSX.Element;
declare function GitHubStarButton({ className, size, repoUrl }: {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    repoUrl?: string;
}): react_jsx_runtime.JSX.Element;

declare const inputVariants: (props?: {
    variant?: "ghost" | "underline" | "filled" | "standard";
    size?: "sm" | "lg" | "md";
    hasLeftIcon?: boolean;
    hasRightIcon?: boolean;
    hasRightButton?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
    isDisabled?: boolean;
} & class_variance_authority_dist_types.ClassProp) => string;
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, Omit<VariantProps<typeof inputVariants>, "isDisabled" | "hasLeftIcon" | "hasRightIcon" | "hasRightButton"> {
    /** Label metni */
    label?: string;
    /** Floating label animasyonu (Material Design pattern) */
    floatingLabel?: boolean;
    /** Floating label için ek sınıflar */
    floatingLabelClassName?: string;
    /** Hata mesajı */
    error?: string;
    /** Başarı mesajı */
    success?: string;
    /** Yükleniyor durumu */
    loading?: boolean;
    /** Sol tarafta gösterilecek ikon */
    leftIcon?: React.ReactNode;
    /** Sağ tarafta gösterilecek ikon */
    rightIcon?: React.ReactNode;
    /** Sağ tarafta gösterilecek buton (password show/hide vb. için) */
    rightButton?: React.ReactNode;
    /** Mesajın görünürlüğü (true: her zaman görünür, false: sadece hata/başarı durumunda) */
    alwaysShowMessage?: boolean;
    /** Input wrapper için ek sınıflar */
    wrapperClassName?: string;
    /** Mesaj için ek sınıflar */
    messageClassName?: string;
}
/**
 * Premium Input Component
 *
 * @param props - Input bileşeni özellikleri
 * @param props.variant - Görsel varyant (standard, filled, ghost, underline)
 * @param props.size - Boyut (sm, md, lg)
 * @param props.error - Hata mesajı
 * @param props.success - Başarı mesajı
 * @param props.loading - Yükleniyor durumu
 * @param props.leftIcon - Sol tarafta gösterilecek ikon
 * @param props.rightIcon - Sağ tarafta gösterilecek ikon
 * @param props.rightButton - Sağ tarafta gösterilecek buton
 * @param props.alwaysShowMessage - Mesajın her zaman görünür olması
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: class_variance_authority_dist_types.ClassProp) => string> & React.RefAttributes<HTMLLabelElement>>;

interface LockedComponentProps {
    children: React__default.ReactNode;
    componentName: string;
    className?: string;
    showPreview?: boolean;
    previewDuration?: number;
}
declare function LockedComponent({ children, componentName, className, showPreview, previewDuration }: LockedComponentProps): react_jsx_runtime.JSX.Element;
interface ProComponentWrapperProps {
    children: React__default.ReactNode;
    componentId: string;
    componentName?: string;
    className?: string;
    fallback?: React__default.ReactNode;
    requireCLI?: boolean;
}
declare function ProComponentWrapper({ children, componentId, componentName, className, fallback, requireCLI }: ProComponentWrapperProps): react_jsx_runtime.JSX.Element;
declare function ProBadge({ className }: {
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function FreeBadge({ className }: {
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface MoonLogoProps extends React.SVGProps<SVGSVGElement> {
    variant?: "default" | "monochrome" | "gradient";
    showText?: boolean;
}
declare function MoonLogo({ className, variant, showText, ...props }: MoonLogoProps): react_jsx_runtime.JSX.Element;
declare function MoonLogoIcon({ className, variant, ...props }: Omit<MoonLogoProps, "showText">): react_jsx_runtime.JSX.Element;
declare function MoonLogoAnimated({ className, variant, showText, ...props }: MoonLogoProps): react_jsx_runtime.JSX.Element;

declare const Pagination: {
    ({ className, ...props }: React.ComponentProps<"nav">): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
declare const PaginationItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
type PaginationLinkProps = {
    isActive?: boolean;
} & Partial<Pick<ButtonProps, "size">> & React.ComponentProps<"a">;
declare const PaginationLink: {
    ({ className, isActive, size, ...props }: PaginationLinkProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationPrevious: {
    ({ className, ...props }: React.ComponentProps<typeof PaginationLink>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationNext: {
    ({ className, ...props }: React.ComponentProps<typeof PaginationLink>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationEllipsis: {
    ({ className, ...props }: React.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const countryCodes: {
    code: string;
    country: string;
    flag: string;
    name: string;
}[];
interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value?: string;
    onChange?: (value: string, countryCode: string) => void;
    defaultCountry?: string;
    showIcon?: boolean;
    showCountrySelect?: boolean;
    countries?: typeof countryCodes;
}
declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<HTMLInputElement>>;

/**
 * Popover Bileşeni
 *
 * Tıklanabilir bir öğeden açılan, tema sistemiyle tam entegre bir içerik bileşeni.
 * Filtreler, ayarlar ve diğer içerikler için kullanışlı ve erişilebilir bir arayüz sağlar.
 */
declare const popoverContentVariants: (props?: {
    variant?: "default" | "outline" | "destructive" | "subtle";
    size?: "default" | "sm" | "lg";
    side?: "left" | "right" | "bottom" | "top";
    position?: "default" | "pointerEventsNone";
    radius?: "none" | "default" | "sm" | "lg" | "full";
    shadow?: "none" | "default" | "sm" | "lg" | "md" | "xl";
} & class_variance_authority_dist_types.ClassProp) => string;
declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
interface PopoverContentProps extends Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, 'side'>, VariantProps<typeof popoverContentVariants> {
    /**
     * Popover'ın arka plan bulanıklığı etkin mi
     */
    backdrop?: boolean;
    /**
     * Popover'a tıklandığında kapanıp kapanmayacağı
     */
    closeOnInteractOutside?: boolean;
    /**
     * Popover açıkken arka planın karartılması
     */
    overlayBackdrop?: boolean;
}
declare const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
/**
 * PopoverClose bileşeni
 */
declare const PopoverClose: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverCloseProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * Popover için bölüm ayırıcı
 */
declare const PopoverSeparator: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
/**
 * Popover başlık bileşeni
 */
declare const PopoverHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
/**
 * Popover footer bileşeni
 */
declare const PopoverFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

/**
 * Progress Bileşeni
 *
 * İlerleme durumunu görsel olarak gösteren, tema sistemiyle tam entegre bir bileşen.
 * Yükleme işlemleri, form gönderimi ve diğer zaman alan işlemleri göstermek için kullanılır.
 */
declare const progressVariants: (props?: {
    variant?: "default" | "primary" | "success" | "warning" | "error" | "secondary";
    size?: "default" | "sm" | "lg" | "md" | "xs" | "xl";
    radius?: "none" | "default" | "sm" | "lg" | "full";
    animation?: "none" | "default" | "smooth" | "fast";
} & class_variance_authority_dist_types.ClassProp) => string;
declare const progressIndicatorVariants: (props?: {
    variant?: "default" | "primary" | "success" | "warning" | "error" | "secondary";
    animation?: "none" | "default" | "smooth" | "fast";
} & class_variance_authority_dist_types.ClassProp) => string;
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof progressVariants> {
    /**
     * İlerleme çubuğu değeri (0-100)
     */
    value?: number;
    /**
     * İndikatör (dolgu) için renk varyantı
     */
    indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"];
    /**
     * İlerleme durumunu gösteren metin görünürlüğü
     */
    showValueLabel?: boolean;
    /**
     * İlerleme değeri etiketi için format (ör: "30%" veya "3/10")
     */
    valueLabel?: string;
    /**
     * Etiket stili
     */
    labelClassName?: string;
    /**
     * Belirsiz ilerleme animasyonu (indeterminate)
     */
    indeterminate?: boolean;
    /**
     * İlerleme değeri maksimumu (default: 100)
     */
    max?: number;
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Radio Group Component
 *
 * Accessible, customizable, and fully integrated with the theme system radio button group.
 * Allows users to select a single option from a group of choices.
 */
declare const radioGroupItemVariants: (props?: {
    variant?: "default" | "outline" | "filled";
    size?: "default" | "sm" | "lg" | "md";
} & class_variance_authority_dist_types.ClassProp) => string;
interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Radio group value
     */
    value?: string;
    /**
     * Function to call when radio group value changes
     */
    onValueChange?: (value: string) => void;
    /**
     * Radio group disabled state
     */
    disabled?: boolean;
    /**
     * Radio group name
     */
    name?: string;
}
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof radioGroupItemVariants> {
    /**
     * Custom indicator component
     */
    indicator?: React.ReactNode;
    /**
     * HTML id for radio button
     */
    id?: string;
    /**
     * Radio button value
     */
    value: string;
    /**
     * Radio button disabled state
     */
    disabled?: boolean;
}
declare const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLInputElement>>;
interface RadioLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    /**
     * HTML id for radio button
     */
    htmlFor?: string;
    /**
     * Label content
     */
    children: React.ReactNode;
    /**
     * Disabled state style
     */
    disabled?: boolean;
}
declare const RadioLabel: React.ForwardRefExoticComponent<RadioLabelProps & React.RefAttributes<HTMLLabelElement>>;
interface RadioItemWithLabelProps extends RadioGroupItemProps {
    /**
     * Label content
     */
    label: React.ReactNode;
    /**
     * HTML classes for label
     */
    labelClassName?: string;
    /**
     * HTML id for radio button
     */
    id?: string;
    /**
     * Disabled state
     */
    disabled?: boolean;
}
declare const RadioItemWithLabel: React.ForwardRefExoticComponent<RadioItemWithLabelProps & React.RefAttributes<HTMLInputElement>>;

interface RichTextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}
declare function RichTextEditor({ value, onChange, placeholder, className, disabled }: RichTextEditorProps): react_jsx_runtime.JSX.Element;

declare const ScrollArea: React.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<never>>;
declare const ScrollBar: React.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<never>>;

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
    distance?: number;
    threshold?: number;
    triggerOnce?: boolean;
    stagger?: number;
    className?: string;
    variants?: Variants;
    animate?: boolean;
    style?: React.CSSProperties;
    id?: string;
}
declare const ScrollReveal: React.ForwardRefExoticComponent<ScrollRevealProps & React.RefAttributes<HTMLDivElement>>;
interface ScrollRevealContainerProps {
    children: React.ReactNode;
    stagger?: number;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
}
declare const ScrollRevealContainer: React.ForwardRefExoticComponent<ScrollRevealContainerProps & React.RefAttributes<HTMLDivElement>>;
interface ScrollRevealItemProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    distance?: number;
    className?: string;
    variants?: Variants;
    style?: React.CSSProperties;
    id?: string;
}
declare const ScrollRevealItem: React.ForwardRefExoticComponent<ScrollRevealItemProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Premium Select Component
 *
 * Advanced dropdown/select component with variants, sizes and accessibility features.
 * Compatible with dark and light mode, providing a modern user experience with smooth animations.
 */
declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
type SelectTriggerVariant = "standard" | "outline" | "ghost" | "underline";
type SelectTriggerSize = "sm" | "md" | "lg";
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
    /** Visual variant */
    variant?: SelectTriggerVariant;
    /** Size */
    size?: SelectTriggerSize;
    /** Error state */
    error?: boolean | string;
    /** Success state */
    success?: boolean;
    /** Loading state */
    loading?: boolean;
    /** Icon displayed on the left */
    leftIcon?: React.ReactNode;
    /** Icon displayed on the right (instead of default chevron) */
    rightIcon?: React.ReactNode;
}
declare const SelectTrigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * Scroll Up Button Component
 */
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Scroll Down Button Component
 */
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SelectItemVariant = "default" | "subtle" | "destructive" | "success" | "warning";
type SelectItemSize = "sm" | "md" | "lg";
interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
    /** Visual variant */
    variant?: SelectItemVariant;
    /** Size */
    size?: SelectItemSize;
    /** Icon displayed on the right */
    rightIcon?: React.ReactNode;
    /** Custom indicator icon (instead of default check) */
    customIndicator?: React.ReactNode;
}
declare const SelectItem: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const separatorVariants: (props?: {
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "dashed" | "dotted" | "gradient";
    size?: "sm" | "lg" | "md";
} & class_variance_authority_dist_types.ClassProp) => string;
interface SeparatorProps extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, keyof VariantProps<typeof separatorVariants>>, VariantProps<typeof separatorVariants> {
}
declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;

interface SimpleEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    minHeight?: number;
    maxHeight?: number;
    showToolbar?: boolean;
    showPreview?: boolean;
}
declare const SimpleEditor: React__default.ForwardRefExoticComponent<SimpleEditorProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Skeleton Component
 *
 * A loading placeholder that mimics the structure of content.
 * Fully integrated with the theme system and provides various shapes, sizes, and animations.
 */
declare const skeletonVariants: (props?: {
    variant?: "default" | "primary" | "secondary" | "accent";
    size?: "default" | "sm" | "lg";
    shape?: "circle" | "rect" | "pill";
    animation?: "none" | "pulse" | "wave";
} & class_variance_authority_dist_types.ClassProp) => string;
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
    /**
     * Height of the skeleton
     */
    height?: string | number;
    /**
     * Width of the skeleton
     */
    width?: string | number;
    /**
     * Whether the content is loaded
     */
    isLoaded?: boolean;
    /**
     * Content to show when loaded
     */
    children?: React.ReactNode;
    /**
     * Fade-in animation duration in ms
     */
    fadeInDuration?: number;
    /**
     * Use motion animation for loading state
     */
    motion?: boolean;
}
declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Text Skeleton Component
 *
 * Creates skeleton loading states for text content
 */
interface SkeletonTextProps extends Omit<SkeletonProps, "children" | "isLoaded"> {
    /**
     * Kaç satır gösterileceği
     */
    lines?: number;
    /**
     * Satır yüksekliği
     */
    lineHeight?: string | number;
    /**
     * Satırlar arası boşluk
     */
    spacing?: string | number;
    /**
     * Son satırın genişlik yüzdesi (0-100)
     */
    lastLineWidth?: number;
    /**
     * Rastgele satır genişlikleri
     */
    randomWidths?: boolean;
}
declare const SkeletonText: React.ForwardRefExoticComponent<SkeletonTextProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Avatar Skeleton Component
 */
interface SkeletonAvatarProps extends Omit<SkeletonProps, "shape" | "size"> {
    /**
     * Avatar boyutu (piksel)
     */
    size?: string | number;
}
declare const SkeletonAvatar: React.ForwardRefExoticComponent<SkeletonAvatarProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Card Skeleton Component
 */
interface SkeletonCardProps extends Omit<SkeletonProps, "children" | "isLoaded"> {
    /**
     * Kart başlığının gösterilip gösterilmeyeceği
     */
    showHeader?: boolean;
    /**
     * İçerik satır sayısı
     */
    contentLines?: number;
    /**
     * Alt bilgi gösterilip gösterilmeyeceği
     */
    showFooter?: boolean;
}
declare const SkeletonCard: React.ForwardRefExoticComponent<SkeletonCardProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Slider Component
 *
 * Accessible, customizable slider component fully integrated with the theme system.
 * Used for value ranges like volume, brightness, price ranges.
 */
declare const sliderVariants: (props?: {
    size?: "default" | "sm" | "lg" | "md";
} & class_variance_authority_dist_types.ClassProp) => string;
declare const sliderTrackVariants: (props?: {
    variant?: "default" | "primary" | "success" | "warning" | "error" | "secondary" | "accent";
} & class_variance_authority_dist_types.ClassProp) => string;
declare const sliderRangeVariants: (props?: {
    variant?: "default" | "primary" | "success" | "warning" | "error" | "secondary" | "accent";
} & class_variance_authority_dist_types.ClassProp) => string;
declare const sliderThumbVariants: (props?: {
    variant?: "default" | "primary" | "success" | "warning" | "error" | "secondary" | "accent";
    size?: "default" | "sm" | "lg" | "md";
} & class_variance_authority_dist_types.ClassProp) => string;
type SliderBaseProps = {
    /**
     * Track variant
     */
    trackVariant?: VariantProps<typeof sliderTrackVariants>["variant"];
    /**
     * Range variant
     */
    rangeVariant?: VariantProps<typeof sliderRangeVariants>["variant"];
    /**
     * Thumb variant
     */
    thumbVariant?: VariantProps<typeof sliderThumbVariants>["variant"];
    /**
     * Thumb size
     */
    thumbSize?: VariantProps<typeof sliderThumbVariants>["size"];
    /**
     * Show value label
     */
    showValueLabel?: boolean;
    /**
     * Value label format function
     */
    valueLabelFormat?: (value: number) => string;
    /**
     * Value label class name
     */
    valueLabelClassName?: string;
    /**
     * Slider value
     */
    value?: number[];
    /**
     * Default value
     */
    defaultValue?: number[];
    /**
     * Function called when value changes
     */
    onValueChange?: (value: number[]) => void;
    /**
     * Minimum value
     */
    min?: number;
    /**
     * Maximum value
     */
    max?: number;
    /**
     * Step value
     */
    step?: number;
    /**
     * Slider size
     */
    size?: VariantProps<typeof sliderVariants>["size"];
    /**
     * Disabled state
     */
    disabled?: boolean;
};
declare const Slider: React.ForwardRefExoticComponent<SliderBaseProps & Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> & React.RefAttributes<HTMLDivElement>>;

interface SwipeableCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    threshold?: number;
    disabled?: boolean;
}
declare const SwipeableCard: React.ForwardRefExoticComponent<SwipeableCardProps & React.RefAttributes<HTMLDivElement>>;

type SwitchSize = "sm" | "md" | "lg";
type SwitchVariant = "primary" | "success" | "warning" | "danger" | "secondary";
interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
    /** Switch boyutu */
    size?: SwitchSize;
    /** Switch renk varyantı */
    variant?: SwitchVariant;
    /** Yükleniyor durumunu gösterir */
    loading?: boolean;
    /** Sol tarafta gösterilecek ikon */
    leftIcon?: React.ReactNode;
    /** Sağ tarafta gösterilecek ikon */
    rightIcon?: React.ReactNode;
    /** Switch açıklaması */
    description?: string;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;

type SortDirection = "asc" | "desc" | null;
declare const tableVariants: (props?: {
    variant?: "default" | "card" | "minimal" | "bordered" | "striped";
    size?: "default" | "sm" | "lg";
} & class_variance_authority_dist_types.ClassProp) => string;
interface ColumnDefinition<T> {
    id: string;
    header: React.ReactNode;
    accessorKey?: keyof T;
    cell?: (row: T) => React.ReactNode;
    sortable?: boolean;
}
interface TableProps<T> extends React.HTMLAttributes<HTMLTableElement>, VariantProps<typeof tableVariants> {
    /** Veri yükleniyor durumunu gösterir */
    loading?: boolean;
    /** Sıralama için kullanılan sütun */
    sortColumn?: string;
    /** Sıralama yönü */
    sortDirection?: SortDirection;
    /** Sıralama değiştiğinde çağrılacak fonksiyon */
    onSortChange?: (column: string, direction: SortDirection) => void;
    /** Boş durum için özel içerik */
    emptyContent?: React.ReactNode;
    /** Seçili satır id'leri */
    selectedRowIds?: string[];
    /** Satır seçim değiştiğinde çağrılacak fonksiyon */
    onRowSelectionChange?: (selectedRowIds: string[]) => void;
    /** Satır seçim devre dışı */
    disableRowSelection?: boolean;
    /** Her satır için benzersiz id çıkarma fonksiyonu */
    getRowId?: (row: T) => string;
}
declare const Table: React.ForwardRefExoticComponent<TableProps<unknown> & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** Veri yoksa gösterilecek boş durum içeriği */
    emptyContent?: React.ReactNode;
    /** Varsayılan boş durum mesajı */
    emptyMessage?: string;
}
declare const TableBody: React.ForwardRefExoticComponent<TableBodyProps & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    /** Bu sütun için sıralama durumu */
    sortable?: boolean;
    /** Bu sütunun sıralanma durumu */
    sorted?: SortDirection;
    /** Sıralama değiştiğinde çağrılacak fonksiyon */
    onSort?: () => void;
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
}
declare const TableHead: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
}
declare const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
    /** Mobil görünümde dikey düzen için */
    vertical?: boolean;
}
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const tabsListVariants: (props?: {
    variant?: "default" | "underline" | "pills" | "cards" | "minimal";
    orientation?: "horizontal" | "vertical";
    fullWidth?: boolean;
} & class_variance_authority_dist_types.ClassProp) => string;
interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>, VariantProps<typeof tabsListVariants> {
    /** Dikey düzende göster */
    orientation?: "horizontal" | "vertical";
}
declare const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
declare const tabsTriggerVariants: (props?: {
    variant?: "default" | "underline" | "pills" | "cards" | "minimal";
    size?: "sm" | "lg" | "md";
    orientation?: "horizontal" | "vertical";
    fullWidth?: boolean;
} & class_variance_authority_dist_types.ClassProp) => string;
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, VariantProps<typeof tabsTriggerVariants> {
    /** İkon konumu */
    iconPosition?: "left" | "right" | "none";
    /** İkon */
    icon?: React.ReactNode;
    /** Badge içeriği */
    badge?: React.ReactNode;
    /** Aktif olmayan durumda yarı saydam */
    fadeTabs?: boolean;
    /** Dikey düzende göster */
    orientation?: "horizontal" | "vertical";
}
declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
    /** İçerik animasyonu */
    animated?: boolean;
}
declare const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;

interface TagsInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    value: string[];
    onChange: (tags: string[]) => void;
    maxTags?: number;
    variant?: "primary" | "secondary" | "destructive" | "outline";
    allowDuplicates?: boolean;
    delimiter?: string;
}
declare const TagsInput: React.ForwardRefExoticComponent<TagsInputProps & React.RefAttributes<HTMLInputElement>>;

/**
 * Textarea Variant Styles
 */
declare const textareaVariants: (props?: {
    variant?: "default" | "ghost" | "outline" | "underline";
    size?: "sm" | "lg" | "md";
    isError?: boolean;
    isSuccess?: boolean;
} & class_variance_authority_dist_types.ClassProp) => string;
interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">, Omit<VariantProps<typeof textareaVariants>, "isError" | "isSuccess"> {
    /** Hata mesajı */
    error?: boolean | string;
    /** Başarı mesajı */
    success?: boolean | string;
    /** Yükleniyor durumu */
    loading?: boolean;
    /** Otomatik yükseklik ayarlama */
    autoResize?: boolean;
    /** Maksimum yükseklik (px) */
    maxHeight?: number;
    /** Karakter sayacı göster */
    characterCount?: boolean;
    /** Wrapper için ek sınıflar */
    wrapperClassName?: string;
    /** Mesaj için ek sınıflar */
    messageClassName?: string;
}
/**
 * Advanced Textarea Component
 *
 * Features:
 * - Auto-resize based on content
 * - Character count display
 * - Max height constraint
 * - Multiple variants
 * - Error/Success states
 * - Loading state
 */
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

declare const ToastProvider: React.FC<ToastPrimitives.ToastProviderProps>;
declare const ToastViewport: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastViewportProps & React.RefAttributes<HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
declare const toastVariants: (props?: {
    variant?: "default" | "success" | "warning" | "info" | "destructive";
} & class_variance_authority_dist_types.ClassProp) => string;
type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;
declare const ToastAction: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastClose: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastTitle: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastTitleProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToastDescription: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastDescriptionProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type ToastData = {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
    variant?: ToastProps["variant"];
    duration?: number;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};
declare const Toast: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastProps & React.RefAttributes<HTMLLIElement>, "ref"> & VariantProps<(props?: {
    variant?: "default" | "success" | "warning" | "info" | "destructive";
} & class_variance_authority_dist_types.ClassProp) => string> & React.RefAttributes<HTMLLIElement>>;
type Toast = Omit<ToastData, "id">;
declare function toast({ ...props }: Toast): {
    id: string;
    dismiss: () => void;
    update: (props: ToastData) => void;
};
declare function useToast(): {
    toast: typeof toast;
    dismiss: (toastId?: string) => void;
    toasts: ToastData[];
};
declare function Toaster(): react_jsx_runtime.JSX.Element;

declare const toggleVariants: (props?: {
    variant?: "default" | "outline";
    size?: "default" | "sm" | "lg";
} & class_variance_authority_dist_types.ClassProp) => string;
interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>, VariantProps<typeof toggleVariants> {
}
declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<never>>;

declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const tooltipVariants: (props?: {
    variant?: "default" | "success" | "warning" | "info" | "secondary" | "destructive";
    size?: "sm" | "lg" | "md";
} & class_variance_authority_dist_types.ClassProp) => string;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TooltipArrow: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipArrowProps & React.RefAttributes<SVGSVGElement>, "ref"> & React.RefAttributes<SVGSVGElement>>;
interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, VariantProps<typeof tooltipVariants> {
    showArrow?: boolean;
}
declare const TooltipContent: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>;
interface SimpleTooltipProps {
    children: React.ReactElement;
    content: React.ReactNode;
    variant?: TooltipContentProps["variant"];
    size?: TooltipContentProps["size"];
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    delayDuration?: number;
    sideOffset?: number;
    showArrow?: boolean;
    className?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
declare const SimpleTooltip: React.ForwardRefExoticComponent<SimpleTooltipProps & React.RefAttributes<HTMLDivElement>>;

declare function cn(...inputs: ClassValue[]): string;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertProps, AlertTitle, AspectRatio, AspectRatioProps, Avatar, AvatarFallback, AvatarGroup, AvatarImage, AvatarProps, Badge, BadgeProps, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, ButtonProps, Card, CardCVCInput, CardCVCInputProps, CardContent, CardDescription, CardExpiryInput, CardExpiryInputProps, CardFooter, CardHeader, CardNumberInput, CardNumberInputProps, CardProps, CardTitle, CardZipInput, CardZipInputProps, Checkbox, CheckboxGroup, CheckboxLabel, CheckboxProps, CheckboxWithLabel, Collapsible, CollapsibleContent, CollapsibleContentProps, CollapsibleTrigger, CollapsibleTriggerProps, ColorPicker, ColorPickerProps, ColumnDefinition, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, DatePicker, DatePickerProps, DateRangePicker, DateRangePickerProps, DateTimePicker, DateTimePickerProps, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogForm, DialogHeader, DialogTitle, DialogTrigger, DraggableList, DraggableListProps, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, FileUpload, FileUploadProps, FreeBadge, GestureDrawer, GestureDrawerProps, GitHubStarButton, GitHubStars, GradientPicker, GradientPickerProps, Input, InputProps, Label, LockedComponent, MonthPicker, MonthPickerProps, MoonLogo, MoonLogoAnimated, MoonLogoIcon, Accordion as MoonUIAccordion, AccordionContent as MoonUIAccordionContent, AccordionItem as MoonUIAccordionItem, AccordionTrigger as MoonUIAccordionTrigger, Alert as MoonUIAlert, AlertDescription as MoonUIAlertDescription, AlertProps as MoonUIAlertProps, AlertTitle as MoonUIAlertTitle, AspectRatio as MoonUIAspectRatio, Avatar as MoonUIAvatar, AvatarFallback as MoonUIAvatarFallback, AvatarGroup as MoonUIAvatarGroup, AvatarImage as MoonUIAvatarImage, AvatarProps as MoonUIAvatarProps, Badge as MoonUIBadge, BadgeProps as MoonUIBadgeProps, Breadcrumb as MoonUIBreadcrumb, BreadcrumbEllipsis as MoonUIBreadcrumbEllipsis, BreadcrumbItem as MoonUIBreadcrumbItem, BreadcrumbLink as MoonUIBreadcrumbLink, BreadcrumbList as MoonUIBreadcrumbList, BreadcrumbPage as MoonUIBreadcrumbPage, BreadcrumbSeparator as MoonUIBreadcrumbSeparator, Button as MoonUIButton, ButtonProps as MoonUIButtonProps, Calendar as MoonUICalendar, CalendarProps as MoonUICalendarProps, Card as MoonUICard, CardCVCInput as MoonUICardCVCInput, CardContent as MoonUICardContent, CardDescription as MoonUICardDescription, CardExpiryInput as MoonUICardExpiryInput, CardFooter as MoonUICardFooter, CardHeader as MoonUICardHeader, CardNumberInput as MoonUICardNumberInput, CardProps as MoonUICardProps, CardTitle as MoonUICardTitle, CardZipInput as MoonUICardZipInput, Checkbox as MoonUICheckbox, CheckboxGroup as MoonUICheckboxGroup, CheckboxLabel as MoonUICheckboxLabel, CheckboxProps as MoonUICheckboxProps, CheckboxWithLabel as MoonUICheckboxWithLabel, Collapsible as MoonUICollapsible, CollapsibleContent as MoonUICollapsibleContent, CollapsibleTrigger as MoonUICollapsibleTrigger, ColorPicker as MoonUIColorPicker, ColorPickerProps as MoonUIColorPickerProps, Command as MoonUICommand, CommandDialog as MoonUICommandDialog, CommandEmpty as MoonUICommandEmpty, CommandGroup as MoonUICommandGroup, CommandInput as MoonUICommandInput, CommandItem as MoonUICommandItem, CommandList as MoonUICommandList, CommandSeparator as MoonUICommandSeparator, CommandShortcut as MoonUICommandShortcut, DataTableBasic as MoonUIDataTableBasic, DatePicker as MoonUIDatePicker, DatePickerProps as MoonUIDatePickerProps, DateRangePicker as MoonUIDateRangePicker, DateTimePicker as MoonUIDateTimePicker, Dialog as MoonUIDialog, DialogClose as MoonUIDialogClose, DialogContent as MoonUIDialogContent, DialogDescription as MoonUIDialogDescription, DialogFooter as MoonUIDialogFooter, DialogHeader as MoonUIDialogHeader, DialogTitle as MoonUIDialogTitle, DialogTrigger as MoonUIDialogTrigger, DraggableList as MoonUIDraggableList, DraggableListProps as MoonUIDraggableListProps, DropdownMenu as MoonUIDropdownMenu, DropdownMenuCheckboxItem as MoonUIDropdownMenuCheckboxItem, DropdownMenuContent as MoonUIDropdownMenuContent, DropdownMenuGroup as MoonUIDropdownMenuGroup, DropdownMenuItem as MoonUIDropdownMenuItem, DropdownMenuLabel as MoonUIDropdownMenuLabel, DropdownMenuPortal as MoonUIDropdownMenuPortal, DropdownMenuRadioGroup as MoonUIDropdownMenuRadioGroup, DropdownMenuRadioItem as MoonUIDropdownMenuRadioItem, DropdownMenuSeparator as MoonUIDropdownMenuSeparator, DropdownMenuShortcut as MoonUIDropdownMenuShortcut, DropdownMenuSub as MoonUIDropdownMenuSub, DropdownMenuSubContent as MoonUIDropdownMenuSubContent, DropdownMenuSubTrigger as MoonUIDropdownMenuSubTrigger, DropdownMenuTrigger as MoonUIDropdownMenuTrigger, FileUpload as MoonUIFileUpload, FileUploadProps as MoonUIFileUploadProps, FreeBadge as MoonUIFreeBadge, GestureDrawer as MoonUIGestureDrawer, GestureDrawerProps as MoonUIGestureDrawerProps, GitHubStars as MoonUIGitHubStars, GradientPicker as MoonUIGradientPicker, Input as MoonUIInput, InputProps as MoonUIInputProps, Label as MoonUILabel, LockedComponent as MoonUILockedComponent, MonthPicker as MoonUIMonthPicker, MoonLogo as MoonUIMoonLogo, Pagination as MoonUIPagination, PaginationContent as MoonUIPaginationContent, PaginationEllipsis as MoonUIPaginationEllipsis, PaginationItem as MoonUIPaginationItem, PaginationLink as MoonUIPaginationLink, PaginationNext as MoonUIPaginationNext, PaginationPrevious as MoonUIPaginationPrevious, PhoneInput as MoonUIPhoneInput, Popover as MoonUIPopover, PopoverContent as MoonUIPopoverContent, PopoverTrigger as MoonUIPopoverTrigger, ProBadge as MoonUIProBadge, ProComponentWrapper as MoonUIProComponentWrapper, Progress as MoonUIProgress, ProgressProps as MoonUIProgressProps, RadioGroup as MoonUIRadioGroup, RadioGroupItem as MoonUIRadioGroupItem, RadioGroupProps as MoonUIRadioGroupProps, RadioItemWithLabel as MoonUIRadioItemWithLabel, RadioLabel as MoonUIRadioLabel, RichTextEditor as MoonUIRichTextEditor, ScrollArea as MoonUIScrollArea, ScrollBar as MoonUIScrollBar, ScrollReveal as MoonUIScrollReveal, ScrollRevealContainer as MoonUIScrollRevealContainer, ScrollRevealItem as MoonUIScrollRevealItem, Select as MoonUISelect, SelectContent as MoonUISelectContent, SelectGroup as MoonUISelectGroup, SelectItem as MoonUISelectItem, SelectLabel as MoonUISelectLabel, SelectScrollDownButton as MoonUISelectScrollDownButton, SelectScrollUpButton as MoonUISelectScrollUpButton, SelectSeparator as MoonUISelectSeparator, SelectTrigger as MoonUISelectTrigger, SelectValue as MoonUISelectValue, Separator as MoonUISeparator, SimpleColorPicker as MoonUISimpleColorPicker, SimpleEditor as MoonUISimpleEditor, Skeleton as MoonUISkeleton, SkeletonAvatar as MoonUISkeletonAvatar, SkeletonCard as MoonUISkeletonCard, SkeletonProps as MoonUISkeletonProps, SkeletonText as MoonUISkeletonText, Slider as MoonUISlider, SwipeableCard as MoonUISwipeableCard, Switch as MoonUISwitch, SwitchProps as MoonUISwitchProps, Table as MoonUITable, TableBody as MoonUITableBody, TableCaption as MoonUITableCaption, TableCell as MoonUITableCell, TableFooter as MoonUITableFooter, TableHead as MoonUITableHead, TableHeader as MoonUITableHeader, TableRow as MoonUITableRow, Tabs as MoonUITabs, TabsContent as MoonUITabsContent, TabsList as MoonUITabsList, TabsTrigger as MoonUITabsTrigger, TagsInput as MoonUITagsInput, Textarea as MoonUITextarea, TextareaProps as MoonUITextareaProps, Toast as MoonUIToast, ToastAction as MoonUIToastAction, ToastClose as MoonUIToastClose, ToastDescription as MoonUIToastDescription, ToastProvider as MoonUIToastProvider, ToastTitle as MoonUIToastTitle, ToastViewport as MoonUIToastViewport, Toaster as MoonUIToaster, Toggle as MoonUIToggle, Tooltip as MoonUITooltip, TooltipContent as MoonUITooltipContent, TooltipProvider as MoonUITooltipProvider, TooltipTrigger as MoonUITooltipTrigger, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PhoneInput, PhoneInputProps, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverContentProps, PopoverFooter, PopoverHeader, PopoverSeparator, PopoverTrigger, ProBadge, ProComponentWrapper, Progress, ProgressProps, RadioGroup, RadioGroupItem, RadioGroupItemProps, RadioGroupProps, RadioItemWithLabel, RadioLabel, RichTextEditor, RichTextEditorProps, ScrollArea, ScrollBar, ScrollReveal, ScrollRevealContainer, ScrollRevealContainerProps, ScrollRevealItem, ScrollRevealItemProps, ScrollRevealProps, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, SeparatorProps, SimpleColorPicker, SimpleColorPickerProps, SimpleEditor, SimpleEditorProps, SimpleTooltip, SimpleTooltipProps, Skeleton, SkeletonAvatar, SkeletonAvatarProps, SkeletonCard, SkeletonCardProps, SkeletonProps, SkeletonText, SkeletonTextProps, Slider, SortDirection, SwipeableCard, SwipeableCardProps, Switch, SwitchProps, SwitchSize, SwitchVariant, Table, TableBody, TableBodyProps, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, TagsInput, TagsInputProps, Textarea, TextareaProps, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastProvider, ToastTitle, ToastViewport, Toaster, Toggle, ToggleProps, Tooltip, TooltipArrow, TooltipContent, TooltipContentProps, TooltipProvider, TooltipTrigger, aspectRatioVariants, badgeVariants, buttonVariants, cn, collapsibleContentVariants, collapsibleTriggerVariants, badgeVariants as moonUIBadgeVariants, buttonVariants as moonUIButtonVariants, createSortableHeader as moonUICreateSortableHeader, skeletonVariants as moonUISkeletonVariants, toggleVariants as moonUIToggleVariants, popoverContentVariants, progressVariants, separatorVariants, skeletonVariants, toast, toggleVariants, tooltipVariants, useToast };
