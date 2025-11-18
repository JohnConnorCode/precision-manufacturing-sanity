# How to Publish All Services and Industries

Your API tokens don't have read permissions, so you'll need to publish through the Sanity Studio UI.

## Quick Fix (5 minutes):

### Option 1: Use Sanity Studio Vision Tool (FASTEST)

1. Go to: http://localhost:3000/studio
2. Click **"Vision"** in the sidebar (📊 icon)
3. Paste this query and click **"Fetch"**:

```groq
*[_type in ["service", "industry"] && published != true]{
  _id,
  _type,
  title,
  published
}
```

4. For each document returned, click on its **_id** link
5. Toggle the **"Published"** field to ON (✓)
6. Click **"Publish"** button (top right)

### Option 2: Manual Publishing (If you have many documents)

1. Go to: http://localhost:3000/studio
2. Click **"Service"** in the sidebar
3. For each service:
   - Click to open
   - Find the **"Published"** toggle (near the top)
   - Toggle it to ON (✓)
   - Click **"Publish"** button
4. Repeat for **"Industry"** documents

### Option 3: Check with Vision first

1. Go to: http://localhost:3000/studio
2. Click **"Vision"** in the sidebar  
3. Run this query to see which need publishing:

```groq
{
  "unpublishedServices": *[_type == "service" && published != true]{title},
  "unpublishedIndustries": *[_type == "industry" && published != true]{title},
  "publishedServices": *[_type == "service" && published == true]{title},
  "publishedIndustries": *[_type == "industry" && published == true]{title}
}
```

## Why This Happened

The `published` field was added to your schemas with `initialValue: true`, but **existing documents** created before this field was added don't have it set. 

## After Publishing

Your pages will show content immediately:
- http://localhost:3000/services
- http://localhost:3000/industries

No rebuild or restart needed - the data will appear instantly!
