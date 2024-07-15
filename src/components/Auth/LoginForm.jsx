import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiTwotoneEyeInvisible } from "react-icons/ai";

function LoginForm() {
  document.title = "Connexion au site";

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [errMessage, setErrMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const email = watch("email", "");
  const password = watch("password", "");
  const [toast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({});

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.pathname || "/"; //travail sur la redirection

  let login = async () => {
    try {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      let res = await axios.post("http://127.0.0.1:8000/api/login/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.data.access_token.token);
        
        navigate("/home", { replace: true });
      }
    } catch (err) {}
  };

  const handleClickShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit(login)}>
      <h3 className="Auth-form-title">Connexion</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Adresse mail</Form.Label>
        <Form.Control
          type="email"
          placeholder="johndoe@unknown.fr"
          {...register("email", {
            required: "Mail obligatoire",
          })}
        />
        {errors.email && (
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mot de passe</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <i onClick={handleClickShowPassword}>
              {showPassword ? <AiOutlineEye /> : <AiTwotoneEyeInvisible />}
            </i>
          </InputGroup.Text>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            {...register("password", {
              required: "Mot de passe est obligatoire",
            })}
          />
        </InputGroup>
        {errors.password && (
          <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Se connecter
      </Button>
      <p className="forgot-password text-right mt-2">
        Mot de passe <a href="#">oublié?</a>
      </p>
    </Form>
  );
}

export default LoginForm;