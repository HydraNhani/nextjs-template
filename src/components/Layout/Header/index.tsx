import type { FC } from "react";
import { Header as MantineHeader, Menu, Group, Center, Container, UnstyledButton, Text, Avatar, Burger } from "@mantine/core";
import { ChevronDownIcon } from "@heroicons/react/outline";
import type { MenuItems } from "@types";
import HeaderLink from "@components/Layout/Header/HeaderLink";
import { useAuth } from "@lib/hooks";
import Link from "@components/Link";
import Motion from "@components/Motion";
import { useBooleanToggle } from "@mantine/hooks";
import ThemeToggler from "@components/Layout/Header/ThemeToggler";
import HeaderAccountActions from "@components/Layout/Header/HeaderAccountActions";
import Constants from "@constants/index";

const Header: FC<{
    menuItems: MenuItems;
}> = ({ menuItems: links }) => {
    const { user } = useAuth();
    const [opened, toggleOpened] = useBooleanToggle(false);
    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item component={Center} key={item.link}>
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
                        <Avatar className="bg-lightmodetext dark:bg-darkmodetext" src={"/favicon.ico"} alt={Constants.APPLICATION_NAME} radius="xl" size={40} />
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
                                                <ChevronDownIcon className="h-3 w-3" />
                                            </Group>
                                        </UnstyledButton>
                                    }
                                >
                                    <HeaderAccountActions />
                                </Menu>
                            </Motion>
                        }
                    </Group>
                    <Menu className="sm:hidden" size={260} placement="end" transition="pop-top-right" control={
                        <Burger opened={opened} onClick={() => toggleOpened()} size="sm" />
                    }>
                        <Menu.Item component={Center}>
                            <Avatar className="bg-lightmodetext dark:bg-darkmodetext" src={"/favicon.ico"} alt={Constants.APPLICATION_NAME} radius="xl" size={40} />
                        </Menu.Item>
                        {links.map(link => (
                            <Menu.Item component={Center} key={link.label}>
                                <HeaderLink href={link.link}>
                                    {link.label}
                                </HeaderLink>
                            </Menu.Item>
                        ))}
                        {user && <>
                            <Menu.Label>User</Menu.Label>
                            <Menu.Item component={Center}>
                                <Group spacing={7}>
                                    <Avatar src={user.photoURL} alt={user.displayName!} radius="xl" size={20} />
                                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                        {user.displayName}
                                    </Text>
                                </Group>
                            </Menu.Item>
                            <Menu.Item component={Center}>
                                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                    {user.email}
                                </Text>
                            </Menu.Item>
                            <HeaderAccountActions />
                        </>}
                        <Menu.Label>Theme</Menu.Label>
                        <Menu.Item component={Center}>
                            <ThemeToggler isMobile />
                        </Menu.Item>
                    </Menu>
                    <ThemeToggler />
                </div>
            </Container>
        </MantineHeader>
    );
};
export default Header;