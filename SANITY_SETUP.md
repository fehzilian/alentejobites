# Setup completo do Sanity para o blog (passo a passo)

Este guia mostra como ligar o Sanity ao site do Alentejo Bites **sem quebrar o que já está em produção**.

**Sanity Studio** = o painel administrativo do seu CMS (tipo “backoffice”), onde você cria/edita/publica posts.

> Boa notícia: você **não precisa ser dev avançado em JavaScript** para fazer o básico funcionar.

---

## 1) Pré-requisitos

- Node.js instalado (recomendado 18+)
- npm funcionando
- Conta no Sanity
- Projeto local do site rodando (`npm install` já feito)

---

## 2) Criar/usar o projeto Sanity (CLI)

Você pode usar exatamente este comando:

```bash
npm create sanity@latest -- --project mtqy48kc --dataset production --template clean
```

### Durante o assistente
Quando ele fizer perguntas, pode usar:
- **Project**: `mtqy48kc` (o seu)
- **Dataset**: `production`
- **Template**: `clean`
- TypeScript: pode escolher **Yes** (recomendado) ou No
- Package manager: npm

No final, você terá uma pasta separada do **Sanity Studio** (ex.: `alentejo-bites-cms`).

> Em português direto: essa pasta é o **painel de conteúdo** do site. É lá que você entra para escrever e publicar os posts do blog.

---

## 3) Subir o Sanity Studio (painel admin)

Dentro da pasta do Studio:

```bash
npm install
npm run dev
```

Depois abra a URL local mostrada no terminal (normalmente `http://localhost:3333`).

---

## 4) Criar schema `post` (obrigatório para integrar)

No projeto atual, o frontend busca documentos `_type == "post"` com estes campos:

- `postId` (number)
- `title` (string)
- `excerpt` (text)
- `body` (Portable Text)
- `publishedAt` (datetime) e/ou `date` (string)
- `author` (reference opcional)
- `category` (reference opcional)
- `mainImage` (image)

### Exemplo mínimo de schema `post`

Crie/edite arquivo de schema no Studio (ex.: `schemaTypes/post.ts`):

```ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'postId', title: 'Post ID', type: 'number', validation: (Rule) => Rule.required()}),
    defineField({name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'excerpt', title: 'Resumo', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
    defineField({name: 'body', title: 'Conteúdo', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'publishedAt', title: 'Publicado em', type: 'datetime'}),
    defineField({name: 'date', title: 'Data (texto)', type: 'string'}),
    defineField({name: 'mainImage', title: 'Imagem principal', type: 'image', options: {hotspot: true}}),
    defineField({name: 'author', title: 'Autor', type: 'reference', to: [{type: 'author'}]}),
    defineField({name: 'category', title: 'Categoria', type: 'reference', to: [{type: 'category'}]}),
  ],
})
```

> Se você não quiser criar `author`/`category` agora, pode remover esses campos temporariamente.

Não esqueça de exportar esse schema no arquivo principal de schemas (geralmente `schemaTypes/index.ts`).

---

## 5) Publicar o Studio no Sanity

Ainda na pasta do Studio:

```bash
npm run deploy
```

Isso publica a interface administrativa do CMS.

---

## 6) Configurar variáveis no frontend (este repositório)

No projeto do site (`/workspace/alentejobites`), crie/edite `.env`:

```bash
VITE_SANITY_PROJECT_ID=mtqy48kc
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

Também mantenha as outras envs já usadas no projeto (Supabase/Stripe).

---

## 7) Como o site consome os posts

A integração já está pronta em `src/lib/blog.tsx`:

- Busca via API do Sanity
- Converte o `body` em parágrafos simples para render
- Se der erro (ou não tiver configuração), usa fallback local `BLOG_POSTS`

Ou seja: você pode configurar o CMS com calma sem derrubar o blog.

---

## 8) Criar o primeiro post no Sanity

No Sanity Studio:
1. Criar novo documento do tipo **Post**
2. Preencher ao menos:
   - `postId` (ex.: `101`)
   - `title`
   - `excerpt`
3. (Opcional, mas recomendado) preencher `body`, `mainImage`, `publishedAt`
4. Clicar em **Publish**

---

## 9) Testar localmente no site

No projeto do site:

```bash
npm run dev
```

Abra `/blog` e confira se o post apareceu.

### Se não aparecer
Checklist rápido:
- `VITE_SANITY_PROJECT_ID` está correto?
- dataset está `production`?
- documento foi **Published** (não só draft)?
- `postId` é número válido e único?

---

## 10) Dica importante de SEO (URL dos posts)

Hoje a URL depende de `postId` + slug do título.
Então:
- não reutilize `postId`
- evite alterar muito o título após publicar (pode mudar slug)

Se quiser, no próximo passo dá para implementar redirecionamento/slug fixo com campo dedicado no CMS.

---

## 11) Fluxo recomendado de conteúdo (simples)

1. Criar post no Sanity
2. Revisar título + excerpt (impacta SEO e cliques)
3. Publicar
4. Validar no `/blog`
5. Compartilhar link

---

## 12) Problemas comuns e solução

### "Sanity pede conhecimento de JavaScript"
Você só precisa de JS/TS para mexer no schema uma vez. Depois disso, o time pode operar pelo painel.

### Imagem não aparece
Verifique se o campo usado é `mainImage` e se a imagem foi enviada/publicada.

### Conteúdo quebrado
Se colar texto com muita formatação, teste blocos mais simples no `body` primeiro.

---

## 13) Comandos essenciais (resumo)

Criar Studio:

```bash
npm create sanity@latest -- --project mtqy48kc --dataset production --template clean
```

Rodar Studio:

```bash
npm run dev
```

Deploy do Studio:

```bash
npm run deploy
```

Rodar frontend do site:

```bash
npm run dev
```

---

Se quiser, no próximo passo eu também posso te entregar um **schema completo pronto** (`post`, `author`, `category`) já com validações e campos editoriais para SEO.
