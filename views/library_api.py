#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 23 22:02:40 2021

@author: linxiangling
"""


from flask import Blueprint, jsonify, request
from models import user, book, library
import json
from datetime import datetime, timedelta
#from flask_security import roles_required, login_required

library_api=Blueprint('library_api', __name__)


@library_api.route('register', methods=['get'])  #ok
#註冊，成功回傳_id，失敗回傳False
def register():
    role='normal user'
    email=request.values.get('email')
    password=request.values.get('password')
    name=request.values.get('name')
    phone=request.values.get('phone')
    result=user.insert_user(role, email, password, name, phone)
    if result != False: #成功
        return jsonify({'_id':result})
    else:   #失敗，註冊過了
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

@library_api.route('borrow_book', methods=['get'])
#借書，更新user的borrowing與book的borrow_infos, returned_time
def borrow_book():
    user_id=request.values.get('user_id')
    book_id=request.values.get('book_id')
    user.update_user_borrow_book(user_id, book_id)
    now=datetime.now()
    borrow_info_dict={'user_id':user_id, 'borrow_time':{'from': now, 'to': ''}}
    returned_time=now + timedelta(days=7)
    book.update_book_borrow_book(book_id, borrow_info_dict, returned_time)
    return jsonify({'message':'success'})
    
@library_api.route('return_book', methods=['get'])
#還書，更新user的borrowing, borrowed與book的borrow_infos, returned_time
def return_book():
    user_id=request.values.get('user_id')
    book_id=request.values.get('book_id')
    user.update_user_return_book(user_id, book_id)
    book.update_book_return_book(book_id, user_id)
    return jsonify({'message':'success'})
    
@library_api.route('show_all_books', methods=['get'])
#顯示所有書
def show_all_books():
    return jsonify(book.query_all_books())
    
@library_api.route('show_book_by_name', methods=['get'])
#顯示特定書名的書
def show_book_by_name():
    book_name=request.values.get('book_name')
    return jsonify(book.query_book_by_name(book_name))
    
@library_api.route('show_book_by_type', methods=['get'])
#顯示特定類型的書
def show_book_by_type():
    book_type=request.values.get('book_type')
    return jsonify(book.query_book_by_type(book_type))
    
@library_api.route('add_book', methods=['get'])
#新增書
def add_book():
    img=request.values.get('img')
    name=request.values.get('name')
    author=request.values.get('author')
    type=request.values.get('type')
    location=request.values.get('location')
    book_id=book.insert_book(img, name, author, type, location)
    return jsonify({'_id':book_id})
    
    
@library_api.route('delete_book', methods=['get'])
#刪除書
def delete_book():
    book_id=request.values.get('book_id')
    return jsonify({'message':'success'})
    
@library_api.route('show_book_by_id', methods=['get'])
#找某本書
def show_book_by_id():
    book_id=request.values.get('book_id')
    return jsonify(book.query_book_by_id(book_id))
    

@library_api.route('show_user_by_id', methods=['get'])
#找某個人
def show_user_by_id():
    user_id=request.values.get('user_id')
    return jsonify(user.query_user_by_id(user_id))

@library_api.route('edit_book', methods=['get'])
#編輯書，只能name author type?
def edit_book():
    book_id=request.values.get('book_id')
    name=request.values.get('name')
    author=request.values.get('author')
    type=request.values.get('type')
    book.update_book_info(book_id, name, author, type)
    return jsonify({'message':'success'})
    
@library_api.route('edit_user_favorite', methods=['get'])
#編輯使用者書單
def edit_user_favorite():
    user_id=request.values.get('user_id')
    book_id=request.values.get('book_id')
    user.update_user_favorite(user_id, book_id)
    return jsonify({'message':'success'})
    
@library_api.route('show_user_borrowed', methods=['get'])
#顯示使用者借過的書
def show_user_borrowed():
    user_id=request.values.get('user_id')
    book=[]
    for i in user.query_user_by_id(user_id)['borrowed']:
        book.append(book.query_book_by_id(i))
    return jsonify(book)
    
@library_api.route('show_user_borrowing', methods=['get'])
#顯示使用者正在借的書
def show_user_borrowing():
    user_id=request.values.get('user_id')
    book=[]
    for i in user.query_user_by_id(user_id)['borrowing']:
        book.append(book.query_book_by_id(i))
    return jsonify(book)
    
@library_api.route('show_user_favorite', methods=['get'])
#顯示使用者書單
def show_user_favorite():
    user_id=request.values.get('user_id')
    book=[]
    for i in user.query_user_by_id(user_id)['favorite']:
        book.append(book.query_book_by_id(i))
    return jsonify(book)
    
@library_api.route('show_new_book', methods=['get'])
#新書列表
def show_new_book():
        return jsonify(book.query_sorted_book_by_time())

@library_api.route('show_library', methods=['get'])
#顯示圖書館資訊
def show_library():
    return jsonify(library.query_library('012345'))
    
#慢慢載入書---------------------------------------------


@library_api.route('show_all_books_one_page', methods=['get'])
#顯示所有書
def show_all_books_one_page():
    page=request.values.get('page')
    page_num=20
    return jsonify(book.query_all_books_one_page(page, page_num))
    
@library_api.route('show_book_by_name_one_page', methods=['get'])
#顯示特定書名的書
def show_book_by_name_one_page():
    book_name=request.values.get('book_name')
    page=request.values.get('page')
    page_num=20
    return jsonify(book.query_book_by_name_one_page(book_name, page, page_num))
    
@library_api.route('show_book_by_type_one_page', methods=['get'])
#顯示特定類型的書
def show_book_by_type_one_page():
    book_type=request.values.get('book_type')
    page=request.values.get('page')
    page_num=20
    return jsonify(book.query_book_by_type_one_page(book_type, page, page_num))
    
    
    
#undone
@library_api.route('show_user_borrowed_one_page', methods=['get'])
#顯示使用者借過的書
def show_user_borrowed_one_page():
    user_id=request.values.get('user_id')
    page=request.values.get('page')
    page_num=20
    book=[]
    for i in user.query_user_by_id(user_id)['borrowed']:
        book.append(book.query_book_by_id(i))
    return jsonify(book)
    
@library_api.route('show_user_borrowing_one_page', methods=['get'])
#顯示使用者正在借的書
def show_user_borrowing_one_page():
    user_id=request.values.get('user_id')
    page=request.values.get('page')
    page_num=20
    book=[]
    for i in user.query_user_by_id(user_id)['borrowing']:
        book.append(book.query_book_by_id(i))
    return jsonify(book)
    
@library_api.route('show_user_favorite_one_page', methods=['get'])
#顯示使用者書單
def show_user_favorite_one_page():
    user_id=request.values.get('user_id')
    page=request.values.get('page')
    page_num=20
    book=[]
    for i in user.query_user_by_id(user_id)['favorite']:
        book.append(book.query_book_by_id(i))
    return jsonify(book)
    
@library_api.route('upload_image', methods=['post'])
#上傳照片
def upload_image():
    book_img_json=request.get_json()
    base64_str=book_img_json['base64_str']
    insert_book_image(base64_str)
    return jsonify({'message':'success'})
