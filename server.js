const express = require("express");
const app = express();
const database = require("./config/database");
const passport = require('passport');


app.use(express.urlencoded({extended : false}));

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

const guestRouter = require("./routes/guest");
app.use("/guest", guestRouter);

const userRouter = require("./routes/users");
app.use("/user", userRouter)

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
 })
 


app.listen(1414);