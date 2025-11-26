import React from 'react';
import { Toaster as SonnerToaster } from "sonner";
export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        className: "toast",
        duration: 3000
      }}
    />
  );
}