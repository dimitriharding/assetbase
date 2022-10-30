import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@saas-ui/react";
import { yupForm } from "@saas-ui/forms/yup";
import { FormDialog } from "@saas-ui/modals";
type SimpleFormDialogProps = {
  schema: any;
  title: string;
  onSubmit: (params: any) => void;
  buttonLabel?: string;
};
const SimpleFormDialog = ({
  schema,
  onSubmit,
  title,
  buttonLabel = "New",
}: SimpleFormDialogProps) => {
  const disclosure = useDisclosure();
  return (
    <>
      <Button onClick={() => disclosure.onOpen()}>{buttonLabel}</Button>
      <FormDialog
        title={title}
        {...disclosure}
        onSubmit={onSubmit}
        {...yupForm(schema)}
      />
    </>
  );
};

export default SimpleFormDialog;
