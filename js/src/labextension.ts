import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
import { version, name } from '../package.json';

const extension: JupyterFrontEndPlugin<void> = {
    id: name,
    requires: [IJupyterWidgetRegistry as any],
    activate: (app, widgets: IJupyterWidgetRegistry) => {
        widgets.registerWidget({
            name: name,
            version: version,
            exports: () => require('./index'),
        });
    },
    autoStart: true,
};

export default extension;
