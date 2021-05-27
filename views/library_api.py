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
import base64
from flask import send_from_directory
import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/Users/cihcih/Documents/GitHub/FutureLibrary/static/img'
ALLOWED_EXTENSIONS = {'png'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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
    borrow_info_dict={'user_id':user_id, 'borrow_time':{'from': now.strftime("%Y-%m-%d"), 'to': ''}}
    returned_time=now + timedelta(days=7)
    book.update_book_borrow_book(book_id, borrow_info_dict, returned_time.strftime("%Y-%m-%d"))
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
    
@library_api.route('add_book', methods=['post'])
#新增書
def add_book():
    book_json=request.get_json()
    #img=book_json['img']
    name=book_json['name']
    author=book_json['author']
    type=book_json['type']
    location=book_json['location']
    book_id=book.insert_book(name, author, type, location)
    return jsonify({'_id':book_id})
    
    
@library_api.route('delete_book', methods=['get'])
#刪除書
def delete_book():
    book_id=request.values.get('book_id')
    book.delete_book(book_id)
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

@library_api.route('delete_user_favorite', methods=['get'])
#編輯使用者書單
def delete_user_favorite():
    user_id=request.values.get('user_id')
    book_id=request.values.get('book_id')
    user.delete_user_favorite(user_id, book_id)
    return jsonify({'message':'success'})
    
@library_api.route('show_user_borrowed', methods=['get'])
#顯示使用者借過的書
def show_user_borrowed():
    user_id=request.values.get('user_id')
    books=[]
    for i in user.query_user_by_id(user_id)['borrowed']:
        books.append(book.query_book_by_id(i))
    return jsonify(books)
    
@library_api.route('show_user_borrowing', methods=['get'])
#顯示使用者正在借的書
def show_user_borrowing():
    user_id=request.values.get('user_id')
    books=[]
    for i in user.query_user_by_id(user_id)['borrowing']:
        books.append(book.query_book_by_id(i))
    return jsonify(books)
    
@library_api.route('show_user_favorite', methods=['get'])
#顯示使用者書單
def show_user_favorite():
    user_id=request.values.get('user_id')
    books=[]
    for i in user.query_user_by_id(user_id)['favorite']:
        books.append(book.query_book_by_id(i))
    return jsonify(books)
    
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
    
    
    
@library_api.route('upload_image', methods=['get'])
#上傳照片至mongoDB
def upload_image():
    book_id=request.values.get('book_id')
    book.upload_book_image(book_id)
    return jsonify({'message':'success'})

@library_api.route('read_image', methods=['get'])
#讀取照片
def read_image():
    book_id=request.values.get('book_id')
    image=book.read_book_image(book_id)
    
    data_uri = base64.b64encode(image).decode('utf-8')
    img_tag = '<img style="width: 400px;" src="data:image/png;base64,{0}">'.format(data_uri)
    return jsonify({'img': img_tag})
    
#判斷檔案是否合法
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@library_api.route('add_book2', methods=['post'])
#新增書2
def add_book2():
    book_json=request.get_json()
    name = book_json['name']
    author = book_json['author']
    type = book_json['type']
    location = book_json['location']
    book_id=book.insert_book(name, author, type, location)
    return jsonify({'_id':book_id})
    
@library_api.route('save_book_img', methods=['post'])
#將書的img存入目錄
def save_book_img():
    # check if the post request has the file part
    if 'img' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['img']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'message':'success'})
    else:
        return jsonify({'message':'falied'})

    

