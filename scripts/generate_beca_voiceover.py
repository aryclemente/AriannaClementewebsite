import asyncio
import os
import edge_tts

VOICE = "es-VE-PaolaNeural"
OUTPUT_DIR = os.path.abspath("assets/videos/public/audio/beca")
os.makedirs(OUTPUT_DIR, exist_ok=True)

TRACKS = [
    {
        "id": "beca_act1_problema",
        "text": "Caso de estudio: Campaña Beca a un Estudiante 2025 de Fe y Alegría Venezuela. Anteriormente, las donaciones dependían de un botón genérico en la web principal, sin información detallada de los programas educativos. El gran desafío consistía en dar a conocer cada modalidad de beca y, al mismo tiempo, invitar a donar con un proceso simple, confiable y de cero fricción."
    },
    {
        "id": "beca_act2_diseno",
        "text": "Trabajando en remoto junto al equipo de financiamiento, aplicamos estrictamente el manual de marca oficial. Unificamos la paleta de colores: fondo morado institucional para resaltar los programas, verde claro institucional para elementos de confirmación y el rojo reservado exclusivamente para los llamados a la acción. Además, incorporamos el patrón gráfico de gran escala con alta transparencia para darle sofisticación a la lectura."
    },
    {
        "id": "beca_act3_walkthrough",
        "text": "En la landing page desplegada, estructuramos una jerarquía visual orientada a la empatía: un banner principal dinámico, la sección de impacto que muestra el destino real de los fondos, el catálogo interactivo para seleccionar el nivel formativo del estudiante a becar, y un flujo de donación optimizado para completar el aporte en menos de tres pasos desde cualquier teléfono móvil."
    },
    {
        "id": "beca_act4_resultados",
        "text": "Para garantizar la máxima trazabilidad, implementamos Google Analytics 4 midiendo cada evento del embudo, permitiendo al equipo monitorear qué programas reciben mayor respaldo en tiempo real. Un ecosistema que combina diseño empático, velocidad y analítica de conversión. Arianna Clemente, diseño y desarrollo web."
    }
]

async def generate_single(track):
    audio_path = os.path.join(OUTPUT_DIR, f"{track['id']}.mp3")
    srt_path = os.path.join(OUTPUT_DIR, f"{track['id']}.srt")

    for attempt in range(5):
        try:
            print(f"Generating {track['id']} (attempt {attempt + 1})...")
            communicate = edge_tts.Communicate(track['text'], VOICE, rate="+3%")
            submaker = edge_tts.SubMaker()
            with open(audio_path, "wb") as file:
                async for chunk in communicate.stream():
                    if chunk["type"] == "audio":
                        file.write(chunk["data"])
                    elif chunk["type"] == "WordBoundary":
                        submaker.feed(chunk)
            with open(srt_path, "w", encoding="utf-8") as file:
                file.write(submaker.get_srt())
            print(f"Done: {track['id']}.mp3 & .srt")
            return
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            await asyncio.sleep(2)
    raise RuntimeError(f"Failed to generate {track['id']} after multiple attempts")

async def generate():
    for track in TRACKS:
        await generate_single(track)
        await asyncio.sleep(1)

if __name__ == "__main__":
    asyncio.run(generate())
