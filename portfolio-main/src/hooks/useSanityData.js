import { useState, useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export const isSanityConfigured = false;
export const urlFor = (source) => source;
export const getProxyUrl = (url) => url;
const sanityClient = {
    fetch: () => Promise.resolve([])
};

// Globalny cache dla danych z Sanity
const cache = {
    projects: null,
    content: null,
    awards: null,
    loading: false,
    loaded: false,
    error: null,
};

let fetchPromise = null;
const listeners = new Set();

function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function notifyUpdate() {
    listeners.forEach(l => l());
}

// Pomocniczy preloader dla zwykłych obrazków HTML (np. certyfikatów)
const preloadBrowserImage = (path) => {
    if (typeof window === 'undefined' || !path) return;
    const img = new Image();
    img.src = path;
};

// Sprawdzenie, czy urządzenie obsługuje hover (kursory, komputery)
const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

export function loadSanityData() {
    if (!isSanityConfigured) {
        cache.loaded = true;
        return Promise.resolve(cache);
    }

    if (fetchPromise) {
        return fetchPromise;
    }

    cache.loading = true;

    fetchPromise = (async () => {
        try {
            const [projectsData, contentData, awardsData] = await Promise.all([
                // 1. Projects (Galeria)
                sanityClient.fetch(`
                    *[_type == "galleryProject"] {
                        title,
                        "id": slug.current,
                        url,
                        description,
                        frontImage,
                        paintedImage,
                        techStack
                    }
                `),
                // 2. Studio Content
                sanityClient.fetch(`
                    *[_type == "studioItem"] {
                        title,
                        platform,
                        description,
                        url,
                        frontTexture,
                        paintedFrontTexture,
                        date,
                        views,
                        likes,
                        duration,
                        readTime
                    } | order(date desc)
                `),
                // 3. Awards (Certyfikaty w About)
                sanityClient.fetch(`
                    *[_type == "awardCertificate"] {
                        title,
                        category,
                        certificateImage,
                        date,
                        url
                    } | order(date desc)
                `)
            ]);

            // Mapowanie danych galerii i techStack na ścieżki lokalne oraz optymalizacja obrazków z Sanity
            if (projectsData && projectsData.length > 0) {
                cache.projects = projectsData.map(p => {
                    const frontUrl = p.frontImage ? getProxyUrl(urlFor(p.frontImage).width(1024).quality(80).auto('format')) : null;
                    const paintedUrl = p.paintedImage ? getProxyUrl(urlFor(p.paintedImage).width(1024).quality(80).auto('format')) : null;
                    return {
                        ...p,
                        front: frontUrl,
                        painted: paintedUrl,
                        techStack: p.techStack ? p.techStack.map(t => '/textures/gallery/' + t) : []
                    };
                });
            }

            // Mapowanie danych studio, przypisanie id oraz optymalizacja obrazków z Sanity
            if (contentData && contentData.length > 0) {
                cache.content = contentData.map((item, index) => {
                    const frontTextureUrl = item.frontTexture ? getProxyUrl(urlFor(item.frontTexture).width(1024).quality(80).auto('format')) : null;
                    const paintedFrontTextureUrl = item.paintedFrontTexture ? getProxyUrl(urlFor(item.paintedFrontTexture).width(1024).quality(80).auto('format')) : null;
                    return {
                        ...item,
                        id: item.platform + '-' + index,
                        frontTexture: frontTextureUrl,
                        paintedFrontTexture: paintedFrontTextureUrl
                    };
                });
            }

            // Mapowanie nagród do struktury oczekiwanej przez overlay oraz optymalizacja certyfikatów z Sanity
            if (awardsData && awardsData.length > 0) {
                const mapItems = (items) => items.map(a => {
                    const imageUrl = a.certificateImage ? getProxyUrl(urlFor(a.certificateImage).width(800).quality(80).auto('format')) : null;
                    return {
                        label: a.title,
                        date: new Date(a.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                        image: imageUrl,
                        url: a.url || null
                    };
                });

                cache.awards = {
                    sotd: {
                        id: 'award-sotd',
                        layout: 'certificate_grid',
                        title: 'Site of the Day Awards',
                        items: mapItems(awardsData.filter(a => a.category === 'sotd')),
                        platformConfig: { label: 'ACHIEVEMENT', color: '#1a1a1a', icon: '🏆' }
                    },
                    sotm: {
                        id: 'award-sotm',
                        layout: 'certificate_grid',
                        title: 'Site of the Month Awards',
                        items: mapItems(awardsData.filter(a => a.category === 'sotm')),
                        platformConfig: { label: 'AWARD', color: '#1a1a1a', icon: '📅' }
                    },
                    other: {
                        id: 'award-other',
                        layout: 'certificate_grid',
                        title: 'Other Awards',
                        items: mapItems(awardsData.filter(a => a.category === 'other')),
                        platformConfig: { label: 'PRESTIGE', color: '#1a1a1a', icon: '👑' }
                    }
                };
            }

            // PRELOADING ZDJĘĆ/TEKSTUR Z SANITY
            
            // 1. Projekty galerii
            if (cache.projects) {
                cache.projects.forEach(p => {
                    if (p.front) {
                        useTexture.preload(p.front);
                        preloadBrowserImage(p.front);
                    }
                    // Optymalizacja mobilna: Ładujemy malowane wersje TYLKO jeśli urządzenie wspiera hover (komputery)
                    if (p.painted && supportsHover) {
                        useTexture.preload(p.painted);
                        preloadBrowserImage(p.painted);
                    }
                });
            }

            // 2. Studio
            if (cache.content) {
                cache.content.forEach(c => {
                    if (c.frontTexture) {
                        useLoader.preload(TextureLoader, c.frontTexture);
                        preloadBrowserImage(c.frontTexture);
                    }
                    // Optymalizacja mobilna: Ładujemy malowane wersje TYLKO dla komputerów (z myszką/hover)
                    if (c.paintedFrontTexture && supportsHover) {
                        useLoader.preload(TextureLoader, c.paintedFrontTexture);
                        preloadBrowserImage(c.paintedFrontTexture);
                    }
                });
            }

            // 3. Nagrody (certyfikaty w oknach 2D) - preload w przeglądarce
            if (cache.awards) {
                ['sotd', 'sotm', 'other'].forEach(category => {
                    cache.awards[category].items.forEach(item => {
                        if (item.image) {
                            preloadBrowserImage(item.image);
                        }
                    });
                });
            }

            cache.loaded = true;
            cache.loading = false;
        } catch (error) {
            console.error("Error preloading Sanity data:", error);
            cache.error = error;
            cache.loading = false;
            // Oznaczamy jako załadowane w razie błędu, żeby aplikacja nie wisiała w nieskończoność na preloaderze
            cache.loaded = true;
        }

        notifyUpdate();
        return cache;
    })();

    return fetchPromise;
}

export function isSanityDataLoaded() {
    if (!isSanityConfigured) return true;
    return cache.loaded;
}

export function useGalleryProjects() {
    const [projects, setProjects] = useState(cache.projects);

    useEffect(() => {
        loadSanityData();

        if (cache.loaded) {
            setProjects(cache.projects);
            return;
        }

        const handleUpdate = () => {
            setProjects(cache.projects);
        };

        return subscribe(handleUpdate);
    }, []);

    return projects;
}

export function useStudioContent() {
    const [content, setContent] = useState(cache.content);

    useEffect(() => {
        loadSanityData();

        if (cache.loaded) {
            setContent(cache.content);
            return;
        }

        const handleUpdate = () => {
            setContent(cache.content);
        };

        return subscribe(handleUpdate);
    }, []);

    return content;
}

export function useAwards() {
    const [awardsData, setAwardsData] = useState(cache.awards);

    useEffect(() => {
        loadSanityData();

        if (cache.loaded) {
            setAwardsData(cache.awards);
            return;
        }

        const handleUpdate = () => {
            setAwardsData(cache.awards);
        };

        return subscribe(handleUpdate);
    }, []);

    return awardsData;
}

// Automatyczne odpalenie pobierania przy załadowaniu modułu JS
loadSanityData();
