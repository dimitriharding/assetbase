import CreateNewAsset from "./CreateNewAsset";
import Page from "../../../components/Page";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const CreateNewAssetPage = () => {
  const router = useRouter();
  return (
    <Page
      onBack={() => {
        router.push("/assets");
      }}
      title="Create New Asset"
    >
      <Box px={20}>
        <CreateNewAsset />
      </Box>
    </Page>
  );
};

export default CreateNewAssetPage;
