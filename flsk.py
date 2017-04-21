#!/usr/bin/env python3

import json
import networkx as nx
from networkx.readwrite import json_graph
import flask

# Serve the file over http to allow for cross origin requests
app = flask.Flask(__name__, static_folder="force")

@app.route('/<path:path>')
def static_proxy(path):
  return app.send_static_file(path)
print('\nGo to http://localhost:8000/force.html to see the example\n')
app.run(port=8000)
