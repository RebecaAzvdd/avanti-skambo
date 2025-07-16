import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";
import api from "../../Services/api";
import { Link, Redirect, useHistory } from "react-router-dom";
import "./LoginPage.css";

export default function Login({ autenticado, setAutenticado }) {
  //   const history = useHistory();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Formato inválido!")
      .required("Email obrigatório"),
    password: yup
      .string()
      // .min(8, "A senha deve ter ao menos 8 dígitos")
      .required("Campo obrigatório"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onsubmitFunction = async (data) => {
    console.log("tentando Login!! data: ", data);

    await api
      .post("/sessions", data)
      .then((response) => {
        console.log("response: ", response.data);
        setAutenticado(true);
      })
      .catch((err) => console.log("erro ao logar"));
  };

  if (autenticado === true) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit(onsubmitFunction)}>
        <h1>Login</h1>
        <span>Rápido e grátis, vamos lá!</span>

        <Input
          register={register}
          name="email"
          label="Email"
          placeholder="Email"
        ></Input>
        <Input
          register={register}
          name="password"
          type="password"
          label="Senha"
          placeholder="password"
        ></Input>

        <Button type="submit">Logar</Button>
        <span>
          Não possui uma conta? faça o <Link to="/cadastro">cadastro</Link>
        </span>
      </form>
    </div>
  );
}
