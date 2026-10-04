// Free Components Export - Local Files
// This is the index for packages/moonui/src/components/ui/
// All exports use MoonUI prefix for consistency

// Accordion
export {
    Accordion as MoonUIAccordion,
    AccordionItem as MoonUIAccordionItem,
    AccordionTrigger as MoonUIAccordionTrigger,
    AccordionContent as MoonUIAccordionContent,
} from "./accordion";

// Alert
export {
    Alert as MoonUIAlert,
    AlertTitle as MoonUIAlertTitle,
    AlertDescription as MoonUIAlertDescription,
} from "./alert";

export type {
    AlertProps as MoonUIAlertProps,
} from "./alert";

// AspectRatio
export { AspectRatio as MoonUIAspectRatio } from "./aspect-ratio";

// Avatar
export {
    Avatar as MoonUIAvatar,
    AvatarImage as MoonUIAvatarImage,
    AvatarFallback as MoonUIAvatarFallback,
    AvatarGroup as MoonUIAvatarGroup,
} from "./avatar";

export type {
    AvatarProps as MoonUIAvatarProps,
    AvatarGroupProps as MoonUIAvatarGroupProps,
} from "./avatar";

// Badge
export {
    Badge as MoonUIBadge,
    badgeVariants as moonUIBadgeVariants,
} from "./badge";

export type {
    BadgeProps as MoonUIBadgeProps,
} from "./badge";

// Breadcrumb
export {
    Breadcrumb as MoonUIBreadcrumb,
    BreadcrumbList as MoonUIBreadcrumbList,
    BreadcrumbItem as MoonUIBreadcrumbItem,
    BreadcrumbLink as MoonUIBreadcrumbLink,
    BreadcrumbPage as MoonUIBreadcrumbPage,
    BreadcrumbSeparator as MoonUIBreadcrumbSeparator,
    BreadcrumbEllipsis as MoonUIBreadcrumbEllipsis,
} from "./breadcrumb";

// Button
export {
    Button as MoonUIButton,
    buttonVariants as moonUIButtonVariants,
} from "./button";

export type {
    ButtonProps as MoonUIButtonProps,
} from "./button";

// Card
export {
    Card as MoonUICard,
    CardHeader as MoonUICardHeader,
    CardFooter as MoonUICardFooter,
    CardTitle as MoonUICardTitle,
    CardDescription as MoonUICardDescription,
    CardContent as MoonUICardContent,
} from "./card";

export type {
    CardProps as MoonUICardProps,
} from "./card";

// Calendar
export {
    Calendar as MoonUICalendar,
} from "./calendar";

export type {
    CalendarProps as MoonUICalendarProps,
} from "./calendar";

// Card Input
export {
    CardNumberInput as MoonUICardNumberInput,
    CardExpiryInput as MoonUICardExpiryInput,
    CardCVCInput as MoonUICardCVCInput,
    CardZipInput as MoonUICardZipInput,
} from "./card-input";

// Carousel
export {
    Carousel as MoonUICarousel,
    CarouselContent as MoonUICarouselContent,
    CarouselItem as MoonUICarouselItem,
    CarouselPrevious as MoonUICarouselPrevious,
    CarouselNext as MoonUICarouselNext,
    carouselContentVariants as moonUICarouselContentVariants,
    carouselItemVariants as moonUICarouselItemVariants,
    useCarousel,
} from "./carousel";

export type {
    CarouselProps as MoonUICarouselProps,
    CarouselApi as MoonUICarouselApi,
} from "./carousel";

// Checkbox
export {
    Checkbox as MoonUICheckbox,
    CheckboxWithLabel as MoonUICheckboxWithLabel,
    CheckboxGroup as MoonUICheckboxGroup,
    CheckboxLabel as MoonUICheckboxLabel,
} from "./checkbox";

export type {
    CheckboxProps as MoonUICheckboxProps,
    CheckboxGroupProps as MoonUICheckboxGroupProps,
    CheckboxLabelProps as MoonUICheckboxLabelProps,
    CheckboxWithLabelProps as MoonUICheckboxWithLabelProps,
} from "./checkbox";

// Collapsible
export {
    Collapsible as MoonUICollapsible,
    CollapsibleTrigger as MoonUICollapsibleTrigger,
    CollapsibleContent as MoonUICollapsibleContent,
} from "./collapsible";

// ColorPicker
export {
    ColorPicker as MoonUIColorPicker,
    SimpleColorPicker as MoonUISimpleColorPicker,
    GradientPicker as MoonUIGradientPicker,
} from "./color-picker";

