# TemplatePadraoMenuRetratil

> Template base com **menu retrátil/colapsável** para projetos **Angular 20**, pensado para iniciar rápido, com organização de pastas clara, tokens de estilo e comandos essenciais de desenvolvimento.

---

## 📦 Pré-requisitos

Antes de começar, garanta que seu ambiente possui:

- **Node.js** 20.11+ (LTS recomendado)
- **npm** 10+
- **Angular CLI** 20.3.x  
  ```bash
  npm i -g @angular/cli@20
  ```
- **Git** (para clonar o repositório)
- (Opcional, mas recomendado) **VS Code** com as extensões:
  - Angular Language Service
  - ESLint
  - EditorConfig
  - GitLens
  - Path Intellisense

> Este projeto foi gerado com **Angular CLI 20.3.4** (conforme README original).

---

## 🚀 Início Rápido

```bash
# 1) Clone
git clone <URL-do-repositorio>
cd TemplatePadraoMenuRetratil

# 2) Instale dependências
npm install

# 3) Rode em desenvolvimento
npm start            # atalho (se existir)
# ou
ng serve

# 4) Acesse
http://localhost:4200/
```

O app recarrega automaticamente a cada alteração nos arquivos de código.

---

## 📁 Estrutura Sugerida (layout amigável)

```
src/
 ├─ app/
 │   ├─ core/                      # serviços centrais (auth, interceptors, guards)
 │   ├─ shared/                    # componentes/pipes/diretivas reutilizáveis
 │   ├─ layout/                    # visual: sidebar/topbar/footer + shell da aplicação
 │   │   ├─ components/
 │   │   │   ├─ topbar/
 │   │   │   ├─ sidebar/           # menu retrátil com estado (expandido/colapsado)
 │   │   │   └─ footer/
 │   │   └─ layout.component.ts    # container principal de páginas
 │   ├─ features/                  # módulos de funcionalidades (lazy-loaded)
 │   │   └─ home/
 │   └─ app.config.ts              # providers/bootstrap Angular (standalone API)
 ├─ assets/                        # imagens, ícones, fontes
 ├─ styles/                        # SCSS global, tokens de tema e helpers
 │   ├─ base/
 │   │   ├─ _tokens.scss           # 🎨 design tokens (cores, espaçamentos, tipografia)
 │   │   └─ _mixins.scss
 │   ├─ components/                # estilos específicos de componentes
 │   ├─ layout/                    # topbar/sidebar/footer
 │   └─ main.scss                  # ponto de entrada
 └─ main.ts                        # bootstrap da aplicação
```

### 🧱 Padrão de Layout
- **Sidebar retrátil** com ícones sempre visíveis quando colapsada (usabilidade).
- **Topbar** fixa com breadcrumbs/ações.
- **Conteúdo** fluido e responsivo (grid/flex).
- **Tokens SCSS** para manter coerência visual.

---

## 🎨 Design Tokens (exemplo rápido)

`styles/base/_tokens.scss`:
```scss
// Marca principal (VetorIT)
$brand: #E1742E;

$brand-600: color.adjust($brand, $lightness: -6%) !default;
$brand-700: color.adjust($brand, $lightness: -12%) !default;

// Feedbacks / KPI
$kpi-blue-dark:   #1e40af;
$kpi-blue-light:  #17a2b8;
$kpi-green-dark:  #166534;
$kpi-yellow:      #eab308;
$kpi-red:         #dc2626;
$kpi-gray:        #6c757d;

// Exemplo de uso
:root {
  --vt-brand: #{$brand};
  --vt-brand-600: #{$brand-600};
  --vt-brand-700: #{$brand-700};
}
```

Exemplo (checkbox marcado com cor da marca):
```scss
.p-checkbox .p-checkbox-box.p-highlight {
  border-color: var(--vt-brand);
  background: var(--vt-brand);
}
.p-checkbox .p-checkbox-box.p-highlight:hover {
  border-color: var(--vt-brand-600);
  background: var(--vt-brand-600);
}
```

---

## 🧩 Scripts úteis

> Alguns projetos usam scripts no `package.json` como atalhos. Se não existirem no seu, utilize diretamente os comandos `ng`.

```bash
# Desenvolver
ng serve

# Build de produção
ng build --configuration production

# Unit tests (Karma/Jasmine)
ng test
```

O build gera artefatos na pasta `dist/`.

---

## 🧪 Testes

- **Unitários (Karma/Jasmine)**
  ```bash
  ng test
  ```
- **E2E**
  - Angular CLI não inclui E2E por padrão. Sugestões: **Cypress** ou **Playwright**.

---

## 🛠️ VS Code – atalhos úteis (Windows)

- **Cmd Palette**: `Ctrl` + `Shift` + `P`
- **Terminal integrado**: `` Ctrl + ` ``
- **Formatar arquivo**: `Shift` + `Alt` + `F`
- **Abrir arquivo rápido**: `Ctrl` + `P`
- **Ir para símbolo**: `Ctrl` + `Shift` + `O`
- **Renomear símbolo**: `F2`
- **Multi-cursor**: `Alt` + clique | `Ctrl` + `Alt` + setas
- **Dividir editor**: `Ctrl` + `\` e `Ctrl` + `1/2/3` para focar
- **Buscar/substituir**: `Ctrl` + `F` / `Ctrl` + `H`

**Dicas**:
- Ative **Format on Save** (`settings.json`): `"editor.formatOnSave": true`
- Use **ESLint** + **Prettier** para padronizar código.

---

## 🧭 Conventional Commits

Adote mensagens padronizadas para histórico limpo e versionamento semântico:

```
<tipo>(escopo opcional): descrição breve no imperativo

corpo opcional com detalhes
BREAKING CHANGE: mudança incompatível
```

**Tipos comuns**:
- `feat`: nova funcionalidade
- `fix`: correção de bug
- `docs`: documentação
- `style`: formatação (sem impacto em código)
- `refactor`: refatoração (sem novos recursos/bugs)
- `test`: testes
- `chore`: tarefas diversas (build, deps)
- `perf`: melhorias de performance
- `ci`: pipelines/integração contínua

**Exemplos**:
- `feat(layout): adicionar comportamento colapsável na sidebar`
- `fix(tree): corrigir hover do checkbox marcado para usar brand-600`
- `refactor(tokens): mover variáveis para _tokens.scss`

---

## 🩺 Solução de Problemas

- **Versões incompatíveis**
  - Verifique `node -v` (20.11+) e `ng version` (CLI 20.x).
- **Cache corrompido**
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- **Porta ocupada (4200)**
  ```bash
  ng serve --port 4300
  ```

---

## 📚 Recursos Úteis

- Documentação do Angular CLI (comandos e opções): https://angular.dev/tools/cli
