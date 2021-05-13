# parcel-plugin-shuji

STILL IN ACTIVE DEVELOPMENT!

Parcel plugin for the [Shuji](https://github.com/Ermish/shuji) markdown to react jsx converter

## Install the parcel plugin

```terminal
yarn add --dev parcel-plugin-shuji
or
npm install --dev parcel-plugin-shuji
```

Create a `.parcelrc` file or update your existing one to integrate the `shuji` transformer plugin:

```json
{
  "extends": ["@parcel/config-default"],
  "transformers": {
    "*.md": ["parcel-transformer-shuji"]
  }
}
```

- Using `"extends": ["@parcel/config-default"],` will make sure everything else will run normally.
You can scope what files/folder shuji runs by changing the `"*.md"` portion.
- Parcel will automatically look for `.md` files in the default `./markdown` folder and compile them into the `./jsxMarkdown` folder.

&nbsp;

## Config options

You can configure several options by adding a `shuji.config.json` or `.shujirc.json` file in your **root directory** and parcel will automatically load it.
See options [here](https://github.com/Ermish/shuji#config-options)

&nbsp;

## What is Shuji?

Check out [Shuji](https://github.com/Ermish/shuji) for more details!
