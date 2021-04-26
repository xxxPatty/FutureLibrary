#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 23 22:02:40 2021

@author: linxiangling
"""


from flask import Blueprint, jsonify, request
from models import user
import json
from datetime import datetime
#from flask_security import roles_required, login_required


library_api=Blueprint('library_api', __name__)


@library_api.route('insert_user', methods=['get'])  #ok
#註冊，成功回傳_id，失敗回傳False
def insert_user():
    role='normal user'
    email=request.values.get('email')
    password=request.values.get('password')
    name=request.values.get('name')
    phone=request.values.get('phone')
    result=user.insert_user(role, email, password, name, phone)
    if result != False: #成功
        return jsonify({'_id':result})
    else:   #失敗
        return jsonify({'_id':result})
  
@library_api.route('login', methods=['get'])   #ok
#登入，成功回傳_id，失敗回傳False
def login():
    email=request.values.get('email')
    password=request.values.get('password')
    result=user.find_user(email, password)
    if result != False:
        return jsonify({'_id':result})
    else:
        return jsonify({'_id':result})
