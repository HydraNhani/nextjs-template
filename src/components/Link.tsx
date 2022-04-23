import NextLink from "next/link";
import omit from "omit";
import Motion from "@components/Motion";
import { forwardRef } from "react";
import type { LinkProps } from "@types";

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => ( 
    <Motion disablemotion={props.disablemotion} disablehovermotion={props.disablehovermotion}>
        <NextLink href={props.href || "/"}>
            <a ref={ref} {...omit(["href", "style"], props)} style={{ textDecoration: "none", ...props.style }}/>
        </NextLink>
    </Motion>
));

export default Link;