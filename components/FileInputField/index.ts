import { registerFieldType } from "@saas-ui/forms";
import { FileInput } from "./FileInput";

const FileInputField = registerFieldType("file-input", FileInput, {
  isControlled: true,
});

export { FileInputField };
