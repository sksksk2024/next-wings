import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { prisma } from '@/lib/prisma2';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!); // Set SendGrid API Key

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized. Please sign in.' },
      { status: 401 }
    );
  }

  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { orders: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const lastOrder = await prisma.order.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    if (
      lastOrder &&
      new Date().getTime() - new Date(lastOrder.createdAt).getTime() <
        24 * 60 * 60 * 1000
    ) {
      return NextResponse.json(
        { error: 'You can only place one order every 24 hours.' },
        { status: 429 }
      );
    }

    // Save order
    await prisma.order.create({
      data: {
        message,
        userId: user.id,
      },
    });

    const ownerEmail = 'cotaalexandru0403@gmail.com';

    // Send emails...
    await sgMail.send({
      from: 'cota8091@gmail.com',
      to: ownerEmail,
      subject: `${user.email} Orders Parallettes`,
      html: `<p>Order received!</p><p>User wrote:</p><p>${message}</p>`,
    });

    await sgMail.send({
      from: 'cota8091@gmail.com',
      to: user.email,
      subject: 'Your Parallettes Order',
      html: `<p>Thanks for your order!</p><p>You wrote:</p><p>${message}</p>`,
    });

    return NextResponse.json({ message: 'Order sent successfully!' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
