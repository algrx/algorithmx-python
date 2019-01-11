import { Application, IPlugin } from '@phosphor/application'
import { Widget } from '@phosphor/widgets';
import { IJupyterWidgetRegistry } from '@jupyter-widgets/base'

import { MODULE_NAME, MODULE_VERSION } from './version'
import * as widgetExports from './widget'

const EXTENSION_ID = 'algorithmx-jupyter:plugin'

/**
 * The AlgorithmX plugin.
 */
const algorithmxPlugin: IPlugin<Application<Widget>, void> = {
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
  activate: activateWidgetExtension,
  autoStart: true
}

export default algorithmxPlugin


/**
 * Activate the widget extension.
 */
function activateWidgetExtension(app: Application<Widget>, registry: IJupyterWidgetRegistry): void {
  registry.registerWidget({
    name: MODULE_NAME,
    version: MODULE_VERSION,
    exports: widgetExports,
  })
}
