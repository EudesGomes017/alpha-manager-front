# 🍔 Alpha Manager Front

Aplicação frontend para **gestão de produtos** com integração a uma API .NET e Fake Store API. Desenvolvido com Vue 3, seguindo princípios de arquitetura limpa, boas práticas de composição e UI moderna com Tailwind + ShadCN-Vue.

---

## ✅ Features

- Cadastro de produtos com imagem
- Listagem e filtros por nome, código de barras e preço
- Edição e exclusão de produtos
- Upload e preview de imagem com validação
- Integração com **Fake Store API** (realizada no backend .NET)
- Feedback visual com **toast notifications**
- Modal com validação reativa
- Design responsivo com **Tailwind CSS**
- UI moderna com **ShadCN-Vue components**

---

## 🧱 Arquitetura

Estruturado com base nos princípios de **Clean Architecture**, separando bem responsabilidades:

```
alpha-manager-front/
src/
├── app/ # Configurações globais (router, pinia, plugins)
│ ├── components\ui/ # Componentes específicos do app
│
├── componentsDefaults/ # Componentes de UI reutilizáveis e padrão
│ ├── composables/ # Hooks e lógica reutilizável (Composition API)
│ ├── layout/ # Header, Footer, Layouts gerais
│ └── ui/ # Botões, Inputs, Dialogs, etc.
│
├── lib/ # Funções utilitárias, helpers
├── pages/ # Páginas (Index, Dashboard, NotFound, etc.)
├── services/ # Comunicação com APIs externas
├── stores/ # Estado global (Pinia)
├── types/ # Tipagens globais
│
├── App.vue # Componente raiz
├── main.ts # Bootstrap da aplicação
├── route.ts # Configuração de rotas
├── style.css # Estilos globais (Tailwind)
```

---

## ⚙️ Tecnologias Utilizadas

| Camada       | Tecnologias                                      |
|--------------|--------------------------------------------------|
| Frontend     | Vue 3, Vite, TypeScript                          |
| UI           | Tailwind CSS, ShadCN-Vue                         |
| State Mgmt   | Pinia                                            |
| API          | Axios, .NET 8+ backend                           |
| UX/UI        | Headless UI, Dialogs, Toasts                     |
| Validação    | Validação reativa com Composition API           |
| SEO (Nuxt)   | Suporte opcional com SSR ou SSG (via Nuxt 3)    |

---

## 📦 Instalação

### 1. Pré-requisitos

- Node.js `^18.x`
- API rodando localmente em `.NET` (ex:https://localhost:44356/swagger)
- Variáveis `.env` com `VITE_API_URL`

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar a aplicação

```bash
npm run dev
```

### 4. Estrutura de `.env`

```env
VITE_API_URL=https://localhost:44356/api
```

---

## 🔍 Componentes disponíveis (UI)

Componentes do design system importáveis de `@/app/components/ui`:

- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Input`, `Label`, `Button`, `Badge`
- `Dialog`, `Table`, `Select`
- `Toast`, `AlertCircle`, etc.

---

## 📬 Integração com Fake Store API

Ao cadastrar ou atualizar um produto, os dados são enviados também para:

- [`https://fakestoreapi.com/products`](https://fakestoreapi.com/)
- Imagens, nome, descrição e preço são replicados

🛠️ **Importante:** Esta integração é feita **no backend (.NET)** — o frontend apenas envia os dados para a sua API.

---

## 🧾 Logs e Erros

- Notificações via `useToast()` para feedback ao usuário
- Tratamento de erros visuais em falha de API
- Loading e fallback em caso de produtos não carregados

---

✨ Créditos
Desenvolvido por [Eudes Gomes] 🚀
