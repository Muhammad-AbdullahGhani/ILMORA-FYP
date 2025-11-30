# 🚀 Quick Fix: Add These Lines to UniversityDetail.jsx

## After line 81 (after the `fetchAIPredictions()` call), add:

```jsx
  // Dynamic chart data using AI predictions
  const sentimentData = aiStats?.rating_breakdown ? [
    { category: "Academics", score: aiStats.rating_breakdown.Academics || 0 },
    { category: "Faculty", score: aiStats.rating_breakdown.Faculty || 0 },
    { category: "Campus Life", score: aiStats.rating_breakdown['Campus Life'] || 0 },
    { category: "Facilities", score: aiStats.rating_breakdown.Facilities || 0 },
    { category: "Placements", score: aiStats.rating_breakdown.Placements || 0 }
  ] : [
    { category: "Academics", score: 4.8 },
    { category: "Campus Life", score: 4.5 },
    { category: "Facilities", score: 4.7 },
    { category: "Faculty", score: 4.9 },
    { category: "Placements", score: 4.6 },
  ];

  const reviewDistribution = aiStats?.review_distribution ? [
    { name: "5 Star", value: aiStats.review_distribution[5] || 0, color: "#1976D2" },
    { name: "4 Star", value: aiStats.review_distribution[4] || 0, color: "#42A5F5" },
    { name: "3 Star", value: aiStats.review_distribution[3] || 0, color: "#90CAF9" },
    { name: "2 Star", value: aiStats.review_distribution[2] || 0, color: "#E3F2FD" },
    { name: "1 Star", value: aiStats.review_distribution[1] || 0, color: "#BBDEFB" }
  ] : [
    { name: "Excellent", value: 68, color: "#1976D2" },
    { name: "Good", value: 25, color: "#42A5F5" },
    { name: "Average", value: 5, color: "#90CAF9" },
    { name: "Poor", value: 2, color: "#E3F2FD" },
  ];
```

## Then DELETE lines 26-39 (the static const definitions at the top)

Remove these lines:
```jsx
const sentimentData = [
  { category: "Academics", score: 4.8 },
  ...
];

const reviewDistribution = [
  { name: "Excellent", value: 68, color: "#1976D2" },
  ...
];
```

## What This Does:
- ✅ Uses AI predictions when available (`aiStats?.rating_breakdown`)
- ✅ Falls back to static data if AI service fails
- ✅ Charts will automatically update with real model data!

## Test It:
1. Save the file
2. Open browser console (F12)
3. Navigate to university page
4. Look for: `AI Predictions: {rating_breakdown: {...}}`
5. Charts should show real AI data! 🎉
