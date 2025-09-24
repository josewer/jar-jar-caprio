import * as yup from "yup";

export const routineSchema = yup.object({
  name: yup.string().required("El nombre es obligatorio."),
  description: yup.string().max(200, "Maximo 200 caráteres"),
});
