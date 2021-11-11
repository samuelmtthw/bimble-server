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
[x] GET /public/userCourse
[x] GET /public/userCourses/:courseId

[x] POST /public/userCourses/:courseId
[x] GET /public/comments/:videoId
[x] POST /public/comments/:videoId
[ ] POST /ovo/charge
[ ] POST /ovo/status

ADMIN
[x] POST /admin/register
[x] POST /admin/login
[x] POST /admin/loginGoogle
[x] GET /admin/users
[x] PUT /admin/users/:userId
[x] GET /admin/courses
[x] GET /admin/courses/:courseId
[x] POST /admin/courses
[x] PUT /admin/courses/:courseId
[x] PATCH /admin/courses/:courseId (soft delete)
[x] GET /admin/categories
[x] POST /admin/categories
[x] PATCH /admin/categories/:categoryId
[x] DELETE /admin/categories/:categoryId

# TESTING

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