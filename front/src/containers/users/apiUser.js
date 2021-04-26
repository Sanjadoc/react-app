import useApi from "../../hooks/useApi";

export default function ApiUser() {
  const { callApi } = useApi();

  const getOneUser = async ({ userId }) => {
    return callApi(`/user/${userId}`);
  };

  const updateProfile = async ({ userId, sendData }) => {
    return callApi(`/user/${userId}/update`, "put", sendData);
  };

  const sendAvatar = async ({ userId, sendData }) => {
    return callApi(`/user/${userId}/sendAvatar`, "put", sendData);
  };

  return {
    getOneUser,
    updateProfile,
    sendAvatar,
  };
}
