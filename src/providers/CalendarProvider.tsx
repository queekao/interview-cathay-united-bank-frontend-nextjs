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
  cloneCurDay: Dayjs
  resetRangeDays: () => void
  get: () => ICalendar
  set: (value: Partial<ICalendar>) => void
  subscribe: (callback: () => void) => () => void
}

type TCalendarProviderProps = Pick<ICalendar, 'currentDay'>
// This two is provided for `useCalendar`
export type TCloneCurDay = ICalendarContextType['cloneCurDay']
export type TResetRangeDays = ICalendarContextType['resetRangeDays']

export const CalendarContext = createContext<ICalendarContextType>(
  null as unknown as ICalendarContextType
)
// This is pub-sub pattern
function useCalendarData(currentDay: Dayjs): {
  calendar: ICalendar
  resetRangeDays: ICalendarContextType['resetRangeDays']
  cloneCurDay: ICalendarContextType['cloneCurDay']
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
  const cloneCurDay = calendar.current.currentDay.clone()
  const resetRangeDays = useCallback(() => {
    calendar.current.selectedNextDate = undefined
    calendar.current.selectedPrevDate = undefined
  }, [])
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
    cloneCurDay,
    resetRangeDays,
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
  TCalendarProviderProps & ChildrenProps
> = ({ currentDay, children }) => {
  const { calendar, cloneCurDay, resetRangeDays, get, set, subscribe } =
    useCalendarData(currentDay)
  return (
    <CalendarContext.Provider
      value={{
        calendar,
        cloneCurDay,
        resetRangeDays,
        get,
        set,
        subscribe
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}
