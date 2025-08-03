import { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export const Section = ({ title, children }: SectionProps) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="bg-slate-900 text-white p-4 rounded">{children}</div>
  </div>
);
