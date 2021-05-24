#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 23 22:02:40 2021

@author: linxiangling
"""


from flask import Blueprint, render_template

library_web=Blueprint('library_web', __name__)

@library_web.route("/about_me")
def about_me():
    return render_template("about-me.html")

@library_web.route("/add_book")
def add_book():
    return render_template("add_book.html")

@library_web.route("/blog")
def blog():
    return render_template("blog.html")

@library_web.route("/book_detail_info")
def book_detail_info():
    return render_template("book_detail_info.html")

@library_web.route("/book")
def book():
    return render_template("book.html")

@library_web.route("/borrowed")
def borrowed():
    return render_template("borrowed.html")

@library_web.route("/contact")
def contact():
    return render_template("contact.html")


@library_web.route("/elements")
def elements():
    return render_template("elements.html")


@library_web.route("/index")
def index():
    return render_template("index.html")


@library_web.route("/Login")
def login():
    return render_template("login.html")


@library_web.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")


@library_web.route("/Register")
def register():
    return render_template("register.html")

@library_web.route("/services")
def services():
    return render_template("services.html")


@library_web.route("/lookup")
def lookup():
    return render_template("lookup.html")


@library_web.route("/borrowing")
def borrowing():
    return render_template("borrowing.html")


@library_web.route("/favorite")
def favorite():
    return render_template("favorite.html")


@library_web.route("/index2")
def index2():
    return render_template("index2.html")
