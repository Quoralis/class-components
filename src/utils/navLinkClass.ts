export function navLinkClass({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  if (isPending) return 'pending';
  if (isActive) return 'active';
  return '';
}
