"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  return (
    <div className="flex justify-center gap-4">
      {currentPage > 1 && (
        <>
          <Link href={`/introduction/1`}>First</Link>
          <Link href={`/introduction/${currentPage - 1}`}>&larr; Previous</Link>
        </>
      )}
      {currentPage < totalPages && (
        <>
          <Link href={`/introduction/${currentPage + 1}`}>Next &rarr;</Link>
          <Link href={`/introduction/${totalPages}`}>Last</Link>
        </>
      )}
    </div>
  );
}
