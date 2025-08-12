import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Star Trek Characters Search',
  description:
    'A web application for searching and exploring Star Trek characters with detailed information.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
