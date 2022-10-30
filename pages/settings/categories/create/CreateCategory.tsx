import { useRef } from "react";
import { AutoForm } from "@saas-ui/react";
import { useDocument } from "../../../../services/db";
import useNotification from "../../../../components/common/useNotification";

type CreateCategoryInput = {
  name: string;
  description: string;
};

const CreateCategory = () => {
  const category = useDocument("categories");
  const form = useRef<HTMLFormElement | null>(null);
  const { notify } = useNotification();

  const schema = {
    name: {
      type: String,
      required: true,
      label: "Name",
      help: "Give an accurate name to the category e.g. Laptop",
    },
    description: {
      type: String,
      label: "Description",
      help: "Give an accurate description to the category e.g. Laptops are portable computers",
    },
  };

  const onSubmit = (params: CreateCategoryInput) => {
    return category
      .create(params)
      .then((res) => {
        notify({
          title: "Category created",
          status: "success",
        });
        form?.current?.reset();
        return res;
      })
      .catch((err) => {
        notify({
          title: "Could not create category",
          description: err.message,
          status: "error",
        });
      });
  };

  return (
    <AutoForm<CreateCategoryInput>
      schema={schema}
      formRef={form}
      onSubmit={onSubmit}
      submitLabel="Create Category"
    />
  );
};

export default CreateCategory;
