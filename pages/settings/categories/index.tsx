import { Box } from "@chakra-ui/react";
import Page from "../../../components/Page";
import { Button } from "@saas-ui/react";
import { useRouter } from "next/router";

const Models = () => {
  const router = useRouter();
  return (
    <Page
      extra={
        <Button
          onClick={() => {
            router.push("/settings/categories/create");
          }}
          colorScheme={"teal"}
        >
          Create New
        </Button>
      }
      title="Categories"
    >
      <Box px={4}>{/* <ModelList /> */}</Box>
    </Page>
  );
};

export default Models;
