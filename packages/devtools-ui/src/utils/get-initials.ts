export const getInitials = (name: string) => {
  // max 2 initials
  const initials = name.split(" ").slice(0, 2);
  return initials.map((initial) => initial[0]).join("");
};
