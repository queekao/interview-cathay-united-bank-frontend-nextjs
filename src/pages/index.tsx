import React, { ReactElement } from 'react'
import Meta from '../components/Meta'
import Link from 'next/link'

export default function HomePage(): ReactElement {
  return (
    <>
      <Meta
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet"
        name="Lorem ipsum dolor sit amet"
      />
      <ul>
        <li>
          <Link href="/test/1">
            <div>Test 1</div>
          </Link>
        </li>
        <li>
          <Link href="/test/2">
            <div>Test 2</div>
          </Link>
        </li>
        <li>
          <Link href="/test/3">
            <div>Test 3</div>
          </Link>
        </li>
      </ul>
    </>
  )
}
