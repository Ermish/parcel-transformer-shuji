module.exports = function(bundler) {
    bundler.addAssetType('.md', require.resolve('./shuji'))
    bundler.addPackager('shuji', require.resolve('./MyPackager'))
  }
  import { compileMarkdown, defaultOptions } from '.'
