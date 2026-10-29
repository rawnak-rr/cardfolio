import type { Metadata } from 'next';
import { Contact } from '@/app/components/contact';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('contact');

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title">
      <h1 id="contact-title" className="mb-6 text-[0.7rem] font-normal text-muted">
        contact
      </h1>
      <Contact />
    </section>
  );
}
