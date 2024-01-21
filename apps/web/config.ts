export const config = {
  api: {
    httpUrl: `https://${process.env.NEXT_PUBLIC_API_URL}`,
    wsUrl: `wss://${process.env.NEXT_PUBLIC_API_URL}`
  }
}
