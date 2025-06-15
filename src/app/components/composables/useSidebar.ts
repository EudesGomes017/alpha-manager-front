import { ref, onMounted } from 'vue';

export function useSidebar() {
    const isOpen = ref(false);

    const toggle = () => {
        isOpen.value = !isOpen.value;
    };

    // Fecha automaticamente em telas grandes
    onMounted(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) isOpen.value = false;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return { isOpen, toggle };
}