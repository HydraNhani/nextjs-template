import type { FC } from "react";
import { Menu, Divider } from "@mantine/core";
import Motion from "@components/Motion";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";
import { useAuth } from "@lib/hooks";
import Link from "@components/Link";

const HeaderAccountActions: FC = () => {
    const { logout } = useAuth();
    function signOut() {
        return () => {
            logout();
        };
    };
    return (
        <>
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<CogIcon className="w-4 h-4" />}>
                <Link href="/account"> Account Settings </Link>
            </Menu.Item>
            <Divider />
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item icon={<LogoutIcon className="w-4 h-4" />} onClick={signOut()}>
                <Motion> Logout </Motion>
            </Menu.Item>
        </>
    );
};
export default HeaderAccountActions;