export type {
    ColorPickerProps as MoonUIColorPickerProps,
} from "./color-picker";

// Command
export {
    Command as MoonUICommand,
    CommandDialog as MoonUICommandDialog,
    CommandInput as MoonUICommandInput,
    CommandList as MoonUICommandList,
    CommandEmpty as MoonUICommandEmpty,
    CommandGroup as MoonUICommandGroup,
    CommandItem as MoonUICommandItem,
    CommandShortcut as MoonUICommandShortcut,
    CommandSeparator as MoonUICommandSeparator,
} from "./command";

// DataTable Basic (Free version with limited features)

// DatePicker
export {
    DatePicker as MoonUIDatePicker,
    DateRangePicker as MoonUIDateRangePicker,
    DateTimePicker as MoonUIDateTimePicker,
    MonthPicker as MoonUIMonthPicker,
} from "./date-picker";

export type {
    DatePickerProps as MoonUIDatePickerProps,
} from "./date-picker";

// Dialog
export {
    Dialog as MoonUIDialog,
    DialogClose as MoonUIDialogClose,
    DialogTrigger as MoonUIDialogTrigger,
    DialogContent as MoonUIDialogContent,
    DialogHeader as MoonUIDialogHeader,
    DialogFooter as MoonUIDialogFooter,
    DialogTitle as MoonUIDialogTitle,
    DialogDescription as MoonUIDialogDescription,
    // #317: konvansiyon tamamlama
    DialogForm as MoonUIDialogForm,
} from "./dialog";

// DraggableList

export type {
    DraggableListProps as MoonUIDraggableListProps,
} from "./draggable-list";

// DropdownMenu
export {
    DropdownMenu as MoonUIDropdownMenu,
    DropdownMenuTrigger as MoonUIDropdownMenuTrigger,
    DropdownMenuContent as MoonUIDropdownMenuContent,
    DropdownMenuItem as MoonUIDropdownMenuItem,
    DropdownMenuCheckboxItem as MoonUIDropdownMenuCheckboxItem,
    DropdownMenuRadioItem as MoonUIDropdownMenuRadioItem,
    DropdownMenuLabel as MoonUIDropdownMenuLabel,
    DropdownMenuSeparator as MoonUIDropdownMenuSeparator,
    DropdownMenuShortcut as MoonUIDropdownMenuShortcut,
    DropdownMenuGroup as MoonUIDropdownMenuGroup,
    DropdownMenuPortal as MoonUIDropdownMenuPortal,
    DropdownMenuSub as MoonUIDropdownMenuSub,
    DropdownMenuSubContent as MoonUIDropdownMenuSubContent,
    DropdownMenuSubTrigger as MoonUIDropdownMenuSubTrigger,
    DropdownMenuRadioGroup as MoonUIDropdownMenuRadioGroup,
} from "./dropdown-menu";

// FileUpload

export type {
    FileUploadProps as MoonUIFileUploadProps,
    FileUploadEntry as MoonUIFileUploadEntry,
} from "./file-upload";

// GestureDrawer

export type {
    GestureDrawerProps as MoonUIGestureDrawerProps,
} from "./gesture-drawer";

// GitHubStars

// Input
export { Input as MoonUIInput } from "./input";

export type {
    InputProps as MoonUIInputProps,
} from "./input";

// InputOTP
export {
    InputOTP as MoonUIInputOTP,
    InputOTPGroup as MoonUIInputOTPGroup,
    InputOTPSlot as MoonUIInputOTPSlot,
    InputOTPSeparator as MoonUIInputOTPSeparator,
    inputOTPSlotVariants as moonUIInputOTPSlotVariants,
} from "./input-otp";

export type {
    InputOTPProps as MoonUIInputOTPProps,
} from "./input-otp";

// Label
export { Label as MoonUILabel } from "./label";

export type {
    LabelProps as MoonUILabelProps,
} from "./label";

// LockedComponent
export {
    LockedComponent as MoonUILockedComponent,
    ProComponentWrapper as MoonUIProComponentWrapper,
    ProBadge as MoonUIProBadge,
    FreeBadge as MoonUIFreeBadge,
} from "./locked-component";

// MoonLogo
export { MoonLogo as MoonUIMoonLogo } from "./moon-logo";

// Pagination
export {
    Pagination as MoonUIPagination,
    PaginationContent as MoonUIPaginationContent,
    PaginationEllipsis as MoonUIPaginationEllipsis,
    PaginationItem as MoonUIPaginationItem,
    PaginationLink as MoonUIPaginationLink,
    PaginationNext as MoonUIPaginationNext,
    PaginationPrevious as MoonUIPaginationPrevious,
} from "./pagination";

