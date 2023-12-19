"use client";

import { Pagination } from "@mantine/core";
import { IconArrowBarToRight, IconArrowBarToLeft, IconArrowLeft, IconArrowRight, IconGripHorizontal } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CustomPagination({ totalPages, offset, query }: { totalPages: number; offset: string; query: string | "" }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const page = !!offset ? Number(offset) + 1 : 1;

    function handleChange(value: number) {
        const params = new URLSearchParams(searchParams);
        params.set("offset", (value - 1).toString());
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Pagination
            withEdges
            value={query ? 1 : page}
            onChange={handleChange}
            total={query ? 1 : Math.ceil(totalPages)}
            nextIcon={IconArrowRight}
            previousIcon={IconArrowLeft}
            firstIcon={IconArrowBarToLeft}
            lastIcon={IconArrowBarToRight}
            dotsIcon={IconGripHorizontal}
        />
    );
}
