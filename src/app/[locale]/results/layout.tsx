export default function ResultsLayout({
  children,
  characters,
  details,
}: {
  children: React.ReactNode;
  characters: React.ReactNode;
  details: React.ReactNode;
}) {
  return (
    <div lang="en">
      {children}
      {characters}
      {details}
    </div>
  );
}
