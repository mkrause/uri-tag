
const babelEnv = process.env.BABEL_ENV || 'cjs';

module.exports = {
    presets: [
        ['env', {
            targets: {
                node: '8.0',
                browsers: ['last 2 versions'],
            },
            
            // Whether to enable modules (depends on the target environment)
            modules: babelEnv === 'cjs' ? 'commonjs' : false,
            
            exclude: [
                // Do not transpile generators (saves us from needing a polyfill)
                'transform-regenerator',
            ],
        }],
    ],
    plugins: [
        'transform-object-rest-spread',
    ],
};
