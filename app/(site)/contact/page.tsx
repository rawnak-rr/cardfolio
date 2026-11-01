import type { Metadata } from 'next';
import { Contact } from '@/app/components/contact';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('contact');

export default function ContactPage() {
  return (
    <section
      aria-labelledby="contact-title"
      className="flex justify-center md:min-h-[calc(100dvh-12rem)] md:items-center"
    >
      <h1 id="contact-title" className="sr-only">
        contact
      </h1>
      <Contact />
    </section>
  );
}
