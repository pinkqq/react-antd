const path = require('path');
module.exports = {
  webpack: {
    // 别名
    alias: {
      '@': path.resolve('src'),
    },
  },
  babel: {
    // plugins: ['@babel/plugin-syntax-dynamic-import'],
  },
};
