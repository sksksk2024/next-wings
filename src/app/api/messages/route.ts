// app/api/messages/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!); // Set SendGrid API Key

export async function POST(req: NextRequest) {
  try {
    const { email, content } = await req.json();

    if (!email || !content) {
      return NextResponse.json(
        { error: 'Email and content required' },
        { status: 400 }
      );
    }

    // SAVE TO DB
    const message = await prisma.message.create({
      data: { email, content },
    });

    // SEND NOTIFICATION EMAIL
    await sgMail.send({
      to: process.env.ADMIN_EMAIL!, // site owner
      from: {
        email: 'cota8091@gmail.com',
        name: 'wingsmag',
      },
      subject: `New message from ${email}`,
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #007BFF;">Cerere Primita!</h2>
      <p><strong>Clientul:</strong> ${email}</p>
      <p><strong>Mesajul:</strong></p>
      <blockquote style="margin-left: 20px; padding-left: 10px; border-left: 2px solid #007BFF;">
        ${message}
      </blockquote>
    </div>
      `,
    });

    await sgMail.send({
      to: email, // site owner
      from: {
        email: 'cota8091@gmail.com',
        name: 'wingsmag',
      },
      subject: `New message from ${process.env.ADMIN_EMAIL!}`,
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #007BFF;">Cerere Primita!</h2>
      <p><strong>Ownerul:</strong> ${process.env.ADMIN_EMAIL!}</p>
      <p><strong>Mesajul:</strong></p>
      <blockquote style="margin-left: 20px; padding-left: 10px; border-left: 2px solid #007BFF;">
        ${message}
      </blockquote>
    </div>
      `,
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
