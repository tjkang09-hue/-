/**
 * 콘텐츠(성과/역량/프로젝트/경력)는 /data/*.json 에서 관리합니다.
 * 내용을 수정하려면 이 파일이 아니라 data 폴더의 json 파일을 편집하세요.
 */

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path} 로드 실패 (${res.status})`);
  return res.json();
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function showError(container, message) {
  container.innerHTML = '';
  container.appendChild(el('div', 'data-error', message));
}

/* 히어로 핵심 성과 배지 */
function renderAchievements(data) {
  const row = document.getElementById('stat-row');
  row.innerHTML = '';
  data.forEach(item => {
    const stat = el('div', 'stat');
    stat.appendChild(el('span', 'n', item.label));
    stat.appendChild(el('span', 't', item.text));
    row.appendChild(stat);
  });
}

/* 핵심 역량 */
function renderCompetencies(data) {
  const grid = document.getElementById('comp-grid');
  grid.innerHTML = '';
  data.forEach(text => {
    const item = el('div', 'comp-item');
    item.appendChild(el('span', 'comp-dot'));
    item.appendChild(el('p', null, text));
    grid.appendChild(item);
  });
}

/* 대표 프로젝트 */
function renderProjects(data) {
  const grid = document.getElementById('project-grid');
  grid.innerHTML = '';
  data.forEach(p => {
    const card = el('div', 'pcard');

    const head = el('div', 'pcard-head');
    head.appendChild(el('h3', null, p.title));
    head.appendChild(el('span', 'role-tag', p.role));
    card.appendChild(head);

    const dl = el('dl');
    dl.appendChild(el('dt', null, '기간'));
    dl.appendChild(el('dd', null, p.period));
    dl.appendChild(el('dt', null, '고객사'));
    dl.appendChild(el('dd', null, p.client));
    dl.appendChild(el('dt', null, '성과'));
    dl.appendChild(el('dd', null, p.result));
    card.appendChild(dl);

    grid.appendChild(card);
  });
}

/* 경력 타임라인 (기본 노출 + 전체보기 토글) */
function renderExperience(data) {
  const spine = document.getElementById('spine');
  const mainWrap = document.getElementById('spine-main');
  mainWrap.innerHTML = '';

  data.main.forEach(item => {
    const node = el('div', 'node');
    node.appendChild(el('div', 'period', item.period));
    node.appendChild(el('h3', null, item.company));
    node.appendChild(el('div', 'role', item.role));
    mainWrap.appendChild(node);
  });

  const moreList = document.getElementById('more-list');
  moreList.innerHTML = '';
  data.more.forEach(item => {
    const row = el('div', 'more-item');
    row.appendChild(el('span', 'period', item.period));
    row.appendChild(el('span', 'role', `${item.company} · ${item.role}`));
    moreList.appendChild(row);
  });

  const summaryCount = document.getElementById('more-count');
  if (summaryCount) summaryCount.textContent = data.more.length;
}

/* 스크롤 등장 애니메이션 (모션 감소 설정 존중) */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    els.forEach(e => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(e => io.observe(e));
}

/* 전화번호는 클릭 시에만 노출 (개인정보 최소 노출 원칙) */
function initPhoneReveal() {
  const btn = document.getElementById('phone-reveal');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const span = el('span', null, btn.dataset.phone);
    btn.replaceWith(span);
  });
}

async function init() {
  initPhoneReveal();

  try {
    const [achievements, competencies, projects, experience] = await Promise.all([
      loadJSON('data/achievements.json'),
      loadJSON('data/competencies.json'),
      loadJSON('data/projects.json'),
      loadJSON('data/experience.json'),
    ]);
    renderAchievements(achievements);
    renderCompetencies(competencies);
    renderProjects(projects);
    renderExperience(experience);
  } catch (err) {
    console.error(err);
    const msg = '콘텐츠를 불러오지 못했습니다. file://로 직접 열었다면 로컬 서버(예: `npx serve` 또는 `python3 -m http.server`)로 실행해 주세요. Vercel/GitHub Pages 배포 후에는 정상적으로 표시됩니다.';
    showError(document.getElementById('stat-row'), msg);
    showError(document.getElementById('comp-grid'), msg);
    showError(document.getElementById('project-grid'), msg);
    showError(document.getElementById('spine-main'), msg);
  }

  initReveal();
}

document.addEventListener('DOMContentLoaded', init);
