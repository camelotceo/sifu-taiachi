import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    
    return NextResponse.json({
      status: 'API route working',
      timestamp: new Date().toISOString(),
      environment: {
        apiKeyPresent: !!apiKey,
        apiKeyLength: apiKey ? apiKey.length : 0,
        apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'N/A',
        nodeEnv: process.env.NODE_ENV,
      },
      message: 'Test endpoint is working correctly'
    })
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Test endpoint failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
