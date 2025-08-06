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

    const productsHtmlClient = `
        <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <h3 style="margin: 0; color: #333;">${orderData.vopsit}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.folosire}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.forma}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.calatorit}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.cantitate}</h3>
        </div>
      `;
    const productsHtmlAdmin = `
        <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <h3 style="margin: 0; color: #333;">${orderData.nume}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.email}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.telefon}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.vopsit}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.folosire}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.forma}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.calatorit}</h3>
          <h3 style="margin: 0; color: #333;">${orderData.cantitate}</h3>
        </div>
      `;

    // SEND NOTIFICATION EMAIL
    await sgMail.send({
      to: process.env.ADMIN_EMAIL!, // site owner
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM_NAME!,
      },
      subject: `Nou mesaj de la ${orderData.email}`,
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #007BFF;">Cerere Primita!</h2>
      <p><strong>Detalii client:</strong></p>
      ${productsHtmlAdmin}
    </div>
      `,
    });

    await sgMail.send({
      to: orderData.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM_NAME!,
      },
      subject: `Nou mesaj de la ${process.env.ADMIN_EMAIL!}`,
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #007BFF;">Iti multumim de comanda!</h2>
      <p><strong>Coleg Wings:</strong> ${process.env.ADMIN_EMAIL!}</p>
      <p><strong>Detalii comanda:</strong></p>
      ${productsHtmlClient}
      <blockquote style="margin-left: 20px; padding-left: 10px; border-left: 2px solid #007BFF;">
        ${orderData.telefon}
      </blockquote>
      <p style="margin-top: 30px; font-size: 0.9em; color: #718096;">
            ID comanda: ${orderData.id}<br>
            Comandata in: ${new Date().toLocaleString()}
          </p>
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
