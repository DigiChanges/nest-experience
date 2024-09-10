import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
const check = process.argv.includes('--CHECK');

const alias  =  {
    '@src': 'src',
    '@shared': 'src/Shared/*',
    '@app/*': ['src/App/*'],
    '@auth/*': ['src/Auth/*'],
    '@config/*': ['src/Config/*'],
    '@file/*': ['src/File/*'],
    '@item/*': ['src/Item/*']
};

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        root: './',
        alias,
        coverage: {
            all: true,
            provider: 'v8',
            reporter: ['text', 'html', 'json', 'json-summary'],
            include: ['src'],
            exclude: ['src/**/index.*', 'src/**/__mocks__/*', 'src/**/__stubs__/*'],
            ...(check ? {
                statements: '75',
                branches: '50',
                functions: '50',
                lines: '75'
            } : {})
        },
        testTimeout: 16000,
        include: ['src/**/*.spec.ts'],
        exclude: ['src/**/__mocks__/*', 'src/**/__stubs__/*']
    },
    resolve: {
        alias
    },
    plugins: [swc.vite()]
});
