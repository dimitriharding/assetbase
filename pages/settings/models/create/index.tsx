import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import Page from "../../../../components/Page";
import CreateAssetModel from "./CreateAssetModel";

const Create = () => {
  const router = useRouter();
  return (
    <Page
      onBack={() => {
        router.push("/settings/models");
      }}
      title="Create Asset Model"
    >
      <Box px={60}>
        <CreateAssetModel />
      </Box>
    </Page>
  );
};

export default Create;
