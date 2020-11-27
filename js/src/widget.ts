import { createCanvas, Canvas, DispatchEvent } from 'algorithmx';

import { DOMWidgetModel, DOMWidgetView, ISerializers } from '@jupyter-widgets/base';
import { version, name } from '../package.json';
import { createButton, setButtonIcon } from './buttons';

export class AlgorithmXModel extends DOMWidgetModel {
    defaults() {
        return {
            ...super.defaults(),
            _model_name: AlgorithmXModel.model_name,
            _model_module: AlgorithmXModel.model_module,
            _model_module_version: AlgorithmXModel.model_module_version,
            _view_name: AlgorithmXModel.view_name,
            _view_module: AlgorithmXModel.view_module,
            _view_module_version: AlgorithmXModel.view_module_version,
            events: [],
            show_buttons: false,
        };
    }

    static serializers: ISerializers = {
        ...DOMWidgetModel.serializers,
    };
    static model_name = 'AlgorithmXModel';
    static model_module = name;
    static model_module_version = version;
    static view_name = 'AlgorithmXView';
    static view_module = name;
    static view_module_version = version;
}

export class AlgorithmXView extends DOMWidgetView {
    private canvas: Canvas | null = null;
    private eventIndex = 0;

    private stopped = false;

    playEvents(events: ReadonlyArray<string>) {
        if (this.canvas === null) return;

        events.forEach((eventStr) => {
            const event = JSON.parse(eventStr) as DispatchEvent;
            this.canvas!.dispatch(event);
        });
    }

    playAllEvents() {
        const events = this.model.get('events');
        this.playEvents(events);
    }

    eventsChanged() {
        if (this.canvas === null) return;

        const events: ReadonlyArray<string> = this.model.get('events');
        const newEvents = events.slice(this.eventIndex);
        this.eventIndex = events.length;

        this.playEvents(newEvents);
    }

    resetCanvas() {
        if (this.canvas === null) return;

        this.canvas.queues().clear().start();
        this.canvas.duration(0).remove().add({
            size: [400, 250],
            zoomtoggle: true,
        });
        setTimeout(() => {
            this.canvas!.duration(0).svgattr('width', '100%');
        }, 1);
    }

    removeCanvas() {
        this.resetCanvas();

        const element: Element = this.el;
        const canvasDiv = element.querySelector('algorithmx-container');
        if (canvasDiv !== null) element.removeChild(canvasDiv);

        const buttonDiv = element.querySelector('algorithmx-buttons');
        if (buttonDiv !== null) element.removeChild(buttonDiv);
    }

    remove() {
        this.removeCanvas();
        super.remove();
    }

    clickRestart() {
        if (this.canvas === null) return;

        this.resetCanvas();
        this.playAllEvents();
        this.stopped = false;
    }

    clickStart() {
        if (this.canvas === null) return;
        this.canvas.queues().start();
        this.stopped = false;
    }

    clickStop() {
        if (this.canvas === null) return;
        this.canvas.queues().stop();
        this.stopped = true;
    }

    renderButtons() {
        const element: Element = this.el;

        const buttonDiv = document.createElement('div');
        buttonDiv.style.height = '40px';

        const buttonPlay = createButton('pause', () => {
            if (this.stopped) {
                setButtonIcon(buttonPlay, 'pause');
                this.clickStart();
            } else {
                setButtonIcon(buttonPlay, 'play');
                this.clickStop();
            }
        });

        const buttonRestart = createButton('repeat', () => {
            setButtonIcon(buttonPlay, 'pause');
            this.clickRestart();
        });

        buttonDiv.appendChild(buttonPlay);
        buttonDiv.appendChild(buttonRestart);

        element.appendChild(buttonDiv);
    }

    render() {
        this.removeCanvas();

        const canvasDiv = document.createElement('div');
        canvasDiv.setAttribute('id', 'algorithmx-container');

        this.canvas = createCanvas(canvasDiv);

        this.canvas.onreceive((event) => {
            const fullEvent = { type: 'algorithmx', data: event };
            const fullEventStr = JSON.stringify(fullEvent);
            this.send(fullEventStr);
        });

        this.resetCanvas();

        const element: Element = this.el;
        element.appendChild(canvasDiv);

        const showButtons = this.model.get('show_buttons');
        if (showButtons) this.renderButtons();

        this.model.on('change:events', this.eventsChanged, this);
        this.eventsChanged();
    }
}
