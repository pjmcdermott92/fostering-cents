'use client';
import { ModalProvider, ModalContainer } from '@faceless-ui/modal';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider transTime={100} zIndex={150}>
      {children}
      <ModalContainer />
    </ModalProvider>
  );
}
