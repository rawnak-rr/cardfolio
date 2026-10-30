import type { Metadata } from 'next';
import { Contact } from '@/app/components/contact';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('contact');

export default function ContactPage() {
  return (
    // Centred both ways in the content area (main pads 6rem top and bottom on desktop),
    // with the links themselves still left-aligned to one edge.
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
