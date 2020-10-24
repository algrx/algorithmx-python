from . import Canvas


def assert_event(event):
    def dispatch(e):
        assert e == event

    canvas = Canvas()
    canvas.ondispatch(dispatch)
    return canvas


def test_dispatch_receive():
    # make sure that events are dispatched and received
    global dispatched
    global received
    dispatched = False
    received = False

    def dispatch(_):
        global dispatched
        dispatched = True

    def receive(_):
        global received
        received = True

    canvas = Canvas()
    canvas.ondispatch(dispatch)
    canvas.onreceive(receive)
    canvas.dispatch({})
    canvas.receive({})

    assert dispatched == True
    assert received == True


def test_attrs():
    canvas1 = assert_event({"attrs": {"nodes": {"1": {"color": "red"}}}})
    canvas1.node(1).color("red")

    canvas2 = assert_event({"attrs": {"edges": {"a-b": {"directed": True}}}})
    canvas2.edge(("a", "b")).directed(True)


def test_animation():
    canvas1 = assert_event(
        {"attrs": {"pan": (40, 40)}, "animation": {"duration": 4, "ease": "quadratic"}}
    )
    canvas1.duration(4).ease("quadratic").pan((40, 40))

    canvas2 = assert_event(
        {"attrs": {"nodes": {"1": {"visible": {"animtype": "grow"}}}}}
    )
    canvas2.node(1).add(animtype="grow")


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

    canvas = Canvas()
    canvas.nodes([1, 2]).data(["d1", "d2"]).onclick(click)

    canvas.receive({"nodes": {"1": {"click": True}, "2": {"click": True}}})
    assert clicked == True
