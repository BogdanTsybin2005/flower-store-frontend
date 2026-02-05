"use client";

import { useState } from "react";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { TextArea } from "@/shared/ui/TextArea";
import { Alert } from "@/shared/ui/Alert";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Simulate form submission (in production, send to backend)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <Container className="stack">
      <h1>Contact Us</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
        }}
      >
        <Card className="stack">
          <h3>📧 Email</h3>
          <p>support@flowerstore.com</p>
        </Card>
        <Card className="stack">
          <h3>📱 Phone</h3>
          <p>+1 (555) 123-4567</p>
        </Card>
        <Card className="stack">
          <h3>🕐 Hours</h3>
          <p>Mon–Sun, 9AM–6PM</p>
        </Card>
      </div>

      <Card className="stack">
        <h2>Send us a message</h2>
        {submitted && (
          <Alert style={{ backgroundColor: "#d4edda", color: "#155724" }}>
            Thank you! We'll respond soon.
          </Alert>
        )}
        {error && <Alert>{error}</Alert>}
        <form onSubmit={handleSubmit} className="stack">
          <label>
            Name
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </label>
          <label>
            Message
            <TextArea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
            />
          </label>
          <Button type="submit">Send Message</Button>
        </form>
      </Card>
    </Container>
  );
}
