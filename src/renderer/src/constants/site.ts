import viteLogo from '../assets/vite.svg?svg' // Adjust path based on your actual file structure


export const siteConfig = {
    name: "WAREHOUSE SYSTEM",
    description: "A Warehouse system created by Zenith.",
    logo: viteLogo,
    url: "/localhost",
    team: "ZENITH",
    links: {
        twitter: "https://www.facebook.com/profile.php?id=100006381841053",
        github: "https://github.com/Phnumbahwan"
    },
    navItems: [
        {
            text: "New",
            href: "/",
        },
        {
            text: "Top Airing",
            href: "/top-airing",
        },
        {
            text: "Favorites",
            href: "/favorites",
        },
    ],
    builtWith: [
        {
            text: "ReactJS",
            href: "https://react.dev/",
        },
        {
            text: "ExpressJS",
            href: "https://expressjs.com/",
        },
        {
            text: "Tailwind",
            href: "https://tailwindcss.com",
        },
        {
            text: "React Query",
            href: "https://tanstack.com/query/latest/",
        },
    ],
    social: [
        {
            text: "Facebook",
            href: "https://www.facebook.com/",
        },
        {
            text: "Twitter",
            href: "https://twitter.com/",
        },
        {
            text: "Linked In",
            href: "https://www.linkedin.com/",
        },
        {
            text: "Gmail",
            href: "http://gmail.com/",
        },
    ],
};