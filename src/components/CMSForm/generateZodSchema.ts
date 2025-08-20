import { z } from 'zod';
import { FormField } from './types';

export function generateZodSchema(fields: FormField[], useCaptcha = false) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    let schema: z.ZodTypeAny;

    switch (field.blockType) {
      case 'text': {
        const base = z.string();
        schema = field.required
          ? base.min(1, `${field.label ?? field.name} is required`)
          : base.optional();
        break;
      }

      case 'textarea': {
        const base = z.string();
        schema = field.required
          ? base.min(1, `${field.label ?? field.name} is required`)
          : base.optional();
        break;
      }

      case 'email': {
        const base = z.string().email('Invalid email address');
        schema = field.required
          ? base.min(1, `${field.label ?? field.name} is required`)
          : base.optional();
        break;
      }

      case 'number': {
        const base = z.preprocess(
          (val) => {
            if (val === '' || val === null || val === undefined) return undefined;
            const num = Number(val);
            return isNaN(num) ? val : num;
          },
          z.number().refine((val) => !isNaN(val), { message: 'Must be a number' }),
        );
        schema = field.required ? base : base.optional();
        break;
      }

      case 'checkbox': {
        const base = z.boolean();
        schema = field.required ? base : base.optional();
        break;
      }

      default:
        schema = z.any();
    }

    shape[field.name] = schema;
  }

  if (useCaptcha) {
    shape['captchaAnswer'] = z.string().min(1, 'CAPTCHA is required');
    shape['captchaExpected'] = z.string();
  }

  const baseSchema = z.object(shape);

  if (useCaptcha) {
    return baseSchema.superRefine((values, ctx) => {
      const { captchaAnswer, captchaExpected } = values;

      const answer = Number(captchaAnswer);
      const expected = Number(captchaExpected);

      if (isNaN(answer) || isNaN(expected) || answer !== expected) {
        ctx.addIssue({
          path: ['captchaAnswer'],
          code: z.ZodIssueCode.custom,
          message: 'Incorrect CAPTCHA answer',
        });
      }
    });
  }

  return baseSchema;
}
