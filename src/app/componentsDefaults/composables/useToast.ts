import { ref } from 'vue';

export interface Toast {
    id: number;
    title: string;
    description?: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
}

const toasts = ref<Toast[]>([]);

let idCounter = 0;

export const useToast = () => {
    const addToast = (toast: Omit<Toast, 'id'>) => {
        const id = ++idCounter;
        toasts.value.push({ ...toast, id });

        setTimeout(() => {
            removeToast(id);
        }, toast.duration ?? 4000);
    };

    const removeToast = (id: number) => {
        toasts.value = toasts.value.filter((t) => t.id !== id);
    };

    return {
        toasts,
        addToast,
        removeToast,
    };
};