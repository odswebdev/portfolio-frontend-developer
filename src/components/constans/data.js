export const layouts = [
  {
    id: 1,
    name: "Макет 1",
    class: "layout1",
  },
  {
    id: 2,
    name: "Макет 2",
    class: "layout2",
  },
];

export const themes = [
  {
    id: 1,
    name: "Астронавт",
    class:
      "themeAstronaut bg-themeAstronaut bg-cover theme-sc no-repeat bg-fixed",
    img: "/src/assets/photos/abstract/abstract-astronaut.jpg",
    scrollbarColor: "#0fc",
    scrollbarTrackColor: "#fff",
  },
  {
    id: 2,
    name: "Космос",
    class: "themeSpace bg-themeSpace bg-cover no-repeat bg-fixed",
    img: "/src/assets/photos/abstract/abstract-astronaut-snap.jpg",
  },
  {
    id: 3,
    name: "Темная абстрактная текстура",
    class:
      "themeTextAbstractBlack bg-themeTextAbstractBlack bg-cover no-repeat bg-fixed",
    img: "/src/assets/photos/iridescent-texture-background.jpg",
    scrollbarColor: "#bd2fae",
    scrollbarTrackColor: "#fff",
  },
  {
    id: 4,
    name: "Текстура синие волны",
    class: "themeTextWaveBlue bg-themeTextWaveBlue bg-cover no-repeat bg-fixed",
    img: "/src/assets/photos/image-from-rawpixel-id-11992051-jpeg.jpg",
  },
  {
    id: 5,
    name: "Темно-коричневая тема",
    class: "themeBrownBlackGr bg-themeBrownBlackGr bg-cover no-repeat bg-fixed",
    img: "/src/assets/photos/gr-bg-pt.png",
  },
  {
    id: 6,
    name: "Металлические линии",
    class: "themeMetallLineGr bg-themeMetallLineGr bg-cover no-repeat bg-fixed",
    img: "/src/assets/photos/gr-bg-pt7.png",
  },
  {
    id: 7,
    name: "Разноцветный рандом",
    class: "themeRandomGr bg-themeRandomGr bg-cover no-repeat bg-fixed",
    img: "/src/assets/photos/gr-bg-pt8.png",
  },
  {
    id: 8,
    name: "Светлая",
    class: "theme-gradient1 bg-gradient-theme1",
    color: "linear-gradient(to right, #2c3e50, #bdc3c7)",
  },
  {
    id: 9,
    name: "Expresso",
    class: "theme-gradient5 bg-gradient-theme5",
    color: "linear-gradient(to right, #ad5389, #3c1053)",
  },
  {
    id: 10,
    name: "Image Theme 5",
    class: "theme-image5 bg-image-theme5 bg-cover no-repeat bg-fixed bg-center",
    img: "/src/assets/photos/abstract/abstract-mountains.jpg",
  },
  {
    id: 11,
    name: "Image Theme 6",
    class: "theme-image6 bg-image-theme6 bg-cover no-repeat bg-fixed",
    img: "/src/assets/photos/abstract/abstract-grid2.jpg",
  },
  {
    id: 12,
    name: "Image Theme 7",
    class: "theme-image7 bg-image-theme7 bg-cover no-repeat bg-fixed",
    img: "/src/assets/photos/abstract/man-vr-glasses.jpg",
  },
];

export const gradients = [
  "linear-gradient(45deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
  "linear-gradient(45deg, rgba(0, 255, 0, 0.5), rgba(0, 0, 255, 0.5))",
  "linear-gradient(45deg, rgba(255, 165, 0, 0.5), rgba(255, 69, 0, 0.5))",
  "linear-gradient(45deg, rgba(75, 0, 130, 0.5), rgba(148, 0, 211, 0.5))",
];

export const technologies = [
  { label: "React", percentage: 80 },
  { label: "JavaScript", percentage: 70 },
  { label: "CSS", percentage: 90 },
  { label: "Node.js", percentage: 60 },
];

