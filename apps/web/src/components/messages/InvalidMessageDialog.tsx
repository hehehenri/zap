import { Dispatch, SetStateAction } from "react"
import Dialog from "../Dialog";

type Error = string | null;

type Props = {
  error: string | null,
  setError: Dispatch<SetStateAction<Error>>,
}

export const InvalidMessageDialog = ({ error, setError }: Props) => {
  const open = Boolean(error);
  const onOpenChange = (open: boolean) => {
    if (!open) {
      setError(null);
    }
  }

  return (
    <Dialog className="max-w-sm lg:max-w-sm" title="Something went wrong" open={open} onOpenChange={onOpenChange}>
      <section className="flex flex-col items-center gap-3">
        <p className="w-full">{error}</p>
        <button
          onClick={() => onOpenChange(false)}
          className="w-full hover:bg-secondary-100 text-secondary-400 transition rounded-2xl py-2.5 font-semibold"
        >
          Ok
        </button>
      </section>
    </Dialog>
  )
}
