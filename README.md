# Developer Notes

1. Lakukan `npm install` untuk membuat folder node_modules
2. Lakukan `npm run start` untuk mengaktifkan app.js
3. Lakukan `npm run test` untuk testing server
4. Jika ingin init database development lakukan command `npm run init-db:dev`
5. Jika ingin init database testing lakukan command `npm run init-db:test`


# Endpoint Server

CUSTOMER
[x] POST /public/register
[x] POST /public/login
[x] GET /public/users
[x] PUT /public/users
[x] GET /public/courses
[x] GET /public/courses/:courseId
[ ] GET /public/userCourse
[ ] GET /public/userCourses/:courseId
[ ] POST /public/userCourses/:courseId
[ ] POST /ovo/charge
[ ] POST /ovo/status

ADMIN
[ ] GET /admin/register
[ ] GET /admin/login
[ ] GET /admin/users
[ ] PUT /admin/users/:userId
[ ] GET /admin/courses
[ ] GET /admin/courses/:courseId
[ ] POST /admin/courses
[ ] PUT /admin/courses/:courseId
[ ] PATCH /admin/courses/:courseId (soft delete)
[ ] GET /admin/categories
[ ] POST /admin/categories
[ ] PATCH /admin/categories/:categoryId
[ ] DELETE /admin/categories/:categoryId

# TESTING

CUSTOMER
[x] POST /public/register
[x] POST /public/login
[ ] GET /public/users
[ ] PUT /public/users
[ ] GET /public/courses
[ ] GET /public/courses/:courseId
[ ] GET /public/userCourse
[ ] GET /public/userCourses/:courseId
[ ] POST /public/userCourses/:courseId
[ ] POST /ovo/charge
[ ] POST /ovo/status

ADMIN
[ ] GET /admin/register
[ ] GET /admin/login
[ ] GET /admin/users
[ ] PUT /admin/users/:userId
[ ] GET /admin/courses
[ ] GET /admin/courses/:courseId
[ ] POST /admin/courses
[ ] PUT /admin/courses/:courseId
[ ] PATCH /admin/courses/:courseId (soft delete)
[ ] GET /admin/categories
[ ] POST /admin/categories
[ ] PATCH /admin/categories/:categoryId
[ ] DELETE /admin/categories/:categoryId