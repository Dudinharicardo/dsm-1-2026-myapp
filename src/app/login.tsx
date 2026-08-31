import { Link, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "./utils/authContext";

export default function Login() {
  const router = useRouter();
  const [senha, setSenha] = useState<string>();
  const [usuario, setUsuario] = useState<string>();
  const auth = useContext(AuthContext);

  function onClickAcessar() {
    if (usuario == "teste@test.com" && senha == "123") {
      auth.logIn();
      router.navigate("/");
    } else {
      Alert.alert("Usuário ou Senha invalido ...");
    }
  }

  return (
    <View style={{ flex: 1, padding: 5, gap: 5, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Image source={require("@/assets/images/favicon.png")} />
        <Text style={styles.titulo}>Login</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Aula 31/08/2026
        </Text>
      </View>
      <View style={styles.main}>
        <Text style={styles.inputText}>Login:</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o login/email!"
          onChangeText={(value) => {
            setUsuario(value);
          }}
        />

        <Text style={styles.inputText}>senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="informe a senha!"
          secureTextEntry
          onChangeText={(e) => {
            setSenha(e);
          }}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.inputText}>
          Não tem login,{" "}
          <Link href={"/register"}>
            <Text style={styles.textoLink}>faça o cadastro aqui!</Text>{" "}
          </Link>
        </Text>
        <Button
          onPress={() => {
            onClickAcessar();
          }}
          title="Acessar"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  titulo: {
    color: "#000",
    fontSize: 28,
    fontWeight: 600,
  },
  textoLink: {
    fontSize: 18,
    color: "red",
    fontWeight: 500,
  },
  main: {
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    width: "100%",
    height: 36,
    backgroundColor: "#d2d2d2",
    marginBottom: 15,
    borderRadius: 10,
  },
  inputText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 12,
    width: "100%",
    marginBottom: 5,
  },
  footer: {
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
