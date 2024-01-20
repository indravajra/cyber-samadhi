import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Cyber-Samadhi",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "G-HE3XZZJECH"
    },
    baseUrl: "indravajra.github.io/cyber-samadhi/",
    ignorePatterns: ["**/private", "**/templates", ".obsidian", "**/bin", "**/journals", "**/projects", "**/inbox", "**/canvas", "**/meta", "**/unsorted", "**/excerpts", "**/fortunes", "**/phrases", "**/sayings", "**/highlights", "**/articles"],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "Bricolage Grotesque", // "Schibsted Grotesk",
        body: "Barlow",
        code: "IBM Plex Mono",
      },
      // colors: {
      //   lightMode: {
      //     light: "#faf8f8", // Keeping this light for a clean look
      //     lightgray: "#b8b8f3", // A soft blue-gray, reminiscent of neon lights
      //     gray: "#8f8fb8", // A deeper shade of the above for contrast
      //     darkgray: "#503a60", // A muted purple for a sophisticated touch
      //     dark: "#2b2b2b", // Keeping this dark for balance
      //     secondary: "#ff007b", // Vibrant neon pink for a striking secondary color
      //     tertiary: "#19c5e3", // Bright cyan for a lively tertiary color
      //     highlight: "rgba(255, 183, 77, 0.15)", // A soft, glowing orange for highlights
      //   },
      //   darkMode: {
      //     light: "#161618", // Keeping this for a deep background
      //     lightgray: "#393639", // Slightly altered for a more muted appearance
      //     gray: "#646464", // Neutral gray as a base for other colors
      //     darkgray: "#cc39a3", // Neon pink for a striking contrast
      //     dark: "#ebebec", // Soft light color for readability
      //     secondary: "#39ccbf", // A teal blue for a vibrant, yet sophisticated look
      //     tertiary: "#f500f5", // A bold magenta for extra vibrancy
      //     highlight: "rgba(255, 183, 77, 0.15)", // Matching the light mode for consistency
      //   },
      // },  
      // colors: {
      //   lightMode: {
      //     light: "#f4f1e9", // A light beige, reminiscent of sand or dry grass
      //     lightgray: "#c9c2b2", // A muted light brown, like dried leaves
      //     gray: "#9b9486", // A deeper shade of the light gray, earthy and natural
      //     darkgray: "#625d52", // A dark gray-brown, like wet soil
      //     dark: "#3e3a33", // A very dark brown, grounding the scheme
      //     secondary: "#6b8f71", // A muted green, like moss or lichen
      //     tertiary: "#a88c6d", // A warm, earthy terracotta
      //     highlight: "rgba(164, 155, 142, 0.15)", // A soft, muted highlight for a subtle effect
      //   },
      //   darkMode: {
      //     light: "#2a2d2a", // A very dark green, almost black, like dense foliage
      //     lightgray: "#4a5047", // A dark, muted green
      //     gray: "#6d736a", // A medium gray-green, like moss on a stone
      //     darkgray: "#a3a391", // A muted beige-gray, like dried reeds
      //     dark: "#dcd7c9", // A light, sandy color for contrast
      //     secondary: "#8c775f", // A muted brown, like tree bark
      //     tertiary: "#b0a58f", // A light brown, like dry grass
      //     highlight: "rgba(184, 173, 158, 0.15)", // A soft, natural highlight for depth
      //   },
      // },              
      colors: {
        lightMode: {
          light: "#f4f1e9",
          lightgray: "#c9c2b2",
          gray: "#9b9486",
          darkgray: "#625d52",
          dark: "#3e5740",
          secondary: "#49684c",
          tertiary: "#618665",
          highlight: "#aec7b0",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#ebebec",
          dark: "#F7EDE2",
          secondary: "#e0073d",
          tertiary: "#ff004d",
          highlight: "#1e040d"
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"], // you can add 'git' here for last modified from Git but this makes the build slower
      }),
      Plugin.Poetry(),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
