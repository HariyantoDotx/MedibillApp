export * from './date';

export const replaceVal = ({
  value,
  from,
  to,
}: {
  value: string | null
  from: string;
  to: string;
}) => {
  if (value) return value.split(from).join(to);
  return;
};
