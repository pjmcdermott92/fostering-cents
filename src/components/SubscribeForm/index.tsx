'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { subscribeFormSchema, type SubscribeFormData } from './schemas';
import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { SERVER_URL } from '@/lib/constants';

export function SubscribeForm() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
  });

  const handleSubmitForm = async (data: SubscribeFormData) => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(`${SERVER_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Something went wrong.');
      }

      setSuccessMessage('Thanks! You’ll receive an email shortly.');
      reset();
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {isSubmitted && (errors.email?.message || errorMessage) && (
        <AlertMessage message={errors.email?.message || errorMessage} variant="danger" />
      )}
      {successMessage && (
        <AlertMessage
          message={successMessage}
          variant="success"
          icon={<CheckCircle className="size-5" />}
        />
      )}
      <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col md:flex-row gap-3">
        <input
          type="email"
          aria-label="Email"
          required
          {...register('email')}
          className="flex-1 border border-white rounded-md px-3 py-2 bg-charcoal"
          placeholder="Your email address"
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Sign Up'}
        </Button>
      </form>
      <p className="text-xs">
        By submitting this form, you are agreeing to the Fostering Cents{' '}
        <Link href="/policies/terms-of-use" className="underline hover:no-underline">
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link href="/policies/privacy" className="underline hover:no-underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

function AlertMessage({
  message,
  variant = 'success',
  icon,
}: {
  message: string;
  variant?: 'success' | 'danger';
  icon?: React.ReactNode;
}) {
  if (!message) return null;

  const variantClass: Record<'success' | 'danger', string> = {
    success: 'bg-green-200 border-green-700 text-green-700',
    danger: 'bg-red-100 border-red-700 text-red-700',
  };

  return (
    <div
      className={cn('rounded border p-2 text-sm flex items-center gap-2', variantClass[variant])}
    >
      {icon}
      <span>{message}</span>
    </div>
  );
}
