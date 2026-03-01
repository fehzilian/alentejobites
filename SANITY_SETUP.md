# Sanity no Alentejo Bites — passo a passo (sem enrolação)

Guia direto para você botar o blog no ar com Sanity.

## O que é “Sanity Studio”?

**Sanity Studio** é o painel admin do CMS (onde você cria/edita/publica posts).

---

## Resultado final deste tutorial

No final você terá:
- Studio do Sanity funcionando
- tipo de conteúdo `post` criado
- variáveis `VITE_SANITY_*` configuradas no frontend
- posts aparecendo em `/blog`

---

## 1) Pré-requisitos

- Node.js 18+
- npm
- conta no Sanity
- projeto do site (`/workspace/alentejobites`)

---

## 2) Criar o Studio (comando exato)

Rode:

```bash
npm create sanity@latest -- --project mtqy48kc --dataset production --template clean
```

### 2.1) Respostas exatas do assistente (incluindo URL)

Durante o setup, responda assim (variações de texto são normais, a ideia é essa):

1. **Where do you want to create your project?**
   - `alentejo-bites-cms` (ou nome que você quiser)
2. **Select project / Use existing project?**
   - `Use existing` e escolha `mtqy48kc`
3. **Dataset name?**
   - `production`
4. **Project output path?**
   - Enter (usa pasta atual) ou confirme `alentejo-bites-cms`
5. **Use TypeScript?**
   - `Yes` (recomendado)
6. **Package manager?**
   - `npm`
7. **Template?**
   - `clean`
8. **Studio hostname / URL (quando pedir no deploy)**
   - exemplo: `alentejo-bites-studio`
   - URL final fica algo como: `https://alentejo-bites-studio.sanity.studio`

> Se o hostname já existir, escolha outro (ex.: `alentejo-bites-studio-pt`).

---

## 3) Subir Studio local (opcional, mas recomendado)

Dentro da pasta criada (`alentejo-bites-cms`):

```bash
npm install
npm run dev
```

Abra a URL local exibida (geralmente `http://localhost:3333`).

---

## 4) Criar schema `post` (obrigatório)

O frontend deste projeto espera `_type == "post"` com estes campos:

- `postId` (number)
- `title` (string)
- `excerpt` (text)
- `body` (Portable Text)
- `publishedAt` (datetime) e/ou `date` (string)
- `author` (reference opcional)
- `category` (reference opcional)
- `mainImage` (image)

### 4.1) Arquivo `schemaTypes/post.ts`

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

Depois exporte no `schemaTypes/index.ts`.

---

## 5) Deploy do Studio (URL pública do painel)

Na pasta do Studio:

```bash
npm run deploy
```

Quando pedir hostname/URL, use por exemplo:
- `alentejo-bites-studio`

Vai gerar URL parecida com:
- `https://alentejo-bites-studio.sanity.studio`

---

## 6) Configurar frontend com as envs

No projeto do site (`/workspace/alentejobites`), crie/edite `.env`:

```bash
VITE_SANITY_PROJECT_ID=mtqy48kc
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

---

## 7) Criar o primeiro post

No Studio:
1. New document → `Post`
2. Preencha no mínimo:
   - `postId` (ex.: `101`)
   - `title`
   - `excerpt`
3. Recomendado: `body`, `mainImage`, `publishedAt`
4. Clique **Publish**

---

## 8) Testar no site

No frontend:

```bash
npm run dev
```

Abra `/blog`.

Se não aparecer:
- post foi **Published**?
- `postId` é número válido?
- envs corretas?
- dataset `production`?

---

## 9) “Dá pra fazer tudo pelo web?”

- **Conteúdo do blog**: sim, 100% via painel web depois de pronto.
- **Setup técnico inicial (schema + env)**: não, precisa dessa parte técnica uma vez.

---

## 10) Comandos resumidos

```bash
# criar studio
npm create sanity@latest -- --project mtqy48kc --dataset production --template clean

# entrar na pasta do studio
cd alentejo-bites-cms

# rodar local
npm install
npm run dev

# publicar studio
npm run deploy
```
