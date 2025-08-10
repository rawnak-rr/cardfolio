import { ReactNode } from 'react'

export default function Section({ id, title, children }:{ id?: string, title?: string, children: ReactNode }) {
  return (
    <section id={id} className="section">
      {title && <h2 className="h2">{title}</h2>}
      {children}
    </section>
  )
}
