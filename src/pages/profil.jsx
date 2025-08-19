import useLogin from "../hooks/useLogin";

const ProfilPage = () => {
  const username = useLogin();
  return (
    <div>
      profil <br /> username : {username}
    </div>
  );
};

export default ProfilPage;