export const experiences = [
  {
    title: "Специалист технической поддержки",
    city: "Санкт-Петербург",
    company_name: "ООО Реновацио Софт",
    description:
      "Верстка на HTML и CSS3 медицинских документов в МИС Renovatio Clinica.",
    responsibilities: [
      "Верстка на HTML и CSS3 медицинских документов в МИС Renovatio Clinica.",
      "Верстка сайтов по макетам Figma и доработка для CMS Modx и других.",
    ],
    achievements: [
      "Верстка на HTML и CSS3 медицинских документов в МИС Renovatio Clinica.",
      "Верстка сайтов по макетам Figma и доработка для CMS Modx и других.",
    ],
    icon: "../src/assets/images/logo-renovatio.svg",
    iconBg: "#fff",
    date: "Май 2021 — февраль 2024",
    link: "#",
  },
  {
    title: "Контент-менеджер, веб-программист",
    city: "Москва",
    company_name: "ООО 'ILGroup'",
    description: "Наполнение, разработка и доработка сайтов",
    responsibilities: [
      "Наполнение, разработка, доработка и администрирование сайтов и интернет-магазинов",
      "Верстка сайта, доработка модулей на различных CMS",
      "Доработка модулей для 1С-Битрикс.",
    ],
    achievements: [
      "Наполнение, разработка, доработка и администрирование сайтов и интернет-магазинов",
      "Верстка сайта, доработка модулей на различных CMS",
      "Доработка модулей для 1С-Битрикс.",
    ],
    icon: "../src/assets/images/logo-ilma.png",
    iconBg: "#fff",
    date: "Декабрь 2016 — март 2021",
    link: "#",
  },
  {
    title: "Инженер-программист",
    city: "Саратов",
    company_name: "Управление Федерального Казначейства по Саратовской области",
    description:
      "Разработка, доработка и тестирование модулей на языке Delphi УФК по Сар. области",
    responsibilities: [
      "Разработка, доработка и тестирование модулей на языке Delphi для автоматизированной системы федерального казначейства России (АСФК).",
      "Разработка плагинов для Wordpress для веб-сайта УФК по Саратовской области.",
      "Разработка автоматизированной информационной системы на языке PHP с использованием фреймворка EXTJS.",
    ],
    achievements: [
      "Разработано программное обеспечение на языке Delphi для отделов УФК по Саратовской области.",
      "Разработаны плагины для Wordpress для веб-сайта УФК",
      "Разработана, внедрена и протестирована автоматизированная информационная система WebJira на языке PHP с использованием фреймворка EXTJS",
    ],
    icon: "../src/assets/images/logo-ufk.png",
    iconBg: "#fff",
    date: "Декабрь 2014 — ноябрь 2015",
    link: "#",
  },
];

export const certificates = [
  { id: 1, title: "Certificate 1", imageUrl: "../src/assets/cert-img-01.jpg" },
  { id: 2, title: "Certificate 2", imageUrl: "../src/assets/cert-img-02.jpg" },
  { id: 3, title: "Certificate 3", imageUrl: "../src/assets/cert-img-03.jpg" },
  { id: 4, title: "Certificate 4", imageUrl: "../src/assets/cert-img-04.jpg" },
];

export const faqs = [
  {
    question: "Какой у вас опыт?",
    answer: "У меня более 5 лет опыта в веб-разработке...",
  },
  {
    question: "Какие технологии вы используете?",
    answer: "В основном я работаю с React, Tailwind CSS и Framer Motion...",
  },
  {
    question: "Вы можете помочь с разработкой бэкенда?",
    answer: "Да, у меня есть опыт работы с Node.js, Express и MongoDB...",
  },
];

export const techItems = [
  { name: "HTML 5", icon: "../src/assets/icons/skills01.png" },
  { name: "CSS 3", icon: "../src/assets/icons/skills02.png" },
  { name: "JS", icon: "../src/assets/icons/skills03_1.png" },
  { name: "JQuery", icon: "../src/assets/icons/skills04.png" },
  { name: "Gulp", icon: "../src/assets/icons/skills05.png" },
  { name: "SASS", icon: "../src/assets/icons/skills06.png" },
  { name: "Bootstrap", icon: "../src/assets/icons/skills07.png" },
  { name: "Figma", icon: "../src/assets/icons/skills08.png" },
  { name: "React", icon: "../src/assets/icons/skills09.png" },
  { name: "TypeScript", icon: "../src/assets/icons/skills10.png" },
  { name: "Tailwind", icon: "../src/assets/icons/skills11.png" },
  { name: "NPM", icon: "../src/assets/icons/skills12.png" },
  { name: "Node JS", icon: "../src/assets/icons/skills13.png" },
  { name: "Vite", icon: "../src/assets/icons/skills14.png" },
  { name: "PHP", icon: "../src/assets/icons/skills15_1.png" },
  { name: "MySQL", icon: "../src/assets/icons/skills16.png" },
  { name: "Git", icon: "../src/assets/icons/skills17.png" },
  { name: "Github", icon: "../src/assets/icons/skills18.png" },
  { name: "VS Code", icon: "../src/assets/icons/skills24.png" },
  { name: "Photoshop", icon: "../src/assets/icons/skills27.png" },
];

