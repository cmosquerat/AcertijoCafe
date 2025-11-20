const { createCanvas, loadImage } = require('canvas');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generarInstagramPost() {
  // Dimensiones para Instagram (post cuadrado)
  const width = 1080;
  const height = 1080;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Colores de la marca (iguales a la página)
  const fondoOscuro = '#0b1220';
  const textoClaro = '#d8e1e2';
  const textoBlanco = '#ffffff';
  const naranja = '#fb923c';
  const naranjaOscuro = '#e66a1f';
  const textoOscuro = 'rgba(216, 225, 226, 0.7)';
  const textoMedio = 'rgba(216, 225, 226, 0.9)';

  // Fondo con gradiente oscuro
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0b1220');
  gradient.addColorStop(0.5, '#111827');
  gradient.addColorStop(1, '#020617');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Cargar logo usando sharp para convertir SVG a PNG
  const logoPath = path.join(__dirname, '../public/logo-principal.svg');
  
  try {
    // Convertir SVG a buffer PNG usando sharp
    let logoBuffer;
    try {
      logoBuffer = await sharp(logoPath)
        .resize(200, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();
    } catch (e) {
      // Si falla, usar el símbolo blanco
      const simboloPath = path.join(__dirname, '../public/SimboloBlanco.svg');
      logoBuffer = await sharp(simboloPath)
        .resize(200, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();
    }
    
    const logo = await loadImage(logoBuffer);

    // Función helper para rectángulos redondeados
    function roundRect(x, y, w, h, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

    // Logo centrado arriba (más pequeño y elegante)
    const logoSize = 180;
    const logoX = (width - logoSize) / 2;
    const logoY = 60;
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

    // Texto pequeño superior (tracking amplio como en la página) - MÁS GRANDE
    ctx.fillStyle = textoOscuro;
    ctx.font = 'normal 18px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.letterSpacing = '0.22em';
    
    const labelY = logoY + logoSize + 30;
    ctx.fillText('ACERTIJO CAFÉ · MANIZALES', width / 2, labelY);

    // Título principal (MUCHO MÁS GRANDE)
    ctx.fillStyle = textoBlanco;
    ctx.font = 'bold 96px system-ui, -apple-system, sans-serif';
    ctx.letterSpacing = '0';
    ctx.textAlign = 'center';
    
    const tituloY = labelY + 50;
    const tituloTexto = 'Algo está despertando en';
    const tituloManizales = 'Manizales.';
    
    // Dibujar título en dos líneas para mejor legibilidad
    ctx.fillText(tituloTexto, width / 2, tituloY);
    ctx.fillStyle = naranja;
    ctx.fillText(tituloManizales, width / 2, tituloY + 90);
    ctx.fillStyle = textoBlanco;

    // Bloque semitransparente (similar al de la página) - MÁS GRANDE
    const bloqueY = tituloY + 100;
    const bloqueHeight = 180;
    const bloqueWidth = 950;
    const bloqueX = (width - bloqueWidth) / 2;
    
    // Fondo del bloque
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    roundRect(bloqueX, bloqueY, bloqueWidth, bloqueHeight, 28);
    ctx.fill();
    ctx.stroke();

    // Texto dentro del bloque - MÁS GRANDE
    ctx.fillStyle = textoMedio;
    ctx.font = 'normal 18px system-ui, -apple-system, sans-serif';
    ctx.letterSpacing = '0.22em';
    ctx.fillText('QUEREMOS CONOCERTE', width / 2, bloqueY + 30);

    ctx.fillStyle = textoBlanco;
    ctx.font = 'normal 48px system-ui, -apple-system, sans-serif';
    ctx.letterSpacing = '0';
    ctx.fillText('Responde una breve encuesta', width / 2, bloqueY + 70);
    ctx.fillText('y recibe un capuchino gratis', width / 2, bloqueY + 130);

    // Texto descriptivo (MUCHO MÁS GRANDE)
    ctx.fillStyle = textoMedio;
    ctx.font = 'normal 42px system-ui, -apple-system, sans-serif';
    ctx.letterSpacing = '0';
    const descY = bloqueY + bloqueHeight + 50;
    ctx.fillText('Antes de abrir nuestras puertas,', width / 2, descY);
    ctx.fillText('queremos escucharte.', width / 2, descY + 55);

    // CTA botón naranja (MÁS GRANDE)
    const ctaY = descY + 100;
    const ctaWidth = 600;
    const ctaHeight = 100;
    const ctaX = (width - ctaWidth) / 2;
    
    // Botón con bordes redondeados
    ctx.fillStyle = naranja;
    roundRect(ctaX, ctaY, ctaWidth, ctaHeight, 50);
    ctx.fill();
    
    // Texto del botón - MÁS GRANDE
    ctx.fillStyle = textoBlanco;
    ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
    ctx.letterSpacing = '0.05em';
    ctx.fillText('Comenzar el acertijo', width / 2, ctaY + 30);

    // Texto pequeño debajo del botón - MÁS GRANDE
    ctx.fillStyle = textoOscuro;
    ctx.font = 'normal 28px system-ui, -apple-system, sans-serif';
    ctx.letterSpacing = '0';
    ctx.fillText('Completa la encuesta y recibe un capuchino gratis', width / 2, ctaY + ctaHeight + 35);

    // Guardar imagen
    const buffer = canvas.toBuffer('image/png');
    const outputPath = path.join(__dirname, '../public/instagram-post-encuesta.png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log('✅ Imagen generada exitosamente en:', outputPath);
  } catch (error) {
    console.error('❌ Error al generar la imagen:', error);
    process.exit(1);
  }
}

generarInstagramPost();
