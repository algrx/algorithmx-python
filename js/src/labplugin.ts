import { Application } from '@phosphor/application'
import { Widget } from '@phosphor/widgets'
import { IJupyterWidgetRegistry } from '@jupyter-widgets/base'
import * as algxJupyter from './index'

export default {
  id: 'algorithmx-jupyter',
  requires: [IJupyterWidgetRegistry],
  activate: (app: Application<Widget>, widgets: IJupyterWidgetRegistry) => {
    widgets.registerWidget({
      name: algxJupyter.name,
      version: algxJupyter.version,
      exports: algxJupyter,
    })
  },
  autoStart: true,
}
