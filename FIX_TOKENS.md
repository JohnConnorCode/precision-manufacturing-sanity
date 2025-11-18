# API Tokens Have Been Revoked!

## The Problem

ALL your Sanity API tokens are returning **403 Forbidden**. This means they've been:
- Revoked
- Expired  
- Or have insufficient permissions

Even your existing scripts (like `populate-all-content.ts`) that previously worked are now failing.

## The Solution

### Option 1: Publish Via Sanity Studio (FASTEST - 2 minutes)

1. Go to: **http://localhost:3000/studio**
2. Click **"Vision"** in the sidebar (📊 icon)
3. Paste and run this query:

```groq
*[_type in ["service", "industry"]]{
  _id,
  _type,
  title, 
  published
}
```

4. For each document with `published: null` or `published: false`:
   - Click the **_id** link
   - Toggle **"Published"** to ON
   - Click **"Publish"**

### Option 2: Create New API Tokens (5 minutes)

1. Go to: https://www.sanity.io/manage/personal/tokens
2. Create a new token with:
   - **Read** permission
   - **Write** permission
   - For dataset: **production**
3. Update `.env.local`:

```bash
SANITY_API_READ_TOKEN="your-new-read-token"
SANITY_API_WRITE_TOKEN="your-new-write-token"
```

4. Run: `npx tsx scripts/publish-all.ts`

## Why Did This Happen?

Your tokens in `.env.local` were either:
- Manually revoked from Sanity dashboard
- Expired (tokens can have expiration dates)
- Had their permissions changed

The Studio UI still works because it uses your browser's authentication session.
