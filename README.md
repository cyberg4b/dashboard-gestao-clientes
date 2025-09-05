# Frontend para Gestão de Clientes e Usuários

Este é um **Dashboard web** desenvolvido em **React.js** com **Ant Design** para gerenciamento de clientes e usuários administrativos. O sistema utiliza **LocalStorage** para persistência de dados e **bcryptjs** para criptografia de senhas. É totalmente responsivo e modular, com componentes reutilizáveis.

---

## 🛠️ Tecnologias

- React.js + TypeScript  
- Ant Design (UI Library)  
- bcryptjs (criptografia de senhas)  
- LocalStorage (persistência de dados)  
- Context API (autenticação e gerenciamento global)

---

## 🔑 Usuário Admin Padrão

- **Email:** `admin@email.com`  
- **Senha:** `123123`  
> Esse usuário é criado automaticamente na primeira execução do sistema, garantindo acesso administrativo.

---

## ⚡ Funcionalidades

### Clientes
- Adicionar, editar e excluir clientes.  
- Campos obrigatórios: Nome, CPF/CNPJ, Telefone, Email.  
- Validação de CPF/CNPJ e telefone.  
- Persistência automática no LocalStorage.  
- Tabela responsiva com paginação, filtro e ordenação.

### Usuários
- Adição, edição e exclusão de usuários (apenas para admins).  
- Senhas criptografadas com bcryptjs.  
- Usuários salvos no LocalStorage.  
- Exibição de perfil (Admin ou Usuário).  
- Tabela responsiva com paginação e ações condicionais para admins.

### Autenticação
- Registro e login de usuários.  
- Criptografia de senhas usando bcryptjs.  
- Armazenamento seguro do usuário logado no LocalStorage.  
- Logout funcional.

### Layout
- Sidebar responsiva com menu de navegação.  
- Header com card do usuário logado.  
- Mobile friendly com botão hambúrguer para abrir/fechar menu.

---

## 🚀 Instalação

1. Clone o repositório:

Instale as dependências:

```bash
    npm install
```

Execute o projeto:

```bash
    npm start
```

O sistema será aberto em http://localhost:3000.

---

## 💡 Observações

O projeto é uma demonstração frontend, sem backend real, usando LocalStorage para persistência.

Senhas são criptografadas com bcryptjs mesmo no armazenamento local.

Todos os dados de clientes e usuários são persistidos entre sessões.

Para resetar o sistema, basta limpar o LocalStorage do navegador.