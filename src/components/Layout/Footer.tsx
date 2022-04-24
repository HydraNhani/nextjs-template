import type { FC } from "react";
import { Text, Container, ActionIcon, Group, useMantineTheme } from "@mantine/core";
import { BrandTwitter, BrandYoutube, BrandInstagram } from "tabler-icons-react";
import Logo from "@public/favicon.ico";
import Image from "next/image";
import { MenuItems } from "@types";

const Footer: FC<{
    menuItems: MenuItems;
}> = ({ menuItems: data }) => {
    const theme = useMantineTheme();
    const groups = data.map((group) => {
        const links = group.links?.map((link, index) => (
            <Text<'a'> key={index} className="block text-lightmodetext dark:text-darkmodetext text-sm py-1 hover:underline" component="a" href={link.link}>
                {link.label}
            </Text>
        ));
        return (
            <div className="w-40" key={group.label}>
                <Text sx={{ marginBottom: theme.spacing.xs / 2 }} className="font-bold text-lg text-lightmodetext dark:text-darkmodetext">{group.label}</Text>
                {links}
            </div>
        );
    });
    return (
        <footer style={{ paddingTop: theme.spacing.xl * 2, paddingBottom: theme.spacing.xl * 2 }} className="mt-28 bg-lightmodeprimary dark:bg-darkmodeprimary">
            <Container className="flex justify-between flex-col sm:flex-row text-center sm:text-left">
                <div className="flex flex-col items-center sm:block sm:flex-row sm:items-start" style={{ maxWidth: 200 }}>
                    <Image src={Logo} />
                    <Text size="xs" color="dimmed" className="mt-1 text-center sm:text-left">
                        {process.env.APPLICATION_DESCRIPTION}
                    </Text>
                </div>
                <div className="sm:flex flex-wrap hidden">{groups}</div>
            </Container>
            <Container sx={{ marginTop: theme.spacing.xl, paddingTop: theme.spacing.xl, paddingBottom: theme.spacing.xl }} className="border-t solid flex justify-between items-center">
                <Text className="text-center sm:text-left" color="dimmed" size="sm">
                    © 2022 Classic Games Web. All rights reserved.
                </Text>
                <Group spacing={0} className="flex-wrap hidden sm:flex" position="right" noWrap>
                    <ActionIcon size="lg">
                        <BrandTwitter size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandYoutube size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandInstagram size={18} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
};
export default Footer;