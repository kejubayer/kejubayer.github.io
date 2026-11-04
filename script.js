const toggle = document.querySelector('#themeToggle');
const savedTheme = localStorage.getItem('keju-theme');
if (savedTheme === 'light') document.body.classList.add('light');

function updateThemeIcon() {
  if (!toggle) return;
  const isLight = document.body.classList.contains('light');
  toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  toggle.innerHTML = isLight ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
}

updateThemeIcon();
toggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('keju-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  updateThemeIcon();
});

document.querySelectorAll('.navbar .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('#mainNav');
    if (nav?.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  });
});

function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
async function loadGithubRepos() {
  const username = "kejubayer";
  if (!document.getElementById("repoList")) return;
  const repoList = document.getElementById("repoList");
  const repoError = document.getElementById("repoError");

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    );
    if (!response.ok)
      throw new Error("Failed to load GitHub repositories.");

    const repos = await response.json();
    const excludedRepos = ["kejubayer.github.io", "kejubayer"];

    const publicRepos = repos.filter(
      (repo) => !repo.fork && !excludedRepos.includes(repo.name),
    );

    const stars = publicRepos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0,
    );

    const forks = publicRepos.reduce(
      (sum, repo) => sum + repo.forks_count,
      0,
    );
    const lastUpdated = publicRepos[0]?.updated_at
      ? new Date(publicRepos[0].updated_at).toLocaleDateString()
      : "N/A";

    document.getElementById("repoCount").textContent = publicRepos.length;
    document.getElementById("starCount").textContent = stars;
    document.getElementById("forkCount").textContent = forks;
    document.getElementById("updatedAt").textContent = lastUpdated;

    repoList.innerHTML = publicRepos
      .slice(0, 8)
      .map(
        (repo) => `
<div class="col-md-6 col-lg-4">
  <article class="repo-card">
    <h3 class="h6 mb-2">
      <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener">${escapeHtml(repo.name)}</a>
    </h3>
    <p class="repo-meta mb-2">${escapeHtml(repo.description || "No description provided yet.")}</p>
    <div class="d-flex flex-wrap gap-2 mb-2">
      <span class="badge text-bg-light"><i class="bi bi-star"></i> ${repo.stargazers_count}</span>
      <span class="badge text-bg-light"><i class="bi bi-diagram-3"></i> ${repo.forks_count}</span>
      <span class="badge text-bg-light"><i class="bi bi-code-slash"></i> ${escapeHtml(repo.language || "N/A")}</span>
    </div>
    <p class="repo-meta mb-0">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
    <p class="repo-meta mb-0">Packages/Topics: ${repo.topics && repo.topics.length ? escapeHtml(repo.topics.join(", ")) : "Not specified"}</p>
  </article>
</div>
    `,
      )
      .join("");
  } catch (error) {
    repoError.classList.remove("d-none");
    repoError.textContent =
      "Could not fetch GitHub repositories right now. Please try again later.";
  }
}

loadGithubRepos();

const dialog=document.querySelector('#photoDialog');
document.querySelectorAll('[data-gallery-photo]').forEach(link=>link.addEventListener('click',event=>{if(!dialog?.showModal)return;event.preventDefault();const img=dialog.querySelector('img');img.src=link.href;img.alt=link.querySelector('img').alt;dialog.showModal();}));
dialog?.querySelector('button')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
document.querySelector('#contactForm')?.addEventListener('submit',async event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
 const button=form.querySelector('[type="submit"]');button.disabled=true;button.textContent='Sending…';
 let status=form.querySelector('[role="status"]');if(!status){status=document.createElement('p');status.setAttribute('role','status');form.append(status);}
 const data=new URLSearchParams({...visitorMeta,date:new Date().toISOString(),name:form.elements.name.value.trim(),email:form.elements.email.value.trim(),number:form.elements.phone.value.trim(),message:form.elements.message.value.trim()});
 try{const response=await fetch('https://script.google.com/macros/s/AKfycbzRQI0959CZfGfMR_TEVjd5qaFiWbLOR9RTWrlG3GxrOiYYVH4SrQUPD-KBk1Ucdx1O/exec',{method:'POST',body:data});if(!response.ok)throw new Error('Send failed');status.textContent='Message sent successfully.';form.reset();}
 catch{status.textContent='Message could not be sent. Please email khondokereftakharjubayer@gmail.com or try again.';}
 finally{button.disabled=false;button.textContent='Send Message';}
});

// Load the shared translation selector on every page.
window.initWebsiteTranslator = function () {
  const container = document.querySelector('#websiteTranslator');
  if (!container || !window.google?.translate?.TranslateElement) return;
  container.replaceChildren();
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,bn,hi,ar,fr,de,es,zh-CN,ja,ko,pt,ru,ur',
    autoDisplay: false,
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'websiteTranslator');
};
const translatorContainer = document.querySelector('#websiteTranslator');
if (translatorContainer) {
  const translationScript = document.createElement('script');
  translationScript.src = 'https://translate.google.com/translate_a/element.js?cb=initWebsiteTranslator';
  translationScript.async = true;
  translationScript.addEventListener('error', () => {
    const message = document.createElement('span');
    message.className = 'translation-status';
    message.setAttribute('role', 'status');
    message.textContent = 'Translation unavailable';
    translatorContainer.replaceChildren(message);
  });
  document.head.append(translationScript);
}

const languageToggle = document.querySelector('.language-toggle');
const languagePanel = document.querySelector('#languagePanel');
function closeLanguagePanel() {
  if (!languagePanel || !languageToggle) return;
  languagePanel.hidden = true;
  languageToggle.setAttribute('aria-expanded', 'false');
}
languageToggle?.addEventListener('click', () => {
  languagePanel.hidden = !languagePanel.hidden;
  languageToggle.setAttribute('aria-expanded', String(!languagePanel.hidden));
});
document.addEventListener('click', event => {
  if (!event.target.closest('.language-control')) closeLanguagePanel();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && languagePanel && !languagePanel.hidden) {
    closeLanguagePanel();
    languageToggle.focus();
  }
});

// Keep the original Google Sheets visitor webhook and its field names.
const VISITOR_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyX8-dLRSLGrAeu4sJWm5NBghu49FlOC2dmXTyKcQH5qAh23jKOppNCFwSHOcfZd3JDCw/exec';
let visitorMeta = { ip: '', city: '', country: '' };
async function logWebsiteVisit() {
  // Previewing local files should not create visitor records.
  if (!['http:', 'https:'].includes(window.location.protocol) ||
      ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) return;
  try {
    const response = await fetch('https://ipinfo.io/json', {
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) throw new Error('Visitor lookup failed');
    const data = await response.json();
    visitorMeta = { ip: data.ip || '', city: data.city || '', country: data.country || '' };
    await fetch(VISITOR_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      body: new URLSearchParams({ ...visitorMeta, data: JSON.stringify(data) })
    });
    // The Apps Script response is opaque; delivery cannot be confirmed here.
  } catch (error) {
    console.warn('Visitor logging unavailable.', error);
  }
}
logWebsiteVisit();
