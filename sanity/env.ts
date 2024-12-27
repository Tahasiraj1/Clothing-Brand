export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-24'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

// Add webhook-related environment variables
export const webhookUrl = assertValue(
  process.env.SANITY_WEBHOOK_URL,
  'Missing environment variable: SANITY_WEBHOOK_URL'
);

export const webhookSecret = assertValue(
  process.env.SANITY_WEBHOOK_SECRET,
  'Missing environment variable: SANITY_WEBHOOK_SECRET'
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
