import type { FormField } from './types';
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';

import { Label } from './Label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

interface RenderFieldProps<T extends FieldValues> {
  field: FormField;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
}

export function RenderField<T extends FieldValues>({
  field,
  register,
  setValue,
  watch,
  errors,
}: RenderFieldProps<T>) {
  const error = errors[field.name]?.message as string | undefined;
  const fieldType = field.blockType ?? field.type;

  switch (fieldType) {
    case 'text':
    case 'email':
    case 'number':
      return (
        <FieldWrapper field={field} error={error}>
          <Input
            id={field.name}
            type={fieldType}
            className="w-full"
            {...register(field.name as Path<T>)}
          />
        </FieldWrapper>
      );
    case 'textarea':
      return (
        <FieldWrapper field={field} error={error}>
          <Textarea id={field.name} className="w-full" {...register(field.name as Path<T>)} />
        </FieldWrapper>
      );
    case 'select':
      return (
        <FieldWrapper field={field} error={error}>
          <Select
            onValueChange={(value) =>
              setValue(field.name as Path<T>, value as PathValue<T, Path<T>>)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldWrapper>
      );
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={field.name}
            checked={watch(field.name as Path<T>) || false}
            onCheckedChange={(checked) =>
              setValue(field.name as Path<T>, !!checked as PathValue<T, Path<T>>, {
                shouldValidate: true,
              })
            }
          />
          <Label htmlFor={field.name} label={field.label} required={field.required} />
          {error && <p className="text-sm text-red-500 ml-2">{error}</p>}
        </div>
      );
    default:
      return null;
  }
}

function FieldWrapper({
  children,
  field,
  error,
}: {
  children: React.ReactNode;
  field: FormField;
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={field.name} label={field.label} required={field.required} />
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
