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
