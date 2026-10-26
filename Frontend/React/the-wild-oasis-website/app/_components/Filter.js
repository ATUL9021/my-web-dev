"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);

    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <button
        className={`px-5 py-2 hover:bg-primary-600 ${activeFilter === "all" ? "bg-purple-900" : ""}`}
        onClick={(e) => {
          handleFilter("all");
        }}
      >
        All cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-600 ${activeFilter === "small" ? "bg-purple-900" : ""}`}
        onClick={(e) => {
          handleFilter("small");
        }}
      >
        1&mdash;2
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-600 ${activeFilter === "medium" ? "bg-purple-900" : ""}`}
        onClick={(e) => {
          handleFilter("medium");
        }}
      >
        3&mdash;4
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-600 ${activeFilter === "large" ? "bg-purple-900" : ""}`}
        onClick={(e) => {
          handleFilter("large");
        }}
      >
        5&mdash;8
      </button>
    </div>
  );
}

export default Filter;
