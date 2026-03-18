import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  center?: boolean;
}

const Loader = ({ className, center = false }: LoaderProps) => {
  return (
    <div className={cn("nxg-spinner", center && "center", className)}>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
    </div>
  );
};

export default Loader;
