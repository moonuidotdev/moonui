import * as React from "react";
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * React children'ından okunabilir düz metin çıkarır.
 *
 * NEDEN (#298): Yalnız ikon içeren kaldırma düğmelerine SABİT bir aria-label
 * veriliyordu ("Remove badge"). Bu bileşenler liste hâlinde kullanıldığı için
 * ekran okuyucu kullanıcısı aynı adı defalarca duyup hangi öğeyi kaldıracağını
 * ayırt edemiyordu (WCAG 4.1.2). Ad artık öğenin görünen içeriğinden türetilir.
 *
 * string / number / dizi / iç içe element'i gezer; çıkaramazsa "" döner ve
 * çağıran taraf kendi geri düşüşünü uygular.
 */
export function readableText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) {
    return node.map(readableText).filter(Boolean).join(" ").trim();
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return readableText(props.children);
  }
  return "";
}
