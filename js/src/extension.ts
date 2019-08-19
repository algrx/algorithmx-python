;(window as any).__webpack_public_path__ = document.querySelector('body')!.getAttribute('data-base-url') + 'nbextensions/algorithmx'

if ((window as any).require !== undefined) {
  ;(window as any).require.config({
    map: {
      '*': {
        'algorithmx-jupyter': 'nbextensions/algorithmx-jupyter/index'
      }
    }
  })
}

export const load_ipython_extension = () => {}
