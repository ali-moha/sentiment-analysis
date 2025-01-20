# Sentiment Analysis Dashboard

A React-based web application that performs real-time sentiment analysis on text input using AWS Comprehend. This application provides immediate feedback on the emotional tone of text with visual indicators and detailed sentiment breakdowns.

## Features

- Real-time sentiment analysis using AWS Comprehend
- Visual sentiment indicators (emojis and colors)
- Sorted display of analyzed texts from most positive to most negative
- Detailed sentiment breakdown (Positive, Negative, Neutral, Mixed percentages)
- Responsive design with Tailwind CSS
- Complete test coverage

## Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm (v7 or higher)
- AWS Account with Comprehend access
- AWS credentials with appropriate permissions

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sentiment-analysis-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_AWS_REGION=your-aws-region
VITE_AWS_ACCESS_KEY_ID=your-access-key
VITE_AWS_SECRET_ACCESS_KEY=your-secret-key
```

## AWS Configuration

1. Ensure your AWS account has access to Amazon Comprehend
2. Create an IAM user with the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "comprehend:DetectSentiment",
      "Resource": "*"
    }
  ]
}
```

## Development

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Build for production:

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── App.tsx            # Main application component
│   ├── App.test.tsx       # Test suite
│   └── setupTests.ts      # Test configuration
├── .env                   # Environment variables
├── .env.example          # Example environment variables
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Vitest configuration
└── package.json          # Project dependencies and scripts
```

## Testing

The project uses Vitest for testing with:

- React Testing Library for component testing
- Complete test coverage for the sentiment sorting algorithm
- Mocked AWS services for reliable testing

## Environment Variables

| Variable                   | Description                       |
| -------------------------- | --------------------------------- |
| VITE_AWS_REGION            | Your AWS region (e.g., us-east-1) |
| VITE_AWS_ACCESS_KEY_ID     | Your AWS access key ID            |
| VITE_AWS_SECRET_ACCESS_KEY | Your AWS secret access key        |

## Technical Details

### Frontend

- React 18 with TypeScript
- Vite for build tooling
