import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const userPath = path.resolve(__dirname, "../data/user.json");
console.log("Ruta del archivo user.json:", userPath);


const modelUser = {
  readUser: () => {
    const users = fs.readFileSync(userPath, "utf8");
    if (!users) {
      fs.writeFileSync(userPath, "[]", "utf8");
      return [];
    }
    const user = JSON.parse(users);
    return user;
  },
  writeUser: (users: any) => {
    const user = JSON.stringify(users, null, 2);
    fs.writeFileSync(userPath, user, "utf8");
  },
  addUser: async (user: { nombre: string; contraseña: string }) => {
    const users = modelUser.readUser();
    const hashedPassword = await bcrypt.hash(user.contraseña, 10);

    const newUser = {
      id: Date.now(),
      nombre: user.nombre,
      contraseña: hashedPassword,
    };
    users.push(newUser);
    modelUser.writeUser(users);
    return newUser;
  },
};
export default modelUser;
