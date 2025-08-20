'use client';
import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Label } from './Label';
import { Input } from '../ui/input';

export function CaptchaField() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { field: captchaExpectedField } = useController({
    name: 'captchaExpected',
    control,
    defaultValue: '',
  });

  useEffect(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setNum1(a);
    setNum2(b);
    captchaExpectedField.onChange((a + b).toString());
  }, [captchaExpectedField]);

  const error = errors?.captchaAnswer;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="captchaAnswer" label={`What is ${num1} + ${num2}?`} required />
      <Input
        id="captchaAnswer"
        type="text"
        {...register('captchaAnswer')}
        placeholder="Enter answer"
        className="border p-2 rounded"
      />
      {error?.message && <p className="text-sm text-red-600">{error.message as string}</p>}
    </div>
  );
}
