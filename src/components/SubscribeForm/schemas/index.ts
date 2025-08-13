import { z } from 'zod';

export const subscribeFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type SubscribeFormData = z.infer<typeof subscribeFormSchema>;
