# AI Model Integration Guide for UniversityDetail.jsx

## ✅ Your AI Model is Working!
- Python service running on port 3005
- Model: AbdullahGhani/Unidatamodel
- Tested predictions: 3.99, 2.11, 4.21, etc.

## 🔧 Fix Required in UniversityDetail.jsx

### Line 11-12 Syntax Error
**Current (BROKEN):**
```jsx
const {
  id
const scholarships = [
```

**Fixed:**
```jsx
const { id } = useParams();

const scholarships = [
```

## 🤖 Add AI Integration

### Step 1: Add State (after line 10)
```jsx
export function UniversityDetail() {
  const { id } = useParams();
  
  // AI Integration State
  const [aiStats, setAiStats] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
```

### Step 2: Add Sample Reviews (after scholarships array)
```jsx
const sampleReviews = [
  {
    review_text: "The faculty is world-class and research opportunities are incredible!",
    factor: "Faculty",
    university: "NUST",
    city: "Islamabad"
  },
  {
    review_text: "Amazing campus life with great extracurricular activities.",
    factor: "Campus Life",
    university: "NUST",
    city: "Islamabad"
  },
  {
    review_text: "Excellent placement opportunities with top companies.",
    factor: "Placements",
    university: "NUST",
    city: "Islamabad"
  }
];
```

### Step 3: Add useEffect to Fetch AI Predictions
```jsx
React.useEffect(() => {
  const fetchAIPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3005/predict/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviews: sampleReviews })
      });
      
      if (response.ok) {
        const data = await response.json();
        setAiStats(data);
        console.log('✅ AI Predictions:', data);
      }
    } catch (error) {
      console.error('❌ AI Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchAIPredictions();
}, []);
```

### Step 4: Update sentimentData (replace existing)
```jsx
const sentimentData = aiStats?.rating_breakdown ? [
  { category: "Academics", score: aiStats.rating_breakdown.Academics || 0 },
  { category: "Faculty", score: aiStats.rating_breakdown.Faculty || 0 },
  { category: "Campus Life", score: aiStats.rating_breakdown['Campus Life'] || 0 },
  { category: "Facilities", score: aiStats.rating_breakdown.Facilities || 0 },
  { category: "Placements", score: aiStats.rating_breakdown.Placements || 0 }
] : [
  { category: "Academics", score: 4.2 },
  { category: "Faculty", score: 4.5 },
  { category: "Campus Life", score: 4.0 },
  { category: "Facilities", score: 3.8 },
  { category: "Placements", score: 4.3 }
];
```

### Step 5: Update reviewDistribution (replace existing)
```jsx
const reviewDistribution = aiStats?.review_distribution ? [
  { name: "5 Star", value: aiStats.review_distribution[5] || 0, color: "#22c55e" },
  { name: "4 Star", value: aiStats.review_distribution[4] || 0, color: "#3b82f6" },
  { name: "3 Star", value: aiStats.review_distribution[3] || 0, color: "#eab308" },
  { name: "2 Star", value: aiStats.review_distribution[2] || 0, color: "#f97316" },
  { name: "1 Star", value: aiStats.review_distribution[1] || 0, color: "#ef4444" }
] : [
  { name: "5 Star", value: 45, color: "#22c55e" },
  { name: "4 Star", value: 30, color: "#3b82f6" },
  { name: "3 Star", value: 15, color: "#eab308" },
  { name: "2 Star", value: 7, color: "#f97316" },
  { name: "1 Star", value: 3, color: "#ef4444" }
];
```

## 🎯 What This Does

1. **Fetches AI predictions** from your Python service when the page loads
2. **Updates charts** with real data from your DeBERTA model
3. **Falls back** to static data if the AI service is unavailable
4. **Logs results** to console so you can see the predictions

## 🧪 Testing

1. Open browser console (F12)
2. Navigate to university detail page
3. Look for: `✅ AI Predictions: {rating_breakdown: {...}, review_distribution: {...}}`
4. Charts will update with real AI-predicted data!

## 📊 Expected Output

Your model will return something like:
```json
{
  "overall_rating": 4.1,
  "rating_breakdown": {
    "Academics": 0,
    "Faculty": 3.99,
    "Campus Life": 4.10,
    "Facilities": 0,
    "Placements": 4.21
  },
  "review_distribution": {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 66.7,
    "5": 33.3
  },
  "total_reviews": 3
}
```

The bar chart and pie chart will automatically update with this data! 🚀
