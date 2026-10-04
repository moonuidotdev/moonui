"use client"

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cva, type VariantProps } from "class-variance-authority";
import { Dot } from "lucide-react";

import { cn } from "../../lib/utils";

/**
 * Premium InputOTP Component
 *
 * input-otp kütüphanesi tabanlı, erişilebilir tek kullanımlık şifre (OTP) girişi.
 * Paste desteği, pattern doğrulama ve aktif slot vurgusu sunar.
 */

// Pattern sabitleri — kullanım kolaylığı için input-otp'den yeniden export edilir
export {
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";

/* -------------------------------------------------------------------------------------------------
 * InputOTP Root
 * -----------------------------------------------------------------------------------------------*/
export type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput>;

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    // input-otp gerçek girişi görsel olarak gizli bir <input> ile yapar ve o
    // input'un ilişkili bir <label>'ı yok — erişilebilir ad olmadan ekran
    // okuyucu adsız bir metin alanı duyuruyordu. Tüketici kendi aria-label'ını
    // verirse aşağıdaki {...props} yayılımı bunu ezer.
    aria-label="One-time password"
    containerClassName={cn(
      "moonui-theme",
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

/* -------------------------------------------------------------------------------------------------
 * InputOTPGroup
 * -----------------------------------------------------------------------------------------------*/
const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

/* -------------------------------------------------------------------------------------------------
 * InputOTPSlot
 * -----------------------------------------------------------------------------------------------*/
const inputOTPSlotVariants = cva(
  [
    "relative flex h-10 w-10 items-center justify-center",
    "border-y border-r border-input text-sm text-foreground",
    "transition-all duration-200",
    "first:rounded-l-md first:border-l last:rounded-r-md",
  ],
  {
    variants: {
      // Aktif slot vurgusu — token tabanlı ring stili
      isActive: {
        true: "z-10 ring-2 ring-ring ring-offset-background",
        false: "",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export interface InputOTPSlotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof inputOTPSlotVariants>, "isActive"> {
  /** Bu slotun temsil ettiği karakter index'i */
  index: number;
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const slot = inputOTPContext?.slots?.[index];
    const char = slot?.char;
    const hasFakeCaret = slot?.hasFakeCaret;
    const isActive = slot?.isActive;

    return (
      <div
        ref={ref}
        data-active={isActive ? "" : undefined}
        className={cn(inputOTPSlotVariants({ isActive: !!isActive }), className)}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          // Sahte imleç — gerçek input görünmez olduğu için aktif slotta yanıp söner
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

/* -------------------------------------------------------------------------------------------------
 * InputOTPSeparator
 * -----------------------------------------------------------------------------------------------*/
const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("text-muted-foreground", className)}
    {...props}
  >
    <Dot aria-hidden="true" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  inputOTPSlotVariants,
};
