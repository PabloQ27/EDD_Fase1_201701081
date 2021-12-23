<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/style.css">
  <title>Login</title>
</head>
<body>
  <section class="form-register">
    <h4  >Bienvenido</h4>
    <input class="controls" type="text" name="admin" id="id" placeholder="Ingrese su id">
    <input class="controls" type="password" name="pass" id="pass" placeholder="Ingrese su Contraseña">
    
    <select class = 'controls' name="select" id='textb' >
      <option id='empleado' value="empleado" >Empleado</option>
      <option id='admin' value="admin">Administrador</option>
    </select>

    <button onclick=verificar() class="botons">Entrar</button>
    
  </section>

  <script src="js/empleado.js"></script>
  <script src="js/circular-json.js"></script>

</body>
</html>
