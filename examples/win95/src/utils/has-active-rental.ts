import type { ExtendedMember } from "@/types";

type Props = {
  member: ExtendedMember;
};

export const hasActiveRental = ({ member }: Props) => {
  const hasUnreturnedTape = member.rentals.some(
    (rental) => !rental.returned_at,
  );

  return hasUnreturnedTape;
};
