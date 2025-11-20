import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import QRCode from "qrcode";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Faltan email o código" },
        { status: 400 },
      );
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS;

    if (!user || !pass) {
      console.error("Faltan variables GMAIL_USER / GMAIL_PASS");
      return NextResponse.json(
        { error: "Error de configuración del correo" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    // Generar QR como imagen PNG
    const qrBuffer = await QRCode.toBuffer(code, {
      type: "png",
      width: 300,
      margin: 1,
    });

    const subject = "Tu código para el capuchino de cortesía · Acertijo Café";

    const textBody = `
Hola,

Gracias por ser parte de Acertijo Café.

Aquí tienes tu código para reclamar un capuchino de cortesía en nuestra apertura:

Código: ${code}

Muestra este correo o el código en barra cuando nos visites. 

Nos vemos pronto, taza en mano.

Acertijo Café
`;

    const htmlBody = `
  <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #0b1220; color: #d8e1e2; padding: 24px;">
    <div style="max-width: 520px; margin: 0 auto; background: #0b1220; border-radius: 18px; padding: 24px 24px 28px; border: 1px solid rgba(216,225,226,0.12);">
      <p style="text-transform: uppercase; letter-spacing: 0.22em; font-size: 11px; color: rgba(216,225,226,0.7); margin: 0 0 12px;">
        ACERTIJO CAFÉ · MANIZALES
      </p>

      <h1 style="font-size: 22px; line-height: 1.3; margin: 0 0 12px; color: #ffffff;">
        Gracias por comenzar el acertijo.
      </h1>

      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 12px; color: rgba(216,225,226,0.9);">
        Este es tu código para reclamar un <strong>capuchino de cortesía</strong> en nuestra apertura.
      </p>

      <div style="margin: 20px 0; padding: 20px 24px; border-radius: 16px; background: rgba(15,23,42,0.9); border: 1px solid rgba(248,250,252,0.06); text-align: center;">
        <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: rgba(248,250,252,0.7); margin: 0 0 16px;">
          Tu código
        </p>
        <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 20px; font-weight: 600; color: #ffffff; margin: 0 0 16px; letter-spacing: 0.05em; word-break: break-all;">
          ${code}
        </div>
        <p style="font-size: 11px; line-height: 1.5; color: rgba(248,250,252,0.6); margin: 0;">
          También puedes mostrar el código QR adjunto cuando nos visites.
        </p>
      </div>

      <p style="font-size: 13px; line-height: 1.6; margin: 18px 0 0; color: rgba(216,225,226,0.85);">
        Lo que compartiste en la encuesta nos ayuda a diseñar un lugar pensado para tu forma de vivir el café.
      </p>

      <p style="font-size: 13px; line-height: 1.6; margin: 8px 0 0; color: rgba(216,225,226,0.85);">
        Nos vemos pronto, taza en mano.
      </p>

      <p style="font-size: 12px; margin: 16px 0 0; color: rgba(148,163,184,0.9);">
        Acertijo Café
      </p>
    </div>
  </div>
`;

    await transporter.sendMail({
      from: `"Acertijo Café" <${user}>`,
      to: email,
      subject,
      text: textBody,
      html: htmlBody,
      attachments: [
        {
          filename: "acertijo-cafe-qr.png",
          content: qrBuffer,
          contentType: "image/png",
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en /api/enviar-correo:", error);
    return NextResponse.json(
      { error: "Error al enviar el correo" },
      { status: 500 },
    );
  }
}


