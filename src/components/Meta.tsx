import React, { ReactElement } from 'react'
import Head from 'next/head'
interface MetaProps {
  title: string
  description: string
  name: string
}
const Meta = (props: MetaProps): ReactElement => {
  return (
    <Head>
      {props.title && <title>{props.title}</title>}
      {props.description && (
        <meta name="description" content={props.description} />
      )}

      {/* <!-- Google / Search Engine Tags --> */}
      {props.name && <meta itemProp="name" content={props.name} />}
      {props.description && (
        <meta itemProp="description" content={props.description} />
      )}
    </Head>
  )
}
export default Meta
