import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import authRoute from "./src/routes/authRoutes.js";
import crypticRoute from "./src/routes/crypticRoute.js";
import dashboardRoute from "./src/routes/dashboardRoute.js";
import connectDB from "./src/db/mongoose.js";
import { authenticateToken } from './src/middleware/authMiddleware.js';
import logoutRoute from "./src/routes/logoutroute.js";

const app = express();
const NUM_INSTANCES = 10;
const START_PORT = 8001;

app.use(logoutRoute)

//static files folders
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const __public = dirname(__dirname) + "/public";

app.use('/public', express.static('public', { 'extensions': ['html', 'css', 'js'] }));
// Serve static files from the 'public/scripts' directory
app.use('/scripts', express.static(join(__dirname, '..', 'public', 'scripts')));
app.use('/public', express.static('assets'));




app.get("/",(req,res)=>{
    res.sendFile(__public + "/views/index.html");
});

app.get("/signup",(req,res)=>{
    res.sendFile(__public + "/views/sign_up.html");
});

app.get("/register",authenticateToken,(req,res)=>{
    if(req.user.role === "team_leader"){
        res.sendFile(__public + "/views/register.html");
    }else{
        res.sendStatus(403);
    }
});

app.get("/login",(req,res)=>{
    res.sendFile(__public + "/views/login.html");
});

app.get("/dashboard", (req,res)=>{
    if(req.user.role==="admin"){
        res.json("Welcome admin");
    }else{
        res.sendStatus(403);
    }
})

app.get("/home",authenticateToken, (req,res)=>{
    if(req.user.role === "team_leader"){
        res.sendFile(__public + "/views/home_page_leader.html");
    }else{
        res.sendFile(__public + "/views/home_page.html");
    }
});

app.get("/crypt",authenticateToken, (req,res)=>{
    res.sendFile(__public + "/views/event.html");
});

app.get("/logout",(req,res)=>{
    res.redirect("/");
});

app.use(authRoute);
app.use(crypticRoute);
app.use(dashboardRoute);

function startServers() {
    for (let i = 0; i < NUM_INSTANCES; i++) {
        const port = START_PORT + i;
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
}

// If running in clustered mode with PM2
if (process.env.NODE_APP_INSTANCE !== undefined) {
    startServers(); // Start servers for each instance
} else {
    // Otherwise, start PM2 in clustered mode
    const instances = NUM_INSTANCES || 1; 
    const { fork } = await import('pm2');

    fork(import.meta.url, {
        instances,
        exec_mode: 'cluster'
    }, (err) => {
        if (err) {
            console.error('Error starting application:', err);
            process.exit(1);
        }
    });
}
