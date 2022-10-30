import * as Yup from "yup";

export const manufacturerSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
});

export const categorySchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description").meta({ type: "textarea" }),
});
