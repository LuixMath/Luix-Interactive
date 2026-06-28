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

    heroEyebrow: 'Portfólio de projetos digitais',
    heroTitle: 'Jogos web, sistemas interativos e protótipos em desenvolvimento.',
    heroDescription: 'Um espaço para reunir projetos próprios, fan projects, interfaces, testes de gameplay e aplicações web que estou construindo com foco em produto, código e experiência.',
    heroPrimary: 'Ver projetos',

    widgetLabel: 'Status',
    widgetTitle: 'Projetos em evolução',
    widgetText: 'Web apps, jogos e sistemas experimentais',
    widgetProjects: 'projetos ativos',

    projectsKicker: 'Projetos',
    projectsTitle: 'Trabalhos em destaque',
    projectsText: 'Projetos em fases diferentes: alguns são demos, outros ainda estão em prototipagem ou estruturação técnica.',

    statusProgress: 'Em desenvolvimento',
    statusDraft: 'Em estudo',

    inazumaMeta: 'Futebol tático / RPG',
    inazumaDescription: 'Fan project inspirado em Inazuma Eleven e Blue Lock, com futebol tático, partidas simuladas e progressão de jogadores.',

    charmmoMeta: 'MMORPG web / Online',
    charmmoDescription: 'Fan project inspirado em Pokémon, misturando exploração online, criação de conta, ranking, chat e sistemas de MMORPG.',

    secretTitle: 'Projeto reservado',
    secretMeta: 'Protótipo em estudo',
    soonTag: 'Em breve',
    secretDescription: 'Espaço reservado para um próximo projeto, ainda em fase de testes, documentação e definição de escopo.',

    inDevelopment: 'Em desenvolvimento',

    stackTitle: 'Tecnologias e serviços',
    stackText: 'Ferramentas que uso para criar interfaces, sistemas online, autenticação, banco de dados e deploy.',
    stackFrontend: 'Estrutura, interface, responsividade e interações no navegador.',
    stackFirebase: 'Autenticação, banco de dados, regras de segurança e sistemas online.',
    stackDeploy: 'Publicação de projetos, páginas estáticas e testes acessíveis pela web.',

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

    heroEyebrow: 'Digital projects portfolio',
    heroTitle: 'Web games, interactive systems and prototypes in development.',
    heroDescription: 'A place to organize original projects, fan projects, interfaces, gameplay tests and web applications I am building with focus on product, code and experience.',
    heroPrimary: 'View projects',

    widgetLabel: 'Status',
    widgetTitle: 'Projects in progress',
    widgetText: 'Web apps, games and experimental systems',
    widgetProjects: 'active projects',

    projectsKicker: 'Projects',
    projectsTitle: 'Featured work',
    projectsText: 'Projects in different stages: some are demos, others are still being prototyped or technically structured.',

    statusProgress: 'In development',
    statusDraft: 'Research stage',

    inazumaMeta: 'Tactical football / RPG',
    inazumaDescription: 'Fan project inspired by Inazuma Eleven and Blue Lock, featuring tactical football, simulated matches and player progression.',

    charmmoMeta: 'Web MMORPG / Online',
    charmmoDescription: 'Fan project inspired by Pokémon, combining online exploration, player accounts, rankings, chat and MMORPG systems.',

    secretTitle: 'Reserved project',
    secretMeta: 'Prototype study',
    soonTag: 'Coming soon',
    secretDescription: 'Reserved space for a future project, still in testing, documentation and scope definition.',

    inDevelopment: 'In development',

    stackTitle: 'Technologies and services',
    stackText: 'Tools I use to build interfaces, online systems, authentication, databases and deployment workflows.',
    stackFrontend: 'Structure, interface, responsiveness and browser interactions.',
    stackFirebase: 'Authentication, database, security rules and online systems.',
    stackDeploy: 'Project publishing, static pages and web-accessible tests.',

    aboutKicker: 'About',
    aboutTitle: 'A portfolio built to follow real projects as they evolve.',
    aboutText: 'This website brings together what I am creating, testing and improving. Some projects are static pages, others use services like Firebase and Cloudflare, but all of them are part of my growth with web development and games.',

    contactKicker: 'Contact',
    contactTitle: 'Want to follow my work or get in touch?',
    contactText: 'Some projects are hosted on GitHub, while others use services like Cloudflare and Firebase. This site gathers links, demos and updates as each idea evolves.'
  }
};

const setMenuState = isOpen => {
  toggle.classList.toggle('is-active', isOpen);
  menu.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('is-locked', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
};

const setLanguage = lang => {
  const dictionary = translations[lang];

  translatableElements.forEach(element => {
    const key = element.dataset.i18n;

    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  localStorage.setItem('luix-interactive-lang', lang);
};

toggle.addEventListener('click', () => {
  setMenuState(!menu.classList.contains('is-open'));
});

menu.addEventListener('click', event => {
  if (event.target.matches('a')) {
    setMenuState(false);
  }
});

languageToggle.addEventListener('click', () => {
  const currentLang = localStorage.getItem('luix-interactive-lang') || 'pt';
  const nextLang = currentLang === 'pt' ? 'en' : 'pt';

  setLanguage(nextLang);
});

setLanguage(localStorage.getItem('luix-interactive-lang') || 'pt');

const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (canTilt) {
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -5;
      const rotateY = ((x / rect.width) - 0.5) * 5;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
