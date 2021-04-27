#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 23 21:52:20 2021

@author: linxiangling
"""
from . import _db
from datetime import datetime

#借書
def update_book_borrow_book(book_id, borrow_info_dict, returned_time):
    _db.BOOK_COLLECTION.update({'_id':book_id}, {'$push':{'borrow_infos': borrow_info_dict}})
    _db.BOOK_COLLECTION.update({'_id':book_id}, {'$set':{'returned_time':returned_time}})
    
def query_all_books():
    return [{'_id':i['_id'], 'book_info':i['book_info'], 'location':i['location'], 'time':i['time'], 'borrow_infos':i['borrow_infos'], 'returned_time':i['returned_time']} for i in _db.BOOK_COLLECTION.find()]
    
def query_book_by_name(book_name):
    return [{'_id':i['_id'], 'book_info':i['book_info'], 'location':i['location'], 'time':i['time'], 'borrow_infos':i['borrow_infos'], 'returned_time':i['returned_time']} for i in _db.BOOK_COLLECTION.find({'book_info.name':book_name})]
    
    
def query_book_by_type(book_type):
    return [{'_id':i['_id'], 'book_info':i['book_info'], 'location':i['location'], 'time':i['time'], 'borrow_infos':i['borrow_infos'], 'returned_time':i['returned_time']} for i in _db.BOOK_COLLECTION.find({'book_info.type':book_type})]

def insert_book(img, name, author, type, location):
    #產生id
    data=_db.BOOK_COLLECTION.find()
    if data.count() != 0:
        book_id='B-'+str(int(data.sort('-id', -1)[0]['_id'].split('-')[1])+1).zfill(5)
    else:
        book_id='B-00000'
    book_dict={'_id':book_id, 'book_info':{'img':img, 'name':name, 'author':author, 'type':type}, 'location':location, 'time':datetime.now(), 'borrow_infos':[], 'returned_time':None}
    _db.BOOK_COLLECTION.insert(book_dict)
    return book_id

#還書
def update_book_return_book(book_id, user_id):
    count=len(_db.BOOK_COLLECTION.find_one({'_id':book_id})['borrow_infos'])
    _db.BOOK_COLLECTION.update({'_id':book_id}, {'$set':{'borrow_infos.'+str(count-1)+'.borrow_time.to':datetime.now(), 'returned_time':None}})
    
    
