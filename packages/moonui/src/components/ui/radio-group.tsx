"use client";

import * as React from "react";
import { Circle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

/**
 * Radio Group Component
 *
 * Accessible, customizable, and fully integrated with the theme system radio button group.
 * Allows users to select a single option from a group of choices.
 */

const radioGroupItemVariants = cva(
  "aspect-square border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-primary",
        outline: "border-border bg-transparent text-primary",
        filled: "border-primary bg-primary/10 text-primary",
      },
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
        xl: "h-6 w-6",
        /** @deprecated `md` kullanın — #319 kanonik skala; aynı çıktıyı üretir. */
        default: "h-4 w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// NOT: `React.HTMLAttributes` kendi `defaultValue`'sunu
// (`string | number | readonly string[]`) taşır; radio grubu için tek bir `string`
// anlamlı olduğundan Omit ile daraltılır.
export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  /**
   * Radio group value (controlled)
   */
  value?: string;
  /**
   * Uncontrolled kullanımda başlangıç değeri. `value` verilmediğinde grup
   * seçimi kendi iç state'inde tutar.
   */
  defaultValue?: string;
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

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}>({});

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, defaultValue, onValueChange, disabled, name, ...props }, ref) => {
    // Controlled/uncontrolled ikili mod: `value` verilmişse tüketici yönetir,
    // verilmemişse grup seçimi kendi iç state'inde tutar.
    const [internalValue, setInternalValue] = React.useState<string | undefined>(
      defaultValue
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleValueChange = React.useCallback(
      (next: string) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onValueChange?.(next);
      },
      [isControlled, onValueChange]
    );

    return (
      <RadioGroupContext.Provider
        value={{
          value: currentValue,
          onValueChange: handleValueChange,
          disabled,
          name,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn("moonui-theme", "grid gap-2", className)}
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioGroupItemVariants> {
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

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>(({ className, variant, size, indicator, id, value, disabled, ...props }, ref) => {
  // Get context values from radio group
  const radioGroup = React.useContext(RadioGroupContext);
  const generatedId = React.useId();
  const radioId = id || generatedId;
  const isChecked = radioGroup.value === value;
  
  // Call onValueChange function when RadioGroupItem changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (radioGroup.onValueChange) {
      radioGroup.onValueChange(e.target.value);
    }
    
    if (props.onChange) {
      props.onChange(e);
    }
  };
  
  return (
    <div className="relative flex items-center">
      <input
        type="radio"
        id={radioId}
        ref={ref}
        value={value}
        checked={isChecked}
        disabled={disabled || radioGroup.disabled}
        name={radioGroup.name}
        onChange={handleChange}
        className="peer sr-only"
        {...props}
      />
      <label
        htmlFor={radioId}
        className={cn(
          radioGroupItemVariants({ variant, size }),
          "rounded-full",
          // Gerçekte odaklanan eleman görsel olarak gizli `sr-only` input'tur.
          // Görünür label onun KARDEŞİ olduğu için label'da `:focus-visible` hiç
          // tetiklenmiyor, dolayısıyla klavye kullanıcısı hiçbir focus izi
          // görmüyordu. Tailwind `peer` deseniyle (input `peer` sınıfını taşır ve
          // DOM'da label'dan önce gelir) focus izi görünür elemana taşınır.
          "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary/50",
          "relative inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <span className={cn(
          "absolute inset-0 pointer-events-none",
          isChecked && "flex items-center justify-center"
        )}>
          {isChecked && (indicator || <Circle className="h-[60%] w-[60%] fill-current text-current" />)}
        </span>
      </label>
    </div>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

// Radio Label Component
export interface RadioLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
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

const RadioLabel = React.forwardRef<HTMLLabelElement, RadioLabelProps>(
  ({ className, htmlFor, children, disabled = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(
          "text-sm font-medium leading-none ml-2 text-foreground",
          disabled && "cursor-not-allowed opacity-70",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);
RadioLabel.displayName = "RadioLabel";

// Radio Item and Label combination
export interface RadioItemWithLabelProps extends RadioGroupItemProps {
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

const RadioItemWithLabel = React.forwardRef<
  HTMLInputElement,
  RadioItemWithLabelProps
>(({ 
  id, 
  label, 
  labelClassName, 
  ...radioProps 
}, ref) => {
  const generatedId = React.useId();
  const radioId = id || generatedId;
  
  return (
    <div className="flex items-center">
      <RadioGroupItem ref={ref} id={radioId} {...radioProps} />
      <RadioLabel 
        htmlFor={radioId}
        disabled={radioProps.disabled}
        className={labelClassName}
      >
        {label}
      </RadioLabel>
    </div>
  );
});
RadioItemWithLabel.displayName = "RadioItemWithLabel";

export { RadioGroup, RadioGroupItem, RadioLabel, RadioItemWithLabel };
