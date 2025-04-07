
import React from "react";
import { LucideIcon } from "lucide-react";

interface PageTitleProps {
  title: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export function PageTitle({ title, icon: Icon, children }: PageTitleProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-6 w-6 text-primary" />}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
}
