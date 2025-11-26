import React from 'react';
import { useState } from 'react';

export function ImageWithFallback({ src, alt, fallbackSrc = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop', className, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);
  const handleError = () => {
    if (!isError) {
      setImgSrc(fallbackSrc);
      setIsError(true);
    }
  };
  return <img src={imgSrc} alt={alt} className={className} onError={handleError} {...props} />;
}