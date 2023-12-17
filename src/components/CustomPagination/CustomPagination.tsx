"use client";

import { Group, Pagination } from "@mantine/core";
import { IconArrowBarToRight, IconArrowBarToLeft, IconArrowLeft, IconArrowRight, IconGripHorizontal } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CustomPagination({ totalPages, offset }: { totalPages: number; offset: string }) {
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
            value={page}
            onChange={handleChange}
            total={Math.ceil(totalPages)}
            nextIcon={IconArrowRight}
            previousIcon={IconArrowLeft}
            firstIcon={IconArrowBarToLeft}
            lastIcon={IconArrowBarToRight}
            dotsIcon={IconGripHorizontal}
        />
    );
}
