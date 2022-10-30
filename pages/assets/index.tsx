import Page from "../../components/Page";
import { useDisclosure, Link as CLink } from "@chakra-ui/react";
import { Button } from "@saas-ui/react";
import { FormDialog } from "@saas-ui/modals";
import { zodForm, zodMeta } from "@saas-ui/forms/zod";
import { z } from "zod";
import { HiOutlineInbox } from "react-icons/hi";
import AssetsList from "./list";
import { createAsset, useAssets, deleteAsset } from "../../services/db";
import Link from "next/link";

const Assets = () => {
  const disclosure = useDisclosure();
  const { data: assets, isLoading } = useAssets();

  const onSubmit = async (data: any) => {
    createAsset(data)
      .then(() => {
        disclosure.onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const schema = z.object({
    name: z.string().min(1).describe("Name"),
    description: z
      .string()
      .describe(zodMeta({ label: "Description", type: "textarea" })),
    status: z.string().describe(zodMeta({ label: "Status", type: "select" })),
  });

  return (
    <Page
      isLoading={isLoading}
      title="Assets"
      extra={
        <Link href="/assets/create" passHref>
          <Button as={CLink} variant={"solid"} colorScheme={"teal"} size={"sm"}>
            New Asset
          </Button>
        </Link>
      }
    >
      <AssetsList
        onEdit={(id) => console.log(id)}
        onDelete={(id) => {
          deleteAsset(id);
        }}
        data={assets || []}
        emptyProps={{
          colorScheme: "teal",
          icon: HiOutlineInbox,
          title: "No assets yet",
          description: "You haven't imported any assets yet.",
          actions: (
            <>
              <Button
                onClick={() => disclosure.onOpen()}
                label="Create Asset"
              />
              <Button label="Import Assets" colorScheme="teal" />
            </>
          ),
        }}
        size="sm"
      />
      <FormDialog
        title="New asset"
        defaultValues={{ name: "" }}
        {...disclosure}
        onSubmit={onSubmit}
        {...zodForm(schema)}
      ></FormDialog>
    </Page>
  );
};

export default Assets;