export const reviews = [
  {
    image: "../../src/assets/man-review-01.jpg",
    name: "Александр Панфилов",
    position: "Генеральный директор ООО «МВЭЙВ»",
    project: "emwave.ru",
    dates: "Май 2024 - Август 2024",
    rating: 5,
    review:
      "ООО «МВЭЙВ» выражает Вам благодарность за работу над проектом emwave.ru.",
  },
  {
    review: "Благодарим за проделанную работу по созданию корпоративного сайта",
    image: "../../src/assets/man-review-02.jpg",
    name: "Дмитрий Зайцев",
    position: "Генеральный директор ОАО Homnet",
    rating: 5,
    project: "homnet.ru",
    dates: "Март 2023 - Сентябрь 2023",
  },
  {
    review:
      "С достоинством справился с задачей создания сайта с нуля, который бы сочетал в себе функциональность, современный дизайн, легкость в администрировании сайта. В итоге цели проекта были реализованы по согласованным графикам и в полном объеме.",
    image: "../../src/assets/man-review-03.jpg",
    name: "Илья Проскурин",
    position: "Исполнительный директор Rostell",
    rating: 5,
    project: "homnet.ru",
    dates: "Март 2023 - Сентябрь 2023",
  },
  {
    review:
      "Я очень доволен работой исполнителя и рекомендую его для создания сайтов любой сложности. Большое спасибо за вашу помощь и проделанную работу!",
    image: "../../src/assets/man-review-04.jpg",
    name: "Денис Феофанов",
    position: "Директор компании Рубеж",
    rating: 5,
    project: "homnet.ru",
    dates: "Март 2023 - Сентябрь 2023",
  },
  {
    review:
      "Особенно хотели бы отметить высокую скорость запуска работы над проектом, оперативность и готовность быстро реагировать на изменение обстоятельств. Отдельно хочется поблагодарить за профессионализм, терпение и персональный подход",
    image: "../../src/assets/man-review-05.jpg",
    name: "Иван Лавров",
    position: "Генеральный директор компании Звук",
    rating: 5,
    project: "homnet.ru",
    dates: "Март 2023 - Сентябрь 2023",
  },
  {
    review:
      "Большой опыт и профессионализм в разработке сайтов, компетентность, быстрое решение проблем, возникающих в ходе работы, ответственность и доброжелательность, оперативная техническая поддержка в работе с уже запущенным сайтом сделали наше сотрудничество плодотворным и эффективным. Желаем успехов в профессиональной деятельности!",
    image: "../../src/assets/man-review-06.jpg",
    name: "Елизавета Голубева",
    position: "Генеральный директор ООО Мираж",
    rating: 5,
    project: "homnet.ru",
    dates: "Март 2023 - Сентябрь 2023",
  },
  {
    review:
      "Лучший веб-разработчик в России, с которым мне когда-либо приходилось работать. Сильные стороны: Индивидуальный подход. Талантливое воплощение идей заказчика. Соблюдение сроков. Если и были правки — то вносились быстро и четко. Слабых сторон не замечено.",
    image: "../../src/assets/man-review-07.jpg",
    name: "Любовь Карелина",
    position: "Генеральный директор ООО БукваЛенд",
    rating: 5,
    project: "homnet.ru",
    dates: "Март 2023 - Сентябрь 2023",
  },
];

/* export const categories = ["Разработка", "Доработка", "Контент"]; */

export const categories = [
  {
    name: "Коммерческие",
    subCategories: [
      "CMS",
      "CRM",
      "Landing",
      "Интернет-магазины",
      "Dashboard",
      "Mobile app",
      "Другие",
    ],
  },
  {
    name: "Пет-проекты",
    subCategories: ["Сайты", "Маркетплейсы", "Мобильные приложения", "Другое"],
  },
  {
    name: "Мини-проекты",
    subCategories: ["Сайты", "Интернет-магазины"],
  },
  {
    name: "Доработки",
    subCategories: ["Сайты", "Интернет-магазины"],
  },
  {
    name: "Наполнение контентом",
    subCategories: ["Сайты", "Интернет-магазины"],
  },
];

/* export const subcategories = [
  "Landing",
  "Интернет-магазины",
  "E-commerce",
  "Mobile app",
  "Другие",
]; */

export const effects = ["Fade", "Zoom", "Rotate", "Slide"];

export const tbs = ["Сетка", "Колонка", "2 колонки", "3 колонки", "4 колонки"];

export const servicesData = [
  {
    title: "Web-разработка",
    description:
      "Разработка адаптивных веб-сайтов и веб-приложений с использованием современных технологий.",
    icon: "WebDevelopment",
  },
  {
    title: "Мобильная разработка",
    description:
      "Создание приложений для любых мобильных устройств (от планшетов до телефонов).",
    icon: "MobileDevelopment",
  },
  {
    title: "Разработка приложений",
    description:
      "Разработка настольных ПК приложений под любую операционную систему, включающих в себя сложную логику и архитектуру, работу с базой данных",
    icon: "AppDevelopment",
  },
  {
    title: "Графический дизайн",
    description:
      "Создание элементов графического дизайна для веб-сайтов и веб-приложений. Создание прототипов сайтов в Figme, в различных конструкторах.",
    icon: "GraphicDesign",
  },
  {
    title: "Наполнение контентом",
    description:
      "Наполнение сайтов текстовым и графическим контентом. Исправление ошибок в тексте на сайте.",
    icon: "Content",
  },
  {
    title: "Другие услуги",
    description:
      "Работы по оптимизации сайта. Работы по продвижению сайта в поисковых системах.",
    icon: "OtherServices",
  },
];

