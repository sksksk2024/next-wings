// // app/api/chats/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!); // Set SendGrid API Key

// export async function POST(req: Request) {
//   try {
//     const orderData = await req.json();

//     // Validate required fields
//     if (!orderData.email || !orderData.telefon) {
//       return NextResponse.json(
//         { error: 'Email-ul si numarul de telefon sunt obligatorii!' },
//         { status: 400 }
//       );
//     }

//     // Save to DB

    
//     const order = await prisma.order.create({
//       data: {
//         numeClient: orderData.nume,
//         email: orderData.email,
//         telefon: orderData.telefon,
//         marimeTricou: orderData.marimeTricou || 'N/A',
//         marimePantaloni: orderData.marimePantaloni || 'N/A',
//         codPostal: orderData.codPostal,
//         iteme: orderData.iteme,
//         total: orderData.total,
//         status: 'Nelivrat',
//       },
//     });
//     // Format products for email
//     const productsHtml = orderData.iteme
//       .map(
//         (product: any) => `
//         <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
//           <h3 style="margin: 0; color: #333;">${product.nume}</h3>
//           <p style="margin: 5px 0; color: #666;">
//             Quantity: ${product.cantitate} × ${product.pret} RON = ${product.cantitate * product.pret} RON
//           </p>
//         </div>
//       `
//       )
//       .join('');

//     // Send emails
//     await sgMail.send({
//       to: process.env.ADMIN_EMAIL!, // site owner
//       from: {
//         email: process.env.SENDGRID_FROM_EMAIL!,
//         name: process.env.SENDGRID_FROM_NAME!,
//       },
//       subject: `Comanda noua de la ${orderData.nume || orderData.email}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background: #f7fafc; padding: 20px; border-radius: 8px;">
//             <h3 style="margin-top: 0;">Detalii Client</h3>
//             <p><strong>Nume:</strong> ${orderData.nume || 'Nu exista'}</p>
//             <p><strong>Email:</strong> ${orderData.email}</p>
//             <p><strong>Telefon:</strong> ${orderData.telefon}</p>
//             <p><strong>Cod Postal:</strong> ${orderData.codPostal || 'Nu exista'}</p>
//             <p><strong>Marime Tricou:</strong> ${orderData.marimeTricou || 'N/A'}</p>
//             <p><strong>Marime Pantaloni:</strong> ${orderData.marimePantaloni || 'N/A'}</p>
//           </div>
          
//           <h3 style="margin-bottom: 5px;">Order Items</h3>
//           ${productsHtml}
          
//           <div style="margin-top: 20px; font-size: 1.2em;">
//             <strong>Total: ${orderData.total} RON</strong>
//           </div>
          
//           <p style="margin-top: 30px; font-size: 0.9em; color: #718096;">
//             Order ID: ${order.id}<br>
//             Received at: ${new Date().toLocaleString()}
//           </p>
//         </div>
//       `,
//     });
//     await sgMail.send({
//       to: orderData.email, // client
//       from: {
//         email: process.env.SENDGRID_FROM_EMAIL!,
//         name: process.env.SENDGRID_FROM_NAME!,
//       },
//       subject: `Confirmare Comanda`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #2d3748;">Iti multumim de comanda!</h2>
//           <p>In maximum 7 zile lucratoare ti-o aducem.</p>
          
//           <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <h3 style="margin-top: 0;">Detalii Comanda</h3>
//             ${productsHtml}
            
//             <div style="margin-top: 15px; font-size: 1.2em;">
//               <strong>Total: ${orderData.total} RON</strong>
//             </div>
//           </div>
          
//           <h3>Delivery Information</h3>
//           <p>In maximum 7 zile lucratoare iti aducem comanda. Iti trimitem mai multe detalii daca este cazul.</p>
          
//           <p style="margin-top: 30px; font-size: 0.9em; color: #718096;">
//             ID Comanda: ${order.id}<br>
//             Comandata in: ${new Date().toLocaleString()}
//           </p>
          
//           <p style="margin-top: 20px;">
//             Daca ai intrebari, scrie-ne la ${process.env.ADMIN_EMAIL}.
//           </p>
//         </div>
//       `,
//     });

//     return NextResponse.json({ success: true, orderId: order.id });
//   } catch (error) {
//     console.error('Trimitere esuata:', error);
//     return NextResponse.json({ error: 'Eroare la procesare' }, { status: 500 });
//   }
// }