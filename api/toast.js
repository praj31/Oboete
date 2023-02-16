import { Toast } from 'toastify-react-native'

export const displayToast = (type, description) => {
    switch (type) {
        case "success":
            return Toast.success(description)
        case "error":
            return Toast.error(description)
        case "info":
            return Toast.info(description)
        case "warn":
            return Toast.warn(description)
    }
}