window.__webpack_public_path__ =
    document.querySelector('body')!.getAttribute('data-base-url') +
    'nbextensions/algorithmx-jupyter';

if (window.require !== undefined) {
    (window.require as any).config({
        map: {
            '*': {
                'algorithmx-jupyter': 'nbextensions/algorithmx-jupyter/index',
            },
        },
    });
}

export const load_ipython_extension = () => {};
