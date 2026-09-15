# Jogo Mario

Projeto acadêmico desenvolvido para a atividade de **Git e GitHub**, cujo objetivo é
exercitar a criação e organização de um repositório, o uso de branches, commits e merge,
seguindo uma estrutura próxima à utilizada em projetos reais de desenvolvimento de software.

## Descrição

O **Jogo Mario** é um jogo de plataforma 2D inspirado no clássico Super Mario. O jogador
controla o Mario, que corre e pula por uma fase, desviando de inimigos (Goombas), coletando
moedas e tentando chegar até a bandeira no final da fase. O jogo foi implementado como uma
aplicação **Front-End** executada no navegador, utilizando o elemento `<canvas>` do HTML5.

## Objetivo do projeto

- Praticar o versionamento de código com **Git** e a colaboração por meio do **GitHub**.
- Demonstrar o fluxo de trabalho com as branches `main` e `dev` e a integração via *merge*.
- Entregar um Front-End funcional e executável a partir do diretório `frontend/`.

## Tecnologias utilizadas

- **HTML5** (Canvas API)
- **CSS3**
- **JavaScript (ES Modules)**
- **Vite** (servidor de desenvolvimento e build)
- **Node.js / npm** (gerenciamento de dependências e scripts)

## Estrutura do repositório

```text
jogoMario/
│
├── backend/
├── docs/
│   ├── branding/
│   ├── mer/
│   ├── mockups/
│   ├── models/
│   │   └── uml/
│   └── requirements/
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── main.js
│       ├── style.css
│       └── game/
│           ├── engine.js
│           ├── player.js
│           ├── enemy.js
│           ├── level.js
│           └── input.js
│
├── .gitignore
├── LICENSE
└── README.md
```

## Instalação

O projeto deve ser executado a partir do diretório `frontend/`:

```bash
cd frontend
npm install
```

## Execução

```bash
npm run dev
```

Depois abra o endereço exibido no terminal (por padrão `http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Como jogar

| Ação            | Tecla                          |
|-----------------|--------------------------------|
| Mover à esquerda| `←` ou `A`                     |
| Mover à direita | `→` ou `D`                     |
| Pular           | `↑`, `W`, `Espaço`             |
| Iniciar / Reiniciar | `Enter`                    |

Colete as moedas, pule sobre os Goombas para derrotá-los e alcance a bandeira para vencer.

## Integrantes

| Nome           | Matrícula | Papel         |
|----------------|-----------|---------------|
| Priscilla Ferreira Moura  | 01044267 | Scrum Master  |
| Jonathas Paes Barreto Silva   | 01920308 | Documentador  |
| João Victor Souza Lins | 01887445  | Desenvolvedor |
| Alexandre Cavalcanti Dantas Layme      | 01883323  | Desenvolvedor |
| Edieyson Morato de Oliveira  | 01345936  | Testador |


> **Observação:** substitua os dados da tabela acima pelos nomes, matrículas e papéis
> reais dos integrantes do seu grupo antes da entrega.
