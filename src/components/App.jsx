import '../styles/index.scss';


import { useState } from 'react';
import callToApi from '../services/api';
import Header from './Header';
import Footer from './Footer';
import Preview from './Preview';
import Landing from './landing';
import CreatePage from './CreatePage';
import ButtonRoute from './ButtonRoute';


import { Route, Routes } from "react-router-dom"



function App() {
  const [data, setData] = useState({
    name: '',
    slogan: '',
    repo: '',
    demo: '',
    technologies: '',
    desc: '',
    autor: '',
    job: '',
    image: 'https://placehold.co/600x400',
    photo: 'https://placehold.co/600x400',

  });
  const [cardUrl, setCardUrl] = useState('');
  const [error, setError] = useState('');
  const [errorUrl, setErrorUrl] = useState('');
  const [showUrl, setShowUrl] = useState(false);
  const regex = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ ]*$/;

  const handleChangeInput = (inputId, value) => {

    if (
      inputId === 'name' ||
      inputId === 'slogan' ||
      inputId === 'desc' ||
      inputId === 'technologies' ||
      inputId === 'demo' ||
      inputId === 'repo'
    ) {
      setData({ ...data, [inputId]: value });
    } else if (inputId === 'autor' || inputId === 'job') {
      if (regex.test(value)) {
        setData({ ...data, [inputId]: value });
        setError('');
      } else {
        console.log('error');
        setError('*Este campo debe contener una URL válida')
      }
    }
  }

  const handleCreateBtn = () => {
    validateUrl();
    callToApi(data).then((response) => {
      setCardUrl(response);
      if (response !== undefined) {
        setShowUrl(true);
        setData({
          name: '',
          slogan: '',
          repo: '',
          demo: '',
          technologies: '',
          desc: '',
          autor: '',
          job: '',
          image: 'https://placehold.co/600x400',
          photo: 'https://placehold.co/600x400',
        });
        setError('');
        setErrorUrl('');

      } else { setShowUrl(false) }

    })

  };

  const validateUrl = () => {
    let urlRegex = /^(http|https):\/\/[^ "]+$/;
    if (urlRegex.test(data.demo) && urlRegex.test(data.repo)) {
      setErrorUrl('');
      return true;
    } else {
      console.log('error');
      setErrorUrl('*Este campo debe contener una URL válida');
      return false;
    }

  }



  return (
    <div className='container'>
      <header>
        <Header />
      </header>

      <main className='main'>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <ButtonRoute text="Nuevo Proyecto" route="/CreatePage" />
                <Landing data={data} setData={setData} />
              </>
            }
          />

          <Route
            path="/CreatePage"
            element={
              <>
                <ButtonRoute text="Ver Proyectos" route="/" />
                <CreatePage data={data} error={error} cardUrl={cardUrl} errorUrl={errorUrl} showUrl={showUrl} handleCreateBtn={handleCreateBtn} handleChangeInput={handleChangeInput} />
              </>}
          />


        </Routes>

      </main>
      <footer className='footer'>
        <Footer />
      </footer>
    </div>
  );
}
export default App;
