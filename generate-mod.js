// generate-mod.js
import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Robô tradutor do Google
async function translateText(text) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(item => item[0]).join('');
  } catch (error) {
    return text;
  }
}

async function start() {
  console.log("=== 🏁 GERADOR DE CÓDIGO DE MODS (AMS WORLD) ===");

  const title = await question("📝 Título do Mod: ");
  
  console.log("\nSelecione a Categoria:");
  console.log("1 - VEÍCULOS / VEHICLES");
  console.log("2 - CIRCUITOS / TRACKS");
  console.log("3 - SKINS");
  const catChoice = await question("Opção (1-3): ");
  
  let categoryPT = "VEÍCULOS";
  let categoryEN = "VEHICLES";
  let icon = "🚗";

  if (catChoice === "2") {
    categoryPT = "CIRCUITOS";
    categoryEN = "TRACKS";
    icon = "🏁";
  } else if (catChoice === "3") {
    categoryPT = "SKINS";
    categoryEN = "SKINS";
    icon = "🎨";
  }

  const descPT = await question("\n📝 Descrição do Mod (em Português): ");
  const image = await question("🖼️ URL da Imagem (Ex: /images/mod.png): ");
  const link = await question("📥 Link de Download Principal: ");
  
  // Perguntas Opcionais de Carset e Templates
  const carsetLink = await question("📦 Link do Carset (opcional - aperte Enter para pular): ");
  const templateLink = await question("🎨 Link dos Templates (opcional - aperte Enter para pular): ");

  console.log("\n🤖 Traduzindo descrição para o Inglês de forma automática...");
  const descEN = await translateText(descPT);

  // Inserção condicional de chaves nos blocos gerados
  const carsetPTLine = carsetLink ? `\n      carsetLink: "${carsetLink}",` : "";
  const templatePTLine = templateLink ? `\n      templateLink: "${templateLink}",` : "";
  const carsetENLine = carsetLink ? `\n      carsetLink: "${carsetLink}",` : "";
  const templateENLine = templateLink ? `\n      templateLink: "${templateLink}",` : "";

  // Formata os blocos prontos
  const blockPT = `    {
      id: 99, // <-- Altere para o próximo número sequencial (Ex: 4, 5, 6...)
      title: "${title}",
      category: "${categoryPT}",
      downloads: "0",
      description: "${descPT}",
      image: "${image || "https://placehold.co/600x400/121318/ffffff?text=Novo+Mod"}",
      link: "${link}",
      icon: "${icon}"${carsetPTLine}${templatePTLine}
    },`;

  const blockEN = `    {
      id: 99, // <-- Coloque o mesmo número que definiu no bloco de cima
      title: "${title}",
      category: "${categoryEN}",
      downloads: "0",
      description: "${descEN}",
      image: "${image || "https://placehold.co/600x400/121318/ffffff?text=New+Mod"}",
      link: "${link}",
      icon: "${icon}"${carsetENLine}${templateENLine}
    },`;

  const outputText = `=== 🇧🇷 COPIE ESTE BLOCO E COLE DENTRO DE "pt: [" NO ARQUIVO src/data/allMods.js ===\n\n${blockPT}\n\n========================================================================\n\n=== 🇺🇸 COPIE ESTE BLOCO E COLE DENTRO DE "en: [" NO ARQUIVO src/data/allMods.js ===\n\n${blockEN}\n\n========================================================================`;

  fs.writeFileSync('./copy-this-mod.txt', outputText, 'utf8');

  console.log("\n✅ SUCESSO! O arquivo 'copy-this-mod.txt' foi gerado na raiz do seu projeto.");
  console.log("Abra ele, copie os blocos estruturados e cole-os dentro do arquivo 'src/data/allMods.js'!");
  rl.close();
}

start();