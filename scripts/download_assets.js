const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'assets', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  {
    name: 'arianna_hero.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPFFOVI5PupeLTfuH7hnTKVioiEX-F_56p2Kci6q0GuaCwTw2geon5hycz1n7NkUt0eKjByVhZRDXQHxs8r-NfpcZ9Ry4xFbDpwA6cZM5N_QqDjXHFv-_Akn_8C2xLQ14TtXLLVTyOKkmIcqsUe6JGar5ijs7otEo3HflaK20MpjMnYe7ya1JPJJ4WJCGutzkwfHx6J7TBXTbOlVvWadDp8fDau8NWC5d4g2RM3YfiavIWLiqKZ81ruLjuSe2ljjtNQA'
  },
  {
    name: 'service_custom_dev.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbyLruzS6Gnu4kpqWmlLM2IzDbqi68HAY8NmPXJD4BjJHhHXudV7TJrM5uOJJVU_7GOEIp68RdSRm5-NSvLynljojd7XAlIsZErn3BJOSmHN6R0wTayf8M0GBKC3Cr2rz9kT9nCAlxhL-hyCia0n5o5p_cEKA5vsqufy3K1ZgZLi4VTMMsWpJj9_CjOGCpssGj0llCeh4DN1cH8-cWI9zdA42R8iKMGqEvRqEleiY5ofyzGC6vxN5c'
  },
  {
    name: 'service_wordpress.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCjV5oxqRFHren1ga7Q_BNaDG4LgHP1roSj-0fHTy0j1Ki2TP5fH3E7RDOzSZPFhkNOZOIX5xjRPVSbPOpvkgRjiMqVWUAyKLxHDKcQM4J3RkeoJZmckhJWgNg9TnhMtHXcgR4trS4SjVUD0aNFVXluFIIh15C9qOO7_YJ6fo1wk3S7gtRO5MZEggqz_0RqTPYOlYX0ccDd_orkffloBuRV1Jixezhn6_W1WiZ05CfZYWuwBnrMP-2'
  },
  {
    name: 'service_repos.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBwMjxlFho6z8yWUjrAEM3o3oelZoY3lVBxnOfaEzO_wMlMjiLVG0xgJ-bJWgNsHkN-AxKRiaEP49-W8ngeh03wmRXHAo-2XrA6M5r-SN1u8V0XAaIvZxfwA9dXG40Oqp6LZrpa3TGFj5IRhriK6OMhruzEiRAaEh0MLh1ZvWwuL0M_9qZ9XYOtr-G6hwlBnhUjdG1NjpN8oLqnc1D2gyHsqzMvPaBOzFncdOsSt6olqzAG0uoir65'
  },
  {
    name: 'service_growth_ai.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgR_lq4J1ColtQEyqdnWWpSIEiMC4J4dk1abjUMjCOa8EQ3vRoxfEco-KvyrNCl0Op0icnN8Km6Z_o5D9K667xoQWeSmZV8TM7cVsAhI00kb__QuD09tVGuuH5UH6ObT68VkheFL3PPw_CVrip3oEGtMRsNTqQOzMxvnZfPzlCLl7rEMjdSZGWvT2BXCkiGN4le4fueqibgYs7ISrn1_zFIQRHZdxu1I3-IC4TOjS7bMWoNcgw6SqR'
  },
  {
    name: 'case_audit_platform.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTbyX7ui67a4scmsjhSCmIrSSQd6E8aEa5CBWE1qUF-jN42phVfRPO7BWHvbKDS_EQzcPtLxVL_hCXJsu7RNUUisoLG0sCpLzmHZ_7F5Sm2Cs18VSl7TaNZe6rlon9qZhVZjPpXGObzDryAL-cQRc97p0EgWJvsW2WeL3Se9o5H5EaIc8Oa-upquW27I8xIouoDf6p8netic8676ydZ_93agxx8sWIkPIKbdL8G5x3ClbIFVeZ9XKk'
  },
  {
    name: 'case_checkout.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaNrMd546wKNzr9MtU4gA4im43FMKOqSbFHC2Wsjx7249_wYLk9TTxEmQINfwAsC8nbhkePzMygVmy-AlIzjFgkpSfQ5qUeV4-oCXiA4CZKKPIhXIh2TIFe-m0bF0tH9O22OqeLYKnTbj4ly-Mp5KXiLagP-khvhHYd7-VVezbCoq_lCOd2fA4_O2sSgSLqj_-odQPjzkeWT5GQbI73015WiPu8CBmTqzn_8002TeiJ7npZEjfOnay'
  },
  {
    name: 'case_dspace.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfeDJeijGm4I2CdmyfDkz1RdP8nDkkNAFx03j-ekhnNxyfd-yLoNAZE8PWB6Ybo4CY09DpQiLyUzDzrYnBR4A5QPSAM-AefHAChIOV-ojc7K_Ct8DLlXhsj6JWuPPXAQUR3G7AfQLlVMPzIs2XELIYDDiIUJX5r8ZGJ49pFYDalC7ueQyH0-UriFXzZvzcjyLHknkDAqLPwxmcZfCl92XNj6nfyNqPrsgHJ6tJcAZgm7eH9Z29cHgG'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

(async () => {
  for (const item of assets) {
    const dest = path.join(targetDir, item.name);
    console.log(`Downloading ${item.name}...`);
    await download(item.url, dest);
  }
  console.log('All downloads completed!');
})();
