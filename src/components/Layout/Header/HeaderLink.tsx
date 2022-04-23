import { forwardRef } from "react";
import type { PropsWithChildren } from "react";
import Link from "@components/Link";
import { LinkProps } from "@types";

type HeaderLinkProps = PropsWithChildren<LinkProps>;

const HeaderLink = forwardRef<HTMLAnchorElement, HeaderLinkProps>((props, ref) => {
    return (
        <Link {...props} className="block py-2 px-3 rounded-sm hover:bg-lightmodeheader dark:hover:bg-darkmodeheader" ref={ref}/>
    );
});

export default HeaderLink;