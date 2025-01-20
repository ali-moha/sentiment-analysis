import React, { useState } from "react";
import {
  sortBySentiment,
  getSentimentColor,
  getSentimentEmoji,
  type SentimentEntry,
  type SentimentScore,
} from "./utils/sentiment-helpers";

import {
  ComprehendClient,
  DetectSentimentCommand,
} from "@aws-sdk/client-comprehend";

const App: React.FC = () => {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<SentimentEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check if environment variables are defined
      const region = import.meta.env.VITE_AWS_REGION;
      const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
      const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

      if (!region || !accessKeyId || !secretAccessKey) {
        throw new Error(
          `AWS credentials not properly configured. Missing: ${[
            !region && "REGION",
            !accessKeyId && "ACCESS_KEY",
            !secretAccessKey && "SECRET_KEY",
          ]
            .filter(Boolean)
            .join(", ")}`
        );
      }

      const client = new ComprehendClient({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });

      const command = new DetectSentimentCommand({
        Text: text,
        LanguageCode: "en",
      });

      const response = await client.send(command);

      if (response.SentimentScore) {
        const awsSentiment = response.SentimentScore;
        const sentimentScore: SentimentScore = {
          Mixed: awsSentiment.Mixed ?? 0,
          Positive: awsSentiment.Positive ?? 0,
          Neutral: awsSentiment.Neutral ?? 0,
          Negative: awsSentiment.Negative ?? 0,
        };

        const newEntry: SentimentEntry = {
          text,
          sentimentScore,
        };

        setEntries((prevEntries) => {
          const updated = [...prevEntries, newEntry];
          return sortBySentiment(updated);
        });

        setText("");
      }
    } catch (err) {
      console.error("Sentiment analysis error:", err);
      if (err instanceof Error) {
        setError(`Failed to analyze sentiment: ${err.message}`);
      } else {
        setError("Failed to analyze sentiment. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Sentiment Analysis Dashboard</h1>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a sentence to analyze..."
            className="flex-1 p-2 border rounded"
            disabled={isLoading}
          />
          <button
            onClick={analyzeSentiment}
            disabled={isLoading || !text.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            {isLoading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div key={index} className="p-4 border rounded shadow-sm">
            <p className="mb-2">{entry.text}</p>
            <div className="flex items-center gap-2">
              <span className={getSentimentColor(entry.sentimentScore)}>
                {getSentimentEmoji(entry.sentimentScore)}
              </span>
              <div className="text-sm text-gray-600">
                Positive: {(entry.sentimentScore.Positive * 100).toFixed(1)}% |
                Negative: {(entry.sentimentScore.Negative * 100).toFixed(1)}% |
                Neutral: {(entry.sentimentScore.Neutral * 100).toFixed(1)}% |
                Mixed: {(entry.sentimentScore.Mixed * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
