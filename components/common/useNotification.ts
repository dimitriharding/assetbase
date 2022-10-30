import { useToast, ToastProps } from '@chakra-ui/react'

const useNotification = () => {
    const toast = useToast()
    const notify = (props: ToastProps) => {
        toast({
            ...props,
        })
    }

    return {
        notify,
    }
};

export default useNotification;