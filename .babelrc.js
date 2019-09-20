
const target = process.env.BABEL_ENV || 'esm';

module.exports = {
    presets: [
        ['@babel/env', {
            targets: {
                browsers: [
                    'node 8.9', // Support Node v8.9 LTS (Carbon)
                    '>0.1%',
                    'not dead',
                    'not OperaMini all',
                    'not IE < 11',
                    'last 2 Edge versions',
                ],
            },
            
            // Have babel add in polyfills automatically based on usage
            // https://github.com/babel/babel-preset-env/issues/203
            useBuiltIns: 'usage',
            
            // Use core-js v3
            // See: https://babeljs.io/blog/2019/03/19/7.4.0
            corejs: 3,
            
            // Whether to transpile modules
            modules: target === 'cjs' ? 'commonjs' : false,
        }],
    ],
    plugins: [
    ],
};
