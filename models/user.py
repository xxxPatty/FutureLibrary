#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 23 21:52:20 2021

@author: linxiangling
"""
from . import _db

#新增成員(User)
def insert_user(role, email, password, name, phone):
    #檢查email是否重複
    if _db.USER_COLLECTION.find({'email':email}).count() != 0:  #註冊過
        return False
    #取得目前user數量
    user_id = "U-" + str(_db.USER_COLLECTION.find().count()).zfill(5) 
    userdict={'_id':user_id, 'email':email, 'password':password, 'name':name, 'phone':phone, 'borrowed':[], 'borrowing':[], 'favorite':[]}
    _db.USER_COLLECTION.insert_one(userdict)
    return user_id
    
#找是否有匹配的帳密
def find_user(email, password):
    data=_db.USER_COLLECTION.find({'email':email, 'password':password})
    if data.count() != 0:   #有此組帳密的user
        return data[0]['_id']
    else:
        return False
