import React from 'react';
import { Toaster as SonnerToaster } from "sonner";
export function Toaster() {
  return /*#__PURE__*/React.createElement(SonnerToaster, {
    position: "top-right",
    toastOptions: {
      className: "toast",
      duration: 3000
    }
  });
}