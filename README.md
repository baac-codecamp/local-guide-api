#  Local-Guide-API
     คือ API ที่ใช้สำหรับบันทึกข้อมูลผู้ใช้งานระบบ Local Guide โดยรับข้อมูลาจาก Local-Guide-GUI

## 📦 Built With
- [X] nodeJS

## 📋 Feature

### API USER
- API USER index [GET] /api/user/
- API USER getUserById [GET] /api/user/:id
- API USER signup [POST] /api/user/
- API USER updateUser [PUT] /api/user/:id
- API USER [PATCH] /api/user/:id
- API USER deleteUser [DELETE] /api/user/:id
- API USER addReview [POST] /api/user/review/:id

### API GUIDE
- API GUIDE index [GET] /api/guide/
- API GUIDE getUserById [GET] /api/guide/:id
- API GUIDE signup [POST] /api/guide/
- API GUIDE updateUser [PUT] /api/guide/:id
- API GUIDE [PATCH] /api/guide/:id
- API GUIDE deleteUser [DELETE] /api/guide/:id
- API GUIDE viewReview [GET] /api/guide/review/:id

### API CHECK
- API [GET] /health

## ⚙ How to use
-


## ER Diagram
<img src="./public/LocalGuide_ERD.jpg" width="60%">


## 🏷 Version

### version 0.1.3
- update Source Code form example

### version 0.1.2
- update ER Diagram

### version 0.1.1
- init project