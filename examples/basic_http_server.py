import algorithmx

server = algorithmx.http_server(host='0.0.0.0', port=5050)
canvas = server.canvas()

def start():
    canvas.nodes([1, 2]).add()
    canvas.edge((1, 2)).add()

canvas.listen('start', start)

print('Starting server on port 5050', flush=True)
server.start()
