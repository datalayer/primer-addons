# Making a new release of @datalayer/primer-addons

A pushed `v*` tag publishes that version to
[npm](https://www.npmjs.com/package/@datalayer/primer-addons) through
[`.github/workflows/release.yml`](.github/workflows/release.yml), with trusted publishing:
no token is stored in the repository.

1. Bump `version` in `package.json`, open a pull request and merge it to `main`.
2. Tag the merge commit with the same version and push the tag:

   ```bash
   git checkout main && git pull
   git tag v1.0.23
   git push origin v1.0.23
   ```

The workflow checks that the tag equals the `package.json` version (it stops otherwise),
runs [`build.yml`](.github/workflows/build.yml) (install, build, and `npm pack` with a check
that `lib/` is in the tarball), then publishes that tarball with
`npm publish --access public --provenance`, in the `npm` environment.

npm never accepts the same version twice: a failed run can be re-run from the Actions tab,
but a change after a publish needs a new version and a new tag.

## One-time setup

On the `@datalayer/primer-addons` package settings on [npmjs.com](https://www.npmjs.com/),
under _Trusted publishing_, add a GitHub Actions publisher:

- Organization or user: `datalayer`
- Repository: `primer-addons`
- Workflow filename: `release.yml`
- Environment name: `npm`

The `npm` environment exists in the repository settings (_Settings → Environments_);
protection rules added there gate every publish.

## License headers

Every source file carries the header [`.licenserc.yaml`](.licenserc.yaml) describes.
`license-header.yml` checks it on every pull request and push to `main`, and
`fix-license-header.yml` adds missing headers to a pull request's branch.
