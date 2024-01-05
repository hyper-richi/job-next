"use client";
import { List } from "@mantine/core";
import VSCodeIcon from "../../../public/images/svg/badges/visualstudiocode.svg";
import MantineIcon from "../../../public/images/svg/badges/mantine.svg";
import NextdotjsIcon from "../../../public/images/svg/badges/nextdotjs.svg";
import TypescriptIcon from "../../../public/images/svg/badges/typescript.svg";

const ListStack = () => {
    return (
        <div>
            <List spacing="xs" size="sm" center>
                <List.Item icon={<NextdotjsIcon width={24} height={24} />}>Next JS</List.Item>
                <List.Item icon={<MantineIcon width={24} height={24} color={"#339AF0"} />}>Mantine UI </List.Item>
                <List.Item icon={<TypescriptIcon width={24} height={24} />}>Typescript</List.Item>
                <List.Item icon={<VSCodeIcon width={24} height={24} />}>VSCode</List.Item>
            </List>
        </div>
    );
};

export default ListStack;
