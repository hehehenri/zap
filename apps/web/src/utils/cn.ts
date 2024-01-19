import { User } from '@/auth';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...input: ClassValue[]) => twMerge(clsx(input));

type Connection<Node> =
  | {
      readonly edges?:
        | ReadonlyArray<{ readonly node?: Node | null } | null | undefined>
        | null
        | undefined
    }
  | undefined
  | null

export const extractNodes = <Node extends object, T = Node>(
  connection: Connection<Node>,
  mapper?: (node: Node) => T
): T[] => {
  return (
    connection?.edges
      ?.map((edge) => (mapper ? (mapper(edge?.node!) as any) : edge?.node!))
      .filter((x) => x != null) ?? []
  )
}

export const getOtherParticipant = (participants: readonly User[], user: User) => {
  const firstParticipant = participants[0];
  const secondParticipant = participants[1];

  if (firstParticipant?.id == user.id) return secondParticipant;
  if (secondParticipant?.id == user.id) return firstParticipant;

  return null;
}
