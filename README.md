# Alentejo Bites Website

Site oficial do Alentejo Bites (React + Vite + TypeScript), com fluxo de reservas via Stripe e bloqueio de disponibilidade no Supabase.

## Stack atual

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- Supabase (`@supabase/supabase-js`)
- Stripe Checkout (links via env vars)

## Principais decisões já aplicadas

### Booking / Checkout
- O fluxo de reserva saiu de WhatsApp e foi para Stripe Checkout.
- Antes de redirecionar para o Stripe, a app cria registro `pending` no Supabase para controle de disponibilidade.
- Checkout URLs são lidas de variáveis de ambiente:
  - `VITE_STRIPE_CHECKOUT_EVENING`
  - `VITE_STRIPE_CHECKOUT_BRUNCH`

### Deploy hardening
- `npm run build` executa `prebuild` com validação de `index.html`.
- O script `scripts/validate-index-html.mjs` bloqueia build se detectar:
  - HTML inválido no início do arquivo
  - marcadores de patch/conflito (`*** Begin Patch`, `diff --git`, etc.)

### SPA routing (deep links)
- SPA fallback configurado para provedores estáticos:
  - `public/_redirects` (`/* /index.html 200`)
  - `vercel.json` rewrite para `/index.html`
  - `netlify.toml` redirect para `/index.html`

### Branding / assets
- Navbar e footer usam logo redonda sem texto embutido no layout.
- Founder image usa `/founder-note.jpg` com fallback remoto.

## Variáveis de ambiente

Crie `.env` na raiz (ou configure no provider de deploy):

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_ANON_KEY
VITE_STRIPE_CHECKOUT_EVENING=https://buy.stripe.com/...
VITE_STRIPE_CHECKOUT_BRUNCH=https://buy.stripe.com/...
```

> Em Vite, apenas variáveis com prefixo `VITE_` ficam disponíveis no frontend.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

## Arquivos-chave para manutenção

- `src/App.tsx` — orquestração da reserva e navegação
- `src/pages/TourDetails.tsx` — CTA/UX de reserva por Stripe
- `src/lib/supabase.ts` — cliente Supabase e tipos
- `src/data.tsx` — dados dos tours + checkout URLs
- `scripts/validate-index-html.mjs` — validação anti-quebra de build
- `STRIPE_SUPABASE_SETUP.md` — guia completo do fluxo Stripe + webhook + Supabase

## Observação de operação

Se um deploy falhar “do nada”, valide nesta ordem:
1. `npm run build` local.
2. Conteúdo do `index.html` (sem lixo de patch/conflito).
3. Env vars `VITE_*` no provider.
4. Regras de fallback SPA para deep links.
