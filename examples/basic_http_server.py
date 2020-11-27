from algorithmx import http_server

server = http_server(host="0.0.0.0", port=5050)
canvas = server.canvas()


def start():
    canvas.nodes(range(1, 8)).add()
    canvas.edges([(i, i + 1) for i in range(1, 7)] + [(1, 3), (2, 4), (2, 7)]).add()

    for i in range(1, 8):
        canvas.pause(0.5)
        canvas.node(i).color("green").highlight().size("1.25x")

        if i < 7:
            canvas.pause(0.5)
            canvas.edge((i, i + 1)).traverse("green")


canvas.onmessage("start", start)

print("Server is running on localhost:5050", flush=True)
server.start()
