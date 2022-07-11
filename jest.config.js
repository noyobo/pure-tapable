module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|ts)$': ['esbuild-jest', { sourcemap: true }],
  },
  coveragePathIgnorePatterns: ['/src/__tests__/'],
};
