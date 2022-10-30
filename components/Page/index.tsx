import { ReactNode } from "react";
import { Divider, Loader } from "@saas-ui/react";
import { Box, Flex, HStack, Heading, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Page({
  children,
  title,
  extra,
  isLoading,
  onBack,
}: {
  children: ReactNode;
  title: string;
  extra?: ReactNode;
  isLoading?: boolean;
  onBack?: () => void;
}) {
  return (
    <>
      <Box>
        <Flex
          px={4}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <HStack alignItems={"center"}>
            {onBack && (
              <Button
                variant={"ghost"}
                onClick={onBack}
                aria-label={"Back"}
                leftIcon={<ArrowBackIcon />}
              />
            )}
            <Box>
              <Heading size="sm" as="h1">
                {title}
              </Heading>
            </Box>
          </HStack>
          <Flex alignItems={"center"}>{extra}</Flex>
        </Flex>
        <Divider />
      </Box>

      {isLoading ? <Loader /> : <Box p={4}>{children}</Box>}
    </>
  );
}
