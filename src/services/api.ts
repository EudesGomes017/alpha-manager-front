import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:44356/api/v1',
    timeout: 10000,
    withCredentials: false, // Altere para true se usar autenticação com cookies
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor para adicionar headers comuns
api.interceptors.request.use(config => {
    // Adicione aqui headers comuns como tokens de autenticação se necessário
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Interceptor para tratar erros globais
api.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        switch (status) {
            case 400:
                console.error('Requisição inválida:', message);
                break;
            case 401:
                console.error('Não autorizado - redirecionar para login');
                // window.location.href = '/login'; // Descomente se necessário
                break;
            case 403:
                console.error('Acesso proibido:', message);
                break;
            case 404:
                console.error('Recurso não encontrado:', message);
                break;
            case 500:
                console.error('Erro interno no servidor:', message);
                break;
            default:
                console.error('Erro desconhecido:', message);
        }

        return Promise.reject(error);
    }
);

export default api;