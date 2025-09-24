import * as yup from "yup";

export const routineSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().max(500, "Max 500 characters"),
});
