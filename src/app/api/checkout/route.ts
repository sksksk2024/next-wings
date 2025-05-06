import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { prisma } from '@/lib/prisma';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!); // Set SendGrid API Key

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Neautorizat. Te sfatuiesc sa te loghezi.' },
      { status: 401 }
    );
  }

  const { message } = await req.json();

  if (!message) {
    return NextResponse.json(
      { error: 'Messajul este obligatoriu.' },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { orders: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Persoana negasita' }, { status: 404 });
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
        { error: 'Poti scrie un mesaj odata la 24 de ore.' },
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

    if (!user.email) {
      return NextResponse.json({ error: 'Email negasit' }, { status: 400 });
    }

    // Send emails...
    await sgMail.send({
      from: 'cota8091@gmail.com',
      to: ownerEmail,
      subject: `${user.email} Comanda Paralele`,
      html: `<p>Cerere Primita!</p><p>Clientul a scris:</p><p>${message}</p>`,
    });

    await sgMail.send({
      from: 'cota8091@gmail.com',
      to: user.email,
      subject: 'Comanda Ta de Paralele',
      html: `<p>Iti multumim pentru cerere!</p><p>Ai scris:</p><p>${message}</p>`,
    });

    return NextResponse.json({ message: 'Order sent successfully!' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Nu am putut sa-ti procesam comanda' },
      { status: 500 }
    );
  }
}
