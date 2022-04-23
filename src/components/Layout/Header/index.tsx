import type { FC } from "react";
import { createStyles, Header as MantineHeader, Menu, Group, Center, Burger, Container } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Logo from "@public/favicon.ico";
import Image from "next/image";
import type { HeaderMenuItems } from "@types";
import HeaderLink from "@components/Layout/Header/HeaderLink";

const Header: FC<{
    menuItems: HeaderMenuItems;
}> = ({ menuItems: links }) => {
    const [opened, toggleOpened] = useBooleanToggle(false);
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
                        <Center>
                            <span className="mr-1">{link.label}</span>
                            <ChevronDownIcon className="h-3 p-3"/>
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
        <MantineHeader height={56} className="" mb={120}>
            <Container>
                <div className="h-14 flex justify-between items-center">
                    <Image src={Logo}/>
                    <Group spacing={5} className="hidden sm:visible">
                        {items}
                    </Group>
                    <Burger opened={opened} onClick={() => toggleOpened()} className="md:hidden" size="sm" color="#fff"/>
                </div>
            </Container>
        </MantineHeader>
    );
};
export default Header;