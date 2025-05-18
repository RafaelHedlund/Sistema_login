Sobre este Projeto
Este projeto é uma aplicação web completa que desenvolvi para um processo seletivo, contendo funcionalidades como registro, login, integração com uma API externa para importação de produtos, além de importação e exportação de dados via arquivos CSV.

Como o Projeto Foi Feito
Tecnologias Utilizadas
Frontend: React.js com CSS para estilização, focando em uma interface limpa e intuitiva.

Backend: Node.js com Express para criação da API REST.

Banco de Dados: MySQL, utilizado para persistência das informações dos usuários e produtos.

Autenticação: JWT (JSON Web Token) para proteger rotas e manter a sessão segura.

API Externa: Integração com a Fake Store API para importar dados reais de produtos.

Arquitetura e Design
Backend: Organizado em rotas protegidas por autenticação JWT. Uso de middlewares para tratamento de erros e padronização das respostas.

Segurança: Senhas armazenadas usando bcrypt para hash seguro. Tokens JWT garantem que apenas usuários autenticados acessem informações sensíveis.

Frontend: Dashboard com exibição dos produtos em uma grade de 4 colunas, com navegação simples e botões posicionados para melhor usabilidade. O frontend exibe mensagens claras para sucesso e erro nas operações.

Importação/Exportação CSV: Implementação funcional para facilitar o gerenciamento de dados diretamente no sistema.

Critérios Técnicos Atendidos
Funcionamento completo do ciclo de autenticação e autorização.

Integração eficiente com APIs externas.

Manipulação robusta de dados com importação e exportação via CSV.

Tratamento adequado de erros tanto no frontend quanto no backend.

Código organizado e modular, seguindo boas práticas de desenvolvimento.

