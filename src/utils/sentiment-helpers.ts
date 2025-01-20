// Define the structure for sentiment scores returned by AWS Comprehend
export interface SentimentScore {
  Mixed: number;
  Positive: number;
  Neutral: number;
  Negative: number;
}

// Represents a single sentiment analysis entry with the text and its score
export interface SentimentEntry {
  text: string;
  sentimentScore: SentimentScore;
}

// Sorts sentiment entries from most positive to most negative
// Takes into account positive, negative, mixed and neutral scores with different weights
export const sortBySentiment = (
  entries: SentimentEntry[]
): SentimentEntry[] => {
  if (!entries || entries.length === 0) return [];

  return [...entries].sort((a, b) => {
    if (!a.sentimentScore || !b.sentimentScore) return 0;

    const getWeightedScore = (score: SentimentScore) => {
      return (
        score.Positive * 1 +
        score.Negative * -1 +
        score.Mixed * -0.5 +
        score.Neutral * 0
      );
    };

    const scoreA = getWeightedScore(a.sentimentScore);
    const scoreB = getWeightedScore(b.sentimentScore);

    return scoreB - scoreA;
  });
};

// Returns a Tailwind CSS color class based on the sentiment score
// More positive sentiments get green colors, more negative get red
export const getSentimentColor = (score: SentimentScore): string => {
  const weightedScore = score.Positive - score.Negative - score.Mixed * 0.5;

  if (weightedScore > 0.5) return "text-green-600";
  if (weightedScore > 0.2) return "text-green-400";
  if (weightedScore < -0.5) return "text-red-600";
  if (weightedScore < -0.2) return "text-red-400";
  return "text-gray-600";
};

// Returns an emoji that represents the sentiment
// Uses the same weighted score calculation as the color function
export const getSentimentEmoji = (score: SentimentScore): string => {
  const weightedScore = score.Positive - score.Negative - score.Mixed * 0.5;

  if (weightedScore > 0.5) return "😄";
  if (weightedScore > 0.2) return "🙂";
  if (weightedScore < -0.5) return "😠";
  if (weightedScore < -0.2) return "😕";
  return "😐";
};
