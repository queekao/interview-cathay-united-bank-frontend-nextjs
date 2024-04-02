import type { Config } from '@jest/types'
import nextJest from 'next/jest.js'
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
  // testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)']

  // moduleNameMapper: {
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  //   '^@/(.*)$': '<rootDir>/src/$1'
  // },
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'ts-jest'
  // }
}

export default createJestConfig(config)
