from . import create_canvas


def assert_event(event):
    def dispatch(e):
        assert e == event

    canvas = create_canvas()
    canvas.ondispatch(dispatch)
    return canvas


def test_dispatch_receive():
    # make sure that events are dispatched and received
    global did_dispatch
    global did_receive
    did_dispatch = False
    did_receive = False

    def dispatch(_):
        global did_dispatch
        did_dispatch = True

    def receive(_):
        global did_receive
        did_receive = True

    canvas = create_canvas()
    canvas.ondispatch(dispatch)
    canvas.onreceive(receive)
    canvas.dispatch({})
    canvas.receive({})

    assert did_dispatch == True
    assert did_receive == True


def test_queue():
    canvas1 = assert_event(
        {
            "queues": {
                "0": {
                    "pause": 0.5,
                }
            }
        }
    )
    canvas1.queue().pause(0.5)

    canvas2 = assert_event(
        {
            "queues": {
                "1": {"stopped": True},
                "2": {"stopped": True},
            }
        }
    )
    canvas2.queues([1, 2]).stop()


def test_message():
    global did_receive
    did_receive = False

    def receive():
        global did_receive
        did_receive = True

    canvas = assert_event({"message": "m"})
    canvas.onmessage("m", receive)
    canvas.message("m")
    canvas.receive({"message": "m"})
    assert did_receive == True


def test_add():
    canvas1 = assert_event({"attrs": {"nodes": {"1": {"color": "red"}}}})
    canvas1.node(1).add(color="red")

    canvas2 = assert_event(
        {"attrs": {"edges": {"a-b": {"source": "a", "target": "b", "directed": True}}}}
    )
    canvas2.edge(("a", "b")).add(directed=True)


def test_attrs():
    canvas = assert_event(
        {
            "attrs": {
                "nodes": {
                    "1": {"shape": "rect", "labels": {0: {"text": "d1"}}},
                    "2": {"shape": "rect", "labels": {0: {"text": "d2"}}},
                }
            }
        }
    )

    canvas.nodes([1, 2]).data(["d1", "d2"]).attrs(
        shape="rect", labels=lambda d: {0: {"text": d}}
    )


def test_animation():
    canvas1 = assert_event(
        {"attrs": {"pan": (40, 40)}, "animation": {"duration": 4, "ease": "quadratic"}}
    )
    canvas1.duration(4).ease("quadratic").pan((40, 40))


def test_node_label_data():
    canvas1 = assert_event(
        {
            "attrs": {
                "nodes": {
                    "1": {"labels": {"1": {"color": "red"}, "2": {"color": "red"}}},
                    "2": {"labels": {"1": {"color": "blue"}, "2": {"color": "blue"}}},
                }
            }
        }
    )
    canvas1.nodes([1, 2]).data(["red", "blue"]).labels([1, 2]).color(lambda d: d)

    canvas2 = assert_event(
        {
            "attrs": {
                "nodes": {
                    "1": {"labels": {"1": {"color": "red"}, "2": {"color": "blue"}}},
                    "2": {"labels": {"1": {"color": "red"}, "2": {"color": "blue"}}},
                }
            }
        }
    )
    canvas2.nodes([1, 2]).labels([1, 2]).data(["red", "blue"]).color(lambda d: d)


def test_node_callbacks():
    global clicked
    clicked = False

    def click(data, i):
        global clicked
        clicked = True
        if i == 0:
            assert data == "d1"
        else:
            assert data == "d2"

    canvas = create_canvas()
    canvas.nodes([1, 2]).data(["d1", "d2"]).onclick(click)

    canvas.receive({"nodes": {"1": {"click": True}, "2": {"click": True}}})
    assert clicked == True
