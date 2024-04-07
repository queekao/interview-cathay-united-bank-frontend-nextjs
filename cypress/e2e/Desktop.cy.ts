import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
const day = dayjs()
day.locale('zh-cn')
const currentYearAndMonth = day.format('YYYY年MM月')
const currentDay = day.format('D日')
const daysArray = new Array(day.daysInMonth()).fill(1)
const calendarDisabledKeys = []
const calendarKeys = []
const calendarAllKeys = []
const cellsToAdd = 35 - daysArray.length

const lastMonth = day.subtract(1, 'month')

daysArray.forEach((_, i) => {
  calendarKeys.push(day.set('date', i + 1).format('YYYY-MM-D'))
})
calendarAllKeys.push(...calendarKeys)
for (let i = 0; i < Math.floor(cellsToAdd / 2); i++) {
  // ❌ Nested "unshift" inside of a loop is considered bad practice because it leads to Time Complexity O(n^2). Therefore, do not use it in production
  calendarDisabledKeys.unshift(
    lastMonth.set('date', lastMonth.daysInMonth() - i).format('YYYY-MM-D')
  )
}
calendarAllKeys.unshift(...calendarDisabledKeys)
const nextMonth = day.add(1, 'month')
for (let i = 0; i < Math.round(cellsToAdd / 2); i++) {
  calendarDisabledKeys.push(nextMonth.set('date', i + 1).format('YYYY-MM-D'))
  calendarAllKeys.push(nextMonth.set('date', i + 1).format('YYYY-MM-D'))
}

describe('E2E Desktop version test', () => {
  beforeEach(() => {
    cy.viewport(1440, 720) // Sets the dimensions to a desktop view
    cy.visit('/test/1')
    cy.get('svg[data-testid="ArrowBackIosIcon"]').as('backButton') // define variable
  })
  it('visit the home page', () => {
    cy.visit('/')
  })
  it('Test 1 react-question.pdf', () => {
    cy.visit('/')
    cy.get('ul > li').find('a[href="/test/1"]').click()
    cy.contains('h1', 'Test 1.1').should('exist')
    cy.contains('John Doe 1001').should('exist')
    cy.contains('Jane 1002').should('exist')
    cy.contains('Emily Smith 1003').should('exist')
    cy.contains('Robert Brown 1004').should('exist')
    cy.contains('Michael 1005').should('exist')
    cy.contains('Jessica Johnson 1006').should('exist')
    cy.contains('Sarah 1007').should('exist')
    cy.contains('Thomas Clark 1008').should('exist')
    cy.contains('Lisa 1009').should('exist')
    cy.contains('James Lewis 1010').should('exist')
    cy.contains('h1', 'Test 1.2').should('exist')
    cy.contains('John').should('exist')
    cy.contains('James').should('exist')
    cy.contains('Jane').should('exist')
    cy.contains('Jessica').should('exist')
    cy.contains('Emily').should('exist')
    cy.contains('Sarah').should('exist')
    cy.contains('Robert').should('exist')
    cy.contains('Thomas').should('exist')
    cy.contains('Michael').should('exist')
    cy.contains('Lisa').should('exist')
    cy.contains('h3', 'test 2').should('exist')
    cy.contains('5/8 外出確認表').should('exist')
    cy.get('ol').first().as('firstList')
    cy.get('@firstList').find('li').eq(0).contains('麵包')
    cy.get('@firstList').find('li').eq(1).contains('短袖衣服')
    cy.get('@firstList').find('li').eq(2).contains('飲用水')
    cy.get('@firstList').find('li').eq(3).contains('帳篷')
    cy.get('ul').as('secondList')
    cy.get('@secondList').find('li').eq(0).contains('暈車藥')
    cy.get('@secondList').find('li').eq(1).contains('感冒藥')
    cy.get('@secondList').find('li').eq(2).contains('丹木斯')
    cy.get('@secondList').find('li').eq(3).contains('咳嗽糖漿')
    cy.contains('以上僅共參考').should('exist')
    cy.contains('Unique Value:96').should('exist')
    cy.wait(4000)
    cy.get('@backButton').click()

    cy.wait(2000)
  })
  it('Task 1 react-question2.pdf', () => {
    cy.visit('/')
    cy.get('ul > li').find('a[href="/test/2"]').click()
    // Current year and month found
    cy.get('div').contains(currentYearAndMonth).should('exist')
    // button should be disabled on this task
    cy.get('svg[data-testid="ChevronRightIcon"]')
      .parent('button')
      .should('be.disabled')
    cy.get('svg[data-testid="ChevronLeftIcon"]')
      .parent('button')
      .should('be.disabled')
    cy.get('svg[data-testid="ChevronRightIcon"]')
      .parent('button')
      .click({ force: true })
    cy.get('svg[data-testid="ChevronLeftIcon"]')
      .parent('button')
      .click({ force: true })
    // Current day found
    cy.get('.cell__day_today')
      .contains(currentDay)
      .should('have.css', 'background-color', 'rgb(255, 255, 118)') // 'equivalent of '#ffff76'
    cy.wait(1000)
    // Not current month should be disabled on this task
    calendarDisabledKeys.forEach(key => {
      cy.get(`[data-date-key="${key}"]`)
        .contains(`${key.split('-')[2]}日`)
        .then($el => {
          // find the match data-date-key
          const dateKey = $el.attr('data-date-key')
          console.log('Expected key:', key, 'Actual data-date-key:', dateKey)
        })
        .should('have.css', 'cursor', 'not-allowed')
        .click({ force: true })
    })
    cy.wait(1000)
    // Make sure the date in this month is clickable
    calendarKeys.forEach(key => {
      cy.get(`[data-date-key="${key}"]`)
        .contains(`${key.split('-')[2]}日`)
        .then($el => {
          const dateKey = $el.attr('data-date-key')
          console.log('Expected key:', key, 'Actual data-date-key:', dateKey)
        })
        .click()
    })
    cy.wait(4000)
    // Back to home page
    cy.get('@backButton').click()
  })
  it('Task 2 react-question2.pdf', () => {
    cy.visit('/')
    cy.get('ul > li').find('a[href="/test/3"]').click()
    // Current year and month found
    cy.get('div').contains(currentYearAndMonth).should('exist')
    // Current day found
    cy.get('.cell__day_today')
      .contains(currentDay)
      .should('have.css', 'background-color', 'rgb(255, 255, 118)')
    // Make sure every date is clickable
    calendarAllKeys.forEach(key => {
      cy.get(`[data-date-key="${key}"]`) // Key for the most specific value
        .contains(`${key.split('-')[2]}日`)
        .then($el => {
          const dateKey = $el.attr('data-date-key')
          console.log('Expected key:', key, 'Actual data-date-key:', dateKey)
        })
        .click()
    })
    cy.wait(4000)
    // Button should navigate through the calendar
    cy.get('svg[data-testid="ChevronRightIcon"]').parent('button').click()
    cy.wait(2000)
    cy.get('svg[data-testid="ChevronLeftIcon"]').parent('button').click()
    // Back to home page
    cy.wait(2000)
    cy.get('@backButton').click()
  })
})