export const projects = [
  {
    id: 1,
    category: "Коммерческие",
    subcategory: "Лендинги",
    title: "Лендинг Шипа-Су",
    description: "Верстка сайта санатория Шипа-Су в Казахстане",
    descriptions: [
      "Верстка сайта для ведущего производителя микроэлектроники в России",
      "Верстка сайта санатория Шипа-Су в Казахстане",
      "Верстка сайта о доставке грузов из Китая в Россию",
      "Верстка сайта управления по развитию новых экономических форм производства",
      "Верстка интернет-магазина по продаже тюльпанов от производителя",
      "Верстка сайта школы робототехники для подготовки педагогов начальной школы",
    ],
    details: "Верстка сайта санатория Шипа-Су в Казахстане",
    details2: [
      "Верстка сайта из макета в Figma на HTML, CSS, JS",
      "Реализация бронирования номеров в санатории с помощью JS",
      "Доработка и наполнение контентом",
    ],
    dateBegin: "12.05.2024",
    dateEnd: "07.07.2024",
    technologies: ["Html", "Css", "Js", "Jquery"],
    images: {
      desktop: "./src/assets/images/project-img-024.png",
      mobile: "./src/assets/project-img-01-1.png",
      gallery: [
        "./src/assets/images/project-img-026.png",
        "./src/assets/images/project-img-026.png",
        "./src/assets/images/project-img-026.png",
      ],
    },
    codeSnippet: `<button className="bg-purple-500 text-white px-4 py-2 rounded">Hello</button>`,
    codeLink: "https://github.com/odswebdev",
    demoLink: "https://odswebdev.github.io/sanatorium-shipa-su/",
  },
  {
    id: 2,
    category: "Коммерческие",
    subcategory: "Лендинги",
    title: "Лендинг Emway",
    description: "Верстка сайта для ведущего производителя микроэлектроники",
    descriptions: [
      "Верстка4 сайта для ведущего производителя микроэлектроники",
      "Верстка сайта санатория Шипа-Су в Казахстане",
      "Верстка сайта о доставке грузов из Китая в Россию",
      "Верстка сайта управления по развитию новых экономических форм производства",
      "Верстка интернет-магазина по продаже тюльпанов от производителя",
      "Верстка сайта школы робототехники для подготовки педагогов начальной школы",
    ],
    details: "Верстка сайта для ведущего производителя микроэлектроники в РФ",
    details2: [
      "Верстка сайта с нуля на HTML и CSS с использованием Elementor Wordpress",
      "Доработка сайта и оптимизация загрузки",
    ],
    dateBegin: "04.10.2024",
    dateEnd: "02.05.2024",
    technologies: ["Html", "Css", "Js", "Jquery"],
    images: {
      desktop: "./src/assets/images/project-img-01.png",
      mobile: "./src/assets/project-img-01-1.png",
      gallery: [
        "./src/assets/images/project-img-026.png",
        "./src/assets/images/project-img-026.png",
        "./src/assets/images/project-img-026.png",
      ],
    },
    codeSnippet: `<button className="bg-purple-500 text-white px-4 py-2 rounded">Hello</button>`,
    codeLink: "https://github.com/odswebdev",
    demoLink: "https://emwave.ru",
  },
  {
    id: 3,
    category: "Пет-проекты",
    subcategory: "Интернет-магазины",
    title: "Интернет-магазин Demm",
    description: "Верстка интернет-магазина по продаже смесителей",
    details: "Верстка интернет-магазина по продаже смесителей",
    details2: [
      "Верстка интернет-магазина из макета в Figma на React, Tailwind CSS",
      "Реализация корзины, оформления заказа и покупки товара",
      "Реализация каталога товаров, детальной карточки товара, фильтрации, навигации",
      "Наполнение контентом товарного каталога и страниц магазина",
    ],
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    technologies: ["Html", "React", "Tailwind"],
    images: {
      desktop: "./src/assets/images/project-img-023.png",
      mobile: "./src/assets/project-img-01-1.png",
      gallery: [
        "./src/assets/project-img-1.png",
        "./src/assets/project-img-2.png",
        "./src/assets/images/project-img-023.png",
        "./src/assets/project-img-4.png",
      ],
    },
    codeSnippet: `<button className="bg-purple-500 text-white px-4 py-2 rounded">Hello</button>`,
    codeLink: "https://github.com/odswebdev",
    demoLink: "https://odswebdev.github.io/mixersstore/",
  },
  /* {
    id: 4,
    name: "Movie-tickets",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    github_link: "https://github.com/odswebdev",
    live_link: "https://odswebdev.github.io/movie-tickets/",
    category: "Разработка",
    subCategory: "Web-app",
    description:
      "Верстка тикет-системы онлайн бронирования билетов в кинотеатр",
    details: "Верстка тикет-системы онлайн бронирования билетов в кинотеатр",
    details2: [
      "Реализация тикет-системы онлайн бронирования билетов в кинотеатр на HTML, React, Tailwind CSS",
      "Реализация всего процесса бронирования от выбора даты, времени, места до процесса покупки билета",
    ],
    image: "./src/assets/images/project-img-026.png",
    image2: "./src/assets/project1-1.png",
    tech: ["Html", "React", "Tailwind"],
    images: [
      "./src/assets/project-img-1.png",
      "./src/assets/project-img-2.png",
      "./src/assets/project-img-3.png",
      "./src/assets/project-img-4.png",
    ],
    descriptions: [
      "Верстка сайта для ведущего производителя микроэлектроники в России",
      "Верстка сайта по продаже ортопедических матрасов",
      "Верстка сайта о доставке грузов из Китая в Россию",
      "Верстка сайта управления по развитию новых экономических форм производства",
      "Верстка интернет-магазина по продаже тюльпанов от производителя",
      "Верстка сайта школы робототехники для подготовки педагогов начальной школы",
    ],
  },
  {
    id: 5,
    name: "VetClinic",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    github_link: "https://github.com/odswebdev",
    live_link: "https://odswebdev.github.io/vet-clinic/",
    category: "Разработка",
    subCategory: "Сервис",
    description: "Верстка сайта ветеринарной клиники",
    details: "Верстка сайта ветеринарной клиники",
    details2: [
      "Верстка сайта ветеринарной клиники на HTML5, CSS3 (SASS), JS (Jquery) с ипользованием Gulp",
    ],
    image: "./src/assets/images/project-img-026.png",
    image2: "./src/assets/project-img-01-1.png",
    tech: ["HTML", "CSS", "Sass", "Js", "Jquery", "Gulp"],
    images: [
      "./src/assets/project-img-01.png",
      "./src/assets/project-img-02.png",
      "./src/assets/project-img-03.png",
      "./src/assets/project-img-04.png",
      "./src/assets/project-img-05.png",
    ],
    descriptions: [
      "Верстка сайта для ведущего производителя микроэлектроники в России",
      "Верстка сайта по продаже ортопедических матрасов",
      "Верстка сайта о доставке грузов из Китая в Россию",
      "Верстка сайта управления по развитию новых экономических форм производства",
      "Верстка интернет-магазина по продаже тюльпанов от производителя",
      "Верстка сайта школы робототехники для подготовки педагогов начальной школы",
    ],
  },
  {
    id: 6,
    name: "VedExpress",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    github_link: "https://github.com/odswebdev",
    live_link: "https://odswebdev.github.io/vet-clinic/",
    category: "Разработка",
    subCategory: "Сайты",
    description: "Верстка сайта логистических услуг",
    details: "Верстка сайта логистических услуг",
    details2: [
      "Верстка сайта логистических услуг на HTML5, CSS3 (SASS), JS (Jquery)",
    ],
    image: "./src/assets/images/project-img-026.png",
    image2: "./src/assets/project-img-01-1.png",
    tech: ["HTML", "CSS", "Sass", "Js", "Jquery"],
    images: [
      "./src/assets/project-img-01.png",
      "./src/assets/project-img-02.png",
      "./src/assets/project-img-03.png",
      "./src/assets/project-img-04.png",
      "./src/assets/project-img-05.png",
      "./src/assets/project-img-06.png",
    ],
    descriptions: [
      "Верстка сайта для ведущего производителя микроэлектроники в России",
      "Верстка сайта по продаже ортопедических матрасов",
      "Верстка сайта о доставке грузов из Китая в Россию",
      "Верстка сайта управления по развитию новых экономических форм производства",
      "Верстка интернет-магазина по продаже тюльпанов от производителя",
      "Верстка сайта школы робототехники для подготовки педагогов начальной школы",
    ],
  },
  {
    id: 7,
    name: "ЖК Возрождение",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    category: "Разработка",
    subCategory: "Сайты",
    github_link: "https://github.com/odswebdev",
    live_link: "https://odswebdev.github.io/vet-clinic/",
    description: "Верстка сайта ЖК Возрождение",
    details: "Верстка сайта ЖК Возрождение",
    details2: [
      "Верстка сайта ЖК Возрождение на HTML5, CSS3 (SASS), JS (Jquery)",
    ],
    image: "./src/assets/images/project-img-026.png",
    image2: "./src/assets/project-img-01-1.png",
    tech: ["HTML", "CSS", "Sass", "Js", "Jquery"],
    images: [
      "./src/assets/project-img-04.png",
      "./src/assets/project-img-06.png",
    ],
  },
  {
    id: 8,
    name: "ColposCenter",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    category: "Разработка",
    subCategory: "Сайты",
    github_link: "https://github.com/odswebdev",
    live_link: "https://odswebdev.github.io/vet-clinic/",
    description: "Верстка сайта медицинского центра",
    details: "Верстка сайта медицинского центра",
    details2: [
      "Верстка сайта медицинского центра на HTML5, CSS3 (SASS), JS (Jquery)",
    ],
    image: "./src/assets/images/project-img-026.png",
    image2: "./src/assets/project-img-01-1.png",
    tech: ["HTML", "CSS", "Sass", "Js", "Jquery"],
    images: [
      "./src/assets/project-img-04.png",
      "./src/assets/project-img-06.png",
    ],
  },
  {
    id: 9,
    name: "GizmoBike",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    category: "Разработка",
    subCategory: "Маркетплейсы",
    github_link: "https://github.com/odswebdev",
    live_link: "https://odswebdev.github.io/vet-clinic/",
    description: "Верстка интернет-магазина по продаже электро-байков",
    details: "Верстка интернет-магазина по продаже электро-байков",
    details2: [
      "Верстка интернет-магазина по продаже электро-байков на React, Tailwind",
    ],
    image: "./src/assets/plug-project.png",
    image2: "./src/assets/project-img-01-1.png",
    tech: ["React", "Tailwind"],
    images: [
      "./src/assets/project-img-04.png",
      "./src/assets/project-img-06.png",
    ],
  },
  {
    id: 10,
    name: "FinDashboard",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    category: "Разработка",
    subCategory: "Сайты",
    github_link: "https://github.com/odswebdev",
    live_link: "https://odswebdev.github.io/vet-clinic/",
    description: "Разработка финансового dashboarda",
    details: "Разработка финансового dashboarda",
    details2: [
      "Разработка финансового dashboarda на TypeScript, Tailwind, NextJs",
    ],
    image: "./src/assets/plug-project.png",
    image2: "./src/assets/project-img-01-1.png",
    tech: ["TypeScript", "Tailwind", "NodeJS", "NextJS"],
    images: [
      "./src/assets/project-img-04.png",
      "./src/assets/project-img-06.png",
    ],
  },
   {
    id: 11,
    name: "Чат",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    category: "Разработка",
    github_link: "https://github.com/odswebdev",
    live_link: "https://emwave.ru",
    description: "Разработка чата",
    image: "./src/assets/plug-project.png",
    image2: "./src/assets/project-img-01-1.png",
    tech: ["HTML", "CSS", "NodeJS"],
    images: [
      "./src/assets/project-img-04.png",
      "./src/assets/project-img-06.png",
    ],
  },
  {
    id: 12,
    name: "Веб-приложение на Vue",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    category: "Разработка",
    github_link: "https://github.com/odswebdev",
    live_link: "https://emwave.ru",
    description: "Разработка веб-приложения",
    image: "./src/assets/plug-project.png",
    image2: "./src/assets/project-img-01-1.png",
    tech: ["HTML", "CSS", "NodeJS"],
    images: [
      "./src/assets/project-img-04.png",
      "./src/assets/project-img-06.png",
    ],
  },
  {
    id: 13,
    name: "Веб-приложение на Angular",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    category: "Разработка",
    github_link: "https://github.com/odswebdev",
    live_link: "https://emwave.ru",
    description: "Разработка веб-приложения",
    image: "./src/assets/plug-project.png",
    image2: "./src/assets/project-img-01-1.png",
    tech: ["HTML", "CSS", "NodeJS"],
    images: [
      "./src/assets/project-img-04.png",
      "./src/assets/project-img-06.png",
    ],
  },
  {
    id: 14,
    name: "Моб. приложение React Native",
    dateBegin: "10.06.2023",
    dateEnd: "02.05.2024",
    category: "Разработка",
    github_link: "https://github.com/odswebdev",
    live_link: "https://emwave.ru",
    description: "Разработка моб. приложение",
    image: "./src/assets/plug-project.png",
    image2: "./src/assets/project-img-01-1.png",
    tech: ["HTML", "CSS", "NodeJS"],
    images: [
      "./src/assets/project-img-04.png",
      "./src/assets/project-img-06.png",
    ],
  }, */
];

