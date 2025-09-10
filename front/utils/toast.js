import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";


export class ToastCumtom {

    static success(message, status = 200, force = false) {
        if (force || status !== 401) {
            toast.success(message)
        }
    }

    static info(message, status = 200, force = false) {
        if (force || status !== 401) {
            toast.info(message)
        }
    }

    static warn(message, status = 200, force = false) {
        if (force || status !== 401) {
            toast.warn(message)
        }
    }

    static error(message, status = 200, force = false) {
        if (force || status !== 401) {
            toast.error(message)
        }
    }
}
