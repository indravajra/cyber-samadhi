import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  function Footer({ displayClass }: QuartzComponentProps) {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        <p>
        You've reached the end of the page. Good job!

          {/* Made possible with <a href="obsidian.md">Obsidian.md</a> & <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>, © {year} */}
          {/* Made possible with <a href="obsidian.md">Obsidian.md</a> & <a href="https://quartz.jzhao.xyz/">Quartz</a>, © {year} */}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
