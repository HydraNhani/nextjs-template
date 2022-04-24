import type { FC } from "react";
import { Header as MantineHeader, Menu, Group, Center, Container } from "@mantine/core";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Logo from "@public/favicon.ico";
import Image from "next/image";
import type { MenuItems } from "@types";
import HeaderLink from "@components/Layout/Header/HeaderLink";

const Header: FC<{
    menuItems: MenuItems;
}> = ({ menuItems: links }) => {
    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ));
        if (menuItems) return (
            <Menu
                key={link.label}
                trigger="hover"
                delay={0}
                transitionDuration={0}
                placement="end"
                gutter={1}
                control={
                    <HeaderLink href={link.link}>
                        <Center component="a">
                            <span className="mr-1">{link.label}</span>
                            <ChevronDownIcon className="h-3 w-3 text-lightmodetext dark:text-darkmodetext"/>
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
                    <Image src={Logo}/>
                    <Group spacing={5} className="hidden sm:block">
                        {items}
                    </Group>
                </div>
            </Container>
        </MantineHeader>
    );
};
export default Header;