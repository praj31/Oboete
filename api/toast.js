// import {Toast} from 'toastify-react-native';

// export const displayToast = (type, description) => {
//     switch (type) {
//         case "success":
//             return Toast.success(description)
//         case "error":
//             return Toast.error(description)
//         case "info":
//             return Toast.info(description)
//         case "warn":
//             return Toast.warn(description)
//     }
// }

import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';

export const displayToast = (type, title, description) => {
  switch (type) {
    case 'success':
      return Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: title,
        textBody: description,
        autoClose: 2500,
      });
    case 'error':
      return Toast.show({
        type: ALERT_TYPE.DANGER,
        title: title,
        textBody: description,
        autoClose: 2500,
      });

    case 'warn':
      return Toast.show({
        type: ALERT_TYPE.WARNING,
        title: title,
        textBody: description,
        autoClose: 2500,
      });
  }
};

export const displayAlert = (type, title, description, close) => {
  switch (type) {
    case 'success':
      return Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: title,
        textBody: description,
        button: close,
      });
    case 'error':
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: title,
        textBody: description,
        button: close,
      });

    case 'warn':
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: title,
        textBody: description,
        button: close,
      });
  }
};
