import type { FC } from "react";
import { useMantineColorScheme, ActionIcon, Group, Center, SegmentedControl, Box } from '@mantine/core';
import { Sun, MoonStars, Moon } from 'tabler-icons-react';

const ThemeToggler: FC<{ isMobile?: boolean; }> = ({ isMobile }) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    if (isMobile) return (
        <Group position="center" my="xl">
            <SegmentedControl
                value={colorScheme}
                onChange={() => toggleColorScheme()}
                data={[
                    {
                        value: 'light',
                        label: (
                            <Center>
                                <Sun size={16} />
                                <Box ml={10}>Light</Box>
                            </Center>
                        ),
                    },
                    {
                        value: 'dark',
                        label: (
                            <Center>
                                <Moon size={16} />
                                <Box ml={10}>Dark</Box>
                            </Center>
                        ),
                    },
                ]}
            />
        </Group>
    );
    else return (
        <Group className="hidden sm:block" position="center">
            <ActionIcon
                onClick={() => toggleColorScheme()}
                size="lg"
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
                })}
            >
                {colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>
        </Group>
    );
};
export default ThemeToggler;