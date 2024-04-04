import { ReactNode } from 'react'

declare global {
  interface ChildrenProps {
    children: ReactNode
  }
  interface ICalendarProps {
    isMonthNavigator?: boolean
    isForbiddenNonCurrentMonth?: boolean
  }
}
