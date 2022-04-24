import type { FC } from "react";
import { Header as MantineHeader, Menu, Group, Center, Container, UnstyledButton, Text, Divider, Avatar } from "@mantine/core";
import { ChevronDownIcon, CogIcon, LogoutIcon } from "@heroicons/react/outline";
import Logo from "@public/favicon.ico";
import Image from "next/image";
import type { MenuItems } from "@types";
import HeaderLink from "@components/Layout/Header/HeaderLink";
import { useAuth } from "@lib/hooks";
import Link from "@components/Link";
import Motion from "@components/Motion";

const Header: FC<{
    menuItems: MenuItems;
}> = ({ menuItems: links }) => {
    const { user, logout } = useAuth();
    function signOut() {
        return () => {
            logout();
        };
    };
    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item className="flex items-center justify-center" key={item.link}>
                <HeaderLink href={item.link}> {item.label} </HeaderLink>
            </Menu.Item>
        ));
        if (menuItems) return (
            <Menu
                key={link.label}
                trigger="hover"
                delay={0}
                transitionDuration={100}
                placement="end"
                gutter={1}
                control={
                    <HeaderLink href={link.link}>
                        <Center component="a">
                            <span className="mr-1">{link.label}</span>
                            <ChevronDownIcon className="h-3 w-3 text-lightmodetext dark:text-darkmodetext" />
                        </Center>
                    </HeaderLink>
                }>{menuItems}</Menu>
        );
        return (
            <HeaderLink href={link.link} key={link.label}>
                {link.label}
            </HeaderLink>
        );
    });
    return (
        <MantineHeader className="sticky bg-lightmodeprimary dark:bg-darkmodeprimary" height={56}>
            <Container>
                <div className="h-14 flex justify-between items-center">
                    <Link>
                        <Image src={Logo} />
                    </Link>
                    <Group spacing={5} className="hidden sm:flex">
                        {items}
                        {user &&
                        <Motion>
                            <Menu size={260} placement="end" transition="pop-top-right" className="hidden sm:block"
                                control={
                                    <UnstyledButton>
                                        <Group spacing={7}>
                                            <Avatar src={user.photoURL} alt={user.displayName!} radius="xl" size={20} />
                                            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                                {user.displayName}
                                            </Text>
                                            <ChevronDownIcon className="h-3 w-3"/>
                                        </Group>
                                    </UnstyledButton>
                                }
                            >
                                <Menu.Label>Settings</Menu.Label>
                                <Menu.Item icon={<CogIcon className="w-4 h-4" />}>
                                    <Link href="/account"> Account Settings </Link>
                                </Menu.Item>
                                <Divider />
                                <Menu.Label>Actions</Menu.Label>
                                <Menu.Item icon={<LogoutIcon className="w-4 h-4"/>} onClick={signOut()}>
                                    <Motion> Logout </Motion>
                                </Menu.Item>
                            </Menu>
                        </Motion>
                        }
                    </Group>
                </div>
            </Container>
        </MantineHeader>
    );
};
export default Header;