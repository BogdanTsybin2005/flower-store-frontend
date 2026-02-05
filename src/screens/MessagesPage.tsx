'use client';

import { useEffect, useState } from 'react';
import { api } from '../shared/api';
import { useAuthStore } from '../features/auth/model/authStore';
import { Container } from '../shared/ui/Container';
import { Card } from '../shared/ui/Card';
import { TextArea } from '../shared/ui/TextArea';
import { Button } from '../shared/ui/Button';
import { Alert } from '../shared/ui/Alert';
import { Loader } from '../shared/ui/Loader';
import { createUuid } from '../shared/lib/uuid';

const SESSION_KEY = 'flower-store-session-id';

export const MessagesPage = () => {
  const { token, isAuthenticated, userId } = useAuthStore();
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; content: string; is_from_client: boolean }>>(
    []
  );
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) {
      setSessionId(existing);
    } else {
      const next = createUuid();
      localStorage.setItem(SESSION_KEY, next);
      setSessionId(next);
    }
  }, []);

  const loadMessages = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const data = await api.messages.list(token);
      setMessages(data);
    } catch (err) {
      const messageText = err instanceof Error ? err.message : 'Unable to load messages.';
      setError(messageText);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      void loadMessages();
    }
  }, [isAuthenticated, token]);

  const handleSend = async () => {
    if (!token) return;
    if (!message.trim()) {
      setError('Please enter a message.');
      return;
    }
    setError(null);
    try {
      setIsLoading(true);
      const response = await api.messages.create(
        {
          session_id: sessionId,
          content: message,
          client_id: userId ?? null,
        },
        token
      );
      setMessages((prev) => [...prev, response]);
      setMessage('');
    } catch (err) {
      const messageText = err instanceof Error ? err.message : 'Unable to send message.';
      setError(messageText);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container>
        <Card className="stack">
          <h1>Support</h1>
          <p>Please login to chat with support.</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="stack">
      <h1>Support messages</h1>
      {error && <Alert>{error}</Alert>}
      {isLoading && <Loader />}
      <Card className="stack">
        {messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((msg) => (
          <div key={msg.id} className="inline" style={{ justifyContent: msg.is_from_client ? 'flex-end' : 'flex-start' }}>
            <span>{msg.content}</span>
          </div>
        ))}
      </Card>
      <Card className="stack">
        <TextArea
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="How can we help?"
        />
        <Button onClick={() => void handleSend()} disabled={isLoading}>
          Send message
        </Button>
      </Card>
    </Container>
  );
};
