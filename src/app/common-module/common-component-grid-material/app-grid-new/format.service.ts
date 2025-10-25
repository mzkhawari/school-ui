import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() {}

  /**
   * 🧩 فرمت‌دهی کلی مقدار برای نمایش در جدول یا کارت
   * @param value مقدار سلول
   * @param colMeta اطلاعات ستون (اختیاری)
   */
  formatValue(value: any, colMeta?: any): string {
    if (value === null || value === undefined || value === '') return '-';

    // ✅ اگر ستون از نوع بولین (چک‌باکسی) باشد
    if (colMeta?.isBoolean === true) {
      return this.formatBoolean(value);
    }

    // 🔢 اگر مقدار عددی باشد → نمایش عدد با فرمت فارسی
    if (this.isNumeric(value)) {
      const num = Number(value);

      // ✅ اگر عدد اعشاری باشد، با دو رقم اعشار نمایش داده شود
      if (!Number.isInteger(num)) {
        return num.toLocaleString('fa-IR', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        });
      }

      // ✅ عدد صحیح → فقط جداکننده هزارگان
      return num.toLocaleString('fa-IR');
    }

    // 🔹 سایر مقادیر (رشته و متن)
    return value;
  }

  /**
   * ✅ نمایش آیکون برای مقادیر بولین یا 0/1
   */
  private formatBoolean(value: any): string {
    const isTrue = value === true || value === 1 || value === '1';
    return isTrue
      ? `<i class="feather-check-circle text-success" style="font-size:16px;"></i>`
      : `<i class="feather-x-circle text-muted" style="font-size:16px; opacity:0.5;"></i>`;
  }

  /**
   * 🔹 بررسی عددی بودن مقدار
   */
  private isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
}
