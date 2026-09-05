import type { JSX } from 'react';

export type Demo = {
  slug: string;
  title: string;
  description: string;
  render: () => JSX.Element;
};
