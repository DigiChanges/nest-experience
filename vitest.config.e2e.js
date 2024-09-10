import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

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
        include: ['**/*.e2e-spec.ts'],
        globals: true,
        environment: 'node',
        alias,
        root: './'
    },
    resolve: {
        alias
    },
    plugins: [swc.vite()]
});
