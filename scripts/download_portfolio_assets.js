const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'assets', 'images', 'portfolio');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  {
    name: 'logo_arycode.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3MavmoJrYY5dN3bohs1X2WpPlfUYEL5bze6K72l8Ac6nMrVE7K73bCXDaZcFqbEYauRYPWrjeDMlhe4sjOVF1OYqT98aompavz8n3wQ12pO-aXXNx1LZ2aEScNaZXy33gRo_PO5VBRg54ASCd3DavmkjN3WdXw1H5ggMoLB-zFLWKNhHNgSwGQXjVenE046FWNBHEXmyK1dZoW78X1649rwzFI0KvvVkOGzum3p08-3z7IUWA0PCurB-fwHSsjthBYQ'
  },
  // Full-Stack
  {
    name: 'fs_gonzaga_admin.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA0eMuSwM6mbnObiPr5LnMBuNKIEuFa_wCfoatyZi5dJCCcp9FLmnJQN9pR0hJML6HvfrWf_fKemwkMYMI_YMgfhKqFIyctEX_n1wOAhIHt3gnqv7h-KNMx5WmRbDp7I_o9HSKylQeZuLC6Gky2dca_9j1_Oy4UW-nfxIvU91nUnKCRmpEqYSJ2O9X89CiocydJpZTqpD1TzG8ubnZxhVeZUtVGexv12eqSVSUDVE1HIE4KX3oH9qn'
  },
  {
    name: 'fs_donaciones_feyalegria.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTYcUkVuseWMgSkpHiobHWuwqhk5YQimB18HoMac_rvC3x2JgjBrOomd-cUlqAj4MWklH0zc0TTT7PiNPVUZJ4522qWOk1heM0tHHzgV8-Yhzg0lRrsW0gkLRvHJZmaxvd3mcAla3_lGsDAue3wqOxtgFDs3n-9wNiZgTH6hyygxPiCdtfusk09h_SYTXlv_t7ygBLK1BwoCg9dlaZ0YEC_3VH1USRimVh8wkQ8EjeJjtaErGkPMAs'
  },
  {
    name: 'fs_vacantes_iujo.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAX3J0SxvApvSSJPMmMwuZrQiNxq9XPBwi2q2Sln202wUJRvQ1x_mQjhGI3RyZ3uU5gmGV3yyvAmtU-7aqqWYuYktilpHGJR47gTzrbY_jSjf1BEfWMLtqUJejuVLCEEbW8ZQDNGuRKURIi4lJG89xlu26DkSx8V6NwxW1XlnjLCROZuog2ixE0YJsgR5KF8Yvr4ONIv9RR3pyOrBG5dnF9bExNxKaZTl2Cgv5airBaOKFSzw6sK-xc'
  },
  // WordPress
  {
    name: 'wp_colegio_gonzaga.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd0AjmvFT774YbAA3t130yOwanjPgCP74NS1RkR8g8huEtVlFxoGZ2rQdrT7CGNA3zvNobJ87ggxolqpue6nZM6vQGnrTi99hNwyeet9ag6uznZ5aN1PXVFRhBAnQMPdHn5mzDkXt8pNlu9JBV1VXlSgBL2rXhRBQ0CurtCo-YRqyWP55b8czjMuuHGuY7HmI4aOObysJBvaWHjvBGLCv9qTRsEj2NlhvTa3IvB5XkJdWLU7HA6EkB'
  },
  {
    name: 'wp_cep.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC73TCYhrz9F_ZYx2tbifJOJ7T2orFO8zj827HohI_YUS6owONqGKqJoyYLWV9lSe2IJ_DGNwSuiJhYj6qemfAOdg9dY36QN6P-TZuZVpdM9pOSyDCAWawjvuW2kkGEoExT1CjWDcS-PMiiLucDENcGk0q4kEuFNhV68A-RZMrq87ZDGFiTvAfF_nHvSUhXX2yYRcGB2ZPJ_UHPumob1QDDfEfX4YNXhIEY521oLQVwjrzYrs7awx4C'
  },
  {
    name: 'wp_beca_estudiante.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFwjlBCVFbP67TUS7XTibdSNVjMGMTEZddGZekWdj1sGDVheWA1S_i8y5gYyNZ-mij9_22xwQxvrJAakTUBD4T18LHPab_Sior5961t6JzDi_15T8Uewz0X_1EDIFViywqcAqJ7iSOQlpef6VsvCd-rkuljHdsbwPqgngoRtI5zLp94M65AbMii0VC9mWq4L39U3vvfj3Lu3sakstAZSYeIb1Ka2swzPXibe3rNhwsncMiISZ-Ry5'
  },
  {
    name: 'wp_validacion_cide.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALzfdPbNhy9RCdaN_MFjJZ8iqrapQu3Aos1PdZQatIqNe-bJGQ7TOpA0YV8JOg5QzYOSUQEu9TWrrEyy7aQQElYmiqK2Q6USgN17Uy-pGMdiAxqSE9wmjHOkkwyBcQEa5XsAC6kr-nPw2VpTmXZt9Z-7gYGjpzGnQLwFv-OFUYWjg0G6_1SyVg0D-9cSvjff6er7Gt42ALfC5NOeE02qJiJ5EdRqStlTOSVVE9rh8TtSnBG7aqPxOS'
  },
  // Marketing & Analytics
  {
    name: 'mkt_italcambio.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmJpKD34OXtT6kPMbMu_9ZiNEmUvlbDtcBiwCKZgI20v6oGrqVZyzhBFu5Xhumv8Xb2gYT-uOYLCacphbGSL-NSgOJZqtu9xUx9jmWeuBf5yslYxbFlGkk3V5iMAhQdoOPq5ldPITJyGTL9wnbf-l9wWe_BcxvRvz25WGDKsg18r5PdTgYhhqcfuHPJmFbf8e_8zOcs6CGIyXcJPSjzPPfJ-WlJNMiIHE6IT4yey14snrzg_q_I_6K'
  },
  {
    name: 'mkt_meta_ads_cide.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlIxEYsuEefQA_Tn58xrs-LihsQ_cckWXh0KjJpws8tyg3-oZy6vAKfr6XOkQ6LtiJI7ujcXpy7AvJ9RnBVbeaMiOJL5jC5k1RWVcQet-qer-UVVtZu-eaBDCfP9YjXnbNXMEA1DLQnaXg6LNVWy4h5qfd4w3Y6QAf7NicWxzY33mGkQUqpTeKWVqPMevE3k9Biyi3ZJWB5mr9cl-N5crmcG_rVLdBIu18C3JE5HOWzc2UnHFgnTnd'
  },
  {
    name: 'mkt_ga4_pipeline.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvuaAX1tYMXqsWa2gw90xJCKGobpn6kwI0GreocHE0nrNKN4yh9ZAji6JfbKv9vkvjLbd4dGrNjakcTiJ-mZ2BQWOfZ2yhDwUg9Ly3g2D71GZPTH7nIinJNskQPHOE7oUpKyVLoxEWDhgXqLAc6oTt1lmampdySxPrXwzxtlVoNKN_9v8jf9ba2oy_Lm-xb1jXMMGWg6sVgeyK5SCVWordDOb130DRoRdkVAD73JjzCPLuaIZMewqP'
  },
  {
    name: 'mkt_lid_calendar.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMzxU8SARU0QZ1MlTGE1fTLVA4TdpXk5FChZNLgTsjFYEAmn57i2oR_0yCPHBpTT1ZEf_x3GWJ041BW1Cegoi0SNiUYAnZhMIjl6I5kxld1qgjHVdMGZ6jKZSqZjprcLJap4KlBGH_EFNsZXQNIV90_d_psmR8-N2camOIUzSScIkWwTrgimftSsO0as26Q3DTx9Ttcnx5L80j9MDWkkXwsMj6lwZ3CjW1hD6qNlCx0tQhRYP4HdyZ'
  },
  // Soporte & Académico
  {
    name: 'sop_revistas_ojs.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR6WUO6d0EXGqs_xF_h7Buuuu-e7HQPVl6bHAXS2epn5156A-nAvHN4nfgE-4RhWg0ctSBBHPXEr23s5GDXwlVC4SBWKYSyC_cQjXnbo0OBDsIxIuJGWOaxkTHmXBnjagyD_FH6y0WqePcdZO5J18B_nhdB3gFzgp4vuw4wBTbKs42jsp9R44QsMZH3ZAhSGu0csxqFiDoxSmB-C3K3vI011mIusmjgF-3mm3BtKbkPdKoBB53Y5OL'
  },
  {
    name: 'sop_dspace_rack.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKdgFc_pXI7RnmG1XRihKAFEPyTpP4rcy9vI0qM-KeMEve9u8xA41VqE6AqBHwWWeCVAjelGB5rtnvvVBHhFUiN5uknDb2_Xd0wjarBDYJxjI_eVIfxVJ3cL4IU0S38-wMhBwBFGz43vnSTLAEO17zcGGXAWpi7YSNp7QEBCzozO8OT3M9bzNRxxFTjm7SXP1rbpwdVaxUPe_I-8iQhwaT6_kgnilT5cJ5gErntOm3yBtA8qCj35y6'
  },
  {
    name: 'sop_moodle_lms.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbS77NiHGw_l3k7Z6mymLviiL95FWoHmrqviAaW5w-0lx75KS8NFpbV8voVxjTfloKCBTNy9yfqN_ShJPgQ80P0AJO0uA4Y0kcMeAVVW_UlTh8Mu2L6Zb2bhVl-1-cagtplRJ2VGoIBIt7M3YditzbI55U5QJ0zmDqE39IK8r-6B7A2YCdxI0n76Q0TgqlVxH_d1mE628r2uaU9ZnxNzCqXr01CyfgFwqF8Lhm84SKl5IVXrckNjdX'
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
    try {
      await download(item.url, dest);
      console.log(`✓ ${item.name}`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.name}:`, err.message);
    }
  }
  console.log('All downloads completed!');
})();