export const projects2 = [
  {
    image: "./src/assets/images/project-img-026.png",
    image2: "./src/assets/project1-1.png",
    id: 1,
    category: "Коммерческие",
    subcategory: "CMS",
    title: "Интернет-магазин",
    description: "Проект на CMS с индивидуальными доработками",
    technologies: ["React", "Tailwind", "Redux"],
    images: {
      desktop: "./src/assets/images/project-img-026.png",
      mobile: "./src/assets/images/project-img-026.png",
      gallery: [
        "./src/assets/images/project-img-026.png",
        "./src/assets/images/project-img-026.png",
        "./src/assets/images/project-img-026.png",
      ],
    },
    codeSnippet: `<button className="bg-purple-500 text-white px-4 py-2 rounded">Hello</button>`,
    codeLink: "https://github.com/...",
    demoLink: "https://demo.com/",
  },
  {
    id: 2,
    category: "Pet-проекты",
    subcategory: "Frontend",
    title: "UI-компоненты на React",
    description: "Набор анимированных UI-компонентов для pet-проекта.",
    technologies: ["React", "Tailwind", "Framer Motion"],
    images: {
      desktop: "/images/project1-desktop.png",
      mobile: "/images/project1-mobile.png",
      gallery: [
        "/images/project1-1.png",
        "/images/project1-2.png",
        "/images/project1-3.png",
      ],
    },
    codeSnippet: `<button className="bg-purple-500 text-white px-4 py-2 rounded">Hello</button>`,
    codeLink: "https://github.com/username/ui-demo",
    demoLink: "https://ui-demo.vercel.app",
  },
  {
    id: 3,
    category: "Мини-проекты",
    subcategory: "UI",
    title: "Анимация карточек",
    description: "Мини-проект с hover-анимацией карточек.",
    technologies: ["Vanilla JS", "CSS"],
    images: {
      desktop: "/images/project1-desktop.png",
      mobile: "/images/project1-mobile.png",
      gallery: [
        "/images/project1-1.png",
        "/images/project1-2.png",
        "/images/project1-3.png",
      ],
    },
    codeSnippet: `<button className="bg-purple-500 text-white px-4 py-2 rounded">Hello</button>`,
    codeLink: "https://github.com/username/cards-demo",
    demoLink: "https://cards-demo.vercel.app",
  },
  {
    id: 4,
    category: "Мини-проекты",
    subcategory: "UI",
    title: "Анимация карточек",
    description: "Мини-проект с hover-анимацией карточек.",
    technologies: ["Vanilla JS", "CSS"],
    images: {
      desktop: "/images/project1-desktop.png",
      mobile: "/images/project1-mobile.png",
      gallery: [
        "/images/project1-1.png",
        "/images/project1-2.png",
        "/images/project1-3.png",
      ],
    },
    codeSnippet: `<button className="bg-purple-500 text-white px-4 py-2 rounded">Hello</button>`,
    codeLink: "https://github.com/username/cards-demo",
    demoLink: "https://cards-demo.vercel.app",
  },
  {
    id: 5,
    category: "Коммерческие",
    subcategory: "CMS",
    title: "Анимация карточек",
    description: "Мини-проект с hover-анимацией карточек.",
    technologies: ["Vanilla JS", "CSS"],
    images: {
      desktop: "/images/project1-desktop.png",
      mobile: "/images/project1-mobile.png",
      gallery: [
        "/images/project1-1.png",
        "/images/project1-2.png",
        "/images/project1-3.png",
      ],
    },
    codeSnippet: `<button className="bg-purple-500 text-white px-4 py-2 rounded">Hello</button>`,
    codeLink: "https://github.com/username/cards-demo",
    demoLink: "https://cards-demo.vercel.app",
  },
  {
    id: 6,
    category: "Коммерческие",
    subcategory: "CMS",
    title: "Анимация карточек",
    description: "Мини-проект с hover-анимацией карточек.",
    technologies: ["Vanilla JS", "CSS"],
    images: {
      desktop: "/images/project1-desktop.png",
      mobile: "/images/project1-mobile.png",
      gallery: [
        "/images/project1-1.png",
        "/images/project1-2.png",
        "/images/project1-3.png",
      ],
    },
    codeSnippet: `<button className="bg-purple-500 text-white px-4 py-2 rounded">Hello</button>`,
    codeLink: "https://github.com/username/cards-demo",
    demoLink: "https://cards-demo.vercel.app",
  },
  // другие проекты
];





