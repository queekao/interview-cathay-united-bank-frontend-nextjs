import { useContext, useSyncExternalStore } from 'react'
import {
  ICalendar,
  // ICalendarCell,
  CalendarContext
} from '@/providers/CalendarProvider'
/**
 * Context for providing and managing state and operations related to a calendar component.
 *
 * @param {function(ICalendar):SelectorOutput} selector - A selector function to derive "ICalendar" value.
 * @returns {[SelectorOutput, function(Partial<ICalendar>): void]} A stateful value, and a function to update the ICalendar value.
 * @throws Will throw an error if used outside of a `CalendarProvider`.
 * @example
 * const [currentDay, setCurrentDay] = useCalendar(calendar => calendar['currentDay'])
 *
 */

function useCalendar<SelectorOutput>(
  selector: (context: ICalendar) => SelectorOutput
): [SelectorOutput, (value: Partial<ICalendar>) => void] {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider')
  }
  // https://react.dev/reference/react/useSyncExternalStore
  const state = useSyncExternalStore(context.subscribe, () =>
    selector(context.get())
  )

  return [state, context.set]
}

export default useCalendar
