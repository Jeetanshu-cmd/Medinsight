# MedInsight AI

Clinical trial operations platform with AI-powered document processing and validation.

## Setup

### 1. Run Database SQL

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project → **SQL Editor**
3. Copy contents of `database.sql` and run

### 2. Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider (Confirm email: off for testing, or on for production)
3. Go to **Authentication** → **URL Configuration**
4. Add your Vercel deployment URL: `https://medinsight-ebon.vercel.app/`

## Supabase Configuration

The Supabase credentials are in `script.js`. To update:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_ANON_KEY';
```

## Features

- User authentication (sign up, sign in, sign out)
- Protected dashboard route
- Demo request form with database storage
- Real-time deviation alerts

## Files

| File | Description |
|------|-------------|
| `script.js` | Supabase auth & form logic |
| `database.sql` | Database schema (run in Supabase) |
| `*.html` | Website pages |
| `styles.css` | Styling |