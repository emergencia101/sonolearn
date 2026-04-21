import http.server, os, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
port = int(os.environ.get("PORT", 3333))
handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(("", port), handler)
print(f"Serving on port {port}", flush=True)
httpd.serve_forever()
