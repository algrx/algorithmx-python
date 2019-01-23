;(window as any).__webpack_public_path__ = document.querySelector('body')!.getAttribute('data-base-url') + 'nbextensions/algorithmx'

if ((window as any).require !== undefined) {
  const d3Modules: { [k: string]: number } = {
    'd3-color': 1,
    'd3-dispatch': 1,
    'd3-drag': 1,
    'd3-ease': 1,
    'd3-interpolate': 1,
    'd3-path': 1,
    'd3-selection': 1,
    'd3-shape': 1,
    'd3-timer': 1,
    'd3-transition': 1,
    'd3-zoom': 1
  }

  const d3Paths = Object.keys(d3Modules).reduce((res, k) =>
    ({...res, [k]: 'https://d3js.org/' + k + '.v' + d3Modules[k] + '.min' }), {})

  ;(window as any).require.config({
    paths: {
      webcola: 'https://unpkg.com/webcola@^3.0.0/WebCola/cola.min',
      algorithmx: 'https://unpkg.com/algorithmx@^1.0.0-beta.1/dist/algorithmx.min',
      ...d3Paths
    },
    shim: {
      algorithmx: {
        deps: ['webcola'].concat(Object.keys(d3Modules)),
        exports: 'algorithmx'
      }
    },
    map: {
      '*': {
        'algorithmx-jupyter': 'nbextensions/algorithmx-jupyter/index'
      }
    }
  })
}

export const load_ipython_extension = () => {}
