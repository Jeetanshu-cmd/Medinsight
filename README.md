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
4. Add your site URL (e.g., `https://yourusername.github.io/medinsight`)

### 3. Deploy to GitHub Pages

1. Push this code to a GitHub repository
2. Go to **Settings** → **Pages**
3. Select `main` branch and `/ (root)` folder
4. Save and your site will be live

## Supabase Configuration

The Supabase credentials are hardcoded in `script.js` for public deployment. To change them, edit these lines:

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