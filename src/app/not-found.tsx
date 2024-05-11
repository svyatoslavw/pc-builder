import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col text-neutral-600 w-full min-h-screen gap-2 justify-center items-center">
      <h1 className="text-8xl font-semibold">404!</h1>
      <div className={"text-center"}>
        <p className="text-xl">This page does not exist</p>
        <Link href="/i/dashboard" className="my-4 text-xs underline underline-offset-2">
          Go back to the dashboard page
        </Link>
      </div>
    </div>
  )
}
