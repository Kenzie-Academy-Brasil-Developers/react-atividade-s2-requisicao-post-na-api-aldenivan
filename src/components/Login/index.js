import "./styles.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [isLogged, setisLogged] = useState();
  const [message, setMessage] = useState("");

  const formSchema = yup.object().shape({
    username: yup.string().required("Username obrigatório"),
    password: yup.string().required("Senha Obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleForm = (data) => {
    console.log(data);
    axios
      .post("https://kenzieshop.herokuapp.com/sessions/", data)
      .then((response) => {
        setisLogged(true);
        setMessage("Requisição completa");
      })
      .catch((_) => {
        setisLogged(false);
        setMessage("Requisição falhou");
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(handleForm)}>
        <input placeholder="Username" {...register("username")}></input>
        {errors.username?.message && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {errors.username.message}
          </p>
        )}
        <input
          placeholder="Password"
          type="password"
          {...register("password")}
        ></input>
        {errors.password?.message && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {errors.password.message}
          </p>
        )}
        <button>Login</button>
      </form>

      {isLogged ? (
        <p className="logged">{message}</p>
      ) : (
        <p className="failed">{message}</p>
      )}
    </div>
  );
};

export default Login;
