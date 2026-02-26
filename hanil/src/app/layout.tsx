import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Korea-Japan IP Research Institute',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
