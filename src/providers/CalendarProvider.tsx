// https://tanmaythole.medium.com/optimizing-re-render-in-react-context-d823e113a45d
import { createContext, useCallback, useRef } from 'react'
import type { Dayjs } from 'dayjs'

/**
 * @param {Dayjs} currentDay - The current day you pass in.
 * @param {Dayjs} selectedPrevDate - The previous day you pass in.
 * @param {Dayjs} selectedNextDate - The next day you pass in.
 */
export interface ICalendar {
  currentDay: Dayjs
  selectedPrevDate?: Dayjs
  selectedNextDate?: Dayjs
}

interface ICalendarContextType {
  calendar: ICalendar
  get: () => ICalendar
  set: (value: Partial<ICalendar>) => void
  subscribe: (callback: () => void) => () => void
}

type CalendarProviderProps = {
  currentDay: Dayjs
}

export const CalendarContext = createContext<ICalendarContextType>(
  null as unknown as ICalendarContextType
)
// This is publish subscribe pattern
function useCalendarData(currentDay: Dayjs): {
  calendar: ICalendar
  get: ICalendarContextType['get']
  set: ICalendarContextType['set']
  subscribe: ICalendarContextType['subscribe']
} {
  const calendar = useRef<ICalendar>({
    currentDay,
    selectedPrevDate: undefined,
    selectedNextDate: undefined
  })

  const get = useCallback(() => calendar.current, [])

  const subscribers = useRef(new Set<() => void>())

  const set = useCallback((value: Partial<ICalendar>) => {
    calendar.current = { ...calendar.current, ...value }
    subscribers.current.forEach(callback => callback())
  }, [])

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback)
    return () => subscribers.current.delete(callback)
  }, [])

  return {
    calendar: calendar.current,
    get,
    set,
    subscribe
  }
}
/**
 * Provides a calendar context to manage and interact with calendar data within the application.
 * It allows selection of dates and changing the current month view.
 *
 * @component
 * @param {Object} props.currentDay - The current day you pass in.
 * @param {ReactNode} props.children - The child components that will have access to the calendar context.
 *
 * @example
 * ```jsx
 * <CalendarProvider currentDay={dayjs()}>
 *   <Calendar />
 * </CalendarProvider>
 * ```
 */

export const CalendarProvider: React.FC<
  CalendarProviderProps & ChildrenProps
> = ({ currentDay, children }) => {
  const { calendar, get, set, subscribe } = useCalendarData(currentDay)
  return (
    <CalendarContext.Provider
      value={{
        calendar,
        get,
        set,
        subscribe
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}
