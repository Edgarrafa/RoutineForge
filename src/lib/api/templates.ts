import type { PrebuiltDay, PrebuiltWeek } from "@/types";
import { PREBUILT_DAYS, PREBUILT_WEEKS } from "@/data/mockData";

/**
 * Returns all available pre-built day templates.
 *
 * @example
 * // Real implementation:
 * const res = await fetch("/api/templates/days");
 * return res.json();
 */
export async function getTemplateDays(): Promise<PrebuiltDay[]> {
  // TODO: replace with real API call — see @example above
  return PREBUILT_DAYS;
}

/**
 * Returns all available pre-built week templates (PPL, 5x5, Upper/Lower, etc.).
 *
 * @example
 * // Real implementation:
 * const res = await fetch("/api/templates/weeks");
 * return res.json();
 */
export async function getTemplateWeeks(): Promise<PrebuiltWeek[]> {
  // TODO: replace with real API call — see @example above
  return PREBUILT_WEEKS;
}
