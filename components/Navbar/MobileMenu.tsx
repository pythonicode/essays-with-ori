import { ActionIcon, Box, Group, MantineTheme, Stack, MediaQuery, Text } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { MdMenu } from "react-icons/md";

export default function MobileMenu() {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <MediaQuery query="(min-width: 700px)"
                styles={{ display: "none" }}>
                <ActionIcon onClick={() => setOpened(!opened)}>
                    {opened ? <FiX size="32px" /> : <MdMenu size="32px" />}
                </ActionIcon>
            </MediaQuery>
            <Box
                sx={(theme) => ({
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    width: "100vw",
                    height: "fit",
                    padding: "2rem",
                    top: "3rem",
                    left: 0,
                    zIndex: 100,
                    backgroundColor: opened ? theme.colorScheme === "dark" ? theme.colors.dark[7] : "white" : "transparent",
                    transition: "all 200ms",
                })}
            >
                {opened && (
                    <Stack>
                        <Link href="/">
                            <Group spacing={8}>
                                <Box
                                    sx={(theme: MantineTheme) => ({
                                        width: 4,
                                        height: 20,
                                        backgroundColor: theme.colors.grape[5],
                                    })}
                                />
                                <Text size="xl" weight={600}>Home</Text>
                            </Group>
                        </Link>
                        <Link href="/about">
                            <Group spacing={8}>
                                <Box
                                    sx={(theme: MantineTheme) => ({
                                        width: 4,
                                        height: 20,
                                        backgroundColor: theme.colors.grape[5],
                                    })}
                                />
                                <Text size="xl" weight={600}>About</Text>
                            </Group>
                        </Link>
                        <Link href="/contact">
                            <Group spacing={8}>
                                <Box
                                    sx={(theme: MantineTheme) => ({
                                        width: 4,
                                        height: 20,
                                        backgroundColor: theme.colors.grape[5],
                                    })}
                                />
                                <Text size="xl" weight={600}>Contact</Text>
                            </Group>
                        </Link>
                    </Stack>

                )}
            </Box>
        </>
    );
}
