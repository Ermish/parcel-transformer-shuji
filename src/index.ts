import { Transformer } from "@parcel/plugin"
import ThrowableDiagnostic from "@parcel/diagnostic"
import { relativeUrl } from '@parcel/utils'
import { transformMarkdownString } from '@ermish/shuji'

export default new Transformer({
  async loadConfig({ config, options, logger }) {
    return config
  },

  // async parse({ asset, config, logger, resolve, options }) {
  //   logger.info({ message: 'Shuji: Parsing markdown files...' })

  //   return ast
  // },

  async transform({ asset, config, logger, resolve, options }) {
    logger.info({ message: 'Shuji: Converting markdown to jsx...'})

    try {
        const code = await asset.getCode();
        const sourceFileName = relativeUrl(options.projectRoot, asset.filePath);

        const transformedString = await transformMarkdownString(code)



      return [
        {
          type: 'js',
          content: transformedString,
          uniqueKey: sourceFileName
        }
      ]
      } catch (err) {
        throw new ThrowableDiagnostic({
          diagnostic: {
            message: err.message,
            filePath: asset.filePath,
            language: asset.type,
            stack: err.stack,
            name: err.name,
            codeFrame: {
              code: await asset.getCode(),
              codeHighlights: [
                {
                  start: {
                    line: 1,
                    column: 5,
                  },
                  end: {
                    line: 2,
                    column: 3,
                  },
                  message: "This is my error message!!!! oh noes!",
                },
              ],
            },
            hints: [
              "Try using a markdown validator to ensure your mardown files are valid.",
            ],
          },
        });
      }

    return [asset];
  },

  // async generate({ asset, ast, resolve, options }) {
  //   logger.info({ message: 'Shuji: Generating jsx files...'})

  //   return { code, map };
  // }
});
