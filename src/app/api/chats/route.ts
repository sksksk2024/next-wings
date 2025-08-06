// app/api/chats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!); // Set SendGrid API Key

export async function POST(req: NextRequest) {
  try {
    const orderData = await req.json();

    if (!orderData.email || !orderData.telefon) {
      return NextResponse.json(
        { error: 'Email si numar de telefon sunt obligatorii!' },
        { status: 400 }
      );
    }

    // SAVE TO DB
    const order = await prisma.order.create({
      data: {
vopsit: orderData.vopsit,
  folosire: orderData.folosire,
  forma: orderData.forma,
  calatorit: orderData.calatorit,
  nume: orderData.nume,
  email: orderData.email,
  telefon: orderData.telefon, 
  cantitate: orderData.cantitate || '1'
       },
    });

    // SEND NOTIFICATION EMAIL
    await sgMail.send({
      to: process.env.ADMIN_EMAIL!, // site owner
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM_NAME!,
      },
      subject: `New message from ${orderData.email}`,
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #007BFF;">Cerere Primita!</h2>
      <p><strong>Clientul:</strong> ${orderData.email}</p>
      <p><strong>Mesajul:</strong></p>
      <blockquote style="margin-left: 20px; padding-left: 10px; border-left: 2px solid #007BFF;">
        ${orderData.telefon}
      </blockquote>
    </div>
      `,
    });

    await sgMail.send({
      to: orderData.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM_NAME!,
      },
      subject: `New message from ${process.env.ADMIN_EMAIL!}`,
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #007BFF;">Cerere Primita!</h2>
      <p><strong>Coleg Wings:</strong> ${process.env.ADMIN_EMAIL!}</p>
      <p><strong>Mesajul:</strong></p>
      <blockquote style="margin-left: 20px; padding-left: 10px; border-left: 2px solid #007BFF;">
        ${orderData.telefon}
      </blockquote>
    </div>
      `,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
