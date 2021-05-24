#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 23 22:37:39 2021

@author: linxiangling
"""

from .library_api import library_api
from .library_web import library_web



blueprint_prefix = [(library_api, ""), (library_web, "")]


def register_blueprint(app):
    for blueprint, prefix in blueprint_prefix:
        app.register_blueprint(blueprint, url_prefix=prefix)
    return app
