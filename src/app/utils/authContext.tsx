import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router"
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface user { id: number,
          name: string,
          avatar: string,
          email: string
  };
type AuthContextProps = {
  isLoggedIn: boolean;
  isReding: boolean; // false enquanto o login nao for valido
  user: user| null,
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  isReding: false,
  user: null,
  logIn: () => {},
  logOut: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setILoggedIn] = useState(false);
  const [isReding, setReding] = useState(true);
  const [user, setuser] = useState<user|null>(null);

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        // 1. Pega a string do AsyncStorage
        const jsonValue = await AsyncStorage.getItem("my-key");

        // 2. Verifica se ela existe e transforma em objeto
        if (jsonValue !== null) {
          const resultado = JSON.parse(jsonValue);
          console.log(typeof resultado.isLoggedIn);
          // 3. Atualiza o seu estado com o valor booleano (true/false)
          if (resultado.isLoggedIn) {
            console.log(`if  ${resultado.isLoggedIn}`);
            setILoggedIn(true);
             const userPayould:user = {
              id:1,
              name: "",
              avatar: "",
              email:""
            };
            setuser(userPayould)
          } else {
            setILoggedIn(false);
          }
        }
      } catch (error) {
        console.error("Erro ao ler o status de login:", error);
      } finally {
        setReding(false); // Finaliza o estado de carregamento
      }
    };

    verificarLogin();
  }, []);

  const logIn = async () => {
    const jsonValue = JSON.stringify({ isLoggedIn: true, user});
    setILoggedIn(true);
    await AsyncStorage.setItem("my-key", jsonValue);

  };

  const logOut = async () => {
    const jsonValue = JSON.stringify({ isLoggedIn: false });
    setILoggedIn(false);
    await AsyncStorage.setItem("my-key", jsonValue);
  };

  return (
    <AuthContext value={{ isLoggedIn, isReding, user, logIn, logOut }}>{children}</AuthContext>
  );
}
