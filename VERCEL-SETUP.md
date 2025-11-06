# Vercel Environment Variables Setup

## Required Environment Variables

To deploy this application to Vercel, you need to configure the following environment variables in your Vercel project settings:

### Sanity CMS Configuration

1. **NEXT_PUBLIC_SANITY_PROJECT_ID** (Required)
   - Get this from: https://manage.sanity.io
   - Navigate to your project → Settings → Project ID
   - Example: `abc123xyz`

2. **NEXT_PUBLIC_SANITY_DATASET** (Required)
   - Default: `production`
   - Or use: `development`, `staging`, etc.

3. **SANITY_API_READ_TOKEN** (Required)
   - Get this from: https://manage.sanity.io
   - Navigate to your project → API → Tokens
   - Create a new token with "Viewer" permissions
   - Keep this secret!

### Site Configuration

4. **NEXT_PUBLIC_SITE_URL** (Required)
   - Your production URL
   - Example: `https://iismet.com`

5. **NEXT_PUBLIC_ENABLE_VISUAL_EDITING** (Optional)
   - Set to `true` to enable Sanity Visual Editing
   - Default: `false`

## How to Add Environment Variables in Vercel

### Method 1: Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_SANITY_PROJECT_ID`)
   - **Value**: Your actual value
   - **Environments**: Select `Production`, `Preview`, and `Development`
5. Click **Save**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET
vercel env add SANITY_API_READ_TOKEN
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add NEXT_PUBLIC_ENABLE_VISUAL_EDITING
```

### Method 3: Using .env.production (Not Recommended)

You can add a `.env.production` file, but this is **not recommended** for sensitive values like API tokens. Use Vercel's environment variables instead.

## Verifying Setup

After adding environment variables:

1. Redeploy your application:
   ```bash
   vercel --prod
   ```

2. Check the deployment logs for any errors

3. Visit your site and verify:
   - Content loads from Sanity
   - No "Configuration must contain projectId" errors
   - All pages render correctly

## Troubleshooting

### Build Fails with "Configuration must contain projectId"

**Solution**: Make sure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in Vercel environment variables for all environments (Production, Preview, Development).

### Content Doesn't Load

**Solution**: Check that:
1. `SANITY_API_READ_TOKEN` is valid and has correct permissions
2. `NEXT_PUBLIC_SANITY_DATASET` matches your Sanity dataset name
3. Your Sanity project is not paused or suspended

### Visual Editing Not Working

**Solution**: Ensure:
1. `NEXT_PUBLIC_ENABLE_VISUAL_EDITING` is set to `true`
2. `NEXT_PUBLIC_SITE_URL` is set to your production URL
3. Sanity Studio is properly configured with your site URL

## Get Your Sanity Credentials

If you don't have your Sanity credentials:

1. **Project ID**:
   - Visit https://manage.sanity.io
   - Select your project
   - Go to **Settings** → Copy the **Project ID**

2. **API Token**:
   - Visit https://manage.sanity.io
   - Select your project
   - Go to **API** → **Tokens**
   - Click **Add API Token**
   - Name it "Vercel Production" or similar
   - Select "Viewer" permissions
   - Click **Add Token**
   - **Copy the token immediately** (you won't see it again!)

## Need Help?

- Vercel Documentation: https://vercel.com/docs/environment-variables
- Sanity Documentation: https://www.sanity.io/docs
- Contact: Check your project README for support information
