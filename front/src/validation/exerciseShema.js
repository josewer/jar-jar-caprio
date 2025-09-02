import * as Yup from 'yup';
import { Categories } from '../enums/Categories';
import { Muscles } from '../enums/Muscles';


export const exerciseSchema = Yup.object({
    name : Yup.string().required("The name is required."),
    category : Yup.string().oneOf(Object.values(Categories), "Select a valid category").required("The category is required."),
    muscle : Yup.string().oneOf(Object.values(Muscles), "Select a valid muscle.").required("The muscle is required.")
})
