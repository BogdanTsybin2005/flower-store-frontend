import Link from 'next/link';
import { Container } from '@/shared/ui/Container';
import { Card } from '@/shared/ui/Card';

export default function FAQPage() {
  const faqs = [
    {
      q: 'How long do flowers stay fresh?',
      a: 'With proper care, most bouquets last 7–10 days. Change water every 2 days and trim stems.',
    },
    {
      q: 'Do you offer same-day delivery?',
      a: 'Yes! Same-day delivery available for orders placed before 2 PM on weekdays.',
    },
    {
      q: 'Can I customize an arrangement?',
      a: 'Absolutely. Contact our support team to discuss custom options.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept credit cards, debit cards, and digital wallets.',
    },
    {
      q: 'Can I return or exchange flowers?',
      a: 'We stand behind our quality. Contact support within 24 hours if you have any issues.',
    },
    {
      q: 'How do I track my order?',
      a: 'You\'ll receive an email confirmation with tracking details.',
    },
  ];

  return (
    <Container className="stack">
      <h1>FAQ</h1>

      <div className="stack">
        {faqs.map((faq, idx) => (
          <Card key={idx} className="stack">
            <h3>{faq.q}</h3>
            <p className="muted">{faq.a}</p>
          </Card>
        ))}
      </div>

      <Card className="stack">
        <h2>Still have questions?</h2>
        <p><Link href="/messages">Chat with our support team</Link></p>
      </Card>
    </Container>
  );
}
