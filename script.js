const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.querySelector('#miniAssessment');
const result = document.querySelector('#assessmentResult');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const values = [...form.querySelectorAll('select')].map(s => Number(s.value));
  if (values.some(v => !v)) return;
  const score = Math.round(values.reduce((a,b)=>a+b,0) / (values.length*5) * 100);
  let band = 'Critical foundation gaps';
  if(score >= 90) band='Leading'; else if(score >= 75) band='Advanced'; else if(score >= 60) band='Managed'; else if(score >= 40) band='Developing';
  result.innerHTML = `<strong>${score}/100 — ${band}</strong><br><span>This is a six-question preview only. A full JAGVORA assessment uses broader evidence and dimension-level scoring.</span>`;
  result.classList.add('show');
});
