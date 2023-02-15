import { Toast } from 'toastify-react-native';

export const ToastFunction = (name,description)=>{
            switch(name) {
            case "success":
                return Toast.success(description)
              
            case "error":
                return Toast.error(description)
              
            case "info":
                Toast.info(description)
              break;
            case "warn":
                Toast.warn(description)
          }

    
}

