import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

export type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox';

export interface FormField {
  name: string;
  type?: FieldType;
  blockType?: FieldType;
  required?: boolean;
  label?: string;
  options?: { label: string; value: string }[];
}

type MessageConfirmation = {
  confirmationType: 'message';
  confirmationMessage: DefaultTypedEditorState;
};

type RedirectConfirmation = {
  confirmationType: 'redirect';
  redirect: { url: string };
};

export type PayloadFormDefinition = {
  id: string;
  fields: FormField[];
  submitButtonLabel: string;
  useCaptcha?: boolean;
} & (MessageConfirmation | RedirectConfirmation);
