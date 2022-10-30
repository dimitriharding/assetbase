import { useState, useRef } from "react";
import { Form, FormLayout, Field, SubmitButton } from "@saas-ui/react";
import { Flex } from "@chakra-ui/react";
import { FileInputField } from "../../../../components/FileInputField";
import SimpleFormDialog from "../../../../components/common/SimpleFormDialog";
import { manufacturerSchema, categorySchema } from "../../../../lib/schemas";
import { createModel, useDocument } from "../../../../services/db";
import useNotification from "../../../../components/common/useNotification";
import { TManufacturer, TCategories } from "../../../../lib/types";

type CreateAssetModelInput = {
  name: string;
  manufacturer: string;
  category: string;
  modelNumber: string;
  notes: string;
  image: File;
};

const CreateAssetModel = () => {
  const [file, setFile] = useState<File | null>(null);
  const form = useRef<HTMLFormElement | null>(null);
  const { notify } = useNotification();
  const { useList: useManufacturers, create: createManufacture } =
    useDocument("manufacturers");
  const { useList: useCategories, create: createCategory } =
    useDocument("categories");
  const { data: listOfManufacturers } = useManufacturers();
  const { data: listOfCategories } = useCategories();

  const onSubmit = (params: CreateAssetModelInput) => {
    return createModel({ ...params, image: file })
      .then((res) => {
        notify({
          title: "Model created",
          status: "success",
        });
        form?.current?.reset();
        setFile(null);
        return res;
      })
      .catch((err) => {
        notify({
          title: "Could not create asset model",
          description: err.message,
          status: "error",
        });
      });
  };

  return (
    <Form<CreateAssetModelInput> formRef={form} onSubmit={onSubmit}>
      <FormLayout>
        <FormLayout>
          <Field
            name="name"
            label="Name"
            type="text"
            help="Give an accurate name to the asset model e.g. MacBook Pro 13” 2020 (M1)"
            rules={{ required: true }}
          />
        </FormLayout>
        <FormLayout templateColumns="auto 5%">
          <Field
            name="manufacturer"
            type="select"
            label="Manufacturer"
            placeholder="Please select a manufacturer"
            rules={{ required: true }}
            options={
              listOfManufacturers?.map((manufacturer: TManufacturer) => ({
                value: manufacturer.id,
                label: manufacturer.name,
              })) ?? []
            }
          />
          <Flex h={"97%"} alignItems={"flex-end"}>
            <SimpleFormDialog
              title="New Manufacturer"
              onSubmit={(data) => {
                return createManufacture(data)
                  .then((res) => {
                    notify({
                      title: "Manufacturer created",
                      status: "success",
                    });
                  })
                  .catch((err) => {
                    notify({
                      title: "Could not create manufacturer",
                      status: "error",
                      description: err.message,
                    });
                  });
              }}
              schema={manufacturerSchema}
            />
          </Flex>
        </FormLayout>
        <FormLayout templateColumns="auto 5%">
          <Field
            name="category"
            type="select"
            label="Category"
            placeholder="Please select a category"
            rules={{ required: true }}
            options={
              listOfCategories?.map((category: TCategories) => ({
                value: category.id,
                label: category.name,
              })) ?? []
            }
          />
          <Flex h={"97%"} alignItems={"flex-end"}>
            <SimpleFormDialog
              schema={categorySchema}
              title="New Category"
              onSubmit={(data) => {
                return createCategory(data)
                  .then((res) => {
                    notify({
                      title: "Category created",
                      status: "success",
                    });
                    return res;
                  })
                  .catch((err) => {
                    notify({
                      title: "Could not create category",
                      description: err.message,
                      status: "error",
                    });
                  });
              }}
            />
          </Flex>
        </FormLayout>
        <FormLayout>
          <Field
            name="modelNumber"
            label="Model Number"
            type="text"
            rules={{ required: false }}
          />
          <Field
            name="notes"
            label="Notes"
            type="textarea"
            rules={{ required: false }}
          />
        </FormLayout>

        <FileInputField
          onChange={(event) => {
            const target = event.target as HTMLInputElement;
            const selectedFile = target.files?.[0];
            if (selectedFile) {
              setFile(selectedFile);
            }
          }}
          label="Upload Image"
          name="image"
        />

        <SubmitButton>Create Asset Model</SubmitButton>
      </FormLayout>
    </Form>
  );
};

export default CreateAssetModel;
