const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Bienvenido a la ruta base de este servidor");
});

// Crear una cookie temporal
app.get("/create-temp-cookie", (req, res) => {
  res.cookie("tempCookie", "Esta_es_una_cookie_temporal", { maxAge: 60000 }); // Esta cookie durará 60 segundos
  res.send("La cookie temporal ha sido seteada!");
});

// Crear una cookie de sesión
app.get("/create-session-cookie", (req, res) => {
  res.cookie("sessionCookie", "Esta_es_una_cookie_de_sesión", { expires: 0 }); // Esta cookie durará hasta que el navegador se cierre
  res.send("Session cookie has been set");
});

// Crear una cookie con flags
app.get("/create-flagged-cookie", (req, res) => {
  res.cookie("flaggedCookie", "Esta_es_una_cookie_con_flag", {
    secure: true,
    httpOnly: true,
  }); // Esta cookie sólo se enviará a través de HTTPS y no será accesible a través de JavaScript
  res.send("El flag de la cookie ha sido seteada");
});

// Leyendo cookies
app.get("/read-cookies", (req, res) => {
  res.send(`Cookies: ${JSON.stringify(req.cookies)}`);
});

// Eliminando cookies
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("tempCookie");
  res.send("tempCookie ha sido eliminada");
});

// Estableciendo cookies con diferentes rutas
app.get("/set-path-cookie", (req, res) => {
  res.cookie("pathCookie", "Esta cookie tiene una ruta específica", {
    path: "/especifica",
  });
  res.send("pathCookie ha sido establecida");
});

// Leyendo la cookie específica de la ruta
app.get("/especifica", (req, res) => {
  res.send(`pathCookie: ${req.cookies.pathCookie}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
