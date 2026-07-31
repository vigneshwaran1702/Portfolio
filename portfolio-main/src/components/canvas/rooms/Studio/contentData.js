/**
 * Studio Content Data
 * 
 * Custom content for Vigneshwaran's monitor towers.
 */

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#FF0000',
        accentColor: '#cc0000',
        icon: '▶',
        label: 'Tech Video',
        shape: 'tv', // Wide CRT style
    },
    blog: {
        color: '#eab308',
        accentColor: '#ca8a04',
        icon: '📝',
        label: 'Case Study',
        shape: 'monitor', // Thin desktop monitor
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '📱',
        label: 'Micro Log',
        shape: 'phone', // Vertical phone
    },
    linkedin: {
        color: '#0077B5',
        accentColor: '#005E93',
        icon: 'in',
        label: 'Milestone',
        shape: 'monitor',
    },
    codrops: {
        color: '#0099FF',
        accentColor: '#0077CC',
        icon: '💧',
        label: 'Featured',
        shape: 'monitor',
    },
};

const RAW_CONTENT_DATA = [
    // ============ Case Studies / Projects ============
    {
        id: 'studio-vigneshwaran',
        type: 'project',
        title: 'Vigneshwaran: AI Solutions & Digital Products',
        description: 'Developing intelligent products and modern digital experiences using AI, analytics, and thoughtful frontend design.',
        frontTexture: '/textures/studio/monitorfront_postnafbdoublewinner.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_postnafbdoublewinner_painted.webp',
        thumbnail: null,
        url: '#',
        date: '2026-03-24',
        readTime: '6 min',
    },
    {
        id: 'studio-dailydeeper',
        platform: 'blog',
        title: 'AI-Powered Assistants & Product Thinking',
        description: 'Crafting practical AI products with clear user flows, responsive interfaces, and measurable value.',
        frontTexture: '/textures/studio/tvfront_filmikprojektdlamultiego.webp',
        paintedFrontTexture: '/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp',
        thumbnail: null,
        url: '#',
        date: '2026-02-15',
        readTime: '8 min',
    },
    {
        id: 'studio-nsew',
        platform: 'blog',
        title: 'Data-Driven Solutions & Analytics Projects',
        description: 'Building dashboards, automated insights, and data workflows that support smarter decisions and clearer reporting.',
        frontTexture: '/textures/studio/tvfront_filmikedytowaniezdjec.webp',
        paintedFrontTexture: '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp',
        thumbnail: null,
        url: '#',
        date: '2026-01-10',
        readTime: '10 min',
    },
    {
        id: 'studio-seo',
        platform: 'linkedin',
        title: 'AI & Analytics Learning Journey',
        description: 'A growing focus on LLMs, NLP, cloud tools, and data workflows to build reliable intelligent products.',
        thumbnail: null,
        url: '#',
        date: '2025-12-18',
        readTime: '5 min',
    },
    {
        id: 'studio-gutenberg',
        platform: 'blog',
        title: 'Modern Web Development with React & FastAPI',
        description: 'Creating responsive interfaces and scalable APIs that connect frontend experiences to robust backend services.',
        thumbnail: null,
        url: '#',
        date: '2025-11-28',
        readTime: '7 min',
    },
    {
        id: 'studio-micro-interaction',
        platform: 'tiktok',
        title: 'User Experience & Interface Design',
        description: 'Building polished, accessible interfaces that balance technical performance with visual clarity.',
        frontTexture: '/textures/studio/phonefront_followmeontiktok.webp',
        paintedFrontTexture: '/textures/studio/phonefront_followmeontiktok_painted.webp',
        thumbnail: null,
        url: '#',
        date: '2026-03-01',
        views: '3.4K',
        likes: '482',
    },
    {
        id: 'studio-perf',
        platform: 'blog',
        title: 'Performance & Product Optimization',
        description: 'Focused on speed, clarity, and practical deployment choices so digital products feel smooth and reliable.',
        thumbnail: null,
        url: '#',
        date: '2025-10-15',
        readTime: '11 min',
    },
];

const ytTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego.webp', '/textures/studio/tvfront_filmikedytowaniezdjec.webp'];
const ytPaintedTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp', '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp'];
const blogTextures = ['/textures/studio/monitorfront_postnafbdoublewinner.webp'];
const blogPaintedTextures = ['/textures/studio/monitorfront_postnafbdoublewinner_painted.webp'];
const ttTextures = ['/textures/studio/phonefront_followmeontiktok.webp'];
const ttPaintedTextures = ['/textures/studio/phonefront_followmeontiktok_painted.webp'];

let ytIdx = 0, blogIdx = 0, ttIdx = 0;
let ytPIdx = 0, blogPIdx = 0, ttPIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || (
            item.platform === 'youtube' ? ytTextures[ytIdx++ % ytTextures.length] :
                item.platform === 'blog' ? blogTextures[blogIdx++ % blogTextures.length] :
                    ttTextures[ttIdx++ % ttTextures.length]
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            item.platform === 'youtube' ? ytPaintedTextures[ytPIdx++ % ytPaintedTextures.length] :
                item.platform === 'blog' ? blogPaintedTextures[blogPIdx++ % blogPaintedTextures.length] :
                    ttPaintedTextures[ttPIdx++ % ttPaintedTextures.length]
        )
    };
});

export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
