// Downloads every logo and prepares the images the deck uses. Run once: node fetch-assets.js
const fs = require('fs');
const { execFileSync } = require('child_process');
const icons = require('@iconify-json/logos/icons.json');
const si = require('simple-icons');

const OUT = 'logos';

function iconify(slug, name) {
  const ic = icons.icons[name];
  const w = ic.width || icons.width, h = ic.height || icons.height;
  fs.writeFileSync(`${OUT}/${slug}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ic.left || 0} ${ic.top || 0} ${w} ${h}">${ic.body}</svg>`);
}
function simple(slug, key) {
  const ic = si[key];
  fs.writeFileSync(`${OUT}/${slug}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#${ic.hex}" d="${ic.path}"/></svg>`);
}
function download(file, url) {
  execFileSync('curl', ['-sL', '-m', '20', '-A', 'Mozilla/5.0', '-o', `${OUT}/${file}`, url]);
}
const favicon = (slug, domain) => download(`${slug}.png`, `https://www.google.com/s2/favicons?domain=${domain}&sz=256`);

const fromIconify = {
  github: 'github-icon', githubcopilot: 'github-copilot', jetbrains: 'jetbrains-icon', figma: 'figma',
  notion: 'notion-icon', googlegemini: 'google-gemini', azure: 'microsoft-azure', heroku: 'heroku-icon',
  mongodb: 'mongodb-icon', stripe: 'stripe', aws: 'aws', namecheap: 'namecheap', datadog: 'datadog-icon',
  sentry: 'sentry-icon', newrelic: 'new-relic-icon', gitkraken: 'gitkraken', appwrite: 'appwrite-icon',
  codecov: 'codecov-icon', google: 'google-icon', linkedin: 'linkedin-icon', instagram: 'instagram-icon',
  arduino: 'arduino', browserstack: 'browserstack', travisci: 'travis-ci', vaadin: 'vaadin',
  visualstudio: 'visual-studio', vscode: 'visual-studio-code', unity: 'unity',
};
for (const [slug, name] of Object.entries(fromIconify)) iconify(slug, name);

simple('autodesk', 'siAutodesk');
simple('deepnote', 'siDeepnote');

download('1password.svg', 'https://svgl.app/library/1password-light.svg');
download('clerk.svg', 'https://svgl.app/library/clerk-icon-light.svg');
download('googleai.svg', 'https://svgl.app/library/gemini.svg');
download('requestly.svg', 'https://requestly.com/img/brand/requestly-icon.svg');
download('astra.png', 'https://cdn.prod.website-files.com/5f80230f2eb0ba0ee5a95589/5f80230f2eb0ba1a99a958be_webcip.png');
download('camber.png', 'https://cdn.prod.website-files.com/681a24354efe21a04772abd0/681e0666aa256345942fc654_webclip.png');

const favicons = {
  namecom: 'name.com', tech: 'get.tech', datacamp: 'datacamp.com', microsoft365: 'microsoft365.com',
  bootdev: 'boot.dev', termius: 'termius.com', testmail: 'testmail.app', codedex: 'codedex.io',
  educative: 'educative.io', frontendmasters: 'frontendmasters.com', pomodone: 'pomodoneapp.com',
  bootstrapstudio: 'bootstrapstudio.io', icons8: 'icons8.com', zyte: 'zyte.com', localstack: 'localstack.cloud',
  visme: 'visme.co', iconscout: 'iconscout.com', scrimba: 'scrimba.com', polypane: 'polypane.app',
  hazeover: 'hazeover.com', lambdatest: 'lambdatest.com', codescene: 'codescene.com', algoexpert: 'algoexpert.io',
  adafruit: 'adafruit.com', pageclip: 'pageclip.co', carto: 'carto.com', interviewcake: 'interviewcake.com',
  imgbot: 'imgbot.net', todiagram: 'todiagram.com', tower: 'git-tower.com', doppler: 'doppler.com',
  workingcopy: 'workingcopy.app', xojo: 'xojo.com', sqlgate: 'sqlgate.com', popsql: 'popsql.com',
  simpleanalytics: 'simpleanalytics.com', gorails: 'gorails.com', honeybadger: 'honeybadger.io',
  deepscan: 'deepscan.io', appfigures: 'appfigures.com', blockchair: 'blockchair.com', poeditor: 'poeditor.com',
  configcat: 'configcat.com', themeisle: 'themeisle.com', symfonycasts: 'symfonycasts.com',
  devcycle: 'devcycle.com', dashlane: 'dashlane.com',
};
for (const [slug, domain] of Object.entries(favicons)) favicon(slug, domain);

console.log('logos ready:', fs.readdirSync(OUT).length);
