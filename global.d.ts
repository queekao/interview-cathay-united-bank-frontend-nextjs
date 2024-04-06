import { ReactNode } from 'react'
// import type { Dayjs } from 'dayjs'

declare global {
  interface ChildrenProps {
    children: ReactNode
  }
  interface ICalendarProps {
    isMonthNavigator?: boolean
    isForbiddenNonCurrentMonth?: boolean
  }
  interface ICalendarCell {
    text: string
    value: Dayjs
    isCurMonth: boolean
  }
}
