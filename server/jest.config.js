/* eslint-disable no-undef */
process.env.PORT = 5001;

module.exports = {
	testEnvironment: 'node',
	roots: ['<rootDir>/src'],
	preset: 'ts-jest',
	setupFiles: ['./jest.setup.js'],
	modulePathIgnorePatterns: ['testData.ts'],
	coveragePathIgnorePatterns: ['/node_modules/']
};
