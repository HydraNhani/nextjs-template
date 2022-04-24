import { forwardRef } from "react";
import type { PropsWithChildren } from "react";
import Link from "@components/Link";
import { LinkProps } from "@types";

type HeaderLinkProps = PropsWithChildren<LinkProps>;

const HeaderLink = forwardRef<HTMLAnchorElement, HeaderLinkProps>((props, ref) => {
    return (
        <Link {...props} className="block py-1 px-2 rounded-sm hover:bg-lightmodesecondary dark:hover:bg-darkmodesecondary" ref={ref}/>
    );
});

export default HeaderLink;