'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { RichText } from '../RichText';
import { Button } from '../ui/button';
import { CaptchaField } from './CaptchaField';
import { RenderField } from './fields';
import { generateZodSchema } from './generateZodSchema';
import type { PayloadFormDefinition } from './types';

type CMSFormProps = {
  formDefinition: PayloadFormDefinition;
};

export function CMSForm({ formDefinition }: CMSFormProps) {
  const { fields, confirmationType, submitButtonLabel, useCaptcha, id: formId } = formDefinition;
  let formFields = [...fields];

  if (useCaptcha) {
    formFields = [
      ...fields,
      {
        blockType: 'text',
        name: 'captchaAnswer',
      },
      {
        blockType: 'text',
        name: 'captchaExpected',
      },
    ];
  }

  const schema = generateZodSchema(formFields);
  type FormValues = z.infer<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting, isLoading },
  } = methods;

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { captchaAnswer, captchaExpected, ...formData } = data;
    try {
      if (useCaptcha) {
        if (data.captchaAnswer == null || !(data.captchaAnswer as string).length) {
          setError('captchaAnswer', {
            type: 'manual',
            message: 'Please complete the CAPTCHA question',
          });
          return;
        }

        const res = await fetch('/api/verify-captcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ captchaAnswer, captchaExpected }),
        });

        const result = await res.json();
        if (!result.success) {
          setError('captchaAnswer', {
            type: 'manual',
            message: 'Incorrect CAPTCHA answer',
          });
          return;
        }
      }

      const submissionData = Object.entries(formData).map(([name, value]) => ({
        field: name,
        value,
      }));

      const req = await fetch('/api/form-submissions', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: formId,
          submissionData,
        }),
      });

      if (!req.ok) {
        const { errors } = await req.json();
        for (const error of errors) {
          toast.error(error.message);
        }
        return;
      }

      toast.success('Form submitted successfully');

      if (confirmationType === 'redirect' && formDefinition.redirect?.url) {
        const url = formDefinition.redirect.url;
        const redirectUrl = new URL(url, process.env.NEXT_PUBLIC_SITE_URL);

        if (url.startsWith('/') || redirectUrl.origin === process.env.NEXT_PUBLIC_SITE_URL) {
          router.push(redirectUrl.href);
        } else {
          window.location.assign(url);
        }
      }
    } catch (err) {
      console.error('Submission error', err);
      toast.error('Submission failed.');
    }
  };

  if (!isLoading && isSubmitSuccessful && confirmationType == 'message')
    return (
      <RichText
        className="border border-green-900 p-4 bg-green-300 text-green-900 rounded-md"
        data={formDefinition.confirmationMessage}
      />
    );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field) => (
          <RenderField
            key={field.name}
            field={field}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        ))}

        {useCaptcha && <CaptchaField />}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : submitButtonLabel}
        </Button>
      </form>
    </FormProvider>
  );
}
