import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import Page from "../../../../components/Page";
import CreateCategory from "./CreateCategory";

const Create = () => {
  const router = useRouter();
  return (
    <Page
      onBack={() => {
        router.push("/settings/categories");
      }}
      title="Create Category"
    >
      <Box px={60}>
        <CreateCategory />
      </Box>
    </Page>
  );
};

export default Create;
