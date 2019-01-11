from typing import List, Callable, Type, Any
from os.path import join as pjoin
from http.server import SimpleHTTPRequestHandler
from http.server import BaseHTTPRequestHandler
from socketserver import TCPServer, ThreadingMixIn

class FileRequestHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def relative_file_handler(file: str) -> FileRequestHandler:
    class Handler(FileRequestHandler):
        def do_GET(self):
            if self.path == '/':
                self.path = file
            super().do_GET()

    return Handler

def absolute_file_handler(absolute_path: str, file: str) -> FileRequestHandler:
    class Handler(FileRequestHandler):
        def do_GET(self):
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()

            if self.path == '/':
                self.path = file

            full_path = pjoin(absolute_path, self.path.lstrip('/'))
            with open(full_path, 'r') as full_file:
                html_data = full_file.read()
                self.wfile.write(html_data.encode())

    return Handler

class FileServer(TCPServer):
    allow_reuse_address = True

    def start(self):
        self.serve_forever()

def create_file_server(handler: FileRequestHandler, port: int) -> FileServer:
    server = FileServer(('localhost', port), handler)
    return server
