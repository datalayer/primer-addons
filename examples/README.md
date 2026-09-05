[![Datalayer](https://assets.datalayer.tech/datalayer-25.svg)](https://datalayer.io)

[![Become a Sponsor](https://img.shields.io/static/v1?label=Become%20a%20Sponsor&message=%E2%9D%A4&logo=GitHub&style=flat&color=1ABC9C)](https://github.com/sponsors/datalayer)

# ⚛️ ➕ Primer Addons Examples

## Gallery

[`gallery`](gallery) shows every addon component — and is itself a Reactor app
on the package's three plugins: `ThemePlugin`, `AppearancePlugin` in the
header, and `PageLayoutPlugin` arranging the gallery as a page, with the
search in the band above the sheet, the component list in the side panel and
quick links as chips.

```bash
npm run gallery   # from the package root, on http://localhost:5173
```

Its dependencies come from the workspace root — `npm i` in `datalayer-osp/src`,
where it is a member — not from an install of its own: the example aliases the
package's source, and a nested `node_modules` would put a second React and a
second set of React types beside it.

