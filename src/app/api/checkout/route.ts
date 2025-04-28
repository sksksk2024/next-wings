// api/checkout/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // if you send customer info later

    // Here you would normally store the order in a DB or notify via email
    console.log('New order received:', body);

    // For now, just simulate "order received"
    return NextResponse.json(
      { message: 'Order received! We will contact you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error receiving order:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