// PhoneInput
export { PhoneInput as MoonUIPhoneInput } from "./phone-input";

// Popover
export {
    Popover as MoonUIPopover,
    PopoverTrigger as MoonUIPopoverTrigger,
    PopoverContent as MoonUIPopoverContent,
    // #317: CLAUDE.local.md "tüm componentler MoonUI prefix'iyle export edilir"
    // konvansiyonu; bu 6 ad eksikti. Erişim sorunu YOKTU (aşağıda `export *` var),
    // yalnız prefixli isimlendirme tamamlandı.
    PopoverAnchor as MoonUIPopoverAnchor,
    PopoverClose as MoonUIPopoverClose,
    PopoverSeparator as MoonUIPopoverSeparator,
    PopoverHeader as MoonUIPopoverHeader,
    PopoverFooter as MoonUIPopoverFooter,
    popoverContentVariants as moonUIPopoverContentVariants,
} from "./popover";

// Progress
export { Progress as MoonUIProgress } from "./progress";

export type {
    ProgressProps as MoonUIProgressProps,
} from "./progress";

// RadioGroup
export {
    RadioGroup as MoonUIRadioGroup,
    RadioGroupItem as MoonUIRadioGroupItem,
    RadioLabel as MoonUIRadioLabel,
    RadioItemWithLabel as MoonUIRadioItemWithLabel,
} from "./radio-group";

export type {
    RadioGroupProps as MoonUIRadioGroupProps,
    RadioGroupItemProps as MoonUIRadioGroupItemProps,
    RadioLabelProps as MoonUIRadioLabelProps,
    RadioItemWithLabelProps as MoonUIRadioItemWithLabelProps,
} from "./radio-group";

// RichTextEditor

// ScrollArea
export {
    ScrollArea as MoonUIScrollArea,
    ScrollBar as MoonUIScrollBar,
} from "./scroll-area";

// ScrollReveal
export {
    ScrollReveal as MoonUIScrollReveal,
    ScrollRevealContainer as MoonUIScrollRevealContainer,
    ScrollRevealItem as MoonUIScrollRevealItem,
} from "./scroll-reveal";

// Select
export {
    Select as MoonUISelect,
    SelectGroup as MoonUISelectGroup,
    SelectValue as MoonUISelectValue,
    SelectTrigger as MoonUISelectTrigger,
    SelectContent as MoonUISelectContent,
    SelectLabel as MoonUISelectLabel,
    SelectItem as MoonUISelectItem,
    SelectSeparator as MoonUISelectSeparator,
    SelectScrollUpButton as MoonUISelectScrollUpButton,
    SelectScrollDownButton as MoonUISelectScrollDownButton,
} from "./select";

export type {
    SelectTriggerProps as MoonUISelectTriggerProps,
    SelectItemProps as MoonUISelectItemProps,
} from "./select";

// Separator
// #643 (#667 ile açıldı) — TERS PARİTE kapatıldı: pro barrel `MoonUISeparatorProProps`i
// dışa açıyordu, free tarafta MoonUI önekli yüzey eksikti.
export { Separator as MoonUISeparator, separatorVariants as moonUISeparatorVariants } from "./separator";
export type { SeparatorProps as MoonUISeparatorProps } from "./separator";

// SimpleEditor
export { SimpleEditor as MoonUISimpleEditor } from "./simple-editor";

export type {
    SimpleEditorProps as MoonUISimpleEditorProps,
} from "./simple-editor";

// Skeleton
export {
    Skeleton as MoonUISkeleton,
    SkeletonText as MoonUISkeletonText,
    SkeletonAvatar as MoonUISkeletonAvatar,
    SkeletonCard as MoonUISkeletonCard,
    skeletonVariants as moonUISkeletonVariants,
} from "./skeleton";

export type {
    SkeletonProps as MoonUISkeletonProps,
} from "./skeleton";

// Slider
export { Slider as MoonUISlider } from "./slider";

export type {
    SliderProps as MoonUISliderProps,
    SliderBaseProps as MoonUISliderBaseProps,
} from "./slider";

// SwipeableCard

// Switch
export { Switch as MoonUISwitch } from "./switch";

export type {
    SwitchProps as MoonUISwitchProps,
} from "./switch";

// Table
export {
    Table as MoonUITable,
    TableHeader as MoonUITableHeader,
    TableBody as MoonUITableBody,
    TableFooter as MoonUITableFooter,
    TableHead as MoonUITableHead,
    TableRow as MoonUITableRow,
    TableCell as MoonUITableCell,
    TableCaption as MoonUITableCaption,
} from "./table";

