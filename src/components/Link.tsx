import NextLink from "next/link";
import omit from "omit";
import Motion from "@components/Motion";
import { forwardRef } from "react";
import type { LinkProps } from "@types";
import { Text } from "@mantine/core";

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => ( 
    <Motion disablemotion={props.disablemotion} disablehovermotion={props.disablehovermotion}>
        <NextLink href={props.href || "/"}>
            <Text<"a"> ref={ref} {...omit(["href", "style"], props)} style={{ textDecoration: "none", cursor: "pointer", ...props.style }}/>
        </NextLink>
    </Motion>
));

export default Link;