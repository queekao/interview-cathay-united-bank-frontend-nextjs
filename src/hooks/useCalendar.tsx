import { useContext, useSyncExternalStore } from 'react'
import {
  ICalendar,
  CalendarContext,
  TCloneCurDay,
  TResetRangeDays
} from '@/providers'
/**
 * Context for providing and managing state and operations related to a calendar component.
 *
 * @param {function(ICalendar):SelectorOutput} selector - A selector function to derive "ICalendar" value.
 * @returns {[SelectorOutput, function(Partial<ICalendar>): void, Dayjs, function(): void]} The below property
 * @property {SelectorOutput} state - A stateful ICalendar value
 * @property {function(Partial<ICalendar>): void} setState - A function update ICalendar value.
 * @property {Dayjs} cloneCurDay - A immutable current day
 * @property {function(): void} resetRangeDays - Reset "selectedPrevDate" and "selectedNextDate"
 * @throws Will throw an error if used outside of a `CalendarProvider`.
 * @example
 * const [currentDay, setCurrentDay, cloneCurDay, resetRangeDays] = useCalendar(calendar => calendar['currentDay'])
 *
 */

function useCalendar<SelectorOutput>(
  selector: (context: ICalendar) => SelectorOutput
): [
  SelectorOutput,
  (value: Partial<ICalendar>) => void,
  TCloneCurDay,
  TResetRangeDays
] {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider')
  }
  // https://react.dev/reference/react/useSyncExternalStore
  const state = useSyncExternalStore(context.subscribe, () =>
    selector(context.get())
  )

  return [state, context.set, context.cloneCurDay, context.resetRangeDays]
}

export default useCalendar
