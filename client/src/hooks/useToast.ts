import {toast} from 'sonner';

export default function useToast() {
	return {
		success: (message: string) => toast.success(message),
		error: (message: string) => toast.error(message),
		info: (message: string) => toast.info(message),
	};
}
