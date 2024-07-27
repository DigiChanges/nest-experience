import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import * as process from 'process';

const check = process.argv.includes('--CHECK');

const alias  =  {
    '@src': './src',
    '@shared': './src/Shared',
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
                lines: '75',
            } : {})
        },
        testTimeout: 16000,
        setupFiles: [
            'dotenv/config'
        ],
        include: ['src/**/*.spec.ts'],
        exclude: ['src/**/__mocks__/*', 'src/**/__stubs__/*'],
        maxWorkers: "70%",
    },
    resolve: {
        alias
    },
    plugins: [swc.vite()]
});