// src/data/projects.js
export const projects3 = [
  {
    id: '1',
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    shortDescription: 'Modern online store with real-time inventory',
    description: 'A full-featured e-commerce platform built with React and Node.js. Features include real-time inventory management, payment processing, user authentication, and admin dashboard.',
    category: 'Web Applications',
    subcategory: 'E-commerce',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    images: [
      '/images/projects/ecommerce-1.jpg',
      '/images/projects/ecommerce-2.jpg',
      '/images/projects/ecommerce-3.jpg'
    ],
    demoUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20'),
    views: 1250,
    likes: 89,
    isFavorite: false,
    featured: true,
    tags: ['shopping', 'payments', 'responsive']
  },
  {
    id: '2',
    title: 'Task Management App',
    slug: 'task-management-app',
    shortDescription: 'Collaborative task management with real-time updates',
    description: 'A collaborative task management application with real-time updates, drag-and-drop interface, team collaboration features, and comprehensive analytics dashboard.',
    category: 'Web Applications',
    subcategory: 'Productivity',
    technologies: ['React', 'Firebase', 'Redux', 'Framer Motion', 'Chart.js'],
    images: [
      '/images/projects/task-app-1.jpg',
      '/images/projects/task-app-2.jpg'
    ],
    demoUrl: 'https://task-manager-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/task-manager',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-04-05'),
    views: 980,
    likes: 67,
    isFavorite: false,
    featured: true,
    tags: ['tasks', 'collaboration', 'real-time']
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    slug: 'weather-dashboard',
    shortDescription: 'Beautiful weather app with forecasts and maps',
    description: 'An elegant weather application featuring real-time weather data, 5-day forecasts, interactive maps, and beautiful animations. Built with modern React patterns.',
    category: 'Mobile Applications',
    subcategory: 'Utilities',
    technologies: ['React Native', 'OpenWeather API', 'Mapbox', 'Lottie', 'Styled Components'],
    images: [
      '/images/projects/weather-1.jpg',
      '/images/projects/weather-2.jpg',
      '/images/projects/weather-3.jpg'
    ],
    demoUrl: 'https://weather-app-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/weather-app',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-25'),
    views: 750,
    likes: 45,
    isFavorite: false,
    featured: false,
    tags: ['weather', 'maps', 'animations']
  },
  {
    id: '4',
    title: 'Portfolio Builder',
    slug: 'portfolio-builder',
    shortDescription: 'Drag-and-drop portfolio creation tool',
    description: 'A no-code portfolio builder that allows users to create beautiful portfolios with drag-and-drop interface, custom domains, and analytics. Perfect for designers and developers.',
    category: 'Web Applications',
    subcategory: 'Tools',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion'],
    images: [
      '/images/projects/portfolio-1.jpg',
      '/images/projects/portfolio-2.jpg'
    ],
    demoUrl: 'https://portfolio-builder-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/portfolio-builder',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
    views: 1500,
    likes: 112,
    isFavorite: false,
    featured: true,
    tags: ['portfolio', 'drag-drop', 'cms']
  },
  {
    id: '5',
    title: 'Social Media Analytics',
    slug: 'social-media-analytics',
    shortDescription: 'Track and analyze social media performance',
    description: 'Comprehensive social media analytics dashboard that tracks engagement, follower growth, and content performance across multiple platforms with beautiful data visualizations.',
    category: 'Web Applications',
    subcategory: 'Analytics',
    technologies: ['React', 'D3.js', 'Express.js', 'MongoDB', 'Chart.js', 'Tailwind CSS'],
    images: [
      '/images/projects/analytics-1.jpg',
      '/images/projects/analytics-2.jpg'
    ],
    demoUrl: 'https://social-analytics-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/social-analytics',
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-04-15'),
    views: 890,
    likes: 56,
    isFavorite: false,
    featured: false,
    tags: ['analytics', 'social-media', 'charts']
  },
  {
    id: '6',
    title: 'Recipe Sharing Platform',
    slug: 'recipe-sharing-platform',
    shortDescription: 'Community-driven recipe sharing and discovery',
    description: 'A vibrant community platform for sharing and discovering recipes with advanced search, meal planning features, and beautiful food photography galleries.',
    category: 'Web Applications',
    subcategory: 'Food & Lifestyle',
    technologies: ['React', 'Firebase', 'Cloudinary', 'Algolia', 'Tailwind CSS', 'Framer Motion'],
    images: [
      '/images/projects/recipe-1.jpg',
      '/images/projects/recipe-2.jpg',
      '/images/projects/recipe-3.jpg'
    ],
    demoUrl: 'https://recipe-platform-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/recipe-platform',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-04-20'),
    views: 1100,
    likes: 78,
    isFavorite: false,
    featured: true,
    tags: ['recipes', 'community', 'food']
  }
];

export const categories2 = [
  { id: 'web', label: 'Web Applications' },
  { id: 'mobile', label: 'Mobile Applications' },
  { id: 'design', label: 'UI/UX Design' },
  { id: 'tools', label: 'Developer Tools' }
];

export const subcategories2 = {
  'Web Applications': ['E-commerce', 'Productivity', 'Tools', 'Analytics', 'Food & Lifestyle'],
  'Mobile Applications': ['Utilities', 'Social', 'Games', 'Health & Fitness'],
  'UI/UX Design': ['Websites', 'Mobile Apps', 'Brand Identity'],
  'Developer Tools': ['Libraries', 'Frameworks', 'Extensions']
};

export const technologies2 = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js',
  'MongoDB', 'PostgreSQL', 'Firebase', 'Tailwind CSS', 'Framer Motion',
  'Redux', 'GraphQL', 'AWS', 'Docker', 'Stripe', 'Mapbox', 'Chart.js',
  'D3.js', 'Three.js', 'React Native', 'Expo'
];