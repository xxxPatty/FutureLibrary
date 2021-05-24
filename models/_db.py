#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 23 21:46:58 2021

@author: linxiangling
"""

from pymongo import MongoClient


DB = MongoClient('mongodb+srv://xxxPatty:881114@sandbox.lbkac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')['FutureLibrary']

USER_COLLECTION = DB['User']
BOOK_COLLECTION = DB['Book']
LIBRARY_COLLECTION = DB['Library']

