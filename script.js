const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('[data-menu]');
const tiltCards = document.querySelectorAll('[data-tilt]');
const languageToggle = document.querySelector('[data-lang-toggle]');
const translatableElements = document.querySelectorAll('[data-i18n]');

const translations = {
  pt: {
    navProjects: 'Projetos',
    navStack: 'Stack',
    navAbout: 'Sobre',
    navContact: 'Contato',
    heroEyebrow: 'Portfólio de projetos interativos',
    heroTitle: 'Jogos, protótipos e aplicações web em evolução.',
    heroDescription: 'Um espaço para reunir projetos próprios, fan projects, testes de gameplay, interfaces e sistemas que estou desenvolvendo com foco em web e experiências interativas.',
    heroPrimary: 'Ver projetos',
    widgetLabel: 'Status',
    widgetTitle: 'Projetos em evolução',
    widgetText: 'Jogos, protótipos e estudos em desenvolvimento',
    widgetProjects: 'projetos ativos',
    projectsKicker: 'Projetos',
    projectsTitle: 'Trabalhos em destaque',
    projectsText: 'Alguns projetos estão em fase inicial, outros já têm sistemas online ou demos em desenvolvimento.',
    inazumaMeta: 'Futebol tático / RPG',
    inazumaDescription: 'Fan project inspirado em Inazuma Eleven e Blue Lock, com futebol tático, partidas simuladas e progressão de jogadores no estilo anime esportivo.',
    charmmoMeta: 'MMORPG web / Online',
    charmmoDescription: 'Fan project inspirado em Pokémon, misturando exploração online, criação de conta, ranking, chat e sistemas de MMORPG.',
    secretTitle: 'Projeto reservado',
    secretMeta: 'Protótipo em estudo',
    secretDescription: 'Espaço reservado para um próximo projeto, ainda em fase de testes, documentação e definição de escopo.',
    statusProgress: 'Em desenvolvimento',
    statusReserved: 'Reservado',
    soonTag: 'Em breve',
    viewDetails: 'Ver detalhes',
    notAvailable: 'Ainda não disponível',
    stackKicker: 'Stack',
    stackTitle: 'Tecnologias que uso nos projetos.',
    stackText: 'A base varia conforme o projeto: alguns são páginas estáticas, outros usam autenticação, banco de dados, deploy e serviços externos.',
    aboutKicker: 'Sobre',
    aboutTitle: 'Um portfólio para acompanhar projetos reais em evolução.',
    aboutText: 'A ideia deste site é reunir o que estou criando, testando e melhorando. Alguns projetos são páginas estáticas, outros usam serviços como Firebase e Cloudflare, mas todos fazem parte da minha evolução com desenvolvimento web e games.',
    contactKicker: 'Contato',
    contactTitle: 'Quer acompanhar ou falar comigo?',
    contactText: 'Alguns projetos estão no GitHub, outros usam serviços como Cloudflare e Firebase. Por aqui vou reunindo links, demos e atualizações conforme cada ideia evolui.'
  },
  en: {
    navProjects: 'Projects',
    navStack: 'Stack',
    navAbout: 'About',
    navContact: 'Contact',
    heroEyebrow: 'Interactive projects portfolio',
    heroTitle: 'Games, prototypes and evolving web applications.',
    heroDescription: 'A place to organize original projects, fan projects, gameplay tests, interfaces and systems I am building around web and interactive experiences.',
    heroPrimary: 'View projects',
    widgetLabel: 'Status',
    widgetTitle: 'Projects in progress',
    widgetText: 'Games, prototypes and studies under development',
    widgetProjects: 'active projects',
    projectsKicker: 'Projects',
    projectsTitle: 'Featured work',
    projectsText: 'Some projects are still early, while others already have online systems or demos in development.',
    inazumaMeta: 'Tactical football / RPG',
    inazumaDescription: 'Fan project inspired by Inazuma Eleven and Blue Lock, featuring tactical football, simulated matches and player progression with a sports anime feel.',
    charmmoMeta: 'Web MMORPG / Online',
    charmmoDescription: 'Fan project inspired by Pokémon, combining online exploration, player accounts, rankings, chat and MMORPG systems.',
    secretTitle: 'Reserved project',
    secretMeta: 'Prototype study',
    secretDescription: 'Reserved space for a future project, still in testing, documentation and scope definition.',
    statusProgress: 'In development',
    statusReserved: 'Reserved',
    soonTag: 'Coming soon',
    viewDetails: 'View details',
    notAvailable: 'Not available yet',
    stackKicker: 'Stack',
    stackTitle: 'Technologies I use across projects.',
    stackText: 'The stack changes depending on the project: some are static pages, while others use authentication, databases, deployment and external services.',
    aboutKicker: 'About',
    aboutTitle: 'A portfolio built to follow real projects as they evolve.',
    aboutText: 'This website brings together what I am creating, testing and improving. Some projects are static pages, others use services like Firebase and Cloudflare, but all of them are part of my growth with web development and games.',
    contactKicker: 'Contact',
    contactTitle: 'Want to follow my work or get in touch?',
    contactText: 'Some projects are hosted on GitHub, while others use services like Cloudflare and Firebase. This site gathers links, demos and updates as each idea evolves.'
  }
};

const setMenuState = isOpen => {
  if (!toggle || !menu) return;

  toggle.classList.toggle('is-active', isOpen);
  menu.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('is-locked', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
};

const setLanguage = lang => {
  const dictionary = translations[lang];
  if (!dictionary) return;

  translatableElements.forEach(element => {
    const key = element.dataset.i18n;

    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  localStorage.setItem('luix-interactive-lang', lang);
};

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    setMenuState(!menu.classList.contains('is-open'));
  });

  menu.addEventListener('click', event => {
    if (event.target.matches('a')) {
      setMenuState(false);
    }
  });
}

if (languageToggle) {
  languageToggle.addEventListener('click', () => {
    const currentLang = localStorage.getItem('luix-interactive-lang') || 'pt';
    const nextLang = currentLang === 'pt' ? 'en' : 'pt';

    setLanguage(nextLang);
  });
}

setLanguage(localStorage.getItem('luix-interactive-lang') || 'pt');

const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (canTilt) {
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