// Tabs
export {
    Tabs as MoonUITabs,
    TabsList as MoonUITabsList,
    TabsTrigger as MoonUITabsTrigger,
    TabsContent as MoonUITabsContent,
} from "./tabs";

// TagsInput
export { TagsInput as MoonUITagsInput } from "./tags-input";

export type {
    TagsInputProps as MoonUITagsInputProps,
} from "./tags-input";

export type {
    ToggleProps as MoonUIToggleProps,
} from "./toggle";

// Textarea
export { Textarea as MoonUITextarea } from "./textarea";

export type {
    TextareaProps as MoonUITextareaProps,
} from "./textarea";

// Toast
export {
    Toast as MoonUIToast,
    ToastAction as MoonUIToastAction,
    ToastClose as MoonUIToastClose,
    ToastDescription as MoonUIToastDescription,
    ToastProvider as MoonUIToastProvider,
    ToastTitle as MoonUIToastTitle,
    ToastViewport as MoonUIToastViewport,
    Toaster as MoonUIToaster,
    toast,
    useToast,
} from "./toast";

// Toggle
export {
    Toggle as MoonUIToggle,
    toggleVariants as moonUIToggleVariants,
} from "./toggle";

// Tooltip
export {
    Tooltip as MoonUITooltip,
    TooltipTrigger as MoonUITooltipTrigger,
    TooltipContent as MoonUITooltipContent,
    TooltipProvider as MoonUITooltipProvider,
    // #317: konvansiyon tamamlama (erişim `export * from "./tooltip"` ile zaten vardı)
    TooltipArrow as MoonUITooltipArrow,
    SimpleTooltip as MoonUISimpleTooltip,
    tooltipVariants as moonUITooltipVariants,
} from "./tooltip";

// Kbd (issue #247) — standalone klavye-tuşu rozeti
export {
    Kbd as MoonUIKbd,
    kbdVariants as moonUIKbdVariants,
} from "./kbd";
export type { KbdProps as MoonUIKbdProps } from "./kbd";

// Rating (issue #247) — standalone yıldız değerlendirme
export {
    Rating as MoonUIRating,
    ratingVariants as moonUIRatingVariants,
} from "./rating";
export type { RatingProps as MoonUIRatingProps } from "./rating";

// Spinner (issue #247) — standalone yükleme göstergesi
export {
    Spinner as MoonUISpinner,
    spinnerVariants as moonUISpinnerVariants,
} from "./spinner";
export type { SpinnerProps as MoonUISpinnerProps } from "./spinner";

// Button Group (issue #257) — bitişik/segmentli buton grupları
export {
    ButtonGroup as MoonUIButtonGroup,
    buttonGroupVariants as moonUIButtonGroupVariants,
} from "./button-group";
export type { ButtonGroupProps as MoonUIButtonGroupProps } from "./button-group";

// Toggle Group (issue #257) — tek/çoklu seçim segmented toggle seti
export {
    ToggleGroup as MoonUIToggleGroup,
    ToggleGroupItem as MoonUIToggleGroupItem,
} from "./toggle-group";
export type {
    ToggleGroupProps as MoonUIToggleGroupProps,
    ToggleGroupItemProps as MoonUIToggleGroupItemProps,
} from "./toggle-group";

// Also export without MoonUI prefix for backward compatibility
export * from "./accordion";
export * from "./alert";
export * from "./aspect-ratio";
export * from "./avatar";
export * from "./badge";
export * from "./breadcrumb";
export * from "./button";
export * from "./card";
export * from "./card-input";
export * from "./carousel";
export * from "./checkbox";
export * from "./collapsible";
export * from "./command";
export * from "./date-picker";
export * from "./dialog";
export * from "./dropdown-menu";
export * from "./input";
export * from "./input-otp";
export * from "./label";
export * from "./locked-component";
export * from "./moon-logo";
export * from "./pagination";
export * from "./phone-input";
export * from "./popover";
export * from "./progress";
export * from "./radio-group";
export * from "./scroll-area";
export * from "./scroll-reveal";
export * from "./select";
export * from "./separator";
export * from "./simple-editor";
export * from "./skeleton";
export * from "./slider";
export * from "./switch";
export * from "./table";
export * from "./tabs";
export * from "./tags-input";
export * from "./textarea";
export * from "./toast";
export * from "./toggle";
export * from "./tooltip";
export * from "./kbd";
export * from "./rating";
export * from "./spinner";
export * from "./button-group";
export * from "./toggle-group";
