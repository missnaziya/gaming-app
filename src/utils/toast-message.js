import { toast } from "react-toastify";

export function showMessage(message, type = "success") {
    if (process.env.GATSBY_IS_MOBILE == "1") {
        alert(message);
    } else {
        switch (type) {
            case "success":
                return toast(message);
            case "error":
                return toast.error(message);
            default:
                return toast(message);
        }
    }
}
