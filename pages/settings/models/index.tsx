import { Box } from "@chakra-ui/react";
import Page from "../../../components/Page";
import { Button } from "@saas-ui/react";
import { useRouter } from "next/router";
import ModelList from "./list";

const Models = () => {
  const router = useRouter();
  return (
    <Page
      extra={
        <Button
          onClick={() => {
            router.push("/settings/models/create");
          }}
          colorScheme={"teal"}
        >
          Create New
        </Button>
      }
      title="Asset Models"
    >
      <Box px={4}>
        <ModelList />
      </Box>
    </Page>
  );
};

export default Models;
