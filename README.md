# ymagana14.github.io

Personal engineering portfolio, built with Jekyll and hosted on GitHub Pages.

## Where things live

| To change…                         | Edit                          |
|-----------------------------------|-------------------------------|
| Name, intro lines, "Now" note, links | `_config.yml`                 |
| Headshot                          | `assets/img/` + `index.html`  |
| About page                        | `about.md`                    |
| Add a project                     | copy `_projects/example-project.md` |
| Colors, fonts, layout             | `assets/css/site.css`         |

## Preview on your Mac

```bash
export PATH=/opt/homebrew/opt/ruby@3.3/bin:$PATH LANG=en_US.UTF-8
bundle exec jekyll serve
```

Then open http://localhost:4000. Stop it with Ctrl+C.

## Publish

```bash
git add .
git commit -m "Describe your change"
git push
```

GitHub rebuilds the live site at https://ymagana14.github.io within a minute or two.
