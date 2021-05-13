#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 23 21:52:20 2021

@author: linxiangling
"""
from . import _db


def query_library(library_id):
    return _db.LIBRARY_COLLECTION.find_one({'_id':library_id})
