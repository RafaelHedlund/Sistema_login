#Descrição Geral do projeto

Este projeto é um sistema web que permite aos usuários registrar-se, fazer login, 
importar produtos de uma API fake, exportar e importar dados via arquivos CSV. 
O frontend foi desenvolvido em React com CSS, e o backend em Node.js, utilizando Express, 
MySQL e autenticação JWT.


#Tecnologias Utilizadas

. Frontend: React, CSS
. Backend: Node.js, Express, js
. Banco de Dados: MySQL (Banco: sistema_login)
. Autenticação: JWT (JSON Web Token)


#Pré-requisitos
. Certifique-se de ter instalado:
. Node.js (versão 16+)
. MySQL


1. Instalação

. Clone o repositório:
. git clone https://github.com/seu-usuario/seu-repositorio.git
. cd seu-repositorio


2. Instale as dependências do backend:

. cd backend
. npm install


3. Configure o banco de dados MySQL:

1. Abra o MySQL Workbench e conecte-se ao servidor MySQL.
2. Crie um novo banco de dados chamado `sistema_login` (ou use um existente).
3. No menu superior, clique em **Server** > **Data Import**.
4. Selecione a opção **Import from Self-Contained File** e escolha o arquivo `database/sistema_login.sql`.
5. Clique em **Start Import**.

No backend > server.js, atualize as credenciais do banco de dados no seguinte trecho do código:

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "sistema_login",
});

Substitua root, 123456 e outros valores conforme suas configurações locais.

4. Instale as dependências do backend:
 
cd ../backend
npm install

#Inicie o servidor backend:

node server.js

5. Instale as dependências do frontend:

cd ../frontend
npm install

#Inicie o frontend:
npm run dev


7. Design e Decisões Técnicas

#Estrutura do Backend

As rotas são protegidas por autenticação JWT.
O banco de dados MySQL (sistema_login) é utilizado para persistência dos dados.

#Interface do Usuário

O Dashboard exibe os produtos em uma grade de 4 colunas.
Navegação intuitiva e botões bem posicionados para melhor usabilidade.

#Manipulação de Erros

O backend possui middlewares para tratamento de erros e respostas padronizadas.

#O frontend exibe mensagens claras de sucesso.

#Segurança

Senhas são armazenadas de forma segura utilizando bcrypt.
Tokens de autenticação são utilizados para proteger endpoints sensíveis


8. Critérios de Avaliação

Funcionalidade: A aplicação permite login, importação/exportação de produtos e gerenciamento dos dados corretamente.

Usabilidade: O design foi pensado para ser intuitivo e de fácil navegação.

Código: Código organizado seguindo boas práticas de desenvolvimento.

Erro Handling: Tratamento adequado de erros e feedback para o usuário.

Segurança: Implementação de autenticação JWT e criptografia de senhas


9. Documentação Técnica

Visão Geral
O projeto consiste em uma aplicação web que permite aos usuários:
#Fazer login no sistema.
#Importar produtos de uma API fake para a loja virtual.
#Exportar e importar dados de produtos via arquivos CSV.
#O sistema foi desenvolvido utilizando as seguintes tecnologias:
1. Frontend: React.js.
2. Backend: Node.js + Express.
3. Banco de Dados: MySQL.
Autenticação: JWT (JSON Web Tokens).
API Fake: FakeStore API.

10. Dependências do Frontend
Aqui estão as dependências do frontend/package.json:

{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fortawesome/free-solid-svg-icons": "^6.7.2",
    "@fortawesome/react-fontawesome": "^0.2.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-toastify": "^11.0.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "vite": "^6.2.0"
  }
}
