# Welcome to SchoolDB!

งานนี้เป็นส่วนหนึ่งของวิชา **ITD62-276** Backend Framework Development เพื่อ **CRUD**
## **สารบัญ**
* Problem Statements
* [CRUD](#CRUD)

## Problem Statements
**ผู้ใช้งานระบบ**
* ครูและบุคลากรที่เกี่ยวข้องกับการจัดการข้อมูลนักเรียนในโรงเรียน

**ปัญหาที่พบ**
* เก็บข้อมูลในกระดาษ - เกิดความซับซ้อนในการค้นหาข้อมูลและการจัดการข้อมูลที่ไม่เป็นระบบ
* เก็บใน spreadsheet หรือโปรแกรมประมวลผล - เกิดข้อจำกัดเรื่องความสะดวกในการเข้าถึงข้อมูลและการทำงานร่วมกันของบุคคลที่เกี่ยวข้อง

**วิธีแก้ปัญหา**
* สร้าง web application เพื่อเข้าถึงข้อมูลนักเรียน และจัดการข้อมูลอย่างรวดเร็วและมีประสิทธิภาพ

**แก้ปัญหา**
* ความซับซ้อนในการจัดการข้อมูล ความไม่สะดวกในการค้นหาข้อมูล และการทำงานร่วมกันของบุคคลที่เกี่ยวข้องในการจัดการข้อมูลนักเรียน

**NoSQL**
* แต่ละห้องมีวิชาเรียนไม่เหมือนกัน ส่งผลให้โครงสร้างตารางในการเก็บคะแนนจะไม่แน่นอน จึงเหมาะกับ NoSQL ที่มีความยืดหยุ่นมากกว่า

## ขั้นตอนในการติดตั้ง
>((เดี๋ยวมาเขียน))

## วิธีการรัน
>((เดี๋ยวมาเขียน))

# CRUD
## การเชื่อมต่อ + รับข้อมูล
**เชื่อมต่อฐานข้อมูล** 
* **server.js:** เชื่อมต่อฐานข้อมูล MongoDB โดยเรียกใช้งาน MongoDB client ผ่าน `const  uri`
* ฐานข้อมูล `SchoolDB` และคอลเล็กชัน `studentRecord`

**รับข้อมูล**
* **server.js:** สร้าง API endpoint ชื่อ `/register` method `GET`ข้อมูล Student Record ผ่าน method `find({})`
* `express.json()` เพื่อแปลงข้อมูลเป็น JSON และส่งไปให้ `client`
	> กำหนดการข้ามข้อมูล (skip) และจำกัดจำนวนข้อมูลที่คืนกลับ (limit) สำหรับ Pagination
* **index.js:** หลังโหลดหน้าเว็บโดย `loadTable()` ทำการสร้าง `XMLHttpRequest` เพื่อร้องขอข้อมูลจาก `/register` บนserver
* JSON ส่งมาจากserver โดยmethod `send()`
* **index.html:** `id="bodyContent"` สำหรับแสดงตารางข้อมูล

## Login/Logout
**Login**
* **server:** สร้าง API endpoint ชื่อ `/login` method `POST`
* รับข้อมูลการเข้าสู่ระบบจาก user ผ่าน `body` ของ `request`
* ตรวจสอบ Input กับข้อมูลใน database โดยการ `findOne()`
	>ข้อมูลถูก จะส่งชื่อผู้ใช้กลับไปยัง client | ข้อมูลผิดจะส่ง Invalid กลับไป client
		**Note:** Client = App/Programที่ทำงานผ่านweb browser/อุปกรณ์อื่นๆ เพื่อเรียกบริการ/ข้อมูลจาก server
* **index.js:** user กดปุ่มเข้าสู่ระบบ จะสร้าง `XMLHttpRequest` เพื่อส่งข้อมูล login ไป `/login` บน server
* ส่งข้อมูล user + pass ผ่าน `body` ของ `request` ในรูปแบบ JSON ไปให้ server
* ถ้า server ส่ง 200 มา -> Alert "login เสร็จสิ้น" + เก็บข้อมูลใน localStorage

**Logout**
* **index.js:** user กดปุ่มออกจากระบบ จะลบข้อมูล auth ทั้งหมดจาก `localStorage` แล้วเรียก `checkAuth()` -> status: false

**Check Auth**
* **index.js:** window.onload เพื่อกำหนดว่า HTML จะต้องโหลดเสร็จก่อน ถึงจะ checkAuth()
	> ป้องกัน HTML โหลดไม่ทัน ทำให้ `checkAuth()` กับ `localStorage` เป็น error
	* หากยืนยันตัวตน(True) -> แสดง `searchBar` + `bodyContent` แสดงข้อมูล
	* หากยังไม่ยืนยันตัวตน -> `bodyContent` แสดงฟอร์ม login
	
## Creation
>
## Reading
**Read All API**
* **server:** เรียก `/register` ผ่าน `HTTP GET request` จาก client
	> กำหนดพารามิเตอร์ `skip` และ `limit` สำหรับ Pagination
* ส่งข้อมูลทั้งหมดกลับไป client ในรูปแบบ JSON พร้อม status 200
* **index.js:** ใช้ฟังก์ชัน `loadTable()` โหลดข้อมูลทั้งหมด web ถูกโหลด

**Search API**
* **server:** เรียก API `/register/:searchText` ผ่าน `HTTP GET request` จาก client โดยส่งคำค้นหามาในพารามิเตอร์ `searchText`
* ใช้เมธอด `find` และ operator `$regex` เพื่อค้นหาข้อมูลที่ตรงกับคำค้นหาที่ระบุในฐานข้อมูล
* หากพบข้อมูลตรงกับคำค้นหา จะส่งข้อมูลทั้งหมดที่พบกลับไปยัง client + status 200
* **index.js:** ฟังก์ชัน `studentSearch()` เพื่อค้นหาข้อมูลโดยใช้ API `GET /register/:searchText` โดยส่งคำค้นหามาในพารามิเตอร์ `searchText` ของ URL + ส่ง request แบบ AJAX ไปยัง server.js -> สามารถค้นหาข้อมูลนักเรียนได้ตามคำค้นหาที่ผู้ใช้ระบุใน input field ของ website
	> ผลลัพธ์แสดงผ่านตารางข้อมูลที่โหลดใหม่ทันที ไม่ต้องโหลดหน้า website ใหม่

**Updating**
>
 **Deletion**
 - เมื่อลบได้ - แสดงข้อความ
 - เมื่อลบไม่ได้ - แสดงข้อความ
 
 - กรอกข้อมูลถูกต้อง
	 - แสดงข้อมูลที่ดึงจากฐานข้อมูล
	 - แสดงข้อความ "ลงชื่อเข้าใช้สำเร็จ"
 - กรอกข้อมูลผิด
	 - ไม่แสดงข้อมูลที่ดึงจากฐานข้อมูล
	 - แสดงข้อความ "ลงชื่อเข้าใช้ไม่สำเร็จ"
