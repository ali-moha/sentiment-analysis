import {
  sortBySentiment,
  getSentimentColor,
  getSentimentEmoji,
  type SentimentEntry,
} from "./utils/sentiment-helpers";

describe("sortBySentiment", () => {
  it("should sort entries from most positive to most negative sentiment", () => {
    const entries = [
      {
        text: "neutral",
        sentimentScore: {
          Mixed: 0.1,
          Positive: 0.2,
          Neutral: 0.5,
          Negative: 0.2,
        },
      },
      {
        text: "very positive",
        sentimentScore: {
          Mixed: 0.1,
          Positive: 0.8,
          Neutral: 0.05,
          Negative: 0.05,
        },
      },
      {
        text: "very negative",
        sentimentScore: {
          Mixed: 0.1,
          Positive: 0.05,
          Neutral: 0.05,
          Negative: 0.8,
        },
      },
    ];

    const sorted = sortBySentiment(entries);

    expect(sorted[0].text).toBe("very positive");
    expect(sorted[1].text).toBe("neutral");
    expect(sorted[2].text).toBe("very negative");
  });

  it("should handle entries with identical sentiment scores", () => {
    const entries = [
      {
        text: "first identical",
        sentimentScore: {
          Mixed: 0.1,
          Positive: 0.5,
          Neutral: 0.2,
          Negative: 0.2,
        },
      },
      {
        text: "second identical",
        sentimentScore: {
          Mixed: 0.1,
          Positive: 0.5,
          Neutral: 0.2,
          Negative: 0.2,
        },
      },
    ];

    const sorted = sortBySentiment(entries);

    expect(sorted.length).toBe(2);
    expect(sorted.map((e) => e.text)).toContain("first identical");
    expect(sorted.map((e) => e.text)).toContain("second identical");
  });

  it("should handle empty arrays", () => {
    const entries: SentimentEntry[] = [];
    const sorted = sortBySentiment(entries);
    expect(sorted).toEqual([]);
  });

  it("should handle null or undefined input", () => {
    const nullResult = sortBySentiment(null as any);
    const undefinedResult = sortBySentiment(undefined as any);

    expect(nullResult).toEqual([]);
    expect(undefinedResult).toEqual([]);
  });

  it("should handle entries with missing sentiment scores", () => {
    const entries = [
      {
        text: "valid score",
        sentimentScore: {
          Mixed: 0.1,
          Positive: 0.5,
          Neutral: 0.2,
          Negative: 0.2,
        },
      },
      {
        text: "missing score",
        sentimentScore: null as any,
      },
      {
        text: "undefined score",
        sentimentScore: undefined as any,
      },
    ];

    const sorted = sortBySentiment(entries);

    expect(sorted[0].text).toBe("valid score");
    expect(sorted.slice(1).map((e) => e.text)).toContain("missing score");
    expect(sorted.slice(1).map((e) => e.text)).toContain("undefined score");
  });
});

describe("getSentimentColor", () => {
  it("should return green-600 for very positive sentiment", () => {
    const score = {
      Mixed: 0.0,
      Positive: 0.9,
      Neutral: 0.05,
      Negative: 0.05,
    };
    expect(getSentimentColor(score)).toBe("text-green-600");
  });

  it("should return green-400 for somewhat positive sentiment", () => {
    const score = {
      Mixed: 0.1,
      Positive: 0.4,
      Neutral: 0.4,
      Negative: 0.1,
    };
    expect(getSentimentColor(score)).toBe("text-green-400");
  });

  it("should return red-600 for very negative sentiment", () => {
    const score = {
      Mixed: 0.0,
      Positive: 0.05,
      Neutral: 0.05,
      Negative: 0.9,
    };
    expect(getSentimentColor(score)).toBe("text-red-600");
  });

  it("should return red-400 for somewhat negative sentiment", () => {
    const score = {
      Mixed: 0.1,
      Positive: 0.1,
      Neutral: 0.4,
      Negative: 0.4,
    };
    expect(getSentimentColor(score)).toBe("text-red-400");
  });

  it("should return gray-600 for neutral sentiment", () => {
    const score = {
      Mixed: 0.1,
      Positive: 0.3,
      Neutral: 0.4,
      Negative: 0.2,
    };
    expect(getSentimentColor(score)).toBe("text-gray-600");
  });
});

describe("getSentimentEmoji", () => {
  it("should return 😄 for very positive sentiment", () => {
    const score = {
      Mixed: 0.0,
      Positive: 0.9,
      Neutral: 0.05,
      Negative: 0.05,
    };
    expect(getSentimentEmoji(score)).toBe("😄");
  });

  it("should return 🙂 for somewhat positive sentiment", () => {
    const score = {
      Mixed: 0.1,
      Positive: 0.4,
      Neutral: 0.4,
      Negative: 0.1,
    };
    expect(getSentimentEmoji(score)).toBe("🙂");
  });

  it("should return 😠 for very negative sentiment", () => {
    const score = {
      Mixed: 0.0,
      Positive: 0.05,
      Neutral: 0.05,
      Negative: 0.9,
    };
    expect(getSentimentEmoji(score)).toBe("😠");
  });

  it("should return 😕 for somewhat negative sentiment", () => {
    const score = {
      Mixed: 0.1,
      Positive: 0.1,
      Neutral: 0.4,
      Negative: 0.4,
    };
    expect(getSentimentEmoji(score)).toBe("😕");
  });

  it("should return 😐 for neutral sentiment", () => {
    const score = {
      Mixed: 0.1,
      Positive: 0.3,
      Neutral: 0.4,
      Negative: 0.2,
    };
    expect(getSentimentEmoji(score)).toBe("😐");
  });
});
