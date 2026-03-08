# Desafio QA Beedoo 2026

Repositório contendo análise completa, cenários de teste, evidências de execução e relatório de bugs da aplicação **Beedoo QA Tests** - um sistema de cadastro e listagem de cursos com armazenamento local.

**Aplicação Testada**: [https://creative-sherbet-a51eac.netlify.app/](https://creative-sherbet-a51eac.netlify.app/)

---

## 📊 Recursos Principais

### 📋 Cenários e Casos de Teste
**Planilha Google Sheets com cenários de teste estruturados em DADO/QUANDO/ENTÃO**:
- 📌 [Acesse a Planilha de Casos de Teste](https://docs.google.com/spreadsheets/d/1uSUY9OuAePOMxWTlzR7TFCm6HAbe-SPmRMUsfqcoSDI/edit?usp=sharing)

### 🐛 Relatório de Bugs
**Documento Google Docs com detalhes completos de todos os bugs encontrados**:
- 📌 [Acesse o Relatório de Bugs](https://docs.google.com/document/d/1kHDlL3wRg6uSk86xg4CfHnZpBIQySbgesZvq3MhazJk/edit?tab=t.0)

### 📸 Evidências de Execução
As evidências de execução dos testes (prints e gravações) estão disponíveis em pasta compartilhada:
- 📌 [Acesse as Evidências](https://drive.google.com/drive/folders/1example) *(Link será atualizado com pasta real)*

---

## 🎯 Resumo Executivo

### 1. Qual é o Objetivo da Aplicação?

A aplicação **Beedoo QA Tests** é um **gerenciador de cursos** desenvolvido como MVP (Produto Mínimo Viável) com o objetivo de permitir que usuários criem, visualizem e gerenciem cursos online e presenciais. A aplicação funciona inteiramente no navegador do usuário, armazenando dados localmente sem necessidade de servidor backend.

**Objetivo Principal**: Fornecer uma plataforma simples e intuitiva para cadastro e administração de cursos com suporte a dois modelos de entrega (Online e Presencial), permitindo que usuários gerenciem informações como datas, vagas, instrutor e detalhes específicos de cada tipo de curso.

**Casos de Uso**:
- Um administrador de cursos pode cadastrar novos cursos (online ou presencial)
- Visualizar todos os cursos cadastrados em um painel
- Gerenciar informações de cada curso
- Remover cursos quando necessário
- Persistir dados localmente sem perder informações

---

### 2. Quais são os Principais Fluxos Disponíveis?

A aplicação possui **3 fluxos principais** que cobrem todo o ciclo de vida de um curso:

#### **Fluxo 1: Listagem de Cursos** (Página Inicial)
O usuário visualiza todos os cursos cadastrados em um painel de cards. Cada card exibe:
- Informações do curso (nome, descrição, datas, vagas, tipo)
- Botão para excluir o curso
- Navegação para cadastrar novo curso

**Comportamento**: A listagem carrega automaticamente do localStorage ao abrir a página.

#### **Fluxo 2: Cadastro de Curso** (Formulário)
O usuário preenche um formulário para criar um novo curso com:
- **Campos Comuns**: Nome, Descrição, Instrutor, URL da Imagem de capa, Datas, Vagas, Tipo
- **Campos Condicionais**:
  - Se **Online**: Link de Inscrição
  - Se **Presencial**: Endereço

**Comportamento**: Ao submeter, o curso é salvo no localStorage e o usuário é redirecionado para a listagem.

#### **Fluxo 3: Exclusão de Curso** (Remover)
O usuário clica no botão "EXCLUIR CURSO" em um card para remover o curso.

**Comportamento**: O sistema exibe mensagem de sucesso e remove do localStorage.

---

### 3. Quais Pontos do Sistema Você Considera Mais Críticos para Teste?

Identifiquei **5 pontos críticos** que requerem atenção especial durante os testes:

#### **Ponto Crítico 1: Validação de Campos Obrigatórios** 🔴 CRÍTICO

**Por que é crítico**: O formulário permite submissão com campos vazios, criando registros incompletos.

**Impacto**: 
- Dados corrompidos e incertos
- Informações faltando na listagem
- Experiência do usuário prejudicada

**Status**: ❌ **FALHOU** - Bug encontrado (BUG-001)

---

#### **Ponto Crítico 2: Validação de Período de Curso** 🟠 ALTA

**Por que é crítico**: A lógica de negócio exige que data de fim seja posterior à de início. Sistema permite o contrário.

**Impacto**:
- Dados inválidos
- Confusão sobre duração do curso
- Problemas futuros em relatórios e análises

**Status**: ❌ **FALHOU** - Bug encontrado (BUG-002)

---

#### **Ponto Crítico 3: Exclusão de Cursos** 🔴 CRÍTICO

**Por que é crítico**: Exclusão de curso pode não funcionar corretamente.

**Impacto**:
- Pode gerar acúmulo de dados incorretos ou desnecessários.
- Usuários não conseguem excluir cursos cadastrados.
- Impacta diretamente a gestão dos cursos no sistema.
- Experiência do usuário degradada

**Status**: ❌ **FALHOU** - Bug encontrado (BUG-007)
---

#### **Ponto Crítico 4: Validação de Tipo de Curso** 🟡 Alta

**Por que é crítico**: Tipo é obrigatório para determinar quais campos condicionais aparecer. Sem seleção, campos específicos ficam vazios.

**Impacto**:

- Campos condicionais vazios
- Dados incompletos
- Impossível determinar se é online ou presencial

**Status**: ❌ **FALHOU** - Bug encontrado (BUG-004)

---

#### **Ponto Crítico 5: Validação na quantidade de vagas** 🟡 Alta

**Por que é crítico**: Pelo fato de já iniciar com vagas negativas/sem vagas, alguma outra validação para inscrição nesses cursos podem quebrar, assim impossibilitando inscrição de novos usuários


**Impacto**:
- Usuários não conseguirão se inscrever (vagas negativas)
- Usuários podem não conseguir se inscrever em cursos devido ao número de vagas negativo.
- O sistema pode bloquear inscrições automaticamente, interpretando que não há vagas disponíveis.
- Pode gerar inconsistência nos relatórios do sistema, exibindo cursos com vagas negativas.
- Pode afetar lógicas futuras de negócio.
- Pode causar erros em integrações ou APIs que esperam apenas valores positivos para quantidade de vagas.

**Status**: ❌ **FALHOU** - Bug encontrado (BUG-006)

---

## 📋 Análise Inicial da Aplicação

### Objetivo e Contexto

A aplicação **Beedoo QA Tests** foi desenvolvida para gerenciar cursos online e presenciais. Seu objetivo é permitir que usuários cadastrem, visualizem e gerenciem cursos com diferentes tipos e configurações, utilizando armazenamento local no navegador para persistência das informações.

### Fluxos Principais Identificados

#### 1. Fluxo de Listagem de Cursos

O usuário acessa a página inicial e visualiza todos os cursos cadastrados. A listagem apresenta os cursos em formato de cards com as seguintes informações:

- **Nome do Curso**: Título principal do curso
- **Imagem (URL)**: Imagem URL do curso
- **Descrição**: Resumo do conteúdo
- **Datas**: Data de início e término
- **Vagas Disponíveis**: Número de vagas
- **Tipo**: Online ou Presencial
- **Botão de Exclusão**: Para remover o curso

**Comportamento observado**: A listagem é carregada do localStorage ao iniciar a página.

#### 2. Fluxo de Cadastro de Curso

O usuário clica em "CADASTRAR CURSO" e é redirecionado para um formulário com os seguintes campos:

**Campos (Comuns a ambos os tipos)**:
- Nome do Curso (texto)
- Descrição (texto longo)
- Instrutor (texto)
- URL da Imagem de Capa (URL)
- Data de Início (data)
- Data de Fim (data)
- Número de Vagas (número)
- Tipo de Curso (Online/Presencial)

**Campos Condicionais**:
- Se **Online**: Campo "Link de Inscrição" (URL)
- Se **Presencial**: Campo "Endereço" (texto)

**Comportamento observado**: O formulário permite submissão sem validação. Os campos condicionais aparecem/desaparecem corretamente ao trocar o tipo.

#### 3. Fluxo de Exclusão de Curso

O usuário clica no botão "EXCLUIR CURSO" em um card. O sistema exibe uma mensagem de sucesso e deveria remover do localStorage.

---

## 🧪 Decisões Tomadas para Criação dos Testes

### 1. Estratégia de Teste Adotada

Optei por **Teste Exploratório Manual** com cenários estruturados:

**Justificativa**:
- A aplicação é um sistema pequeno com funcionalidades bem definidas
- Teste exploratório permite descobrir comportamentos inesperados
- Custo-benefício melhor para identificar bugs em fase inicial
- Permite análise qualitativa da experiência do usuário

**Abordagem**: Execução manual de cenários estruturados em formato Gherkin (DADO/QUANDO/ENTÃO), seguindo as melhores práticas de BDD (Behavior-Driven Development).

### 2. Critérios de Cobertura de Testes

Defini cobertura abrangente cobrindo:

**Funcionalidades Principais**:
- ✅ Cadastro de Cursos (Online e Presencial)
- ✅ Listagem de Cursos
- ✅ Exclusão de Cursos
- ✅ Navegação entre páginas
- ✅ Campos Condicionais

**Tipos de Cenários**:
- ✅ **Cenários Positivos**: Testando fluxos bem-sucedidos
- ✅ **Cenários Negativos**: Testando comportamentos de erro

**Áreas de Validação**:
- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de dados (datas, URLs, números)
- ✅ Validação de lógica de negócio (período de curso)
- ✅ Validação de campos condicionais
- ✅ Persistência de dados
- ✅ Atualização de interface

### 3. Estrutura dos Cenários

Utilizei o formato **Gherkin (DADO/QUANDO/ENTÃO)** para estruturar os testes:

```gherkin
DADO [pré-condição/estado inicial]
QUANDO [ação do usuário]
ENTÃO [resultado esperado]
```

**Benefícios**:
- Clareza: Fácil entender o que está sendo testado
- Rastreabilidade: Cada cenário tem propósito claro
- Reusabilidade: Pode ser usado para automação futura
- Comunicação: pessoas com pouco conhecimento técnico conseguem entender

### 4. Seleção de Casos de Teste

Criei cenários cobrindo:

| Funcionalidade | Tipo |
|---|---|
| Cadastro de Cursos | Positivos e Negativos |
| Listagem de Cursos | Positivos |
| Exclusão de Cursos | Positivos e Negativos |
| Campos Condicionais | Positivos |
| Navegação | Positivos |

### 5. Priorização de Testes

Priorizei testes baseado em:

- **Risco**: Funcionalidades críticas como validação de entrada têm risco alto
- **Impacto**: Bugs em validação afetam integridade dos dados
- **Frequência de Uso**: Fluxos principais são testados primeiro
- **Complexidade**: Campos condicionais requerem testes específicos

---

## 💭 Explicação do Raciocínio Durante a Análise

### Fase 1: Exploração Inicial

**O que observei**:
- Aplicação com duas páginas: Listagem e Cadastro
- Navegação simples entre páginas
- Formulário com campos dinâmicos
- Dados persistidos localmente

**Raciocínio**: Uma aplicação simples com funcionalidades bem definidas é ideal para teste exploratório. Não há complexidade de API ou lógica intrincada, mas há muitos pontos onde validação poderia falhar.

### Fase 2: Identificação de Riscos

**Pergunta que fiz**: "Onde o sistema pode falhar e qual é o impacto?"

**Respostas obtidas**:

#### 1. Validação de Entrada
**Risco**: O formulário aceita dados sem validação aparente
- **Raciocínio**: Se campos vazios são aceitos, há risco de dados incompletos
- **Impacto em caso de Falha**:
  - Registros incompletos salvos localmente
  - Dados corrompidos na listagem
  - Impossibilidade de usar cursos com informações faltando
  - Experiência do usuário prejudicada

#### 2. Lógica de Negócio
**Risco**: Período de curso pode ser inválido
- **Raciocínio**: Data fim anterior à de início não faz sentido de negócio
- **Impacto se Falhar**:
  - Cursos com duração negativa ou inválida
  - Confusão sobre quando o curso realmente acontece
  - Problemas em relatórios e cálculos de duração
  - Dados semanticamente incorretos

#### 3. Campos Obrigatórios
**Risco**: Tipo de curso pode não ser obrigatório
- **Raciocínio**: Se tipo não é selecionado, campos específicos ficarão vazios
- **Impacto se Falhar**:
  - Campos condicionais (Link ou Endereço) ficam vazios
  - Impossibilidade de determinar se é online ou presencial
  - Dados incompletos e inutilizáveis
  - Confusão sobre o modelo de entrega do curso

#### 4. Atualização de UI
**Risco**: Exclusão pode não atualizar a interface
- **Raciocínio**: Operação no armazenamento local não atualiza automaticamente
- **Impacto se Falhar**:
  - Curso permanece visível após exclusão
  - Usuário fica confuso se a ação funcionou
  - Necessidade de recarregar página para ver mudanças
  - Experiência do usuário degradada

#### 5. Validação de Formato
**Risco**: URLs e números podem ter formatos inválidos
- **Raciocínio**: Sem validação de formato, dados inválidos podem ser salvos
- **Impacto se Falhar**:
  - Imagens quebradas (URLs inválidas)
  - Números negativos em campos de vagas
  - Dados visualmente incorretos na listagem
  - Problemas de apresentação ao usuário final

### Fase 3: Estruturação dos Cenários

**Abordagem**: Para cada risco identificado, criei cenários que:
1. Testam o comportamento esperado (cenários positivos)
2. Testam comportamentos de erro (cenários negativos)
3. Validam mensagens e feedback ao usuário
4. Verificam persistência de dados

### Fase 4: Execução dos Testes

Executei todos os cenários manualmente, registrando:
- Resultado (Passou/Falhou/Parcial)
- Resultado esperado
- Comportamento observado
- Bugs encontrados
- Impacto de cada falha

### Fase 5: Análise de Padrões

**Padrões descobertos de validações do sistema**:
1. **Validações Ausentes**: O sistema não possui nenhuma validação de entrada no formulário
2. **Atualização de UI**: Exclusão não atualiza a interface imediatamente
3. **Campos Condicionais**: Funcionam corretamente (sem bugs)
4. **Persistência**: localStorage funciona parcialmente (exclusão de dados não funciona)
5. **Navegação**: Funciona conforme esperado

### Fase 6: Categorização de Bugs

Agrupei os bugs por tipo:
- **Validação de Entrada**: Múltiplos bugs (campos vazios, período, tipo)
- **Atualização de UI**: Bugs de exclusão
- **Validação de Formato**: Bugs de URL e números
  
### Fase 7: Priorização

Priorizei bugs por:
1. **Severidade**: Crítica > Alta > Média > Baixa
2. **Impacto**: Afeta funcionalidade > Afeta UX > Afeta apresentação

---

## 📊 Resultados dos Testes

### Resumo Executivo

| Métrica | Valor |
|---|---|
| Cenários Planejados | Múltiplos |
| Cenários Executados | 100% |
| Taxa de Sucesso | Variável |
| Bugs Encontrados | Múltiplos |

**Para detalhes completos dos resultados, consulte a planilha de casos de teste.**

---

## 🐛 Bugs Encontrados

### Resumo dos Bugs

| ID | Título | Severidade |
|---|---|---|
| BUG-001 | Sistema permite cadastrar curso com campos obrigatórios vazios | 🔴 CRÍTICA |
| BUG-002 | Sistema permite cadastrar curso com data de término anterior à data de início | 🟠 ALTA |

**Para detalhes completos de cada bug (passos para reproduzir, resultado atual, resultado esperado, impacto), segue link para acessar**: 

📌 [Relatório de Bugs Completo](https://docs.google.com/document/d/1kHDlL3wRg6uSk86xg4CfHnZpBIQySbgesZvq3MhazJk/edit?tab=t.0)

---

## 📋 Cenários e Casos de Teste

### Acesso à Planilha

Todos os cenários de teste estão documentados em uma planilha Google Sheets estruturada com:

- **ID**: Número do cenário
- **Funcionalidade**: Categoria (Cadastro, Listagem, Exclusão, Campos, Navegação)
- **Cenário**: Título descritivo
- **DADO**: Pré-condição / Estado inicial
- **QUANDO**: Ação do usuário
- **ENTÃO**: Resultado esperado
- **Resultado**: ✅ SUCESSO / ❌ FALHA 
- **Observações**: Notas adicionais

**📌 [Acesse a Planilha de Casos de Teste](https://docs.google.com/spreadsheets/d/1uSUY9OuAePOMxWTlzR7TFCm6HAbe-SPmRMUsfqcoSDI/edit?usp=sharing)**

---

## 📸 Evidências de Execução

As evidências de execução dos testes contém:

- **Screenshots**: Capturas de tela dos comportamentos observados
- **Gravações**: Vídeos dos fluxos de teste

**📌 [Acesse as Evidências de Execução](https://drive.google.com/drive/folders/1example)** 

---

## 📁 Estrutura do Repositório

```
DESAFIO-QA-BEEDOO-2026/
├── README.md                              # Este arquivo
├── CENARIOS_E_CASOS_DE_TESTES.md         # Versão detalhada dos cenários
├── CASOS_TESTE_ESTRUTURADO.md            # Cenários em formato tabular
├── testes/
│   ├── cenarios_teste.md                 # Cenários em Gherkin puro
│   └── casos_teste_estruturados.json     # Dados em JSON
├── bugs/
│   └── relatorio_bugs.md                 # Relatório de bugs (local)
├── analise/
│   ├── decisoes_teste.md                 # Decisões de teste
│   └── vulnerabilidades.md               # Análise de segurança
└── evidencias/
    └── relatorio_execucao.md             # Resultados de execução
```


## 🎯 Conclusões e Recomendações

### Pontos Fortes

✅ Navegação funciona corretamente  
✅ Campos condicionais funcionam bem  
✅ Persistência de dados funciona  
✅ Interface é intuitiva  

### Pontos Fracos

❌ Validações de entrada ausentes  
❌ Validações de período ausentes  
❌ Sem feedback de erro ao usuário  
❌ Sem validação de formato de dados  


## 🔗 Links Importantes

- 📌 **Planilha de Casos de Teste**: [Google Sheets](https://docs.google.com/spreadsheets/d/1uSUY9OuAePOMxWTlzR7TFCm6HAbe-SPmRMUsfqcoSDI/edit?usp=sharing)
- 📌 **Relatório de Bugs**: [Google Docs](https://docs.google.com/document/d/1kHDlL3wRg6uSk86xg4CfHnZpBIQySbgesZvq3MhazJk/edit?tab=t.0)
- 📌 **Evidências de Execução**: [Google Drive](https://drive.google.com/drive/folders/1example)
- 📌 **Aplicação Testada**: [https://creative-sherbet-a51eac.netlify.app/](https://creative-sherbet-a51eac.netlify.app/)

---
