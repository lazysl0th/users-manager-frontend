import { useState, useEffect } from 'react'
import { Route, Routes, useBlocker, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import Main from './components/Main';
import PageNotFound from './components/PageNotFound';
import './App.css'
import * as api from './utils/api';
import ModalWindow from './components/ModalWindow';
import { 
  titleSuccess, 
  textRegSuccess, 
  textPasswordUpdateSuccess, 
  textResetPasswordSuccess, 
  deleteSuccess,
  blockSuccess,
  unblockSuccess
} from './utils/constants';

export default function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    loggedIn: false,
  });
  const [isModalWindowOpen,  setIsModalWindowOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [validated, setValidated] = useState({
    register: false,
    login: false,
    resetPass: false,
    changePass: false,
  });

  useEffect(() => {
    checkCurrentUser()
  }, [navigate])

  const checkCurrentUser = async() => {
    try {
      const user = await api.checkToken();
      if (Object.keys(user).length) {
        setCurrentUser({
          ...user,
          loggedIn: true,
        })
        navigate('/');
        return user
      } else {
        setCurrentUser({ loggedIn: false, });
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUsers();
  }, [currentUser.id])

  const getUsers = async () => {
    try{
      const users = await api.getUsers();
      setUsers(users);
    } catch (e) {
      console.log(e)
    }
  }

  const handleSignInSubmit = async ({email, password, remember}) => {
    try {
      if (!email || !password) return;
      const userData = await api.authorize({email, password, remember})
      if (userData) {
        setCurrentUser(() => ({
          ...userData,
          loggedIn: true,
        }));
        navigate('/');
      }
    } catch (e) {
      console.log(e);
      setModalTitle('Error')
      setModalMessage(e.message)
      setIsModalWindowOpen(true);
    }
  }

  const validationForm = (e) => {
    const form = e.currentTarget;
    const isValid = form.checkValidity();

    if (!isValid) e.stopPropagation();
    setValidated((prevValues) => ({
      ...prevValues,
      [form.getAttribute('name')]: true,
    }))

    if (isValid) {
      form.reset();
      setValidated((prevValues) => ({
        ...prevValues,
        [form.getAttribute('name')]: false,
      }));
    }

    return isValid;
  };

  const handleSignUpSubmit = async ({name, email, password}) => {
    try {
      if (!email || !password || !password) return
      const userData = await api.register({name, email, password})
      if(userData) {
        setModalTitle(titleSuccess);
        setModalMessage(textRegSuccess);
        setIsModalWindowOpen(true);
        navigate('/');
      } else {
        setIsModalWindowOpen(true);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
      setModalTitle('Error')
      setModalMessage(e.message)
      setIsModalWindowOpen(true);
    }
  }

  const signOut = () => {
    try{
      const user = api.logout();
      setCurrentUser({
          ...user,
          loggedIn: false,
        });
      navigate('/sign-in');
    } catch (e) {
      console.log(e)
    }
  }

  const handleChangePass = async(password, token) => {
    try {
      if (!password) return
      const userData = await api.changePassword({password, token})
      if(userData) {
        setModalTitle(titleSuccess);
        setModalMessage(textPasswordUpdateSuccess);
        setIsModalWindowOpen(true);
        navigate('/');
      } else {
        setIsModalWindowOpen(true);
      }
    } catch (e) {
      console.log(e);
      setModalTitle('Error')
      setModalMessage(dataError.message)
      setIsModalWindowOpen(true);
    }
  }

  const handleResetPass = async(email) => {
    try {
      if (!email) return
      const userData = await api.resetPassword({email})
      console.log(userData)
      if(userData) {
        setModalTitle(titleSuccess);
        setModalMessage(textResetPasswordSuccess);
        setIsModalWindowOpen(true);
        navigate('/');
      } else {
        setIsModalWindowOpen(true);
      }
    } catch (e) {
      console.log(e);
      setModalTitle('Error')
      setModalMessage(e.message)
      setIsModalWindowOpen(true);
    }
  }

  const handleOnBlockUser = async (rowSelection) => {
    const user = await checkCurrentUser();
    if (!user) return signOut()
    try {
      const usersId = Object.keys(rowSelection);
      const blockUsers = await api.blockUsers(usersId);
      setUsers(prev => prev.map(user => ({ ...user, ...(blockUsers.find(blockUser => blockUser.id === user.id) || {}) })));
      setModalTitle(titleSuccess);
      setModalMessage(blockSuccess);
      setIsModalWindowOpen(true);
    } catch (e) {
      console.log(e)
    }
  }

  const handleOnUnblockUser = async (rowSelection) => {
    const user = await checkCurrentUser();
    if (!user) return signOut()
    try {
      const usersId = Object.keys(rowSelection);
      const unblockUsers = await api.unblockUsers(usersId);
      setUsers(prev => prev.map(user => ({ ...user, ...(unblockUsers.find(unblockUser => unblockUser.id === user.id) || {}) })));
      setModalTitle(titleSuccess);
      setModalMessage(unblockSuccess);
      setIsModalWindowOpen(true);
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeleteUser = async (rowSelection) => {
    const user = await checkCurrentUser();
    if (!user) return signOut()
    try {
      const usersId = Object.keys(rowSelection);
      const deletedUsers = await api.deleteUsers(usersId);
      setUsers(prev => prev.filter(user => !deletedUsers.map(user => user.id).includes(user.id)));
      setModalTitle(titleSuccess);
      setModalMessage(deleteSuccess);
      setIsModalWindowOpen(true);
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeleteUnverified = async () => {
    const user = await checkCurrentUser();
    if (!user) return signOut()
      try {
        const deletedUsers = await api.deleteUnverifiedUsers();
        setUsers(prev => prev.filter(user => !deletedUsers.map(user => user.id).includes(user.id)));
        setModalTitle(titleSuccess);
        setModalMessage(deleteSuccess);
        setIsModalWindowOpen(true);
      } catch (e) {
      console.log(e);
        setModalTitle('Error')
        setModalMessage(e.message)
        setIsModalWindowOpen(true);
      }
  }

  const handleCloseModalWindow = () => {
    setIsModalWindowOpen(false);
    setModalTitle('');
    setModalMessage('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/sign-in" element={<Login onAuth={handleSignInSubmit}  onValidate={validationForm} validState={validated.login}/>} />
          <Route path="/sign-up" element={<Register onReg={handleSignUpSubmit} onValidate={validationForm} validState={validated.register}/>} />
          <Route path="/reset-password" element={<ResetPassword onResPass={handleResetPass} onValidate={validationForm} validState={validated.resetPass}/>} />
          <Route path="/change-password" element={<ChangePassword onChangePass={handleChangePass} onValidate={validationForm} validState={validated.changePass}/>} />
          <Route
            path="/"
            element={
                  <ProtectedRoute>
                    <Main users={users} handleSignOut={signOut} onBlock={handleOnBlockUser} onUnblock={handleOnUnblockUser} onDelete={handleDeleteUser} onDeleteUnverified={handleDeleteUnverified}/>
                  </ProtectedRoute>
            }/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ModalWindow show={isModalWindowOpen} onClose={handleCloseModalWindow} title={modalTitle} message={modalMessage}/>
    </CurrentUserContext.Provider>
  )
}